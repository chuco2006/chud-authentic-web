export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    sheetUrl,
    gids = ["1599511117", "118702566", "1380208994", "1458127387", "447218553"]
  } = req.body;

  if (!sheetUrl) {
    return res.status(400).json({ error: "Missing Google Sheet URL" });
  }

  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) {
    return res.status(400).json({ error: "Invalid Google Sheet URL" });
  }
  const spreadsheetId = match[1];

  // Danh sách các ký hiệu được nhận diện là tên Size (Áo, Quần, Dép)
  const VALID_SIZES = new Set([
    "XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL", "FREE SIZE", "FREESIZE", "OS",
    "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45",
    "36-37", "38-39", "40-41", "42-43", "44-45",
    "230", "240", "250", "260", "270", "280", "290",
    "4", "5", "6", "7", "8", "9", "10", "11", "12"
  ]);

  const inventoryMap = {};

  try {
    for (const gid of gids) {
      const cleanGid = gid.toString().trim();
      if (!cleanGid) continue;

      const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${cleanGid}`;
      const response = await fetch(csvUrl);
      if (!response.ok) continue;

      const csvText = await response.text();
      const rows = parseCSV(csvText);
      if (rows.length === 0) continue;

      // 1. Tìm tất cả các cột có tiêu đề là "SIZE" trên khắp chiều ngang của bảng
      const sizeColIndices = new Set();
      for (let r = 0; r < Math.min(15, rows.length); r++) {
        for (let c = 0; c < rows[r].length; c++) {
          const cellVal = (rows[r][c] || "").toString().trim().toUpperCase();
          if (cellVal === "SIZE") {
            sizeColIndices.add(c);
          }
        }
      }

      // Nếu trang không ghi chữ SIZE ở đầu, mặc định quét cột B (index 1) và cột F (index 5)
      if (sizeColIndices.size === 0) {
        sizeColIndices.add(1);
        sizeColIndices.add(5);
      }

      // 2. Quét dọc từng cột SIZE tìm được
      for (const sizeCol of sizeColIndices) {
        const slCol = sizeCol + 1; // Cột SL luôn nằm ngay bên phải cột SIZE
        let currentSku = null;

        for (let r = 0; r < rows.length; r++) {
          const rawSizeCell = (rows[r][sizeCol] || "").toString().trim().toUpperCase();
          const rawSlCell = (rows[r][slCol] || "").toString().trim();

          if (!rawSizeCell || rawSizeCell === "SIZE" || rawSizeCell === "MẶT TRƯỚC" || rawSizeCell === "MẶT SAU") {
            continue;
          }

          // Kiểm tra xem ô này là tên Size hay là Mã số sản phẩm (SKU)
          if (VALID_SIZES.has(rawSizeCell)) {
            if (currentSku) {
              // Tách số đứng đầu tiên: Ví dụ "1 T2" -> lấy 1, bỏ "T2"
              const numMatch = rawSlCell.match(/^(\d+)/);
              const qty = numMatch ? parseInt(numMatch[1], 10) : 0;

              if (qty > 0) {
                if (!inventoryMap[currentSku].sizes.includes(rawSizeCell)) {
                  inventoryMap[currentSku].sizes.push(rawSizeCell);
                }
                inventoryMap[currentSku].stock[rawSizeCell] =
                  (inventoryMap[currentSku].stock[rawSizeCell] || 0) + qty;
              }
            }
          } else if (rawSizeCell.length >= 3 && !rawSizeCell.includes("GIÁ")) {
            // Ô này chính là Mã số sản phẩm (VD: 1904876, BB1...)
            currentSku = rawSizeCell;
            if (!inventoryMap[currentSku]) {
              inventoryMap[currentSku] = {
                sizes: [],
                stock: {}
              };
            }
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      totalSkusFound: Object.keys(inventoryMap).length,
      inventory: inventoryMap
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  return lines.map((line) => {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  });
}

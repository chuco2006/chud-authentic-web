export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sepayToken, orderCode, expectedAmount } = req.body;

  if (!sepayToken || !orderCode) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await fetch("https://my.sepay.vn/userapi/transactions/list?limit=20", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sepayToken.trim()}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch SePay transactions" });
    }

    const data = await response.json();
    const transactions = data.transactions || [];

    // Tìm giao dịch chứa mã đơn hàng và khớp số tiền
    const matched = transactions.find((tx) => {
      const content = (tx.transaction_content || "").toUpperCase();
      const codeMatch = content.includes(orderCode.toUpperCase());
      const amountIn = Number(tx.amount_in || 0);
      const amountMatch = expectedAmount ? amountIn >= Number(expectedAmount) : true;
      return codeMatch && amountMatch;
    });

    if (matched) {
      return res.status(200).json({
        paid: true,
        transaction: matched
      });
    }

    return res.status(200).json({
      paid: false
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, ShoppingBag, X, Plus, Minus, Trash2, Edit3, Check,
  SlidersHorizontal, Ruler, ShieldCheck, Truck, RefreshCw,
  Lock, Unlock, Cloud, CloudOff, Copy, Sparkles, ArrowRight,
  ChevronRight, Phone, Mail, Globe, CheckCircle2, ArrowLeft
} from 'lucide-react';

// ==========================================
// CẤU HÌNH SUPABASE CLOUD & BẢO MẬT ADMIN
// ==========================================
const SUPABASE_URL = "https://kdzocbewtctbbgohpaeh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkem9jYmV3dGN0YmJnb2hwYWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1OTg1MzgsImV4cCI6MjEwODE3NDUzOH0.nY17NqF6dVc8t8b6Nv4WUmbio21AYiQUYHSAWGJNYSo";
const ADMIN_PIN = "2006";

// ==========================================
// DỮ LIỆU MẶC ĐỊNH BAN ĐẦU (CHUD AUTHENTIC)
// ==========================================
const DEFAULT_SITE_CONFIG = {
  topBanner: "CAM KẾT 100% AUTHENTIC — MIỄN PHÍ VẬN CHUYỂN ĐƠN TỪ 1.000.000Đ — MÃ: CHUDVIP GIẢM 10%",
  brandName: "CHUD AUTHENTIC",
  heroTag: "MONOCHROME ARCHIVE // 2026 COLLECTION",
  heroTitle: "STREETWEAR AUTHENTIC CHUẨN MỰC ĐEN & TRẮNG",
  heroSubtitle: "Tuyển tập New Era, MLB, Essentials Fear of God chính hãng. Phong cách tối giản, form dáng chuẩn streetwear.",
  heroCta: "KHÁM PHÁ KỆ HÀNG",
  hotline: "+84 356 926 605",
  email: "chucospktk24@gmail.com",
  domain: "chudauthentic.store",
  address: "TP. Hồ Chí Minh, Việt Nam"
};

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "New Era NY Yankees 59FIFTY Fitted Cap",
    brand: "New Era",
    category: "Nón",
    price: 1150000,
    originalPrice: 1350000,
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen / Logo Trắng", "Trắng / Logo Đen"],
    sizes: ["7", "7 1/8", "7 1/4", "7 3/8", "7 1/2"],
    material: "100% Polyester Wool cao cấp đứng form",
    fit: "59FIFTY Fitted (Bít đuôi chuẩn vòng đầu)",
    description: "Nón New Era 59FIFTY Fitted chính hãng logo New York Yankees thêu nổi 3D sắc nét. Đầy đủ tem vàng hologram trên lưỡi trai và tag nội địa chuẩn Authentic."
  },
  {
    id: 2,
    name: "New Era LA Dodgers 9FORTY Adjustable Cap",
    brand: "New Era",
    category: "Nón",
    price: 890000,
    originalPrice: 1050000,
    tag: "HOT DROP",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen Tuyền", "Trắng Kem"],
    sizes: ["FREE SIZE"],
    material: "100% Cotton Twill thoáng khí",
    fit: "9FORTY Adjustable (Khóa cài điều chỉnh vòng đầu)",
    description: "Dòng 9FORTY form cứng cáp ôm đầu, lưỡi trai cong sẵn dễ đội, khóa kim loại khắc logo sau gáy giúp tùy chỉnh linh hoạt cho mọi kích cỡ vòng đầu."
  },
  {
    id: 3,
    name: "MLB NY Yankees Monogram Oversized Tee",
    brand: "MLB",
    category: "Áo",
    price: 1450000,
    originalPrice: 1690000,
    tag: "AUTHENTIC",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen", "Trắng"],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Cotton 250gsm dày dặn, chống bai dão cổ áo",
    fit: "Oversized Fit (Form rộng trễ vai chuẩn Hàn Quốc)",
    description: "Áo thun MLB New York Yankees chính hãng nguyên tag, hỗ trợ check HiddenTag. Chất vải cotton đanh mịn, thấm hút mồ hôi cực tốt."
  },
  {
    id: 4,
    name: "Fear of God Essentials Boxy Tee",
    brand: "Essentials",
    category: "Áo",
    price: 1550000,
    originalPrice: 1850000,
    tag: "LIMITED",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen (Stretch Limo)", "Trắng Kem (Light Oatmeal)", "Xám Đậm"],
    sizes: ["S", "M", "L", "XL"],
    material: "Heavyweight Jersey Cotton 100%",
    fit: "Boxy Oversized (Chiều ngang rộng, bo cổ dày)",
    description: "Áo thun Essentials form boxy đặc trưng, logo cao su đúc nổi tối giản trước ngực và tag cao su sau cổ áo. Đi kèm túi zip dustbag chính hãng."
  },
  {
    id: 5,
    name: "MLB LA Dodgers Heavyweight Hoodie",
    brand: "MLB",
    category: "Hoodie",
    price: 2350000,
    originalPrice: 2790000,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen", "Xám Tro"],
    sizes: ["M", "L", "XL"],
    material: "Nỉ Cotton French Terry 380gsm đứng form",
    fit: "Relaxed Oversized Fit",
    description: "Áo khoác nỉ Hoodie MLB LA Dodgers với phần mũ 2 lớp to bản đứng dáng. Bo tay và bo gấu áo dệt gân chắc chắn, phù hợp mặc thu đông hoặc khoác ngoài."
  },
  {
    id: 6,
    name: "Essentials Fear Of God Sweatshorts",
    brand: "Essentials",
    category: "Quần",
    price: 1650000,
    originalPrice: 1950000,
    tag: "ESSENTIAL",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen (Jet Black)", "Xám (Heather Grey)"],
    sizes: ["S", "M", "L"],
    material: "80% Cotton, 20% Polyester Fleece dày dặn",
    fit: "Above-Knee Relaxed (Trên gối thoải mái)",
    description: "Quần short nỉ Essentials dây rút dài đặc trưng cùng miếng tag cao su ở đũng quần và logo Essentials phản quang dưới ống trái."
  }
];

const ALL_SIZE_OPTIONS = ["S", "M", "L", "XL", "FREE SIZE", "7", "7 1/8", "7 1/4", "7 3/8", "7 1/2"];

export default function App() {
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  // Trạng thái Cloud
  const [cloudStatus, setCloudStatus] = useState("loading");
  const [statusMsg, setStatusMsg] = useState("Đang tải dữ liệu...");

  // Trạng thái Tìm kiếm & Bộ lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedSize, setSelectedSize] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Lưu lựa chọn Size & Màu đang chọn trên từng thẻ ở ngoài kệ hàng (không tự nhảy vào giỏ)
  const [cardSelections, setCardSelections] = useState({});

  // Trạng thái Trang Chi Tiết Sản Phẩm (Product Detail Page)
  const [activeProduct, setActiveProduct] = useState(null);
  const [detailSize, setDetailSize] = useState("");
  const [detailColor, setDetailColor] = useState("");
  const [detailQty, setDetailQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [addedToast, setAddedToast] = useState("");

  // Giỏ hàng & Bảng Size
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Máy tính gợi ý Size
  const [userHeight, setUserHeight] = useState(172);
  const [userWeight, setUserWeight] = useState(65);
  const [headCircumference, setHeadCircumference] = useState(57.7);

  // Trạng thái Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [colorsInput, setColorsInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // 1. TẢI DỮ LIỆU TỪ SUPABASE KHI MỞ WEB
  useEffect(() => {
    async function loadStoreFromSupabase() {
      try {
        setCloudStatus("loading");
        const res = await fetch(`${SUPABASE_URL}/rest/v1/store_data?id=eq.1&select=*`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`
          }
        });

        if (!res.ok) throw new Error("Chưa khởi tạo bảng store_data");

        const data = await res.json();
        if (data && data.length > 0) {
          if (data[0].site_config) setSiteConfig(data[0].site_config);
          if (data[0].products) setProducts(data[0].products);
          setCloudStatus("synced");
          setStatusMsg("Đã đồng bộ Cloud");
        } else {
          await saveToSupabase(DEFAULT_SITE_CONFIG, DEFAULT_PRODUCTS);
        }
      } catch (err) {
        const savedConfig = localStorage.getItem("chud_site_config");
        const savedProducts = localStorage.getItem("chud_products");
        if (savedConfig) setSiteConfig(JSON.parse(savedConfig));
        if (savedProducts) setProducts(JSON.parse(savedProducts));
        setCloudStatus("error");
        setStatusMsg("Chế độ Offline");
      }
    }
    loadStoreFromSupabase();
  }, []);

  // Phím tắt
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (isAdmin) setIsAdmin(false);
        else setIsPinModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  // 2. ĐỒNG BỘ SUPABASE
  const saveToSupabase = async (newConfig, newProducts) => {
    setSiteConfig(newConfig);
    setProducts(newProducts);
    localStorage.setItem("chud_site_config", JSON.stringify(newConfig));
    localStorage.setItem("chud_products", JSON.stringify(newProducts));

    try {
      setCloudStatus("saving");
      setStatusMsg("Đang lưu lên Cloud...");

      const res = await fetch(`${SUPABASE_URL}/rest/v1/store_data`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id: 1,
          site_config: newConfig,
          products: newProducts,
          updated_at: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error("Lỗi lưu Supabase");
      setCloudStatus("synced");
      setStatusMsg("Đã lưu lên Cloud thành công");
    } catch (err) {
      setCloudStatus("error");
      setStatusMsg("Đã lưu máy cục bộ");
    }
  };

  const handleEditText = (key, label) => {
    if (!isAdmin) return;
    const currentVal = siteConfig[key] || "";
    const newVal = window.prompt(`Chỉnh sửa [${label}]:`, currentVal);
    if (newVal !== null && newVal.trim() !== "") {
      const updated = { ...siteConfig, [key]: newVal.trim() };
      saveToSupabase(updated, products);
    }
  };

  // Mở Trang Chi Tiết Sản Phẩm
  const openProductDetail = (product) => {
    const defaultSize = cardSelections[product.id]?.size || product.sizes?.[0] || "FREE SIZE";
    const defaultColor = cardSelections[product.id]?.color || product.colors?.[0] || "Tiêu chuẩn";
    setActiveProduct(product);
    setDetailSize(defaultSize);
    setDetailColor(defaultColor);
    setDetailQty(1);
    setActiveImage(product.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Chọn Size / Màu trên từng thẻ sản phẩm (Không nhảy vào giỏ hàng ngay)
  const setCardSelection = (productId, field, value) => {
    setCardSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  // 3. QUẢN TRỊ SẢN PHẨM (ADMIN)
  const openAddProductModal = () => {
    const newProd = {
      id: Date.now(),
      name: "",
      brand: "New Era",
      category: "Nón",
      price: 950000,
      originalPrice: 1200000,
      tag: "NEW ARRIVAL",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
      gallery: [],
      colors: ["Đen", "Trắng"],
      sizes: ["FREE SIZE"],
      material: "100% Cotton chính hãng",
      fit: "Standard Streetwear Fit",
      description: "Sản phẩm chính hãng phân phối bởi ChuD Authentic."
    };
    setEditingProduct(newProd);
    setColorsInput("Đen, Trắng");
    setGalleryInput("");
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProduct({ ...prod });
    setColorsInput((prod.colors || ["Đen"]).join(", "));
    setGalleryInput((prod.gallery || []).join("\n"));
    setIsProductModalOpen(true);
  };

  const handleSaveProductForm = (e) => {
    e.preventDefault();
    if (!editingProduct.name.trim()) return;

    const parsedColors = colorsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const parsedGallery = galleryInput
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const finalProd = {
      ...editingProduct,
      colors: parsedColors.length > 0 ? parsedColors : ["Tiêu chuẩn"],
      gallery: parsedGallery.length > 0 ? parsedGallery : [editingProduct.image]
    };

    const exists = products.some((p) => p.id === finalProd.id);
    const updatedProducts = exists
      ? products.map((p) => (p.id === finalProd.id ? finalProd : p))
      : [finalProd, ...products];

    saveToSupabase(siteConfig, updatedProducts);
    if (activeProduct && activeProduct.id === finalProd.id) {
      setActiveProduct(finalProd);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi cửa hàng?")) return;
    const updatedProducts = products.filter((p) => p.id !== id);
    saveToSupabase(siteConfig, updatedProducts);
    if (activeProduct && activeProduct.id === id) setActiveProduct(null);
  };

  const handleDuplicateProduct = (prod) => {
    const duplicated = {
      ...prod,
      id: Date.now(),
      name: `${prod.name} (Bản sao)`
    };
    saveToSupabase(siteConfig, [duplicated, ...products]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingProduct((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // 4. BỘ LỌC & GIỎ HÀNG
  const categories = useMemo(() => ["Tất cả", ...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => ["Tất cả", ...new Set(products.map((p) => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCat = selectedCategory === "Tất cả" || p.category === selectedCategory;
        const matchBrand = selectedBrand === "Tất cả" || p.brand === selectedBrand;
        const matchSize = selectedSize === "Tất cả" || (p.sizes && p.sizes.includes(selectedSize));
        return matchQuery && matchCat && matchBrand && matchSize;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return b.id - a.id;
      });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedSize, sortBy]);

  const addToCart = (product, size, color, qty = 1, openDrawer = true) => {
    const chosenSize = size || product.sizes?.[0] || "FREE SIZE";
    const chosenColor = color || product.colors?.[0] || "Tiêu chuẩn";
    const itemKey = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.itemKey === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.itemKey === itemKey ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          itemKey,
          size: chosenSize,
          color: chosenColor,
          qty
        }
      ];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      setAddedToast(`Đã thêm ${product.name} (${chosenColor} - Size ${chosenSize})`);
      setTimeout(() => setAddedToast(""), 3000);
    }
  };

  const updateCartQty = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.itemKey === itemKey ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "CHUDVIP") {
      setDiscountPercent(10);
    } else if (code === "BLACKFRIDAY") {
      setDiscountPercent(15);
    } else {
      setDiscountPercent(0);
      alert("Mã giảm giá không hợp lệ. Hãy thử CHUDVIP (giảm 10%).");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const recommendedClothingSize = useMemo(() => {
    if (userHeight < 165 && userWeight < 58) return "S";
    if (userHeight < 174 && userWeight < 70) return "M";
    if (userHeight < 182 && userWeight < 82) return "L";
    return "XL";
  }, [userHeight, userWeight]);

  const recommendedNewEraSize = useMemo(() => {
    if (headCircumference <= 55.8) return "7 (55.8 cm)";
    if (headCircumference <= 56.8) return "7 1/8 (56.8 cm)";
    if (headCircumference <= 57.7) return "7 1/4 (57.7 cm)";
    if (headCircumference <= 58.7) return "7 3/8 (58.7 cm)";
    return "7 1/2 (59.6 cm)";
  }, [headCircumference]);

  const formatVND = (num) => Number(num || 0).toLocaleString("vi-VN") + "đ";

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setIsPinModalOpen(false);
      setPinInput("");
      setPinError("");
    } else {
      setPinError("Mã PIN không chính xác.");
    }
  };

  const handleCheckoutZalo = () => {
    const orderLines = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} [Màu: ${item.color} | Size: ${item.size}] x${item.qty} = ${formatVND(
            item.price * item.qty
          )}`
      )
      .join("\n");
    const message = `ĐƠN HÀNG MỚI TẠI CHUD AUTHENTIC:\n${orderLines}\n----------------\nTổng thanh toán: ${formatVND(finalTotal)}`;
    navigator.clipboard?.writeText(message);
    window.open(`https://zalo.me/${siteConfig.hotline.replace(/[^0-9]/g, "")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* THÔNG BÁO KHI THÊM GIỎ HÀNG */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {addedToast}
        </div>
      )}

      {/* THANH CÔNG CỤ ADMIN CLOUD */}
      {isAdmin && (
        <div className="sticky top-0 z-50 bg-black text-white border-b border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white text-black font-bold px-2.5 py-1 uppercase tracking-wider">
              <Unlock className="w-3.5 h-3.5" /> ADMIN CLOUD MODE
            </span>
            <span className="inline-flex items-center gap-1.5 text-zinc-300">
              {cloudStatus === "synced" && <Cloud className="w-4 h-4 text-emerald-400" />}
              {cloudStatus === "saving" && <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />}
              {cloudStatus === "error" && <CloudOff className="w-4 h-4 text-rose-400" />}
              {statusMsg}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openAddProductModal}
              className="bg-white text-black px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-zinc-200 transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm Sản Phẩm Mới
            </button>
            <button
              onClick={() => saveToSupabase(siteConfig, products)}
              className="border border-zinc-600 px-3 py-1.5 font-medium hover:border-white transition"
            >
              Đồng bộ ngay
            </button>
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-zinc-800 text-zinc-300 px-3 py-1.5 hover:bg-zinc-700 transition"
            >
              Thoát Admin
            </button>
          </div>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div
        onClick={() => handleEditText("topBanner", "Thanh thông báo đầu trang")}
        className={`bg-black text-white text-[11px] font-medium tracking-[0.18em] uppercase py-2.5 px-4 text-center ${
          isAdmin ? "cursor-pointer hover:bg-zinc-900 border-b border-dashed border-zinc-500" : ""
        }`}
      >
        {siteConfig.topBanner}
        {isAdmin && <span className="ml-2 text-amber-400 underline">[Bấm để sửa chữ]</span>}
      </div>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div
              onClick={() => {
                if (isAdmin) handleEditText("brandName", "Tên thương hiệu");
                else setActiveProduct(null);
              }}
              className={`text-2xl sm:text-3xl font-black tracking-tighter uppercase cursor-pointer ${
                isAdmin ? "border border-dashed border-black px-2" : ""
              }`}
            >
              {siteConfig.brandName}
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveProduct(null);
                  }}
                  className={`py-1 transition border-b-2 ${
                    selectedCategory === cat && !activeProduct
                      ? "border-black text-black"
                      : "border-transparent text-zinc-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-3 bg-zinc-100 hover:bg-zinc-200 transition px-3.5 py-2 text-xs text-zinc-600 w-44 sm:w-64 justify-between border border-zinc-200"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-black shrink-0" />
                {searchQuery || "Tìm New Era, MLB, Size..."}
              </span>
              <kbd className="hidden sm:inline-block bg-white px-1.5 py-0.5 text-[10px] font-mono border border-zinc-300">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:flex items-center gap-1.5 border border-black px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
            >
              <Ruler className="w-3.5 h-3.5" /> Bảng Size
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-black text-white p-2.5 hover:bg-zinc-800 transition flex items-center gap-2 px-3.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* MÀN HÌNH 1: TRANG CHI TIẾT SẢN PHẨM RIÊNG BIỆT (KHI CLICK VÀO SP) */}
      {/* ================================================================= */}
      {activeProduct ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Thanh điều hướng quay lại */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
            <button
              onClick={() => setActiveProduct(null)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại kệ hàng
            </button>

            <div className="text-xs text-zinc-400 uppercase tracking-wider hidden sm:block">
              Trang chủ / {activeProduct.category} / <span className="text-black font-bold">{activeProduct.name}</span>
            </div>

            {isAdmin && (
              <button
                onClick={() => openEditProductModal(activeProduct)}
                className="bg-black text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Sửa sản phẩm này
              </button>
            )}
          </div>

          {/* Nội dung chính của sản phẩm */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cột trái: Bộ ảnh sản phẩm (Gallery) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[4/5] bg-zinc-100 border border-zinc-200 overflow-hidden relative">
                {activeProduct.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-black uppercase tracking-widest px-3 py-1.5">
                    {activeProduct.tag}
                  </span>
                )}
                <img
                  src={activeImage || activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Danh sách ảnh góc khác (Thumbnails) */}
              {((activeProduct.gallery && activeProduct.gallery.length > 0) || activeProduct.image) && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[activeProduct.image, ...(activeProduct.gallery || [])]
                    .filter((v, i, a) => v && a.indexOf(v) === i)
                    .map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-20 h-24 border-2 shrink-0 overflow-hidden transition ${
                          (activeImage || activeProduct.image) === imgUrl
                            ? "border-black"
                            : "border-zinc-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Cột phải: Thông tin chi tiết, Chọn Màu, Chọn Size, Đặt hàng */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400">
                  <span>{activeProduct.brand}</span>
                  <span>•</span>
                  <span>{activeProduct.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2 leading-tight">
                  {activeProduct.name}
                </h1>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl sm:text-3xl font-black">{formatVND(activeProduct.price)}</span>
                  {activeProduct.originalPrice > activeProduct.price && (
                    <>
                      <span className="text-sm text-zinc-400 line-through">
                        {formatVND(activeProduct.originalPrice)}
                      </span>
                      <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 uppercase">
                        Tiết kiệm {formatVND(activeProduct.originalPrice - activeProduct.price)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed border-t border-b border-zinc-200 py-4">
                {activeProduct.description || "Sản phẩm chính hãng phân phối bởi ChuD Authentic."}
              </p>

              {/* Bước 1: Chọn Màu sắc */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="font-bold text-zinc-500">1. Chọn Màu Sắc:</span>
                  <span className="font-black text-black">{detailColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(activeProduct.colors && activeProduct.colors.length > 0
                    ? activeProduct.colors
                    : ["Tiêu chuẩn"]
                  ).map((color) => (
                    <button
                      key={color}
                      onClick={() => setDetailColor(color)}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition ${
                        detailColor === color
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-zinc-300 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bước 2: Chọn Kích cỡ (Size) */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span>
                    <span className="font-bold text-zinc-500">2. Chọn Kích Cỡ (Size): </span>
                    <strong className="text-black">{detailSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="underline font-bold flex items-center gap-1 hover:text-zinc-600"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Bảng quy đổi size
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(activeProduct.sizes || ["FREE SIZE"]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setDetailSize(sz)}
                      className={`min-w-[52px] px-4 py-2.5 text-xs font-black uppercase tracking-wider border transition ${
                        detailSize === sz
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-zinc-300 hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bước 3: Chọn Số lượng & Nút Thêm vào giỏ */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-black">
                    <button
                      onClick={() => setDetailQty((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-3 hover:bg-zinc-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm font-black">{detailQty}</span>
                    <button
                      onClick={() => setDetailQty((q) => q + 1)}
                      className="px-3.5 py-3 hover:bg-zinc-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      addToCart(activeProduct, detailSize, detailColor, detailQty, true)
                    }
                    className="flex-1 bg-black text-white py-3.5 px-6 text-xs font-black uppercase tracking-[0.18em] hover:bg-zinc-800 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Thêm Vào Giỏ Hàng
                  </button>
                </div>
              </div>

              {/* Thông số kỹ thuật chi tiết */}
              <div className="bg-zinc-50 border border-zinc-200 p-5 space-y-3 text-xs mt-6">
                <div className="font-black uppercase tracking-widest text-black border-b border-zinc-200 pb-2">
                  Thông tin & Đặc điểm sản phẩm
                </div>
                <div className="grid grid-cols-3 py-1 border-b border-zinc-100">
                  <span className="text-zinc-500 font-medium">Thương hiệu:</span>
                  <span className="col-span-2 font-bold">{activeProduct.brand} (100% Authentic)</span>
                </div>
                <div className="grid grid-cols-3 py-1 border-b border-zinc-100">
                  <span className="text-zinc-500 font-medium">Chất liệu:</span>
                  <span className="col-span-2 font-bold">
                    {activeProduct.material || "Cotton / Polyester cao cấp chính hãng"}
                  </span>
                </div>
                <div className="grid grid-cols-3 py-1 border-b border-zinc-100">
                  <span className="text-zinc-500 font-medium">Form dáng:</span>
                  <span className="col-span-2 font-bold">
                    {activeProduct.fit || "Chuẩn form Streetwear"}
                  </span>
                </div>
                <div className="grid grid-cols-3 py-1">
                  <span className="text-zinc-500 font-medium">Chính sách:</span>
                  <span className="col-span-2 font-bold">
                    Hỗ trợ đổi size trong 7 ngày, cam kết chính hãng trọn đời
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sản phẩm gợi ý cùng kệ hàng */}
          <div className="mt-16 pt-10 border-t border-zinc-200">
            <h3 className="text-lg font-black uppercase tracking-wider mb-6">
              Sản Phẩm Khác Bạn Có Thể Thích
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== activeProduct.id)
                .slice(0, 4)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openProductDetail(item)}
                    className="group border border-zinc-200 hover:border-black cursor-pointer transition bg-white"
                  >
                    <div className="aspect-[4/5] bg-zinc-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-3.5">
                      <div className="text-[10px] font-bold uppercase text-zinc-400">{item.brand}</div>
                      <div className="text-xs font-bold line-clamp-1 mt-0.5">{item.name}</div>
                      <div className="text-sm font-black mt-1.5">{formatVND(item.price)}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      ) : (
        /* ================================================================= */
        /* MÀN HÌNH 2: TRANG CHỦ & KỆ HÀNG (CHỌN SIZE TRƯỚC RỒI MỚI BẤM THÊM) */
        /* ================================================================= */
        <>
          {/* HERO BANNER */}
          <section className="relative bg-black text-white overflow-hidden border-b border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div
                  onClick={() => handleEditText("heroTag", "Nhãn bộ sưu tập")}
                  className={`inline-block border border-white/30 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-white ${
                    isAdmin ? "cursor-pointer hover:border-amber-400" : ""
                  }`}
                >
                  {siteConfig.heroTag}
                </div>

                <h1
                  onClick={() => handleEditText("heroTitle", "Tiêu đề lớn Hero")}
                  style={{ color: "#ffffff" }}
                  className={`text-4xl sm:text-6xl font-black tracking-tight uppercase leading-[1.05] text-white ${
                    isAdmin ? "cursor-pointer border border-dashed border-zinc-500 p-2" : ""
                  }`}
                >
                  {siteConfig.heroTitle}
                </h1>

                <p
                  onClick={() => handleEditText("heroSubtitle", "Mô tả phụ Hero")}
                  className={`text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed ${
                    isAdmin ? "cursor-pointer border border-dashed border-zinc-600 p-2" : ""
                  }`}
                >
                  {siteConfig.heroSubtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#catalog"
                    className="bg-white text-black px-7 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition inline-flex items-center gap-2"
                  >
                    {siteConfig.heroCta} <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="border border-white/40 text-white px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition"
                  >
                    Đo Size Nón & Áo
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 aspect-[4/5] overflow-hidden border border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
                    alt="New Era NY"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="bg-zinc-900 aspect-[4/5] overflow-hidden border border-zinc-800 translate-y-6">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                    alt="Streetwear Tee"
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FILTER & CATALOG */}
          <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-zinc-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Thương hiệu:
                </span>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition ${
                      selectedBrand === b
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-zinc-300 hover:border-black"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border border-zinc-300 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-white focus:outline-none focus:border-black"
                >
                  <option value="Tất cả">Tất cả Size</option>
                  {ALL_SIZE_OPTIONS.map((sz) => (
                    <option key={sz} value={sz}>
                      Size: {sz}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-zinc-300 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-white focus:outline-none focus:border-black"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              {isAdmin && (
                <button
                  onClick={openAddProductModal}
                  className="border-2 border-dashed border-black flex flex-col items-center justify-center min-h-[440px] p-6 hover:bg-zinc-50 transition group"
                >
                  <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Plus className="w-7 h-7" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-sm">
                    + Thêm Sản Phẩm Mới
                  </span>
                  <span className="text-xs text-zinc-500 mt-1">
                    Tự động lưu thẳng lên Supabase Cloud
                  </span>
                </button>
              )}

              {filteredProducts.map((product) => {
                const chosenSize =
                  cardSelections[product.id]?.size || product.sizes?.[0] || "FREE SIZE";
                const chosenColor =
                  cardSelections[product.id]?.color || product.colors?.[0] || "Tiêu chuẩn";

                return (
                  <div
                    key={product.id}
                    className="group border border-zinc-200 hover:border-black transition flex flex-col justify-between bg-white relative"
                  >
                    {isAdmin && (
                      <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/90 text-white p-1">
                        <button
                          onClick={() => openEditProductModal(product)}
                          className="px-2 py-1 text-[11px] font-bold hover:bg-zinc-700 flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Sửa
                        </button>
                        <button
                          onClick={() => handleDuplicateProduct(product)}
                          className="px-2 py-1 text-[11px] hover:bg-zinc-700"
                          title="Nhân bản"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-2 py-1 text-[11px] text-rose-400 hover:bg-zinc-700"
                          title="Xóa"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div>
                      {/* Bấm vào ảnh -> Mở màn hình Chi tiết sản phẩm */}
                      <div
                        onClick={() => openProductDetail(product)}
                        className="relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer"
                      >
                        {product.tag && (
                          <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                            {product.tag}
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/75 text-white text-[11px] font-bold uppercase tracking-widest py-2 text-center opacity-0 group-hover:opacity-100 transition">
                          Xem chi tiết sản phẩm →
                        </div>
                      </div>

                      <div className="p-5 pb-3">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                          <span>{product.brand}</span>
                          <span>{product.category}</span>
                        </div>
                        <h3
                          onClick={() => openProductDetail(product)}
                          className="font-bold text-base leading-snug cursor-pointer hover:underline line-clamp-2 min-h-[2.75rem]"
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2.5 mt-2">
                          <span className="text-lg font-black">{formatVND(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-zinc-400 line-through">
                              {formatVND(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Khu vực Chọn Màu & Chọn Size trước khi bấm Thêm vào giỏ */}
                    <div className="px-5 pb-5 pt-3 border-t border-zinc-100 space-y-3">
                      {/* Chọn Màu (nếu có) */}
                      {product.colors && product.colors.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">
                            Màu: <span className="text-black">{chosenColor}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {product.colors.map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setCardSelection(product.id, "color", c)}
                                className={`text-[11px] font-bold px-2.5 py-1 border transition ${
                                  chosenColor === c
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-zinc-700 border-zinc-300 hover:border-black"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chọn Size (Chỉ chọn, không tự nhảy vào giỏ) */}
                      <div>
                        <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">
                          Size đang chọn: <span className="text-black">{chosenSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(product.sizes || ["FREE SIZE"]).map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => setCardSelection(product.id, "size", sz)}
                              className={`text-[11px] font-bold px-2.5 py-1 border transition ${
                                chosenSize === sz
                                  ? "bg-black text-white border-black"
                                  : "bg-white text-zinc-700 border-zinc-300 hover:border-black"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 2 nút hành động rõ ràng */}
                      <div className="grid grid-cols-5 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => openProductDetail(product)}
                          className="col-span-2 border border-black text-black py-2.5 text-[11px] font-black uppercase tracking-wider hover:bg-zinc-100 transition"
                        >
                          Chi Tiết
                        </button>
                        <button
                          type="button"
                          onClick={() => addToCart(product, chosenSize, chosenColor, 1, true)}
                          className="col-span-3 bg-black text-white py-2.5 text-[11px] font-black uppercase tracking-wider hover:bg-zinc-800 transition"
                        >
                          + Thêm Giỏ Hàng
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* CAM KẾT CHÍNH HÃNG CHUD AUTHENTIC */}
      <section className="border-t border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">100% Authentic Legit</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Cam kết chính hãng trọn đời cho mọi sản phẩm New Era, MLB, Essentials tại ChuD Authentic.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Truck className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">Giao Hàng Hỏa Tốc</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Ship nội thành TP.HCM trong 2 giờ. Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000đ.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RefreshCw className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">Hỗ Trợ Đổi Size</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Hỗ trợ đổi size nhanh chóng trong vòng 7 ngày nếu khách hàng đội hoặc mặc chưa vừa form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-black tracking-tighter uppercase">{siteConfig.brandName}</h3>
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              Chuyên phân phối nón New Era (NY Yankees, LA Dodgers), quần áo MLB & Fear of God Essentials chính hãng.
            </p>
          </div>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="font-black uppercase tracking-widest text-white mb-3">Liên Hệ</div>
            <p
              onClick={() => handleEditText("hotline", "Số Hotline")}
              className={`flex items-center gap-2 ${isAdmin ? "cursor-pointer text-amber-300" : ""}`}
            >
              <Phone className="w-3.5 h-3.5" /> Hotline / Zalo: {siteConfig.hotline}
            </p>
            <p
              onClick={() => handleEditText("email", "Địa chỉ Email")}
              className={`flex items-center gap-2 ${isAdmin ? "cursor-pointer text-amber-300" : ""}`}
            >
              <Mail className="w-3.5 h-3.5" /> Email: {siteConfig.email}
            </p>
            <p
              onClick={() => handleEditText("domain", "Tên miền Website")}
              className={`flex items-center gap-2 ${isAdmin ? "cursor-pointer text-amber-300" : ""}`}
            >
              <Globe className="w-3.5 h-3.5" /> Website: {siteConfig.domain}
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="text-xs text-zinc-400">
              Nhập mã <span className="text-white font-bold">CHUDVIP</span> ở giỏ hàng để giảm ngay 10% cho đơn hàng đầu tiên.
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-zinc-800 text-[11px] text-zinc-500">
              <span>© 2026 {siteConfig.brandName}. All rights reserved.</span>
              <button
                onClick={() => (isAdmin ? setIsAdmin(false) : setIsPinModalOpen(true))}
                className="text-zinc-600 hover:text-white transition p-1"
                title="Quản trị viên (Ctrl + Shift + A)"
              >
                {isAdmin ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL ĐĂNG NHẬP PIN ADMIN */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form
            onSubmit={handleVerifyPin}
            className="bg-white text-black max-w-sm w-full p-6 border-2 border-black space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" /> Mở Khóa Quản Trị ChuD
              </h3>
              <button type="button" onClick={() => setIsPinModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Nhập mã PIN..."
              autoFocus
              className="w-full border border-black px-3 py-2.5 text-sm font-mono focus:outline-none"
            />
            {pinError && <p className="text-xs text-rose-600 font-bold">{pinError}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-800"
            >
              Xác Nhận Mở Admin
            </button>
          </form>
        </div>
      )}

      {/* MODAL THÊM / SỬA SẢN PHẨM CHI TIẾT (ADMIN) */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveProductForm}
            className="bg-white text-black max-w-xl w-full p-6 border-2 border-black space-y-4 my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm">
                Chỉnh Sửa Chi Tiết Sản Phẩm (Đồng Bộ Supabase)
              </h3>
              <button type="button" onClick={() => setIsProductModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase block mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase block mb-1">Thương hiệu</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase block mb-1">Danh mục</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase block mb-1">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border border-zinc-300 px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase block mb-1">Giá gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })
                    }
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">
                  Các màu sắc (Cách nhau bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  placeholder="Ví dụ: Đen, Trắng, Kem..."
                  className="w-full border border-zinc-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">Chọn các Size hiện có</label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SIZE_OPTIONS.map((sz) => {
                    const active = editingProduct.sizes?.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => {
                          const cur = editingProduct.sizes || [];
                          const next = active ? cur.filter((s) => s !== sz) : [...cur, sz];
                          setEditingProduct({ ...editingProduct, sizes: next });
                        }}
                        className={`px-2.5 py-1 border font-bold ${
                          active ? "bg-black text-white border-black" : "bg-white text-black border-zinc-300"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase block mb-1">Chất liệu (Hiển thị ở trang chi tiết)</label>
                  <input
                    type="text"
                    value={editingProduct.material || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    placeholder="VD: 100% Cotton 250gsm"
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase block mb-1">Form dáng (Fit)</label>
                  <input
                    type="text"
                    value={editingProduct.fit || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fit: e.target.value })}
                    placeholder="VD: Oversized Fit"
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">Ảnh đại diện chính</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2 mb-1.5"
                />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs" />
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">
                  Các link ảnh phụ ở trang chi tiết (Mỗi dòng 1 link ảnh)
                </label>
                <textarea
                  rows={2}
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="Dán thêm các link ảnh góc chụp khác (mỗi dòng 1 link)..."
                  className="w-full border border-zinc-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">Bài viết mô tả chi tiết sản phẩm</label>
                <textarea
                  rows={4}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2.5 border border-zinc-300 text-xs font-bold uppercase"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white text-xs font-black uppercase tracking-wider"
              >
                Lưu Lên Cloud
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TÌM KIẾM NHANH */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center pt-20 p-4">
          <div className="bg-white w-full max-w-xl border-2 border-black p-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-zinc-200 pb-3">
              <Search className="w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveProduct(null);
                }}
                placeholder="Gõ tên sản phẩm: New Era, NY Yankees, MLB, Hoodie..."
                autoFocus
                className="w-full text-sm focus:outline-none"
              />
              <button onClick={() => setIsSearchModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BẢNG SIZE */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-xl w-full p-6 border-2 border-black space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Bảng Quy Đổi Size ChuD Authentic
              </h3>
              <button onClick={() => setIsSizeGuideOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-zinc-100 p-4 space-y-3">
                <div className="font-black uppercase">1. Gợi ý Size Quần Áo (MLB / Essentials)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Chiều cao: <b>{userHeight} cm</b></label>
                    <input
                      type="range"
                      min="150"
                      max="195"
                      value={userHeight}
                      onChange={(e) => setUserHeight(Number(e.target.value))}
                      className="w-full accent-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Cân nặng: <b>{userWeight} kg</b></label>
                    <input
                      type="range"
                      min="45"
                      max="105"
                      value={userWeight}
                      onChange={(e) => setUserWeight(Number(e.target.value))}
                      className="w-full accent-black"
                    />
                  </div>
                </div>
                <div className="bg-black text-white p-2.5 text-center font-bold">
                  Size Áo / Quần phù hợp với bạn: <span className="text-amber-300 text-sm">{recommendedClothingSize}</span>
                </div>
              </div>

              <div className="bg-zinc-100 p-4 space-y-3">
                <div className="font-black uppercase">2. Đo Vòng Đầu Nón New Era 59FIFTY Fitted</div>
                <div>
                  <label className="block mb-1">Chu vi vòng đầu: <b>{headCircumference} cm</b></label>
                  <input
                    type="range"
                    min="54.9"
                    max="60.6"
                    step="0.1"
                    value={headCircumference}
                    onChange={(e) => setHeadCircumference(Number(e.target.value))}
                    className="w-full accent-black"
                  />
                </div>
                <div className="bg-black text-white p-2.5 text-center font-bold">
                  Size Nón New Era chuẩn: <span className="text-amber-300 text-sm">{recommendedNewEraSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GIỎ HÀNG (SLIDE-OVER DRAWER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Giỏ Hàng ({cart.reduce((s, i) => s + i.qty, 0)})
              </h3>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-12">Giỏ hàng của bạn đang trống.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.itemKey} className="flex gap-3 border-b border-zinc-100 pb-3">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-zinc-100" />
                    <div className="flex-1 text-xs">
                      <div className="font-bold line-clamp-1">{item.name}</div>
                      <div className="text-zinc-500 mt-0.5">
                        Màu: <b>{item.color}</b> | Size: <b>{item.size}</b>
                      </div>
                      <div className="font-black mt-1">{formatVND(item.price)}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartQty(item.itemKey, -1)}
                          className="border border-zinc-300 p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.itemKey, 1)}
                          className="border border-zinc-300 p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-200 pt-4 space-y-3 text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Mã giảm giá (VD: CHUDVIP)"
                    className="flex-1 border border-zinc-300 px-3 py-2 uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-zinc-900 text-white px-4 font-bold uppercase"
                  >
                    Áp dụng
                  </button>
                </div>

                <div className="flex justify-between text-sm font-black pt-2">
                  <span>TỔNG CỘNG:</span>
                  <span>{formatVND(finalTotal)}</span>
                </div>

                <button
                  onClick={handleCheckoutZalo}
                  className="w-full bg-black text-white py-3.5 font-black uppercase tracking-widest hover:bg-zinc-800 transition"
                >
                  Chốt Đơn Nhanh Qua Zalo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

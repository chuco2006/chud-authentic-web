import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, ShoppingBag, X, Plus, Minus, Trash2, Edit3, Check,
  SlidersHorizontal, Ruler, ShieldCheck, Truck, RefreshCw,
  Lock, Unlock, Cloud, CloudOff, Copy, Sparkles, ArrowRight,
  ChevronRight, Phone, Mail, Globe, CheckCircle2, ArrowLeft,
  CreditCard, QrCode, Package, MapPin, User, FileText, Building2, FileSpreadsheet
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
  heroSubtitle: "Tuyển tập Stussy, MLB, Adidas, Nike, Essentials chính hãng. Phong cách tối giản, form dáng chuẩn streetwear.",
  heroCta: "KHÁM PHÁ KỆ HÀNG",
  hotline: "+84 356 926 605",
  email: "chucospktk24@gmail.com",
  domain: "chudauthentic.store",
  address: "TP. Hồ Chí Minh, Việt Nam",
  // Tài khoản Hộ kinh doanh MBBank & SePay
  bankId: "MB",
  bankAccountNo: "20069696969696",
  bankAccountName: "HO KINH DOANH CHUD",
  sepayApiToken: "2XUGLIKPNDP8EXLMHSWSEI11LYCYG5QQQ9UKGW9FOVYL7MOPEWCNMJ46HSNS53PZ",
  // Cấu hình đồng bộ tự động Google Sheets
  sheetUrl: "https://docs.google.com/spreadsheets/d/1ckYtsDySTIMYgWy-QEJ-bMyN-QcEkPIfN49Iu-9_Ptw/edit",
  sheetGids: "1599511117, 118702566, 1380208994, 1458127387, 447218553",
  // Danh sách banner trượt trang chủ
  banners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
      tag: "COLLECTION 2026",
      title: "STREETWEAR AUTHENTIC CHUẨN MỰC",
      subtitle: "Tuyển tập Stussy, MLB, Adidas, Essentials chính hãng.",
      ctaText: "KHÁM PHÁ KỆ HÀNG",
      ctaLink: "#catalog",
      showCta: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1600&q=80",
      tag: "HOT DROP",
      title: "BỘ SƯU TẬP DÉP SLIDE CHÍNH HÃNG",
      subtitle: "Đệm êm kháng trượt, form dáng tối giản năng động.",
      ctaText: "KHÁM PHÁ SẢN PHẨM",
      ctaLink: "#catalog",
      showCta: true
    }
  ],
  // Dữ liệu Lookbook phối đồ trang chủ
  lookbooks: [
    {
      id: 1,
      lookNumber: "LOOK 01",
      theme: "STUSSY MONOCHROME",
      tagline: "Bộ phối đường phố tông đen trắng tối giản",
      modelImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      productIds: [1, 2]
    },
    {
      id: 2,
      lookNumber: "LOOK 02",
      theme: "URBAN RUNWAY",
      tagline: "Form dáng phóng khoáng, năng động",
      modelImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      productIds: [3, 4]
    }
  ],
  orders: []
};

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    sku: "1904894",
    name: "Stussy Basic Logo Oversized Tee",
    brand: "Stussy",
    category: "Áo",
    price: 1350000,
    originalPrice: 1590000,
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen", "Trắng"],
    sizes: ["M", "L", "XL"],
    material: "100% Cotton cao cấp chính hãng",
    fit: "Oversized Streetwear Fit",
    description: "Áo thun Stussy chính hãng nguyên tem tag, tự động cập nhật tồn kho size theo mã sản phẩm."
  },
  {
    id: 2,
    sku: "",
    name: "Adidas Adilette Comfort / Yeezy Slide Authentic",
    brand: "Adidas",
    category: "Dép",
    price: 950000,
    originalPrice: 1250000,
    tag: "HOT DROP",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen (Onyx)", "Kem (Bone)"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    material: "EVA Foam đúc nguyên khối siêu êm",
    fit: "Form chuẩn (Chân bè tăng 1 size)",
    description: "Dép chính hãng nguyên hộp, đệm êm chống trượt, phù hợp mang hàng ngày."
  },
  {
    id: 3,
    sku: "",
    name: "MLB NY Yankees Monogram Oversized Tee",
    brand: "MLB",
    category: "Áo",
    price: 1450000,
    originalPrice: 1690000,
    tag: "AUTHENTIC",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen", "Trắng"],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Cotton 250gsm dày dặn",
    fit: "Oversized Fit",
    description: "Áo thun MLB chính hãng nguyên tag, hỗ trợ check HiddenTag."
  },
  {
    id: 4,
    sku: "",
    name: "Fear of God Essentials Boxy Tee",
    brand: "Essentials",
    category: "Áo",
    price: 1550000,
    originalPrice: 1850000,
    tag: "LIMITED",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80"
    ],
    colors: ["Đen (Stretch Limo)", "Trắng Kem (Light Oatmeal)"],
    sizes: ["S", "M", "L", "XL"],
    material: "Heavyweight Jersey Cotton 100%",
    fit: "Boxy Oversized",
    description: "Áo thun Essentials form boxy đặc trưng, đi kèm túi zip dustbag chính hãng."
  },
  {
    id: 5,
    sku: "",
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
    description: "Áo khoác nỉ Hoodie MLB LA Dodgers với phần mũ 2 lớp to bản đứng dáng."
  },
  {
    id: 6,
    sku: "",
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
    fit: "Above-Knee Relaxed",
    description: "Quần short nỉ Essentials dây rút dài đặc trưng cùng logo phản quang."
  }
];

// Bao gồm đầy đủ Size Áo/Quần và Size Dép (36 -> 44)
const ALL_SIZE_OPTIONS = [
  "S", "M", "L", "XL", "XXL", "FREE SIZE",
  "36", "37", "38", "39", "40", "41", "42", "43", "44"
];

const POPULAR_BANKS = [
  { code: "MB", name: "MBBank (Quân Đội)" },
  { code: "VCB", name: "Vietcombank" },
  { code: "TCB", name: "Techcombank" },
  { code: "ACB", name: "ACB (Á Châu)" },
  { code: "ICB", name: "VietinBank" },
  { code: "BIDV", name: "BIDV" },
  { code: "VPB", name: "VPBank" },
  { code: "TPB", name: "TPBank" }
];

export default function App() {
  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  const [cloudStatus, setCloudStatus] = useState("loading");
  const [statusMsg, setStatusMsg] = useState("Đang tải dữ liệu...");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedSize, setSelectedSize] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [cardSelections, setCardSelections] = useState({});

  const [activeProduct, setActiveProduct] = useState(null);
  const [detailSize, setDetailSize] = useState("");
  const [detailColor, setDetailColor] = useState("");
  const [detailQty, setDetailQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [addedToast, setAddedToast] = useState("");

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [createdOrder, setCreatedOrder] = useState(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [userHeight, setUserHeight] = useState(172);
  const [userWeight, setUserWeight] = useState(65);
  const [footLength, setFootLength] = useState(25.5);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [colorsInput, setColorsInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);

  // Quản lý Slider Banner
  const [currentSlide, setCurrentSlide] = useState(0);
  // Quản lý Lookbook Showcase
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [addedLookItemId, setAddedLookItemId] = useState(null);

  const lookbookList = siteConfig.lookbooks && siteConfig.lookbooks.length > 0
    ? siteConfig.lookbooks
    : [];

  const activeLook = lookbookList[currentLookIndex] || lookbookList[0] || null;

  // Lấy các món đồ có sẵn trong kho hàng dựa trên ID đã gán vào Look
  const activeLookProducts = activeLook
    ? (activeLook.productIds || [])
        .map((pid) => products.find((p) => p.id === pid))
        .filter(Boolean)
    : [];

  const handleNextLook = () => {
    if (lookbookList.length <= 1) return;
    setCurrentLookIndex((prev) => (prev + 1) % lookbookList.length);
  };

  const handlePrevLook = () => {
    if (lookbookList.length <= 1) return;
    setCurrentLookIndex((prev) => (prev - 1 + lookbookList.length) % lookbookList.length);
  };
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  // Danh sách banner hiện hành
  const bannerList = siteConfig.banners && siteConfig.banners.length > 0
    ? siteConfig.banners
    : [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
          tag: siteConfig.heroTag || "COLLECTION 2026",
          title: siteConfig.heroTitle || "STREETWEAR AUTHENTIC",
          subtitle: siteConfig.heroSubtitle || "",
          ctaText: siteConfig.heroCta || "KHÁM PHÁ KỆ HÀNG",
          ctaLink: "#catalog",
          showCta: true
        }
      ];

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    if (bannerList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerList.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerList.length) % bannerList.length);
  };

  // 1. TẢI DỮ LIỆU TỪ SUPABASE & TỰ ĐỘNG ĐỒNG BỘ SIZE TỪ GOOGLE SHEETS
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
          const loadedCfg = {
            ...DEFAULT_SITE_CONFIG,
            ...(data[0].site_config || {}),
            bankId: data[0].site_config?.bankId || DEFAULT_SITE_CONFIG.bankId,
            bankAccountNo:
              data[0].site_config?.bankAccountNo && data[0].site_config?.bankAccountNo !== "0356926605"
                ? data[0].site_config.bankAccountNo
                : DEFAULT_SITE_CONFIG.bankAccountNo,
            bankAccountName:
              data[0].site_config?.bankAccountName && data[0].site_config?.bankAccountName !== "CHU DUNG CO"
                ? data[0].site_config.bankAccountName
                : DEFAULT_SITE_CONFIG.bankAccountName,
            sepayApiToken: data[0].site_config?.sepayApiToken || DEFAULT_SITE_CONFIG.sepayApiToken,
            sheetUrl: data[0].site_config?.sheetUrl || DEFAULT_SITE_CONFIG.sheetUrl,
            sheetGids: data[0].site_config?.sheetGids || DEFAULT_SITE_CONFIG.sheetGids
          };
          const loadedProds = data[0].products || DEFAULT_PRODUCTS;

          setSiteConfig(loadedCfg);
          setProducts(loadedProds);
          setCloudStatus("synced");
          setStatusMsg("Đã đồng bộ Cloud");

          syncInventoryFromSheet(loadedProds, loadedCfg, true);
        } else {
          await saveToSupabase(DEFAULT_SITE_CONFIG, DEFAULT_PRODUCTS);
        }
      } catch (err) {
        const savedConfig = localStorage.getItem("chud_site_config");
        const savedProducts = localStorage.getItem("chud_products");
        if (savedConfig) setSiteConfig({ ...DEFAULT_SITE_CONFIG, ...JSON.parse(savedConfig) });
        if (savedProducts) setProducts(JSON.parse(savedProducts));
        setCloudStatus("error");
        setStatusMsg("Chế độ Offline");
      }
    }
    loadStoreFromSupabase();
  }, []);

  // 2. HÀM ĐỒNG BỘ TỒN KHO TỪ GOOGLE SHEETS THEO MÃ SẢN PHẨM (SKU)
  const syncInventoryFromSheet = async (
    currentProducts = products,
    currentConfig = siteConfig,
    silent = false
  ) => {
    if (!currentConfig.sheetUrl) return;
    setIsSyncingSheet(true);
    try {
      if (!silent) setStatusMsg("Đang quét kho Google Sheets...");
      const gids = (currentConfig.sheetGids || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/sheet-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetUrl: currentConfig.sheetUrl,
          gids
        })
      });

      if (!res.ok) throw new Error("Không kết nối được API Sheet");
      const data = await res.json();
      const inv = data.inventory || {};

      let updatedCount = 0;
      const updatedProducts = currentProducts.map((prod) => {
        const sku = (prod.sku || "").toString().trim().toUpperCase();
        if (sku && inv[sku]) {
          const availableSizes = inv[sku].sizes.length > 0 ? inv[sku].sizes : ["HẾT HÀNG"];
          updatedCount++;
          return {
            ...prod,
            sizes: availableSizes,
            stockDetail: inv[sku].stock
          };
        }
        return prod;
      });

      if (updatedCount > 0) {
        await saveToSupabase(currentConfig, updatedProducts);
      }
      if (!silent) {
        alert(
          `Đồng bộ thành công! Đã quét ${data.totalSkusFound || 0} mã hàng trên Sheet và cập nhật size cho ${updatedCount} sản phẩm trên web.`
        );
      }
    } catch (err) {
      if (!silent) alert("Lỗi khi đồng bộ từ Google Sheet. Hãy đảm bảo đã tạo file api/sheet-sync.js.");
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // 3. TỰ ĐỘNG QUÉT GIAO DỊCH SEPAY MỖI 3 GIÂY
  useEffect(() => {
    if (
      !createdOrder ||
      createdOrder.paymentMethod !== "VIETQR" ||
      isPaidSuccess ||
      !siteConfig.sepayApiToken
    ) {
      return;
    }

    setIsCheckingPayment(true);
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/sepay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sepayToken: siteConfig.sepayApiToken.trim(),
            orderCode: createdOrder.orderCode,
            expectedAmount: createdOrder.totalAmount
          })
        });

        if (!res.ok) return;
        const result = await res.json();

        if (result?.paid) {
          clearInterval(interval);
          setIsPaidSuccess(true);
          setIsCheckingPayment(false);

          const updatedOrders = (siteConfig.orders || []).map((o) =>
            o.id === createdOrder.id ? { ...o, status: "Đã thanh toán (SePay Auto)" } : o
          );
          saveToSupabase({ ...siteConfig, orders: updatedOrders }, products);
        }
      } catch (_) {}
    }, 3000);

    return () => clearInterval(interval);
  }, [createdOrder, isPaidSuccess, siteConfig, products]);

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

  // 4. ĐỒNG BỘ SUPABASE CLOUD
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

  const setCardSelection = (productId, field, value) => {
    setCardSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  // 5. QUẢN TRỊ SẢN PHẨM (ADMIN)
  const openAddProductModal = () => {
    const newProd = {
      id: Date.now(),
      sku: "",
      name: "",
      brand: "Stussy",
      category: "Áo",
      price: 950000,
      originalPrice: 1200000,
      tag: "NEW ARRIVAL",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      gallery: [],
      colors: ["Đen", "Trắng"],
      sizes: ["S", "M", "L", "XL"],
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

  const handleSaveProductForm = async (e) => {
    e.preventDefault();
    if (!editingProduct.name.trim()) return;

    const parsedColors = colorsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
   const finalProd = {
    ...editingProduct,
    sku: (editingProduct.sku || "").trim().toUpperCase(),
    colors: parsedColors.length > 0 ? parsedColors : ["Tiêu chuẩn"],
    gallery:
      editingProduct.gallery && editingProduct.gallery.length > 0
        ? editingProduct.gallery
        : [editingProduct.image]
  };

    const exists = products.some((p) => p.id === finalProd.id);
    const updatedProducts = exists
      ? products.map((p) => (p.id === finalProd.id ? finalProd : p))
      : [finalProd, ...products];

    await saveToSupabase(siteConfig, updatedProducts);

    if (finalProd.sku) {
      syncInventoryFromSheet(updatedProducts, siteConfig, true);
    }

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

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setEditingProduct((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // 6. BỘ LỌC TỰ ĐỘNG THEO THƯƠNG HIỆU & DANH MỤC
  const categories = useMemo(() => ["Tất cả", ...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => ["Tất cả", ...new Set(products.map((p) => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));
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
    if (chosenSize === "HẾT HÀNG") {
      alert("Sản phẩm này hiện đang tạm hết size trên kho.");
      return;
    }
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
  const afterDiscount = subtotal - discountAmount;
  const shippingFee = afterDiscount >= 1000000 || afterDiscount === 0 ? 0 : 30000;
  const finalTotal = afterDiscount + shippingFee;

  const formatVND = (num) => Number(num || 0).toLocaleString("vi-VN") + "đ";

  // 7. XỬ LÝ ĐẶT HÀNG
  const buildZaloMessage = (orderObj) => {
    const itemsList = orderObj.items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} ${item.sku ? `[Mã: ${item.sku}] ` : ""}[Màu: ${item.color} | Size: ${item.size}] x${item.qty} = ${formatVND(
            item.price * item.qty
          )}`
      )
      .join("\n");

    const payLabel =
      orderObj.paymentMethod === "VIETQR"
        ? "Chuyển khoản ngân hàng (VietQR MBBank)"
        : orderObj.paymentMethod === "COD"
        ? "Thanh toán khi nhận hàng (COD)"
        : "Tư vấn qua Zalo";

    return [
      `ĐƠN HÀNG MỚI #${orderObj.orderCode} — CHUD AUTHENTIC`,
      `--------------------------------`,
      `Khách hàng: ${orderObj.customerName}`,
      `SĐT: ${orderObj.customerPhone}`,
      `Địa chỉ: ${orderObj.customerAddress}`,
      orderObj.customerNote ? `Ghi chú: ${orderObj.customerNote}` : null,
      `Phương thức: ${payLabel}`,
      `--------------------------------`,
      `DANH SÁCH SẢN PHẨM:`,
      itemsList,
      `--------------------------------`,
      `Tạm tính: ${formatVND(orderObj.subtotal)}`,
      orderObj.discountAmount > 0 ? `Giảm giá: -${formatVND(orderObj.discountAmount)}` : null,
      `Phí vận chuyển: ${orderObj.shippingFee === 0 ? "Miễn phí" : formatVND(orderObj.shippingFee)}`,
      `TỔNG THANH TOÁN: ${formatVND(orderObj.totalAmount)}`
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleQuickZaloFromCart = () => {
    const tempOrder = {
      orderCode: "ZALO" + String(Date.now()).slice(-4),
      customerName: customerName || "Khách đặt qua Zalo",
      customerPhone: customerPhone || "Chưa nhập",
      customerAddress: customerAddress || "Trao đổi qua Zalo",
      customerNote,
      paymentMethod: "ZALO",
      items: cart,
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount: finalTotal
    };
    const msg = buildZaloMessage(tempOrder);
    navigator.clipboard?.writeText(msg);
    window.open(`https://zalo.me/${siteConfig.hotline.replace(/[^0-9]/g, "")}`, "_blank");
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.");
      return;
    }

    setIsSubmittingOrder(true);
    setIsPaidSuccess(false);

    const orderCode = "CD" + String(Date.now()).slice(-5);

    const newOrder = {
      id: Date.now(),
      orderCode,
      createdAt: new Date().toLocaleString("vi-VN"),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      customerNote: customerNote.trim(),
      paymentMethod,
      status: paymentMethod === "VIETQR" ? "Chờ chuyển khoản" : "Mới đặt",
      items: cart.map((i) => ({
        id: i.id,
        sku: i.sku || "",
        name: i.name,
        size: i.size,
        color: i.color,
        price: i.price,
        qty: i.qty,
        image: i.image
      })),
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount: finalTotal
    };

    try {
      let latestConfig = { ...siteConfig };
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/store_data?id=eq.1&select=site_config`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (res.ok) {
          const rows = await res.json();
          if (rows?.[0]?.site_config) {
            latestConfig = { ...DEFAULT_SITE_CONFIG, ...rows[0].site_config };
          }
        }
      } catch (_) {}

      const updatedOrders = [newOrder, ...(latestConfig.orders || [])];
      const updatedConfig = { ...latestConfig, orders: updatedOrders };

      await saveToSupabase(updatedConfig, products);
      setCreatedOrder(newOrder);
      setCart([]);

    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const getVietQrUrl = (orderObj) => {
    const bankId = siteConfig.bankId || "MB";
    const accountNo = (siteConfig.bankAccountNo || "20069696969696").replace(/\s+/g, "");
    const accountName = encodeURIComponent(siteConfig.bankAccountName || "HO KINH DOANH CHUD");
    const amount = orderObj ? orderObj.totalAmount : finalTotal;
    const transferContent = orderObj
      ? `CHUD ${orderObj.orderCode}`
      : `CHUD ${customerPhone || "THANHTOAN"}`;

    return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
      transferContent
    )}&accountName=${accountName}`;
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = (siteConfig.orders || []).map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    saveToSupabase({ ...siteConfig, orders: updatedOrders }, products);
  };

  const handleDeleteOrder = (orderId) => {
    if (!window.confirm("Xóa đơn hàng này khỏi danh sách?")) return;
    const updatedOrders = (siteConfig.orders || []).filter((o) => o.id !== orderId);
    saveToSupabase({ ...siteConfig, orders: updatedOrders }, products);
  };

  const recommendedClothingSize = useMemo(() => {
    if (userHeight < 165 && userWeight < 58) return "S";
    if (userHeight < 174 && userWeight < 70) return "M";
    if (userHeight < 182 && userWeight < 82) return "L";
    return "XL";
  }, [userHeight, userWeight]);

  // Bảng tính kích thước dép theo chiều dài bàn chân
  const recommendedSlideSize = useMemo(() => {
    if (footLength <= 22.8) return "Size 36 (230mm / 4 UK)";
    if (footLength <= 23.5) return "Size 37 (235mm / 4.5 UK)";
    if (footLength <= 24.2) return "Size 38 (240mm / 5 UK)";
    if (footLength <= 24.8) return "Size 39 (250mm / 6 UK)";
    if (footLength <= 25.5) return "Size 40 - 40.5 (255mm / 7 UK)";
    if (footLength <= 26.2) return "Size 41 (260mm / 7.5 UK)";
    if (footLength <= 26.8) return "Size 42 (270mm / 8 UK)";
    if (footLength <= 27.5) return "Size 43 (275mm / 9 UK)";
    return "Size 44 (280mm / 10 UK)";
  }, [footLength]);

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

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={openAddProductModal}
              className="bg-white text-black px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-zinc-200 transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm Sản Phẩm
            </button>
            <button
              onClick={() => syncInventoryFromSheet(products, siteConfig, false)}
              disabled={isSyncingSheet}
              className="bg-emerald-600 text-white px-3 py-1.5 font-bold uppercase tracking-wider hover:bg-emerald-500 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheet ? "animate-spin" : ""}`} />
              Đồng Bộ Kho Sheet
            </button>
            <button
              onClick={() => setIsSheetModalOpen(true)}
              className="border border-zinc-600 px-3 py-1.5 font-bold uppercase tracking-wider hover:border-white transition flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Link Google Sheets
            </button>
            <button
              onClick={() => setIsOrdersModalOpen(true)}
              className="bg-amber-400 text-black px-3 py-1.5 font-black uppercase tracking-wider hover:bg-amber-300 transition flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" /> Đơn Hàng ({(siteConfig.orders || []).length})
            </button>
            <button
              onClick={() => setIsBankModalOpen(true)}
              className="border border-zinc-600 px-3 py-1.5 font-bold uppercase tracking-wider hover:border-white transition flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" /> Cấu Hình MBBank & SePay
            </button>
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-zinc-800 text-zinc-300 px-3 py-1.5 hover:bg-zinc-700 transition"
            >
              Thoát
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
              onClick={() => setActiveProduct(null)}
              className="cursor-pointer flex items-center py-2"
            >
              <img 
                src="/ChuDLogoXoaPhong.png" 
                alt="" 
                className="h-10 sm:h-12 w-auto object-contain" 
              />
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
                {searchQuery || "Tìm Stussy, Dép, Mã SP, Size..."}
              </span>
              <kbd className="hidden sm:inline-block bg-white px-1.5 py-0.5 text-[10px] font-mono border border-zinc-300">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:flex items-center gap-1.5 border border-black px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
            >
              <Ruler className="w-3.5 h-3.5" /> Bảng Size Áo & Dép
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
      {/* MÀN HÌNH 1: CHI TIẾT SẢN PHẨM HOẶC MÀN HÌNH 2: TRANG CHỦ & KỆ HÀNG */}
      {/* ================================================================= */}
      {activeProduct ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
            <button
              onClick={() => setActiveProduct(null)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại kệ hàng
            </button>

            <div className="text-xs text-zinc-400 uppercase tracking-wider hidden sm:block">
              Trang chủ / {activeProduct.brand} / <span className="text-black font-bold">{activeProduct.name}</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery ảnh */}
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

            {/* Chi tiết đặt hàng */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400">
                  <span>{activeProduct.brand}</span>
                  <span>•</span>
                  <span>{activeProduct.category}</span>
                  {activeProduct.sku && (
                    <span className="bg-zinc-100 text-black px-2 py-0.5 rounded font-mono">
                      Mã: {activeProduct.sku}
                    </span>
                  )}
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

              {/* 1. Chọn Màu */}
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

              {/* 2. Chọn Size (Tự động cập nhật theo Kho Sheet) */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span>
                    <span className="font-bold text-zinc-500">2. Chọn Size hiện còn: </span>
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
                  {(activeProduct.sizes || ["FREE SIZE"]).map((sz) => {
                    const isOutOfStock = sz === "HẾT HÀNG";
                    return (
                      <button
                        key={sz}
                        disabled={isOutOfStock}
                        onClick={() => setDetailSize(sz)}
                        className={`min-w-[52px] px-4 py-2.5 text-xs font-black uppercase tracking-wider border transition ${
                          isOutOfStock
                            ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
                            : detailSize === sz
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-zinc-300 hover:border-black"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Số lượng & Mua */}
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
                    onClick={() => addToCart(activeProduct, detailSize, detailColor, detailQty, true)}
                    className="flex-1 bg-black text-white py-3.5 px-6 text-xs font-black uppercase tracking-[0.18em] hover:bg-zinc-800 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Thêm Vào Giỏ Hàng
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(activeProduct, detailSize, detailColor, detailQty, false);
                    setCreatedOrder(null);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full border-2 border-black bg-white text-black py-3.5 px-6 text-xs font-black uppercase tracking-[0.18em] hover:bg-black hover:text-white transition"
                >
                  Mua Ngay (COD / VietQR Tự Động)
                </button>
              </div>

              {/* Thông số kỹ thuật */}
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
                    {activeProduct.material || "Chất liệu cao cấp chính hãng"}
                  </span>
                </div>
                <div className="grid grid-cols-3 py-1 border-b border-zinc-100">
                  <span className="text-zinc-500 font-medium">Form dáng:</span>
                  <span className="col-span-2 font-bold">{activeProduct.fit || "Chuẩn Streetwear"}</span>
                </div>
                <div className="grid grid-cols-3 py-1">
                  <span className="text-zinc-500 font-medium">Thanh toán:</span>
                  <span className="col-span-2 font-bold">
                    Hỗ trợ COD kiểm tra hàng hoặc VietQR MBBank tự động xác nhận
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gợi ý cùng kệ hàng */}
          <div className="mt-16 pt-10 border-t border-zinc-200">
            <h3 className="text-lg font-black uppercase tracking-wider mb-6">Sản Phẩm Khác Bạn Có Thể Thích</h3>
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
        /* MÀN HÌNH 2: TRANG CHỦ & KỆ HÀNG */
        <>
        {/* BANNER SLIDER CAROUSEL */}
          <section className="relative bg-black text-white overflow-hidden border-b border-black group">
            <div className="relative w-full min-h-[460px] sm:min-h-[560px] flex items-center">
              {bannerList.map((banner, index) => (
                <div
                  key={banner.id || index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Ảnh nền Banner */}
                  <img
                    src={banner.image}
                    alt={banner.title || "Banner"}
                    className="w-full h-full object-cover object-center brightness-[0.45]"
                  />

                  {/* Lớp phủ nội dung chữ và nút bấm */}
                  <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start space-y-4">
                    {banner.tag && (
                      <span className="border border-white/40 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] bg-black/40 backdrop-blur-sm">
                        {banner.tag}
                      </span>
                    )}

                    {banner.title && (
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-2xl leading-[1.1]">
                        {banner.title}
                      </h1>
                    )}

                    {banner.subtitle && (
                      <p className="text-zinc-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                        {banner.subtitle}
                      </p>
                    )}

                    {/* Nút bấm Khám phá */}
                    {banner.showCta && (
                      <div className="pt-3">
                        <a
                          href={banner.ctaLink || "#catalog"}
                          className="bg-white text-black px-7 py-3.5 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition inline-flex items-center gap-2 shadow-xl"
                        >
                          {banner.ctaText || "KHÁM PHÁ KỆ HÀNG"} <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Mũi tên chuyển ảnh Trái / Phải */}
              {bannerList.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white p-3 border border-white/20 transition opacity-80 group-hover:opacity-100"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white p-3 border border-white/20 transition opacity-80 group-hover:opacity-100"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dấu chấm chuyển slide ở đáy */}
              {bannerList.length > 1 && (
                <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center gap-2">
                  {bannerList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentSlide(dotIdx)}
                      className={`h-2 transition-all ${
                        dotIdx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Nút mở cài đặt Banner cho Admin */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-30">
                <button
                  onClick={() => setIsBannerModalOpen(true)}
                  className="bg-black/90 text-amber-300 border border-amber-400 px-3.5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Quản Lý Danh Sách Banner ({bannerList.length})
                </button>
              </div>
            )}
          </section>
{/* KHỐI INTERACTIVE LOOKBOOK SHOWCASE */}
          {lookbookList.length > 0 && activeLook && (
            <section className="bg-zinc-100 text-black py-16 px-4 sm:px-6 lg:px-8 border-b border-black overflow-hidden select-none relative group">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-300 gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-500 uppercase block mb-1">
                      CHUD AUTHENTIC // RUNWAY LOOKBOOK
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                      Gợi Ý Phối Đồ Chuẩn Mực
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-mono text-zinc-600">
                      {activeLook.lookNumber} / {lookbookList.length < 10 ? `0${lookbookList.length}` : lookbookList.length} — {activeLook.theme}
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => setIsLookbookModalOpen(true)}
                        className="bg-black text-amber-300 border border-amber-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Quản Lý Lookbook ({lookbookList.length})
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Trượt người mẫu dạng chiều sâu 3D */}
                  <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden bg-white border border-zinc-300">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {lookbookList.map((look, idx) => {
                        const offset = idx - currentLookIndex;
                        const isCenter = offset === 0;
                        const isLeft = offset === -1 || (currentLookIndex === 0 && idx === lookbookList.length - 1);
                        const isRight = offset === 1 || (currentLookIndex === lookbookList.length - 1 && idx === 0);

                        if (!isCenter && !isLeft && !isRight) return null;

                        let pos = "z-20 scale-100 opacity-100 translate-x-0";
                        if (isLeft) pos = "z-10 scale-75 opacity-35 -translate-x-[42%] blur-[2px] cursor-pointer hover:opacity-70";
                        if (isRight) pos = "z-10 scale-75 opacity-35 translate-x-[42%] blur-[2px] cursor-pointer hover:opacity-70";

                        return (
                          <div
                            key={look.id || idx}
                            onClick={() => setCurrentLookIndex(idx)}
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${pos}`}
                          >
                            <img
                              src={look.modelImage}
                              alt={look.theme}
                              className="h-[88%] w-auto object-contain pointer-events-none drop-shadow-2xl"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-6 left-6 z-30">
                      <span className="font-mono text-3xl sm:text-5xl font-black tracking-tighter block">
                        {activeLook.lookNumber}
                      </span>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        {activeLook.theme}
                      </span>
                    </div>

                    {lookbookList.length > 1 && (
                      <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                        <button
                          onClick={handlePrevLook}
                          className="w-10 h-10 border border-black bg-white hover:bg-black hover:text-white transition flex items-center justify-center"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNextLook}
                          className="w-10 h-10 border border-black bg-white hover:bg-black hover:text-white transition flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cột danh sách món đồ lẻ trong Set */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="border-b border-black pb-2 mb-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                          CHI TIẾT TRANG PHỤC
                        </span>
                        <h3 className="text-lg font-black uppercase tracking-tight">
                          Sản Phẩm Trong Set
                        </h3>
                        <p className="text-xs text-zinc-600 mt-1">
                          {activeLook.tagline}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {activeLookProducts.length === 0 ? (
                          <div className="text-xs text-zinc-500 italic p-4 bg-white border border-dashed border-zinc-300">
                            Chưa liên kết sản phẩm cho set này. Nhấn Quản Lý Lookbook để chọn sản phẩm.
                          </div>
                        ) : (
                          activeLookProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="p-3 bg-white border border-zinc-300 flex items-center gap-3 hover:border-black transition"
                            >
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-16 object-cover bg-zinc-100 border border-zinc-200 flex-shrink-0"
                              />

                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-mono text-zinc-500 uppercase">
                                  {prod.brand} • {prod.category}
                                </div>
                                <h4 className="font-bold text-xs truncate text-zinc-900 mt-0.5">
                                  {prod.name}
                                </h4>
                                <div className="font-mono font-black text-xs mt-1">
                                  {formatVND(prod.price)}
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  handleAddToCart(prod, prod.colors?.[0] || "Tiêu chuẩn", prod.sizes?.[0] || "Freesize");
                                  setAddedLookItemId(prod.id);
                                  setTimeout(() => setAddedLookItemId(null), 1500);
                                }}
                                className={`p-2.5 border transition flex-shrink-0 ${
                                  addedLookItemId === prod.id
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "border-black hover:bg-black hover:text-white text-black"
                                }`}
                                title="Thêm món này vào giỏ"
                              >
                                {addedLookItemId === prod.id ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <ShoppingBag className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {activeLookProducts.length > 0 && (
                      <div className="pt-4 border-t border-zinc-300">
                        <button
                          onClick={() => {
                            activeLookProducts.forEach((p) => {
                              handleAddToCart(p, p.colors?.[0] || "Tiêu chuẩn", p.sizes?.[0] || "Freesize");
                            });
                          }}
                          className="w-full bg-black text-white py-3.5 px-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" /> Thêm Trọn Bộ Set Này Vào Giỏ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              {isAdmin && (
                <button
                  onClick={openAddProductModal}
                  className="border-2 border-dashed border-black flex flex-col items-center justify-center min-h-[440px] p-6 hover:bg-zinc-50 transition group"
                >
                  <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Plus className="w-7 h-7" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-sm">+ Thêm Sản Phẩm Mới</span>
                  <span className="text-xs text-zinc-500 mt-1">Hỗ trợ nhập mã SKU để tự lấy size Sheet</span>
                </button>
              )}

              {filteredProducts.map((product) => {
                const chosenSize = cardSelections[product.id]?.size || product.sizes?.[0] || "FREE SIZE";
                const chosenColor = cardSelections[product.id]?.color || product.colors?.[0] || "Tiêu chuẩn";
                const isOutOfStock = product.sizes?.length === 1 && product.sizes[0] === "HẾT HÀNG";

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
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-2 py-1 text-[11px] text-rose-400 hover:bg-zinc-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div>
                      <div
                        onClick={() => openProductDetail(product)}
                        className="relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer"
                      >
                        {isOutOfStock ? (
                          <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                            TẠM HẾT HÀNG
                          </span>
                        ) : product.tag ? (
                          <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                            {product.tag}
                          </span>
                        ) : null}

                        {product.sku && (
                          <span className="absolute bottom-3 left-3 z-10 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5">
                            SKU: {product.sku}
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

                    <div className="px-5 pb-5 pt-3 border-t border-zinc-100 space-y-3">
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

                      <div>
                        <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">
                          Size còn hàng: <span className="text-black">{chosenSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(product.sizes || ["FREE SIZE"]).map((sz) => {
                            const isSzOut = sz === "HẾT HÀNG";
                            return (
                              <button
                                key={sz}
                                type="button"
                                disabled={isSzOut}
                                onClick={() => setCardSelection(product.id, "size", sz)}
                                className={`text-[11px] font-bold px-2.5 py-1 border transition ${
                                  isSzOut
                                    ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
                                    : chosenSize === sz
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-zinc-700 border-zinc-300 hover:border-black"
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

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
                          disabled={isOutOfStock}
                          onClick={() => addToCart(product, chosenSize, chosenColor, 1, true)}
                          className="col-span-3 bg-black text-white py-2.5 text-[11px] font-black uppercase tracking-wider hover:bg-zinc-800 transition disabled:opacity-40"
                        >
                          {isOutOfStock ? "Tạm Hết" : "+ Thêm Giỏ"}
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

      {/* Cam kết ChuD Authentic */}
      <section className="border-t border-b border-zinc-200 bg-zinc-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">100% Authentic Legit</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Cam kết chính hãng trọn đời cho mọi sản phẩm Stussy, MLB, Adidas, Essentials tại ChuD Authentic.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Truck className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">Thanh Toán COD & VietQR Tự Động</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Hỗ trợ thanh toán khi nhận hàng (COD) toàn quốc hoặc quét mã VietQR MBBank xác nhận tự động.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RefreshCw className="w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-black uppercase text-sm tracking-wider">Hỗ Trợ Đổi Size</h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Hỗ trợ đổi size nhanh chóng trong vòng 7 ngày nếu khách hàng mang chưa vừa chân hoặc mặc chưa vừa form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-black tracking-tighter uppercase">{siteConfig.brandName}</h3>
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              Chuyên phân phối thời trang streetwear chính hãng: Stussy, Adidas, MLB, Fear of God Essentials.
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

      {/* GIỎ HÀNG (DRAWER) */}
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
                        {item.sku ? `Mã: ${item.sku} | ` : ""}Màu: <b>{item.color}</b> | Size: <b>{item.size}</b>
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

                <div className="space-y-1 pt-1 text-zinc-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatVND(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Giảm giá ({discountPercent}%):</span>
                      <span>-{formatVND(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-zinc-200">
                    <span>TỔNG THANH TOÁN:</span>
                    <span>{formatVND(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCreatedOrder(null);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-black text-white py-3.5 font-black uppercase tracking-widest hover:bg-zinc-800 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Đặt Hàng (COD / VietQR Tự Động)
                </button>

                <button
                  onClick={handleQuickZaloFromCart}
                  className="w-full border border-black bg-white text-black py-3 font-bold uppercase tracking-wider hover:bg-zinc-100 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> Chốt Đơn Nhanh Qua Zalo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL CHECKOUT & SEPAY REALTIME */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-3xl w-full border-2 border-black p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider flex items-center gap-2">
                <Package className="w-5 h-5" />
                {createdOrder ? `Đơn Hàng #${createdOrder.orderCode}` : "Thông Tin Giao Hàng & Thanh Toán"}
              </h2>
              <button onClick={() => setIsCheckoutOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdOrder ? (
              <div className="space-y-6 text-xs">
                {isPaidSuccess ? (
                  <div className="bg-emerald-600 text-white p-6 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-white" />
                    <div className="text-lg font-black uppercase tracking-wider">
                      ĐÃ NHẬN ĐƯỢC TIỀN — THANH TOÁN THÀNH CÔNG
                    </div>
                    <p className="text-emerald-100">
                      Hệ thống MBBank & SePay đã xác nhận tự động đơn hàng <b>#{createdOrder.orderCode}</b>. ChuD Authentic đang chuẩn bị đóng gói sản phẩm.
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-500 p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-black uppercase text-sm text-emerald-900">
                        Đơn hàng #{createdOrder.orderCode} đã được khởi tạo
                      </div>
                      <p className="text-emerald-800 mt-1">
                        Người nhận: <b>{createdOrder.customerName}</b> — SĐT: <b>{createdOrder.customerPhone}</b>
                      </p>
                    </div>
                  </div>
                )}

                {createdOrder.paymentMethod === "VIETQR" && !isPaidSuccess && (
                  <div className="border-2 border-black p-5 bg-zinc-50 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="text-center space-y-3">
                      <div className="font-black uppercase tracking-wider text-xs">
                        Quét Mã VietQR MBBank Để Thanh Toán Tự Động
                      </div>
                      <img
                        src={getVietQrUrl(createdOrder)}
                        alt="VietQR MBBank"
                        className="w-56 h-56 mx-auto border border-zinc-300 bg-white p-2 object-contain"
                      />
                      {isCheckingPayment && (
                        <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 text-[11px] font-bold">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          Đang chờ bạn quét QR (Tự động nhận diện sau 3 giây)...
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="font-black uppercase text-sm border-b border-zinc-200 pb-2">
                        Thông Tin Tài Khoản Hộ Kinh Doanh
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">Ngân hàng:</span>
                        <span className="font-black">{siteConfig.bankId || "MB"} (MBBank)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">Số tài khoản:</span>
                        <span className="font-black font-mono text-sm">{siteConfig.bankAccountNo}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">Chủ tài khoản:</span>
                        <span className="font-black uppercase">{siteConfig.bankAccountName}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">Số tiền chính xác:</span>
                        <span className="font-black text-base">{formatVND(createdOrder.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500">Nội dung CK:</span>
                        <span className="font-black bg-black text-white px-2 py-0.5 font-mono">
                          CHUD {createdOrder.orderCode}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const msg = buildZaloMessage(createdOrder);
                      navigator.clipboard?.writeText(msg);
                      window.open(`https://zalo.me/${siteConfig.hotline.replace(/[^0-9]/g, "")}`, "_blank");
                    }}
                    className="flex-1 bg-black text-white py-3.5 font-black uppercase tracking-wider hover:bg-zinc-800 transition"
                  >
                    Nhắn Zalo Hỗ Trợ Đơn Hàng
                  </button>
                  <button
                    onClick={() => {
                      setCreatedOrder(null);
                      setIsCheckoutOpen(false);
                    }}
                    className="px-6 py-3.5 border border-black font-bold uppercase tracking-wider hover:bg-zinc-100"
                  >
                    Tiếp Tục Mua Sắm
                  </button>
                </div>
              </div>
            ) : (
                <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
                <div className="md:col-span-7 space-y-4">
                  <div className="font-black uppercase tracking-wider text-sm border-b border-zinc-200 pb-2">
                    1. Thông Tin Người Nhận Hàng
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Họ và tên người nhận *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      className="w-full border border-zinc-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Số điện thoại liên hệ *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ví dụ: 0909xxxxxx..."
                      className="w-full border border-zinc-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Địa chỉ giao hàng chi tiết *</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP..."
                      className="w-full border border-zinc-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
                    <textarea
                      rows={2}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      className="w-full border border-zinc-300 px-3.5 py-2 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <div className="font-black uppercase tracking-wider text-sm border-b border-zinc-200 pb-2">
                      2. Chọn Phương Thức Thanh Toán
                    </div>

                    <label
                      onClick={() => setPaymentMethod("COD")}
                      className={`flex items-start gap-3 p-3.5 border-2 cursor-pointer transition ${
                        paymentMethod === "COD" ? "border-black bg-zinc-50" : "border-zinc-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="mt-1 accent-black"
                      />
                      <div className="flex-1">
                        <div className="font-black uppercase flex items-center gap-1.5">
                          <Truck className="w-4 h-4" /> Thanh toán khi nhận hàng (COD)
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("VIETQR")}
                      className={`flex items-start gap-3 p-3.5 border-2 cursor-pointer transition ${
                        paymentMethod === "VIETQR" ? "border-black bg-zinc-50" : "border-zinc-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "VIETQR"}
                        onChange={() => setPaymentMethod("VIETQR")}
                        className="mt-1 accent-black"
                      />
                      <div className="flex-1">
                        <div className="font-black uppercase flex items-center gap-1.5">
                          <QrCode className="w-4 h-4" /> Quét mã VietQR MBBank (Tự Động Xác Nhận)
                        </div>
                      </div>
                    </label>

                   
                  </div>
                </div>

                <div className="md:col-span-5 bg-zinc-50 border border-zinc-200 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="font-black uppercase tracking-wider text-sm border-b border-zinc-200 pb-2">
                      Tóm Tắt Đơn Hàng ({cart.reduce((s, i) => s + i.qty, 0)} món)
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                      {cart.map((item) => (
                        <div key={item.itemKey} className="flex gap-2.5 border-b border-zinc-200 pb-2.5">
                          <img src={item.image} alt="" className="w-12 h-14 object-cover bg-white border" />
                          <div className="flex-1">
                            <div className="font-bold line-clamp-1">{item.name}</div>
                            <div className="text-[11px] text-zinc-500">
                              {item.sku ? `Mã: ${item.sku} | ` : ""}{item.color} | Size {item.size} x{item.qty}
                            </div>
                            <div className="font-black mt-0.5">{formatVND(item.price * item.qty)}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Tạm tính:</span>
                        <span className="font-bold">{formatVND(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Giảm giá ({discountPercent}%):</span>
                          <span>-{formatVND(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Phí vận chuyển:</span>
                        <span className="font-bold">
                          {shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-black pt-2 border-t border-zinc-300">
                        <span>TỔNG CỘNG:</span>
                        <span>{formatVND(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingOrder || cart.length === 0}
                    className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.18em] hover:bg-zinc-800 transition disabled:opacity-50"
                  >
                    {isSubmittingOrder ? "Đang Khởi Tạo..." : "Hoàn Tất Đặt Hàng"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL CẤU HÌNH GOOGLE SHEETS */}
      {isSheetModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-lg w-full p-6 border-2 border-black space-y-4 text-xs my-8">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Cấu Hình Google Sheets Kho Hàng
              </h3>
              <button onClick={() => setIsSheetModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold block mb-1">Đường link Google Sheets kho</label>
                <input
                  type="text"
                  value={siteConfig.sheetUrl || ""}
                  onChange={(e) => setSiteConfig({ ...siteConfig, sheetUrl: e.target.value })}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full border border-zinc-300 px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">
                  Mã GID các trang cần quét (cách nhau dấu phẩy)
                </label>
                <input
                  type="text"
                  value={siteConfig.sheetGids || ""}
                  onChange={(e) => setSiteConfig({ ...siteConfig, sheetGids: e.target.value })}
                  placeholder="1599511117, 118702566, 1380208994..."
                  className="w-full border border-zinc-300 px-3 py-2 font-mono text-[11px]"
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Mã GID nằm ở cuối link URL mỗi trang (sau cụm #gid=).
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                saveToSupabase(siteConfig, products);
                setIsSheetModalOpen(false);
                syncInventoryFromSheet(products, siteConfig, false);
              }}
              className="w-full bg-black text-white py-3 font-black uppercase tracking-wider"
            >
              Lưu & Đồng Bộ Ngay
            </button>
          </div>
        </div>
      )}

      {/* MODAL CẤU HÌNH MBBANK & SEPAY */}
      {isBankModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-lg w-full p-6 border-2 border-black space-y-4 text-xs my-8">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Cấu Hình Tài Khoản Hộ Kinh Doanh & SePay
              </h3>
              <button onClick={() => setIsBankModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold block mb-1">SePay API Token</label>
                <input
                  type="text"
                  value={siteConfig.sepayApiToken || ""}
                  onChange={(e) => setSiteConfig({ ...siteConfig, sepayApiToken: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2 font-mono bg-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Ngân hàng</label>
                <select
                  value={siteConfig.bankId || "MB"}
                  onChange={(e) => setSiteConfig({ ...siteConfig, bankId: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2 font-bold bg-white"
                >
                  {POPULAR_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} — {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Số tài khoản Hộ Kinh Doanh</label>
                <input
                  type="text"
                  value={siteConfig.bankAccountNo || ""}
                  onChange={(e) => setSiteConfig({ ...siteConfig, bankAccountNo: e.target.value })}
                  className="w-full border border-zinc-300 px-3 py-2 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Tên chủ tài khoản</label>
                <input
                  type="text"
                  value={siteConfig.bankAccountName || ""}
                  onChange={(e) =>
                    setSiteConfig({ ...siteConfig, bankAccountName: e.target.value.toUpperCase() })
                  }
                  className="w-full border border-zinc-300 px-3 py-2 uppercase font-bold"
                />
              </div>
            </div>

            <button
              onClick={() => {
                saveToSupabase(siteConfig, products);
                setIsBankModalOpen(false);
              }}
              className="w-full bg-black text-white py-3 font-black uppercase tracking-wider"
            >
              Lưu Lên Cloud
            </button>
          </div>
        </div>
      )}

      {/* MODAL QUẢN LÝ ĐƠN HÀNG */}
      {isOrdersModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-4xl w-full p-6 border-2 border-black space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <Package className="w-4 h-4" /> Quản Lý Đơn Hàng ({(siteConfig.orders || []).length})
              </h3>
              <button onClick={() => setIsOrdersModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {(siteConfig.orders || []).length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-12">Chưa có đơn hàng nào.</p>
            ) : (
              <div className="space-y-4 text-xs">
                {(siteConfig.orders || []).map((ord) => (
                  <div key={ord.id} className="border border-zinc-300 p-4 space-y-3 bg-zinc-50">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2">
                      <div>
                        <span className="font-black text-sm">#{ord.orderCode}</span>
                        <span className="text-zinc-500 ml-2">({ord.createdAt})</span>
                        <span className="ml-2 px-2 py-0.5 bg-black text-white font-bold uppercase text-[10px]">
                          {ord.paymentMethod}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={ord.status || "Mới đặt"}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                          className="border border-black px-2.5 py-1 font-bold bg-white"
                        >
                          <option value="Mới đặt">Mới đặt</option>
                          <option value="Chờ chuyển khoản">Chờ chuyển khoản</option>
                          <option value="Đã thanh toán (SePay Auto)">Đã thanh toán (SePay Auto)</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="text-rose-600 p-1 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div>Khách hàng: <b>{ord.customerName}</b></div>
                        <div>SĐT: <b className="font-mono">{ord.customerPhone}</b></div>
                        <div>Địa chỉ: <b>{ord.customerAddress}</b></div>
                      </div>
                      <div className="space-y-1">
                        {(ord.items || []).map((it, i) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              • {it.name} {it.sku ? `(Mã: ${it.sku}) ` : ""}({it.color} / {it.size}) x{it.qty}
                            </span>
                            <span className="font-bold">{formatVND(it.price * it.qty)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-black text-sm pt-2 border-t border-zinc-200">
                          <span>Tổng thu:</span>
                          <span>{formatVND(ord.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL PIN ADMIN */}
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

      {/* MODAL THÊM / SỬA SẢN PHẨM (CÓ Ô NHẬP MÃ SKU GOOGLE SHEET) */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveProductForm}
            className="bg-white text-black max-w-xl w-full p-6 border-2 border-black space-y-4 my-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm">Chỉnh Sửa Chi Tiết Sản Phẩm</h3>
              <button type="button" onClick={() => setIsProductModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-amber-50 border border-amber-300 p-2.5">
                <label className="font-black uppercase block mb-1 text-black">
                  Mã số sản phẩm trên Sheet (SKU) — Tự động lấy size
                </label>
                <input
                  type="text"
                  value={editingProduct.sku || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  placeholder="Ví dụ: 1904894, 1904876... (Để trống nếu nhập size thủ công)"
                  className="w-full border border-black bg-white px-3 py-2 font-mono font-bold"
                />
              </div>

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

              <div>
                <label className="font-bold uppercase block mb-1">
                  Nhãn nổi bật góc ảnh (HOT DROP, BEST SELLER, SALE... hoặc để trống)
                </label>
                <input
                  type="text"
                  value={editingProduct.tag || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value.toUpperCase() })}
                  placeholder="Ví dụ: HOT DROP, BEST SELLER, NEW ARRIVAL..."
                  className="w-full border border-zinc-300 px-3 py-2 font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase block mb-1">Thương hiệu (Tự do nhập)</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    placeholder="VD: Stussy, Adidas, Nike..."
                    className="w-full border border-zinc-300 px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase block mb-1">Danh mục (Áo / Dép / Quần...)</label>
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
                <label className="font-bold uppercase block mb-1">Các màu sắc (Cách nhau dấu phẩy)</label>
                <input
                  type="text"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  className="w-full border border-zinc-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">
                  Chọn các Size thủ công (Nếu không dùng mã SKU Sheet)
                </label>
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
                  <label className="font-bold uppercase block mb-1">Chất liệu</label>
                  <input
                    type="text"
                    value={editingProduct.material || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full border border-zinc-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase block mb-1">Form dáng (Fit)</label>
                  <input
                    type="text"
                    value={editingProduct.fit || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fit: e.target.value })}
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
    Ảnh phụ ở trang chi tiết (Chọn nhiều ảnh từ máy)
  </label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleGalleryUpload}
    className="text-xs mb-2"
  />

  {/* Khung hiển thị các ảnh phụ đã chọn kèm nút xóa */}
  {editingProduct.gallery && editingProduct.gallery.length > 0 && (
    <div className="flex flex-wrap gap-2 pt-1">
      {editingProduct.gallery.map((imgUrl, idx) => (
        <div key={idx} className="relative w-16 h-20 border border-zinc-300 bg-zinc-100">
          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => handleRemoveGalleryImage(idx)}
            className="absolute -top-1.5 -right-1.5 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-rose-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )}
</div>

              <div>
                <label className="font-bold uppercase block mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={3}
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
                placeholder="Gõ tên sản phẩm, mã SP (SKU), thương hiệu, Size..."
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

      {/* MODAL QUẢN LÝ BANNER SLIDER DÀNH CHO ADMIN */}
      {isBannerModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-2xl w-full p-6 border-2 border-black space-y-4 my-8 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm">
                Cài Đặt Banner Slider Trang Chủ
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {bannerList.map((b, idx) => (
                <div key={b.id || idx} className="border border-zinc-300 p-3.5 space-y-2 bg-zinc-50 relative">
                  <div className="flex items-center justify-between font-black uppercase text-[11px] border-b pb-1.5">
                    <span>Banner #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (bannerList.length <= 1) {
                          alert("Cần giữ ít nhất 1 banner.");
                          return;
                        }
                        const updated = bannerList.filter((_, i) => i !== idx);
                        saveToSupabase({ ...siteConfig, banners: updated }, products);
                      }}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Xóa Banner Này
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="font-bold block mb-1">Link ảnh Banner</label>
                      <input
                        type="text"
                        value={b.image || ""}
                        onChange={(e) => {
                          const updated = [...bannerList];
                          updated[idx] = { ...updated[idx], image: e.target.value };
                          saveToSupabase({ ...siteConfig, banners: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5 text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Tải ảnh từ máy lên</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updated = [...bannerList];
                            updated[idx] = { ...updated[idx], image: reader.result };
                            saveToSupabase({ ...siteConfig, banners: updated }, products);
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="font-bold block mb-1">Tiêu đề lớn</label>
                      <input
                        type="text"
                        value={b.title || ""}
                        onChange={(e) => {
                          const updated = [...bannerList];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          saveToSupabase({ ...siteConfig, banners: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Mô tả phụ</label>
                      <input
                        type="text"
                        value={b.subtitle || ""}
                        onChange={(e) => {
                          const updated = [...bannerList];
                          updated[idx] = { ...updated[idx], subtitle: e.target.value };
                          saveToSupabase({ ...siteConfig, banners: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5"
                      />
                    </div>
                  </div>

                  {/* Bật/Tắt nút Khám phá */}
                  <div className="pt-1 flex flex-wrap items-center gap-4 border-t border-zinc-200">
                    <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={b.showCta ?? true}
                        onChange={(e) => {
                          const updated = [...bannerList];
                          updated[idx] = { ...updated[idx], showCta: e.target.checked };
                          saveToSupabase({ ...siteConfig, banners: updated }, products);
                        }}
                        className="accent-black"
                      />
                      Bật nút "Khám phá" trên slide này
                    </label>

                    {(b.showCta ?? true) && (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={b.ctaText || "KHÁM PHÁ KỆ HÀNG"}
                          placeholder="Chữ trên nút..."
                          onChange={(e) => {
                            const updated = [...bannerList];
                            updated[idx] = { ...updated[idx], ctaText: e.target.value };
                            saveToSupabase({ ...siteConfig, banners: updated }, products);
                          }}
                          className="border border-zinc-300 px-2 py-1 flex-1 font-bold"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t">
              <button
                type="button"
                onClick={() => {
                  const newBanner = {
                    id: Date.now(),
                    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
                    tag: "NEW DROP",
                    title: "BỘ SƯU TẬP MỚI",
                    subtitle: "Khám phá các mẫu mới cập bến.",
                    ctaText: "KHÁM PHÁ SẢN PHẨM",
                    ctaLink: "#catalog",
                    showCta: true
                  };
                  const updated = [...bannerList, newBanner];
                  saveToSupabase({ ...siteConfig, banners: updated }, products);
                  setCurrentSlide(updated.length - 1);
                }}
                className="bg-black text-white px-4 py-2 font-black uppercase tracking-wider"
              >
                + Thêm Slide Banner Mới
              </button>

              <button
                type="button"
                onClick={() => setIsBannerModalOpen(false)}
                className="border border-zinc-300 px-5 py-2 font-bold uppercase"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL QUẢN LÝ LOOKBOOK DÀNH CHO ADMIN */}
      {isLookbookModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-black max-w-3xl w-full p-6 border-2 border-black space-y-4 my-8 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-black uppercase tracking-wider text-sm">
                Quản Lý Lookbook & Phối Đồ
              </h3>
              <button onClick={() => setIsLookbookModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {lookbookList.map((lb, idx) => (
                <div key={lb.id || idx} className="border border-zinc-300 p-4 space-y-3 bg-zinc-50 relative">
                  <div className="flex items-center justify-between font-black uppercase text-[11px] border-b pb-2">
                    <span>{lb.lookNumber || `LOOK 0${idx + 1}`} — {lb.theme}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = lookbookList.filter((_, i) => i !== idx);
                        saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                      }}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Xóa Set Này
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Mã Look (VD: LOOK 01)</label>
                      <input
                        type="text"
                        value={lb.lookNumber || ""}
                        onChange={(e) => {
                          const updated = [...lookbookList];
                          updated[idx] = { ...updated[idx], lookNumber: e.target.value.toUpperCase() };
                          saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5 uppercase font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Chủ đề (VD: MONOCHROME)</label>
                      <input
                        type="text"
                        value={lb.theme || ""}
                        onChange={(e) => {
                          const updated = [...lookbookList];
                          updated[idx] = { ...updated[idx], theme: e.target.value };
                          saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5 uppercase font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Mô tả ngắn</label>
                      <input
                        type="text"
                        value={lb.tagline || ""}
                        onChange={(e) => {
                          const updated = [...lookbookList];
                          updated[idx] = { ...updated[idx], tagline: e.target.value };
                          saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5"
                      />
                    </div>
                  </div>

                  {/* Tải ảnh người mẫu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold block mb-1">Link ảnh mẫu mặc set (Nên dùng ảnh tách nền)</label>
                      <input
                        type="text"
                        value={lb.modelImage || ""}
                        onChange={(e) => {
                          const updated = [...lookbookList];
                          updated[idx] = { ...updated[idx], modelImage: e.target.value };
                          saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                        }}
                        className="w-full border border-zinc-300 px-2 py-1.5 font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Hoặc tải ảnh từ máy</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updated = [...lookbookList];
                            updated[idx] = { ...updated[idx], modelImage: reader.result };
                            saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Tích chọn sản phẩm gắn vào set */}
                  <div className="pt-2 border-t border-zinc-200">
                    <label className="font-bold block mb-1 text-zinc-700">
                      Chọn các món đồ trong kho thuộc set này (Tích chọn):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto border border-zinc-200 p-2 bg-white">
                      {products.map((p) => {
                        const isChecked = (lb.productIds || []).includes(p.id);
                        return (
                          <label key={p.id} className="flex items-center gap-1.5 text-[11px] cursor-pointer hover:bg-zinc-50 p-1">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const currentPids = lb.productIds || [];
                                const newPids = e.target.checked
                                  ? [...currentPids, p.id]
                                  : currentPids.filter((id) => id !== p.id);
                                const updated = [...lookbookList];
                                updated[idx] = { ...updated[idx], productIds: newPids };
                                saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                              }}
                              className="accent-black"
                            />
                            <span className="truncate">{p.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t">
              <button
                type="button"
                onClick={() => {
                  const newLook = {
                    id: Date.now(),
                    lookNumber: `LOOK 0${lookbookList.length + 1}`,
                    theme: "NEW OUTFIT",
                    tagline: "Bộ phối mới cập nhật",
                    modelImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
                    productIds: []
                  };
                  const updated = [...lookbookList, newLook];
                  saveToSupabase({ ...siteConfig, lookbooks: updated }, products);
                  setCurrentLookIndex(updated.length - 1);
                }}
                className="bg-black text-white px-4 py-2 font-black uppercase tracking-wider"
              >
                + Thêm Set Look Mới
              </button>

              <button
                type="button"
                onClick={() => setIsLookbookModalOpen(false)}
                className="border border-zinc-300 px-5 py-2 font-bold uppercase"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL BẢNG SIZE DÉP & QUẦN ÁO */}
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
              {/* Đo Size Dép */}
              <div className="bg-zinc-100 p-4 space-y-3">
                <div className="font-black uppercase">1. Đo Chiều Dài Bàn Chân Cho Size Dép (Slide / Sandal)</div>
                <div>
                  <label className="block mb-1">
                    Chiều dài bàn chân: <b>{footLength} cm</b>
                  </label>
                  <input
                    type="range"
                    min="22"
                    max="29"
                    step="0.1"
                    value={footLength}
                    onChange={(e) => setFootLength(Number(e.target.value))}
                    className="w-full accent-black"
                  />
                </div>
                <div className="bg-black text-white p-2.5 text-center font-bold">
                  Size Dép phù hợp với chân bạn: <span className="text-amber-300 text-sm">{recommendedSlideSize}</span>
                </div>
                <p className="text-[10px] text-zinc-500">
                  Mẹo: Nếu mu bàn chân dày hoặc bè ngang, bạn nên chọn tăng thêm 1 size so với kích thước trên.
                </p>
              </div>

              {/* Đo Size Quần Áo */}
              <div className="bg-zinc-100 p-4 space-y-3">
                <div className="font-black uppercase">2. Gợi ý Size Quần Áo (Stussy / MLB / Essentials)</div>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

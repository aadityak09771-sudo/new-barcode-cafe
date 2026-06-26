import React, { useState, useEffect } from "react";
import { CAFE_INFO, MENU_ITEMS, DEFAULT_GALLERY } from "./menu-data";
import MenuSection from "./components/MenuSection";
import CartSidebar from "./components/CartSidebar";
import CafeInfo from "./components/CafeInfo";
import AmbientPlayer from "./components/AmbientPlayer";
import AdminPanel from "./components/AdminPanel";
import { ShoppingCart, Sparkles, MapPin, Phone, Award, Shield, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import cafeHeroImg from "./assets/cafe_hero.jpg";
import cafeLogo from "./assets/logo.jpg";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [discountClaimed, setDiscountClaimed] = useState(false);

  // --- COMMERCIAL STATES ---
  const [tableNumber, setTableNumber] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [vibeGallery, setVibeGallery] = useState([]);

  useEffect(() => {
    // 1. Extract table number from URL query params (e.g. ?table=5 or ?t=5)
    const params = new URLSearchParams(window.location.search);
    const table = params.get("table") || params.get("t");
    if (table) {
      setTableNumber(table);
    }

    // 2. Load menu items
    const savedMenu = localStorage.getItem("barcode_menu");
    if (savedMenu) {
      try {
        const parsedMenu = JSON.parse(savedMenu);
        const needsUpgrade = parsedMenu.length < 20 || parsedMenu.some(item => item.image && (item.image.includes("/assets/") || item.image.endsWith(".jpg") || item.image.includes("shake.jpg") || item.image.includes("pizza.jpg") || item.image.includes("pasta.jpg") || item.image.includes("sandwich.jpg") || item.image.includes("coffee.jpg")));
        if (needsUpgrade) {
          localStorage.setItem("barcode_menu", JSON.stringify(MENU_ITEMS));
          setMenuItems(MENU_ITEMS);
        } else {
          setMenuItems(parsedMenu);
        }
      } catch (e) {
        setMenuItems(MENU_ITEMS);
      }
    } else {
      localStorage.setItem("barcode_menu", JSON.stringify(MENU_ITEMS));
      setMenuItems(MENU_ITEMS);
    }

    // 3. Load reviews
    const savedReviews = localStorage.getItem("barcode_reviews");
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        if (parsedReviews.length < 10) {
          localStorage.setItem("barcode_reviews", JSON.stringify(CAFE_INFO.reviews));
          setReviews(CAFE_INFO.reviews);
        } else {
          setReviews(parsedReviews);
        }
      } catch (e) {
        setReviews(CAFE_INFO.reviews);
      }
    } else {
      localStorage.setItem("barcode_reviews", JSON.stringify(CAFE_INFO.reviews));
      setReviews(CAFE_INFO.reviews);
    }

    // 4. Load sales history
    const savedSales = localStorage.getItem("barcode_sales_history");
    if (savedSales) {
      try {
        setSalesHistory(JSON.parse(savedSales));
      } catch (e) {
        setSalesHistory([]);
      }
    } else {
      localStorage.setItem("barcode_sales_history", JSON.stringify([]));
      setSalesHistory([]);
    }

    // 5. Load active event schedule
    const savedEvent = localStorage.getItem("barcode_active_event");
    const defaultEvent = {
      artist: "Acoustic Sessions with Riya & Aman",
      date: "This Saturday",
      time: "8:00 PM",
      status: "scheduled" // scheduled, active, canceled
    };
    if (savedEvent) {
      try {
        setActiveEvent(JSON.parse(savedEvent));
      } catch (e) {
        setActiveEvent(defaultEvent);
      }
    } else {
      localStorage.setItem("barcode_active_event", JSON.stringify(defaultEvent));
      setActiveEvent(defaultEvent);
    }

    // 6. Load vibe gallery
    const savedGallery = localStorage.getItem("barcode_vibe_gallery");
    if (savedGallery) {
      try {
        setVibeGallery(JSON.parse(savedGallery));
      } catch (e) {
        setVibeGallery(DEFAULT_GALLERY);
      }
    } else {
      localStorage.setItem("barcode_vibe_gallery", JSON.stringify(DEFAULT_GALLERY));
      setVibeGallery(DEFAULT_GALLERY);
    }
  }, []);

  // --- COMMERCIAL DATABASE HANDLERS ---
  const handleAddItem = (newItem) => {
    const updated = [
      ...menuItems,
      {
        ...newItem,
        id: `item-custom-${Date.now()}`
      }
    ];
    setMenuItems(updated);
    localStorage.setItem("barcode_menu", JSON.stringify(updated));
  };

  const handleEditItem = (itemId, updatedFields) => {
    const updated = menuItems.map((item) =>
      item.id === itemId ? { ...item, ...updatedFields } : item
    );
    setMenuItems(updated);
    localStorage.setItem("barcode_menu", JSON.stringify(updated));
  };

  const handleDeleteItem = (itemId) => {
    const updated = menuItems.filter((item) => item.id !== itemId);
    setMenuItems(updated);
    localStorage.setItem("barcode_menu", JSON.stringify(updated));
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleAddReview = (newRev) => {
    const updated = [
      ...reviews,
      {
        ...newRev,
        id: `rev-custom-${Date.now()}`
      }
    ];
    setReviews(updated);
    localStorage.setItem("barcode_reviews", JSON.stringify(updated));
  };

  const handleDeleteReview = (revId) => {
    const updated = reviews.filter((rev) => rev.id !== revId);
    setReviews(updated);
    localStorage.setItem("barcode_reviews", JSON.stringify(updated));
  };

  const handleRecordSale = (newOrder) => {
    const updated = [
      ...salesHistory,
      {
        ...newOrder,
        id: `order-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString()
      }
    ];
    setSalesHistory(updated);
    localStorage.setItem("barcode_sales_history", JSON.stringify(updated));
  };

  const handleClearSales = () => {
    setSalesHistory([]);
    localStorage.setItem("barcode_sales_history", JSON.stringify([]));
  };

  const handleClearAllItems = () => {
    setMenuItems([]);
    localStorage.setItem("barcode_menu", JSON.stringify([]));
    setCart([]);
  };

  const handleClearAllReviews = () => {
    setReviews([]);
    localStorage.setItem("barcode_reviews", JSON.stringify([]));
  };

  const handleUpdateEvent = (updatedEvent) => {
    setActiveEvent(updatedEvent);
    localStorage.setItem("barcode_active_event", JSON.stringify(updatedEvent));
  };

  const handleAddGalleryImage = (newImg) => {
    const updated = [
      ...vibeGallery,
      {
        ...newImg,
        id: `vibe-custom-${Date.now()}`
      }
    ];
    setVibeGallery(updated);
    localStorage.setItem("barcode_vibe_gallery", JSON.stringify(updated));
  };

  const handleDeleteGalleryImage = (imgId) => {
    const updated = vibeGallery.filter((img) => img.id !== imgId);
    setVibeGallery(updated);
    localStorage.setItem("barcode_vibe_gallery", JSON.stringify(updated));
  };

  const handleReorderGallery = (newGallery) => {
    setVibeGallery(newGallery);
    localStorage.setItem("barcode_vibe_gallery", JSON.stringify(newGallery));
  };

  const handleResetDefaults = () => {
    localStorage.setItem("barcode_menu", JSON.stringify(MENU_ITEMS));
    localStorage.setItem("barcode_reviews", JSON.stringify(CAFE_INFO.reviews));
    localStorage.setItem("barcode_sales_history", JSON.stringify([]));
    localStorage.setItem("barcode_vibe_gallery", JSON.stringify(DEFAULT_GALLERY));
    localStorage.removeItem("barcode_active_event");
    
    setMenuItems(MENU_ITEMS);
    setReviews(CAFE_INFO.reviews);
    setSalesHistory([]);
    setVibeGallery(DEFAULT_GALLERY);
    setActiveEvent({
      artist: "Acoustic Sessions with Riya & Aman",
      date: "This Saturday",
      time: "8:00 PM",
      status: "scheduled"
    });
    setCart([]);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const claimDiscount = () => {
    if (discountClaimed) return;
    setDiscountClaimed(true);
    
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#e2b4a6", "#7f8b6e", "#2d221e", "#ffffff"]
    });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="app-nav">
        <a href="#" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={cafeLogo} alt="Barcode Cafe Logo" style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--pink-accent)" }} />
          <span>{CAFE_INFO.name}</span>
        </a>

        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#info">Cafe Vibes</a></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-cart-btn font-mono" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={18} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="cart-count-badge">{totalCartCount}</span>
            )}
          </button>
          
          <button 
            className="nav-scan-btn font-mono" 
            onClick={claimDiscount}
            style={discountClaimed ? { background: "var(--pink-accent)", color: "var(--dark-espresso)" } : {}}
            disabled={discountClaimed}
          >
            <Award size={18} />
            <span>{discountClaimed ? "10% Off Applied" : "Claim Scan Discount"}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Hero Section */}
        <section id="hero" className="hero-3d-section">
          
          {/* Hero Left: Text Details */}
          <div className="hero-text-content">
            <span className="hero-subtitle">KANPUR'S FINEST ARTISANAL CAFE</span>
            <h1 className="elegant-title">BARCODE CAFE</h1>
            <p className="hero-desc text-muted mt-4">
              Step into a warm sanctuary of rich coffees, savory Italian pastas, wood-fired pizzas, and thick shakes. Scroll our beautiful boutique menu, claim your scan discount, and order directly to your table.
            </p>
            <div className="hero-buttons">
              <a href="#menu" className="hero-primary-btn">
                <span>View Menu</span>
                <Sparkles size={16} />
              </a>
              <button 
                className="hero-secondary-btn" 
                onClick={claimDiscount}
                disabled={discountClaimed}
              >
                {discountClaimed ? "10% Scan Discount Active!" : "Unlock 10% Scan Discount"}
              </button>
            </div>
            
            <div className="flex gap-4 mt-4 text-xs font-mono text-muted">
              {tableNumber ? (
                <span className="flex-row-center gap-2" style={{ background: "var(--blush-pink)", padding: "4px 10px", borderRadius: "10px", color: "var(--dark-espresso)", fontWeight: "bold" }}>
                  <Award size={14} className="text-pink" /> Dine-in Table: {tableNumber}
                </span>
              ) : (
                <span className="flex-row-center gap-2">
                  <MapPin size={14} className="text-green" /> Ratan Lal Nagar
                </span>
              )}
              <span className="flex-row-center gap-2">
                <Phone size={14} className="text-pink" /> {CAFE_INFO.phone}
              </span>
            </div>
          </div>

          {/* Hero Right: Static Collage Image */}
          <div className="hero-3d-visual">
            <img 
              src={cafeHeroImg} 
              alt="Barcode Cafe Cozy Corner" 
              className="hero-showcase-img"
            />
          </div>

        </section>

        {/* Ambient Player Area */}
        <AmbientPlayer />

        {/* Menu Section */}
        <MenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
          discountClaimed={discountClaimed}
          onClaimDiscount={claimDiscount}
          isAdminAuthenticated={isAdminAuthenticated}
          onDeleteItem={handleDeleteItem}
          onEditItem={handleEditItem}
        />

        {/* Cafe Info Section */}
        <CafeInfo 
          reviews={reviews} 
          gallery={vibeGallery} 
          isAdminAuthenticated={isAdminAuthenticated} 
          onDeleteGalleryImage={handleDeleteGalleryImage} 
          onReorderGallery={handleReorderGallery}
          onAddGalleryImage={handleAddGalleryImage}
        />

      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        discountClaimed={discountClaimed}
        tableNumber={tableNumber}
        onRecordSale={handleRecordSale}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        reviews={reviews}
        salesHistory={salesHistory}
        activeEvent={activeEvent}
        gallery={vibeGallery}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
        onResetDefaults={handleResetDefaults}
        onClearAllItems={handleClearAllItems}
        onClearAllReviews={handleClearAllReviews}
        onClearSales={handleClearSales}
        onUpdateEvent={handleUpdateEvent}
        onAddGalleryImage={handleAddGalleryImage}
        onDeleteGalleryImage={handleDeleteGalleryImage}
        isPasswordVerified={isAdminAuthenticated}
        onAuthenticate={setIsAdminAuthenticated}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-logo" style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
          <img src={cafeLogo} alt="Barcode Cafe Logo" style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }} />
          <span>{CAFE_INFO.name}</span>
        </div>
        <p className="text-muted text-sm">© {new Date().getFullYear()} Barcode Cafe, Kanpur. We Serve Passion ☕</p>
        <p className="text-xs text-muted mt-1 font-mono">
          Developed using React & Vite · 
          <button 
            onClick={() => setIsAdminOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--olive-accent)", marginLeft: "5px", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "2px" }}
          >
            <Shield size={12} /> {isAdminAuthenticated ? "Admin Dashboard" : "Admin Portal"}
          </button>
          {isAdminAuthenticated && (
            <button 
              onClick={() => setIsAdminAuthenticated(false)}
              style={{ background: "var(--pink-accent)", color: "var(--dark-espresso)", border: "none", cursor: "pointer", padding: "4px 10px", borderRadius: "8px", marginLeft: "15px", fontSize: "0.75rem", fontFamily: "monospace", fontWeight: "bold" }}
            >
              Logout Admin
            </button>
          )}
        </p>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { Plus, Search, Award } from "lucide-react";

export default function MenuSection({
  menuItems,
  onAddToCart,
  discountClaimed,
  onClaimDiscount,
  isAdminAuthenticated,
  onDeleteItem,
  onEditItem
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit states for admin editing inline
  const [editingItemId, setEditingItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
    setEditDescription(item.description);
    setEditImage(item.image);
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "maggie", name: "Maggie" },
    { id: "burger", name: "Burgers" },
    { id: "sandwich", name: "Sandwiches" },
    { id: "pasta", name: "Pastas" },
    { id: "mocktails", name: "Mocktails" },
    { id: "thick-shake", name: "Thick Shakes" },
    { id: "basic-shakes", name: "Basic Shakes" },
    { id: "fries", name: "Fries" },
    { id: "drinks", name: "Drinks/Coffee" },
    { id: "nuggets", name: "Nuggets" },
    { id: "noodles", name: "Noodles" },
    { id: "momos", name: "Momos" },
    { id: "wraps", name: "Wraps" }
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="menu-section">
      <div className="section-header">
        <h2 className="elegant-title">OUR MENU</h2>
        <p className="text-muted mt-2">Artisanal delicacies crafted with fresh ingredients</p>
      </div>

      {/* Category Selection Tabs & Search */}
      <div className="menu-controls">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search our delicious menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Discount Teaser bar */}
      {!discountClaimed && (
        <div className="cafe-card-pink flex-row-between p-4 mb-4" style={{ padding: "20px", marginBottom: "30px" }}>
          <div>
            <h4 style={{ fontSize: "1.1rem" }}>Claim Your 10% Discount</h4>
            <p className="text-sm">Claim our online scan discount to save 10% on your entire order today.</p>
          </div>
          <button className="nav-scan-btn" onClick={onClaimDiscount}>
            <Award size={16} className="mr-1" /> Claim 10% Off
          </button>
        </div>
      )}

      {/* Menu Card Grid */}
      <div className="menu-grid">
        {filteredItems.map((item) => {
          const originalPrice = item.price;
          const discountedPrice = Math.round(item.price * 0.9);

          // Inline form if this specific card is being edited
          if (editingItemId === item.id) {
            return (
              <div key={item.id} className="menu-card editing-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", background: "var(--cream-bg)" }}>
                <h4 className="font-mono text-xs bold mb-1" style={{ color: "var(--dark-espresso)" }}>Editing Dish: {item.name}</h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label className="text-xs text-muted">Dish Name:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white", fontSize: "0.9rem" }}
                    required
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label className="text-xs text-muted">Price (₹):</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white", fontSize: "0.9rem" }}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label className="text-xs text-muted">Description:</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows="3"
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white", fontSize: "0.85rem", resize: "none" }}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label className="text-xs text-muted">Image URL:</label>
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white", fontSize: "0.85rem" }}
                  />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span className="text-xs text-muted font-bold">Or upload local plate photo:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setEditImage(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ fontSize: "0.75rem", padding: "4px 0" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => {
                      if (!editName || !editPrice) {
                        alert("Name and Price are required.");
                        return;
                      }
                      onEditItem(item.id, {
                        name: editName,
                        price: Number(editPrice),
                        description: editDescription,
                        image: editImage
                      });
                      setEditingItemId(null);
                    }}
                    className="add-to-cart-btn"
                    style={{ flex: 1, justifyContent: "center", background: "var(--olive-accent)", color: "white", borderColor: "var(--olive-accent)", borderRadius: "8px", padding: "8px" }}
                  >
                    Save
                  </button>
                  
                  <button
                    onClick={() => setEditingItemId(null)}
                    className="add-to-cart-btn"
                    style={{ flex: 1, justifyContent: "center", background: "#7a6e69", color: "white", borderColor: "#7a6e69", borderRadius: "8px", padding: "8px" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="menu-card" style={{ position: "relative" }}>
              {item.badge && <span className="menu-badge">{item.badge}</span>}

              {/* Admin quick actions (cross delete & edit button) overlay */}
              {isAdminAuthenticated && (
                <div style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  zIndex: 20,
                  display: "flex",
                  gap: "8px"
                }}>
                  {/* Edit Pencil Button */}
                  <button
                    onClick={() => startEditing(item)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "var(--olive-accent)",
                      color: "white",
                      border: "2px solid var(--white-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-card)",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="Edit name, price or photo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  
                  {/* Delete Cross Button */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
                        onDeleteItem(item.id);
                      }
                    }}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "var(--pink-accent)",
                      color: "var(--dark-espresso)",
                      border: "2px solid var(--white-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-card)",
                      transition: "transform 0.2s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    title="Remove item from menu"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="menu-card-img-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-card-img"
                  loading="lazy"
                />
              </div>

              <div className="menu-card-content">
                <div>
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                </div>

                <div className="menu-card-footer">
                  <div className="price-tag font-mono">
                    {discountClaimed ? (
                      <>
                        <span className="original-price line-through mr-1">
                          ₹{originalPrice}
                        </span>
                        <span className="discounted-price">
                          ₹{discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="discounted-price" style={{ color: "var(--dark-espresso)" }}>
                        ₹{originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="menu-card-actions">
                    <button
                      className="add-to-cart-btn font-mono"
                      onClick={() => onAddToCart(item)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add to Table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

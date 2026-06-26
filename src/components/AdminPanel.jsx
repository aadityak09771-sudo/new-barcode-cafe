import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, ShieldCheck, Database, Star, BarChart3, Calendar, FileText } from "lucide-react";

export default function AdminPanel({
  isOpen,
  onClose,
  menuItems,
  reviews,
  salesHistory = [],
  activeEvent,
  gallery = [],
  onAddItem,
  onDeleteItem,
  onAddReview,
  onDeleteReview,
  onResetDefaults,
  onClearAllItems,
  onClearAllReviews,
  onClearSales,
  onUpdateEvent,
  onAddGalleryImage,
  onDeleteGalleryImage,
  isPasswordVerified,
  onAuthenticate
}) {
  const [activeTab, setActiveTab] = useState("add-item"); // add-item, add-review, gallery, events, sales, database
  
  // Password gate state
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Item form states
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("pizza");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  
  // Review form states
  const [authorName, setAuthorName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Event form states
  const [eventArtist, setEventArtist] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventStatus, setEventStatus] = useState("scheduled");

  const [galleryImage, setGalleryImage] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryCaption, setGalleryCaption] = useState("");

  // QR Stand Generator states
  const [selectedTableForQr, setSelectedTableForQr] = useState("1");
  const [customQrUrl, setCustomQrUrl] = useState("https://barcode-cafee.vercel.app/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCustomQrUrl(window.location.origin);
    }
  }, [isOpen]);

  // Load existing event data when opening tab
  useEffect(() => {
    if (activeEvent) {
      setEventArtist(activeEvent.artist || "");
      setEventDate(activeEvent.date || "");
      setEventTime(activeEvent.time || "");
      setEventStatus(activeEvent.status || "scheduled");
    }
  }, [activeEvent, activeTab]);

  const handleClose = () => {
    setPasswordInput("");
    setPasswordError("");
    onClose();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "barcode123") {
      onAuthenticate(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect Password. Access Denied.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setItemImage(reader.result); // Base64 Data URL
    };
    reader.readAsDataURL(file);
  };

  const submitItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !itemDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddItem({
      name: itemName,
      price: Number(itemPrice),
      category: itemCategory,
      description: itemDescription,
      image: itemImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80"
    });

    setItemName("");
    setItemPrice("");
    setItemDescription("");
    setItemImage("");
    alert("Food Item Added Successfully!");
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!authorName || !reviewText) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddReview({
      author: authorName,
      rating: Number(reviewRating),
      text: reviewText
    });

    setAuthorName("");
    setReviewRating(5);
    setReviewText("");
    alert("Customer Review Added Successfully!");
  };

  const submitEvent = (e) => {
    e.preventDefault();
    if (!eventArtist || !eventDate || !eventTime) {
      alert("Please fill in all details.");
      return;
    }

    onUpdateEvent({
      artist: eventArtist,
      date: eventDate,
      time: eventTime,
      status: eventStatus
    });

    alert("Live Event Schedule Updated!");
  };

  const handleGalleryImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setGalleryImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitGalleryImage = (e) => {
    e.preventDefault();
    const finalImage = galleryImage || galleryUrl;
    if (!finalImage || !galleryCaption) {
      alert("Please upload an image or provide a URL, and enter a caption.");
      return;
    }

    onAddGalleryImage({
      image: finalImage,
      caption: galleryCaption
    });

    setGalleryImage("");
    setGalleryUrl("");
    setGalleryCaption("");
    alert("Gallery photo added successfully!");
  };

  // Stats computation
  const totalRevenue = salesHistory.reduce((acc, sale) => acc + (sale.total || 0), 0);
  const totalOrders = salesHistory.length;

  if (!isOpen) return null;

  // Render Password Gate if not verified
  if (!isPasswordVerified) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content glass-card" style={{ maxWidth: "400px", padding: "35px", background: "var(--cream-bg)" }}>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close auth panel">
            <X size={22} style={{ color: "var(--dark-espresso)" }} />
          </button>
          <div className="modal-header">
            <ShieldCheck className="text-pink mx-auto mb-2" size={36} style={{ display: "block", margin: "0 auto", color: "var(--pink-accent)" }} />
            <h3>Admin Portal Secure Access</h3>
            <p className="text-muted text-sm mt-1">Please enter the passcode to access systems.</p>
          </div>
          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
            <input
              type="password"
              placeholder="Enter passcode (e.g. barcode123)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", textAlign: "center", fontSize: "1rem" }}
              required
              autoFocus
            />
            {passwordError && <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>{passwordError}</p>}
            <button
              type="submit"
              className="place-order-btn font-mono"
              style={{ background: "var(--olive-accent)", color: "white" }}
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Authenticated Dashboard
  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-card" style={{ maxWidth: "650px", padding: "30px", background: "var(--cream-bg)" }}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close portal">
          <X size={22} style={{ color: "var(--dark-espresso)" }} />
        </button>

        <div className="modal-header">
          <div className="flex-row-center gap-2 justify-center mx-auto mb-2" style={{ justifyContent: "center" }}>
            <Database className="text-green" size={28} />
            <h2 className="no-margin">Cafe Admin Portal</h2>
          </div>
          <p className="text-muted text-sm">Add items, upload photos, schedule events, and view live order charts.</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="track-tabs font-mono" style={{ justifyContent: "center", marginBottom: "25px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <button className={`track-tab-btn ${activeTab === "add-item" ? "active" : ""}`} onClick={() => setActiveTab("add-item")}>Add Item</button>
          <button className={`track-tab-btn ${activeTab === "add-review" ? "active" : ""}`} onClick={() => setActiveTab("add-review")}>Add Review</button>
          <button className={`track-tab-btn ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>Vibe Gallery</button>
          <button className={`track-tab-btn ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>Event Manager</button>
          <button className={`track-tab-btn ${activeTab === "sales" ? "active" : ""}`} onClick={() => setActiveTab("sales")}>Sales Logs</button>
          <button className={`track-tab-btn ${activeTab === "qr-codes" ? "active" : ""}`} onClick={() => setActiveTab("qr-codes")}>Table QRs</button>
          <button className={`track-tab-btn ${activeTab === "database" ? "active" : ""}`} onClick={() => setActiveTab("database")}>Database</button>
        </div>

        {/* Dynamic Forms Container */}
        <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
          
          {/* TAB 1: ADD FOOD ITEM */}
          {activeTab === "add-item" && (
            <form onSubmit={submitItem} className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Food Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Cheese Corn Maggie"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                  required
                />
              </div>

              <div className="flex" style={{ display: "flex", gap: "15px" }}>
                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                  <label className="font-mono text-xs bold">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 89"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    required
                  />
                </div>

                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                  <label className="font-mono text-xs bold">Category *</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--white-surface)" }}
                  >
                    <option value="maggie">Maggie</option>
                    <option value="burger">Burger</option>
                    <option value="sandwich">Sandwich</option>
                    <option value="pasta">Pasta</option>
                    <option value="mocktails">Mocktails</option>
                    <option value="thick-shake">Thick Shake</option>
                    <option value="basic-shakes">Basic Shakes</option>
                    <option value="fries">Fries</option>
                    <option value="drinks">Drinks/Coffee</option>
                    <option value="nuggets">Nuggets</option>
                    <option value="noodles">Noodles</option>
                    <option value="momos">Momos</option>
                    <option value="wraps">Wraps</option>
                  </select>
                </div>
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Description *</label>
                <textarea
                  placeholder="Describe ingredients, toppings, and taste profile..."
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  rows="3"
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", resize: "none" }}
                  required
                />
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Upload Food Image (Plate Photo) *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ fontSize: "0.85rem", padding: "10px 0" }}
                />
                {itemImage && (
                  <div style={{ marginTop: "10px" }}>
                    <span className="text-xs text-muted block mb-1">Image Preview:</span>
                    <img
                      src={itemImage}
                      alt="Upload Preview"
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    />
                  </div>
                )}
              </div>

              <button type="submit" className="place-order-btn font-mono" style={{ marginTop: "15px", background: "var(--olive-accent)" }}>
                <Plus size={16} className="inline mr-1" /> Save Food Item
              </button>
            </form>
          )}

          {/* TAB 2: ADD REVIEW */}
          {activeTab === "add-review" && (
            <form onSubmit={submitReview} className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Customer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                  required
                />
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Rating (Stars) *</label>
                <div className="flex gap-2" style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
                    >
                      <Star
                        size={24}
                        fill={star <= reviewRating ? "var(--olive-accent)" : "none"}
                        stroke="var(--olive-accent)"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Review Text *</label>
                <textarea
                  placeholder="What did they love about Barcode Cafe?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="3"
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", resize: "none" }}
                  required
                />
              </div>

              <button type="submit" className="place-order-btn font-mono" style={{ marginTop: "15px", background: "var(--olive-accent)" }}>
                <Plus size={16} className="inline mr-1" /> Save Customer Review
              </button>
            </form>
          )}

          {/* TAB: GALLERY MANAGER */}
          {activeTab === "gallery" && (
            <div className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <form onSubmit={submitGalleryImage} className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "15px", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px" }}>
                <h4 className="font-mono text-sm bold mb-1">Add New Image to Vibe Gallery</h4>
                
                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label className="font-mono text-xs bold">Caption / Description *</label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday Celebration at Barcode Cafe"
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    required
                  />
                </div>

                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label className="font-mono text-xs bold">Upload Image File (Base64)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                    style={{ fontSize: "0.85rem", padding: "8px 0" }}
                  />
                </div>

                <div className="text-center font-mono text-xs text-muted">— OR —</div>

                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label className="font-mono text-xs bold">Paste Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or base64 URL"
                    value={galleryUrl}
                    onChange={(e) => setGalleryUrl(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                  />
                </div>

                {(galleryImage || galleryUrl) && (
                  <div style={{ marginTop: "5px" }}>
                    <span className="text-xs text-muted block mb-1">Preview:</span>
                    <img
                      src={galleryImage || galleryUrl}
                      alt="Gallery Preview"
                      style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    />
                  </div>
                )}

                <button type="submit" className="place-order-btn font-mono" style={{ background: "var(--olive-accent)" }}>
                  <Plus size={16} className="inline mr-1" /> Add Image to Gallery
                </button>
              </form>

              {/* Gallery Items List */}
              <div>
                <h4 className="font-mono text-sm bold mb-2" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }}>
                  Manage Current Gallery ({gallery.length})
                </h4>
                {gallery.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                    {gallery.map((item) => (
                      <div key={item.id} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)", aspectRatio: "1" }}>
                        <img src={item.image} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", color: "white", padding: "4px", fontSize: "0.65rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.caption}
                        </div>
                        <button
                          type="button"
                          onClick={() => onDeleteGalleryImage(item.id)}
                          style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(229, 57, 53, 0.9)", color: "white", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Delete Image"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-muted py-4">No photos in the vibes gallery.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: EVENT MANAGER */}
          {activeTab === "events" && (
            <form onSubmit={submitEvent} className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Gig/Artist Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sufi Night with Kabir Band"
                  value={eventArtist}
                  onChange={(e) => setEventArtist(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                  required
                />
              </div>

              <div className="flex" style={{ display: "flex", gap: "15px" }}>
                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                  <label className="font-mono text-xs bold">Date Details *</label>
                  <input
                    type="text"
                    placeholder="e.g. This Saturday (June 28th)"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    required
                  />
                </div>

                <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                  <label className="font-mono text-xs bold">Start Time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 8:00 PM"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}
                    required
                  />
                </div>
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Event Status *</label>
                <select
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--white-surface)" }}
                >
                  <option value="scheduled">Scheduled (Show Banner)</option>
                  <option value="active">Live Now (Urgent Color Ticker)</option>
                  <option value="canceled">Canceled (Hide Banner)</option>
                </select>
              </div>

              <button type="submit" className="place-order-btn font-mono" style={{ marginTop: "15px", background: "var(--olive-accent)" }}>
                <Calendar size={16} className="inline mr-1" /> Update Event Schedule
              </button>
            </form>
          )}

          {/* TAB 4: SALES ANALYTICS */}
          {activeTab === "sales" && (
            <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Analytics Header Cards */}
              <div className="flex" style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1, padding: "15px", background: "var(--blush-pink)", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "center" }}>
                  <BarChart3 className="text-pink mx-auto mb-1" size={24} style={{ margin: "0 auto" }} />
                  <span className="text-xs text-muted block font-mono">TOTAL REVENUE</span>
                  <span className="bold text-xl font-mono" style={{ fontSize: "1.4rem", color: "var(--dark-espresso)" }}>₹{totalRevenue}</span>
                </div>
                <div style={{ flex: 1, padding: "15px", background: "var(--olive-green)", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "center" }}>
                  <FileText className="text-green mx-auto mb-1" size={24} style={{ margin: "0 auto" }} />
                  <span className="text-xs text-muted block font-mono">TOTAL ORDERS</span>
                  <span className="bold text-xl font-mono" style={{ fontSize: "1.4rem", color: "var(--dark-espresso)" }}>{totalOrders}</span>
                </div>
              </div>

              {/* Chronological order history list */}
              <div>
                <h4 className="font-mono text-sm bold mb-2" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }}>
                  Order Transaction History ({salesHistory.length})
                </h4>
                {salesHistory.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {salesHistory.slice().reverse().map((sale) => (
                      <div key={sale.id} style={{ padding: "12px", background: "var(--white-surface)", borderRadius: "10px", border: "1px solid var(--border-color)", fontSize: "0.85rem" }}>
                        <div className="flex-row-between mb-1">
                          <span className="bold font-mono text-green">{sale.id}</span>
                          <span className="text-xs text-muted">{sale.timestamp}</span>
                        </div>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Location:</strong> {sale.tableNumber ? `Table ${sale.tableNumber}` : "Takeaway / Online"}
                        </p>
                        <div className="text-xs text-muted" style={{ background: "var(--cream-bg)", padding: "6px", borderRadius: "6px", margin: "6px 0" }}>
                          {sale.items.map((it) => (
                            <div key={it.id} className="flex-row-between">
                              <span>{it.name} x{it.quantity}</span>
                              <span>₹{it.price * it.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex-row-between bold mt-1" style={{ fontSize: "0.9rem" }}>
                          <span>Total Collected:</span>
                          <span className="font-mono text-green">₹{sale.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-muted py-4">No transactions recorded yet.</p>
                )}
              </div>

              <button
                type="button"
                className="start-adding-btn font-mono"
                style={{ width: "100%", padding: "10px", fontSize: "0.8rem", background: "#7a6e69", border: "none", color: "white" }}
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear all sales logs? This cannot be undone.")) {
                    onClearSales();
                    alert("Sales history logs cleared.");
                  }
                }}
              >
                Clear Sales Analytics History
              </button>
            </div>
          )}

          {/* TAB 5: DATABASE */}
          {activeTab === "database" && (
            <div className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Menu Items List */}
              <div>
                <h4 className="font-mono text-sm bold mb-2" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }}>
                  Food Items Database ({menuItems.length})
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex-row-between" style={{ padding: "8px 12px", background: "var(--white-surface)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                      <div className="flex-row-center gap-2">
                        <img src={item.image} alt={item.name} style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                        <div>
                          <span className="bold text-sm block" style={{ fontSize: "0.85rem" }}>{item.name}</span>
                          <span className="text-xs text-muted font-mono">{item.category} · ₹{item.price}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        className="text-magenta"
                        aria-label="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div>
                <h4 className="font-mono text-sm bold mb-2" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }}>
                  Customer Reviews Database ({reviews.length})
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {reviews.map((rev) => (
                    <div key={rev.id} className="flex-row-between" style={{ padding: "8px 12px", background: "var(--white-surface)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                      <div>
                        <span className="bold text-sm block" style={{ fontSize: "0.85rem" }}>{rev.author}</span>
                        <span className="text-xs text-muted block italic" style={{ fontSize: "0.75rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "350px" }}>
                          "{rev.text}"
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteReview(rev.id)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        className="text-magenta"
                        aria-label="Delete review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Reset Section */}
              <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "15px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h4 className="font-mono text-xs bold mb-1">System Control</h4>
                
                <div>
                  <p className="text-xs text-muted mb-1">Clear all items in the menu to start from a completely empty board:</p>
                  <button
                    type="button"
                    className="start-adding-btn font-mono"
                    style={{ width: "100%", padding: "10px", fontSize: "0.8rem", background: "#7a6e69", border: "none", color: "white", borderRadius: "6px" }}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear ALL menu items? This leaves the menu database empty.")) {
                        onClearAllItems();
                        alert("All menu items cleared.");
                      }
                    }}
                  >
                    Clear All Menu Items
                  </button>
                </div>

                <div>
                  <p className="text-xs text-muted mb-1">Clear all custom customer reviews:</p>
                  <button
                    type="button"
                    className="start-adding-btn font-mono"
                    style={{ width: "100%", padding: "10px", fontSize: "0.8rem", background: "#7a6e69", border: "none", color: "white", borderRadius: "6px" }}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear ALL customer reviews?")) {
                        onClearAllReviews();
                        alert("All reviews cleared.");
                      }
                    }}
                  >
                    Clear All Reviews
                  </button>
                </div>

                <div style={{ marginTop: "10px", borderTop: "1px solid var(--border-color)", paddingTop: "15px" }}>
                  <p className="text-xs text-muted mb-1">Restore default cafe menu items and default reviews (Warning: overwrites custom edits):</p>
                  <button
                    type="button"
                    className="start-adding-btn font-mono"
                    style={{ width: "100%", padding: "12px", fontSize: "0.85rem", background: "#d50000", border: "none", color: "white" }}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear custom items and restore default foods/reviews?")) {
                        onResetDefaults();
                        alert("Database restored to factory default data.");
                      }
                    }}
                  >
                    Factory Reset Database
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB: QR CODES GENERATOR */}
          {activeTab === "qr-codes" && (
            <div className="flex-col gap-4" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "15px", background: "var(--white-surface)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <h4 className="font-mono text-sm bold mb-2">Configure Table QR Stand Cards</h4>
                <p className="text-xs text-muted mb-3">
                  This generator creates print-ready dining tent cards. When customers scan the QR code with their mobile phone, the website automatically loads the digital menu and registers their specific table number!
                </p>

                <div className="flex" style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                  <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                    <label className="font-mono text-xs bold">Select Table Number</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={selectedTableForQr}
                      onChange={(e) => setSelectedTableForQr(e.target.value)}
                      style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white" }}
                    />
                  </div>

                  <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 2 }}>
                    <label className="font-mono text-xs bold">Target URL (Base Domain)</label>
                    <input
                      type="text"
                      value={customQrUrl}
                      onChange={(e) => setCustomQrUrl(e.target.value)}
                      placeholder="https://barcode-cafee.vercel.app/"
                      style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "white" }}
                    />
                  </div>
                </div>
              </div>

              {/* Printable Stand Preview */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                <h5 className="font-mono text-xs bold text-muted">LIVE CARD PREVIEW (Printable)</h5>
                
                <div 
                  id="printable-tent-card"
                  style={{
                    width: "280px",
                    padding: "30px 20px",
                    background: "var(--cream-bg)",
                    border: "3px solid var(--dark-espresso)",
                    borderRadius: "16px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    fontFamily: "var(--font-body)"
                  }}
                >
                  <div style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--olive-accent)", letterSpacing: "1px", fontWeight: "bold" }}>WELCOME TO</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: "bold", fontSize: "1.4rem", color: "var(--dark-espresso)", borderBottom: "2px solid var(--border-color)", paddingBottom: "8px", width: "100%", textTransform: "uppercase" }}>
                    Barcode Cafe
                  </div>
                  
                  <div style={{ fontSize: "0.75rem", color: "#555", fontWeight: "600", lineHeight: "1.3" }}>
                    Scan QR Code to browse our menu and order directly to your table!
                  </div>

                  {/* QR Image using Server API */}
                  <div style={{ padding: "10px", background: "white", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <img 
                      src={"https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent((customQrUrl.endsWith("/") ? customQrUrl : customQrUrl + "/") + "?table=" + selectedTableForQr)}
                      alt={"Table " + selectedTableForQr + " QR Code"}
                      style={{ width: "160px", height: "160px", display: "block" }}
                    />
                  </div>

                  <div style={{ background: "var(--dark-espresso)", color: "var(--cream-bg)", padding: "6px 20px", borderRadius: "20px", fontFamily: "monospace", fontSize: "0.9rem", fontWeight: "bold", marginTop: "5px" }}>
                    DINE-IN TABLE #{selectedTableForQr}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="track-tab-btn"
                    style={{ background: "var(--olive-accent)", color: "white", padding: "8px 16px", borderRadius: "8px" }}
                    onClick={() => {
                      const printContent = document.getElementById("printable-tent-card").outerHTML;
                      
                      // Temporary page for print dialog with centered card
                      const printWindow = window.open("", "_blank");
                      printWindow.document.write(
                        "<html><head><title>Print QR Card - Table " + selectedTableForQr + "</title>" +
                        "<style>body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: white; }" +
                        "#printable-tent-card { width: 300px; padding: 40px 30px; border: 4px solid #2d221e !important; border-radius: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; background: #fdfaf2 !important; box-shadow: none !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }</style></head>" +
                        "<body>" + printContent + "<script>window.onload = function() { window.print(); window.close(); }</script></body></html>"
                      );
                      printWindow.document.close();
                    }}
                  >
                    Print Table Card
                  </button>
                  <a
                    href={"https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + encodeURIComponent((customQrUrl.endsWith("/") ? customQrUrl : customQrUrl + "/") + "?table=" + selectedTableForQr)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-tab-btn"
                    style={{ background: "var(--blush-pink)", color: "var(--dark-espresso)", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
                  >
                    Download QR Code Only
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

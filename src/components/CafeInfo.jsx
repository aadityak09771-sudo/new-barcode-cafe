import React, { useState, useEffect } from "react";
import { CAFE_INFO } from "../menu-data";
import { MapPin, Phone, Star, Clock, MessageSquare, ChevronLeft, ChevronRight, Trash2, Plus, X } from "lucide-react";

const Instagram = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ZomatoLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "2px" }}>
    <path d="M50 15C38 30 32 45 37 60C42 75 58 80 65 72C70 65 70 50 58 40C48 32 46 25 50 15Z" fill="white" />
    <path d="M42 38C35 44 32 52 34 60C36 68 46 72 52 65" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SwiggyLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "2px" }}>
    <path d="M50 15C32 15 25 25 25 40C25 50 30 55 35 55C42 55 45 45 50 45C55 45 58 55 65 55C70 55 75 50 75 40C75 25 68 15 50 15Z" fill="white" />
    <path d="M50 45V85" stroke="white" strokeWidth="10" strokeLinecap="round" />
    <circle cx="50" cy="85" r="5" fill="white" />
  </svg>
);

const JustdialLogo = ({ size = 20 }) => (
  <svg width={size * 1.5} height={size} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "2px" }}>
    <rect width="80" height="40" rx="8" fill="#FF9900" />
    <text x="40" y="28" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Jd</text>
  </svg>
);


export default function CafeInfo({ 
  reviews = [], 
  gallery = [], 
  isAdminAuthenticated = false, 
  onDeleteGalleryImage,
  onReorderGallery,
  onAddGalleryImage
}) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [statusText, setStatusText] = useState("");

  // Vibes gallery states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newFileBase64, setNewFileBase64] = useState("");

  // Drag and Drop ordering state
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    // Swap items in real-time for fluid preview
    const newGallery = [...gallery];
    const draggedItem = newGallery[draggedIdx];
    newGallery.splice(draggedIdx, 1);
    newGallery.splice(index, 0, draggedItem);

    setDraggedIdx(index);
    onReorderGallery(newGallery);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewFileBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetUploadForm = () => {
    setNewCaption("");
    setNewUrl("");
    setNewFileBase64("");
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    const finalImage = newFileBase64 || newUrl;
    if (!finalImage || !newCaption) {
      alert("Please upload a photo file or paste a URL, and specify a caption.");
      return;
    }

    onAddGalleryImage({
      image: finalImage,
      caption: newCaption
    });

    setIsUploadModalOpen(false);
    resetUploadForm();
    alert("New photo added to Vibes Gallery!");
  };

  // Review Slider logic
  const handlePrevReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    if (reviews.length === 0) return;
    setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll reviews
  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(handleNextReview, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  // Compute Open / Closed status
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeString = `${currentHours.toString().padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;

      const openTime = CAFE_INFO.hours.open;
      const closeTime = CAFE_INFO.hours.close;

      if (currentTimeString >= openTime && currentTimeString <= closeTime) {
        setIsOpenNow(true);
        // Calculate hours remaining
        const [closeH, closeM] = closeTime.split(":").map(Number);
        let diffH = closeH - currentHours;
        let diffM = closeM - currentMinutes;
        if (diffM < 0) {
          diffM += 60;
          diffH -= 1;
        }
        setStatusText(`Open Now · Closes at 11:30 PM (in ${diffH}h ${diffM}m)`);
      } else {
        setIsOpenNow(false);
        setStatusText("Closed · Opens at 11:00 AM");
      }
    };

    checkOpenStatus();
    // Update every minute
    const statusInterval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(statusInterval);
  }, []);

  return (
    <section id="info" className="info-section">
      <div className="section-header">
        <h2 className="elegant-title">CAFE VIBES</h2>
        <p className="text-muted mt-2">Located in Ratan Lal Nagar, Kanpur</p>
      </div>

      <div className="info-grid">
        {/* Contact & Hours Card */}
        <div className="info-card-pink">
          <h3>Cafe Details</h3>
          <div className="info-details-list">
            <div className="info-detail-item">
              <Clock className="info-icon text-green" size={20} />
              <div>
                <span className={`status-badge ${isOpenNow ? "open" : "closed"} font-mono`}>
                  {isOpenNow ? "● OPEN" : "○ CLOSED"}
                </span>
                <p className="status-subtext text-muted small mt-1">{statusText}</p>
              </div>
            </div>

            <div className="info-detail-item">
              <MapPin className="info-icon text-green" size={20} />
              <div>
                <h4>Address</h4>
                <p className="text-muted text-sm">{CAFE_INFO.address}</p>
                <a
                  href={CAFE_INFO.gmapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link text-xs font-mono mt-1"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            <div className="info-detail-item">
              <Phone className="info-icon text-pink" size={20} />
              <div>
                <h4>Call & Order</h4>
                <p className="text-muted font-mono">{CAFE_INFO.phone}</p>
                <div className="flex gap-2 mt-1">
                  <a href={`tel:${CAFE_INFO.phone.replace(/\s+/g, "")}`} className="inline-link text-xs font-mono">
                    Call
                  </a>
                  <span className="text-muted">|</span>
                  <a
                    href={`https://wa.me/917348492014?text=Hi%20Barcode%20Cafe,%20I'd%20like%20to%20order%20food`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link text-xs font-mono"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="info-detail-item">
              <Instagram className="info-icon text-pink" size={20} />
              <div>
                <h4>Instagram Social</h4>
                <p className="text-muted text-sm">@baarcod__cafe__</p>
                <a
                  href={CAFE_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link text-xs font-mono mt-1"
                >
                  Follow for Live Music Updates →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Reviews Slider Card */}
        <div className="info-card-olive flex-col-between">
          <div>
            <div className="flex-row-between mb-4">
              <div className="flex-row-center gap-2">
                <Star className="text-green fill-green" size={22} />
                <h3 className="no-margin">Google Reviews</h3>
              </div>
              <div className="rating-badge font-mono">
                <span>{CAFE_INFO.rating}</span>
                <span className="text-muted">/5</span>
                <span className="text-xs text-muted block">({CAFE_INFO.reviewCount} Reviews)</span>
              </div>
            </div>

            <div className="reviews-carousel">
              {reviews.length > 0 ? (
                <div className="review-slide active">
                  <div className="review-stars mb-2">
                    {Array.from({ length: reviews[activeReviewIdx]?.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-green fill-green inline" />
                    ))}
                  </div>
                  <p className="review-text italic">
                    "{reviews[activeReviewIdx]?.text}"
                  </p>
                  <h5 className="review-author text-pink font-mono mt-4">
                    - {reviews[activeReviewIdx]?.author}
                  </h5>
                </div>
              ) : (
                <div className="review-slide active">
                  <p className="review-text italic">"Be the first to review Barcode Cafe!"</p>
                </div>
              )}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-control-btn" onClick={handlePrevReview} aria-label="Previous review">
              <ChevronLeft size={18} />
            </button>
            <div className="carousel-dots">
              {reviews.map((_, idx) => (
                <span
                  key={idx}
                  className={`carousel-dot ${activeReviewIdx === idx ? "active" : ""}`}
                  onClick={() => setActiveReviewIdx(idx)}
                />
              ))}
            </div>
            <button className="carousel-control-btn" onClick={handleNextReview} aria-label="Next review">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Vibe Gallery */}
      <div className="vibe-gallery-section" style={{ marginTop: "40px" }}>
        <div className="section-header text-center" style={{ marginBottom: "25px" }}>
          <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--dark-espresso)", margin: "0 0 8px 0" }}>Our Vibe & Celebrations</h3>
          <p className="text-muted text-sm" style={{ margin: 0 }}>Take a look at the magical celebrations, aesthetic decor, and moments shared at Barcode Cafe.</p>
        </div>
        
        <div className="vibe-gallery-grid">
          {gallery.map((item, index) => {
            // Assign size styles based on index to create a premium masonry mosaic
            let sizeClass = "size-normal";
            const mod = index % 6;
            if (mod === 0) sizeClass = "size-large";
            else if (mod === 1 || mod === 4) sizeClass = "size-tall";
            else if (mod === 3) sizeClass = "size-wide";

            return (
              <div 
                key={item.id} 
                className={`vibe-gallery-item ${sizeClass} ${draggedIdx === index ? "dragging" : ""}`}
                draggable={isAdminAuthenticated}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <img 
                  src={item.image} 
                  alt={item.caption || "Cafe Vibe"} 
                  className="vibe-gallery-img"
                  loading="lazy"
                />
                
                {/* Caption Overlay */}
                <div className="vibe-gallery-overlay">
                  <p className="vibe-gallery-caption font-mono">{item.caption}</p>
                </div>

                {/* Admin Quick Delete Overlay */}
                {isAdminAuthenticated && (
                  <button
                    className="gallery-quick-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm("Are you sure you want to remove this image from the gallery?")) {
                        onDeleteGalleryImage(item.id);
                      }
                    }}
                    title="Remove Image"
                    aria-label="Remove Image"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Admin Add Image Placeholder Card */}
          {isAdminAuthenticated && (
            <div 
              className="vibe-gallery-item size-normal add-vibe-placeholder-card"
              onClick={() => setIsUploadModalOpen(true)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed var(--pink-accent)",
                background: "var(--cream-bg)",
                gap: "10px",
                cursor: "pointer",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                padding: "20px"
              }}
            >
              <Plus size={32} className="text-pink animate-pulse" />
              <span className="font-mono text-xs bold" style={{ color: "var(--dark-espresso)", textAlign: "center" }}>+ Add Vibe Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Inline Quick Image Upload Modal */}
      {isUploadModalOpen && (
        <div className="modal-backdrop" style={{ zIndex: 1000 }}>
          <div className="modal-content glass-card" style={{ maxWidth: "450px", padding: "30px", background: "var(--cream-bg)" }}>
            <button 
              className="modal-close-btn" 
              onClick={() => {
                setIsUploadModalOpen(false);
                resetUploadForm();
              }}
              aria-label="Close"
            >
              <X size={22} style={{ color: "var(--dark-espresso)" }} />
            </button>

            <div className="modal-header text-center" style={{ marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--dark-espresso)", margin: "0 0 6px 0" }}>Add Vibe Image</h3>
              <p className="text-muted text-xs" style={{ margin: 0 }}>Upload a celebration/decor photo to the Vibes section.</p>
            </div>

            <form onSubmit={handleInlineSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Caption / Description *</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday Celebration decor"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "white" }}
                  required
                />
              </div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Upload Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ fontSize: "0.85rem", padding: "5px 0" }}
                />
              </div>

              <div className="text-center font-mono text-xs text-muted">— OR —</div>

              <div className="flex-col" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label className="font-mono text-xs bold">Paste Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "white" }}
                />
              </div>

              {(newFileBase64 || newUrl) && (
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  <span className="text-xs text-muted block mb-1">Image Preview:</span>
                  <img
                    src={newFileBase64 || newUrl}
                    alt="Preview"
                    style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)", margin: "0 auto" }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="place-order-btn font-mono"
                style={{ background: "var(--olive-accent)", color: "white", marginTop: "10px" }}
              >
                Save to Vibes Gallery
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delivery & Partner Badges Card */}
      <div className="info-card-partners mt-8 font-mono text-center" style={{ marginTop: "35px", padding: "30px", background: "var(--white-surface)", borderRadius: "24px", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-card)" }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", fontFamily: "var(--font-display)", fontWeight: "bold" }}>Find Us On Delivery & Search Platforms!</h3>
        <p className="text-muted text-sm mb-4">Craving Barcode Cafe at home? Order online or review our listings on our partner networks:</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
          
          {/* Zomato */}
          <a
            href="https://www.zomato.com/kanpur/barcode-cafe-ratan-lal-nagar"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "15px",
              background: "#cb202d",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              boxShadow: "0 4px 10px rgba(203, 32, 45, 0.2)",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <ZomatoLogo size={22} /> Zomato Order
          </a>

          {/* Swiggy */}
          <a
            href="https://www.swiggy.com/restaurants/barcode-cafe-ratan-lal-nagar-kanpur"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "15px",
              background: "#fc8019",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              boxShadow: "0 4px 10px rgba(252, 128, 25, 0.2)",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <SwiggyLogo size={22} /> Swiggy Delivery
          </a>

          {/* Justdial */}
          <a
            href="https://www.justdial.com/Kanpur/Barcode-Cafe-Ratan-Lal-Nagar/0512PX512-X512-230919172421-E5P3_BZDET"
            target="_blank"
            rel="noopener noreferrer"
            className="partner-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "15px",
              background: "#005691",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              boxShadow: "0 4px 10px rgba(0, 86, 145, 0.2)",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <JustdialLogo size={22} /> Justdial Search
          </a>

        </div>
      </div>
    </section>
  );
}

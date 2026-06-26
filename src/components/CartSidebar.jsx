import React, { useState, useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, Receipt, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  discountClaimed,
  tableNumber,
  onRecordSale
}) {
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [selectedTable, setSelectedTable] = useState(tableNumber || "Takeaway");

  // Keep state sync'd when tableNumber prop loads or changes
  useEffect(() => {
    if (tableNumber) {
      setSelectedTable(tableNumber);
    }
  }, [tableNumber]);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = discountClaimed ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  // Simple pseudo-barcode generator (turns a string into SVG vertical line paths)
  const drawBarcode = (value) => {
    const bars = [];
    let position = 10;
    
    // Seeded random sequence based on value hash
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate ~48 lines of varying widths
    for (let i = 0; i < 48; i++) {
      const bit = Math.abs((hash >> (i % 31)) & 1);
      const doubleBit = Math.abs((hash >> ((i + 3) % 31)) & 1);
      const width = bit ? (doubleBit ? 4 : 2) : 1;
      const draw = (i % 2 === 0); // Alternate line and space

      if (draw) {
        bars.push(
          <rect
            key={i}
            x={position}
            y={5}
            width={width}
            height={50}
            fill="black"
          />
        );
      }
      position += width + (draw ? 1 : 2);
    }

    return (
      <svg width={position + 10} height={70} className="mx-auto">
        <rect width="100%" height="100%" fill="white" />
        {bars}
        <text x="50%" y="65" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="black">
          {value}
        </text>
      </svg>
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);

    const orderId = `BC-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString();

    // 1. Build WhatsApp message text
    let message = `*BARCODE CAFE ORDER*\n`;
    message += `-------------------\n`;
    message += `*Order ID:* ${orderId}\n`;
    message += `*Location:* ${selectedTable === "Takeaway" ? "Takeaway / Pickup" : `Table ${selectedTable}`}\n`;
    message += `*Time:* ${timestamp}\n`;
    message += `-------------------\n\n`;
    message += `*Items:*\n`;
    
    cartItems.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price} each) = ₹${item.price * item.quantity}\n`;
    });
    
    message += `\n`;
    message += `-------------------\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    if (discount > 0) {
      message += `*10% Scan Discount:* -₹${discount}\n`;
    }
    message += `*GRAND TOTAL:* ₹${total}\n`;
    message += `-------------------\n`;
    message += `Thank you! We serve passion in every byte ☕`;

    // 2. Record sale locally in localStorage
    if (onRecordSale) {
      onRecordSale({
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total,
        tableNumber: selectedTable
      });
    }

    // 3. Open WhatsApp link to send dispatch message
    const waPhone = "917348492014"; // The owner's WhatsApp number
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;

    // Simulate sending order to kitchen
    setTimeout(() => {
      const newReceipt = {
        orderId,
        items: [...cartItems],
        subtotal,
        discount,
        total,
        timestamp,
        tableNumber: selectedTable
      };

      setOrderReceipt(newReceipt);
      setIsPlacing(false);
      onClearCart();

      // Open WhatsApp in new tab
      window.open(waUrl, "_blank");

      // Fun confetti explosion!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e2b4a6", "#7f8b6e", "#2d221e", "#ffffff"]
      });
    }, 1500);
  };

  const closeReceipt = () => {
    setOrderReceipt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar-backdrop">
      <div className="cart-sidebar">
        {/* Cart Header */}
        <div className="cart-header">
          <div className="flex-row-center gap-2">
            <ShoppingBag className="text-green" size={22} />
            <h2>Your Order</h2>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Display: Receipt vs Cart Items */}
        {orderReceipt ? (
          <div className="receipt-view">
            <div className="thermal-receipt">
              <div className="receipt-header">
                <h3>BARCODE CAFE</h3>
                <p>571, Ratan Lal Nagar, Kanpur</p>
                <p className="font-mono text-xs">{CAFE_INFO.phone}</p>
                <div className="receipt-divider"></div>
                <h4 className="receipt-title">ORDER RECEIPT</h4>
              </div>

              <div className="receipt-details font-mono">
                <p><span>Order ID:</span> <span>{orderReceipt.orderId}</span></p>
                <p><span>Time:</span> <span>{orderReceipt.timestamp}</span></p>
                <p><span>Location:</span> <span>{orderReceipt.tableNumber === "Takeaway" ? "Takeaway" : `Table ${orderReceipt.tableNumber}`}</span></p>
                <p><span>Server:</span> <span>Terminal-01</span></p>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-items font-mono">
                {orderReceipt.items.map((item) => (
                  <div key={item.id} className="receipt-item">
                    <div className="item-name-row">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <div className="item-price-row">
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-totals font-mono">
                <p><span>Subtotal:</span> <span>₹{orderReceipt.subtotal}</span></p>
                {orderReceipt.discount > 0 && (
                  <p className="text-green"><span>10% Scan Discount:</span> <span>-₹{orderReceipt.discount}</span></p>
                )}
                <div className="receipt-divider-dotted"></div>
                <p className="receipt-grand-total"><span>TOTAL:</span> <span>₹{orderReceipt.total}</span></p>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-barcode font-mono text-center">
                <p className="mb-2">Scan at Kitchen Counter</p>
                {drawBarcode(orderReceipt.orderId)}
              </div>

              <div className="receipt-footer">
                <p>Thank you for visiting Barcode Cafe!</p>
                <p>We serve passion in every byte ☕</p>
              </div>
            </div>

            <button className="receipt-close-action-btn font-mono" onClick={closeReceipt}>
              Close & Start New Order <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        ) : (
          <div className="cart-content-wrapper">
            {cartItems.length === 0 ? (
              <div className="empty-cart flex-col-center">
                <Receipt size={64} className="text-muted mb-4 stroke-1" />
                <p>Your cart is empty</p>
                <button className="start-adding-btn" onClick={onClose}>
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    return (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <span className="cart-item-price font-mono text-green">
                            ₹{item.price} each
                          </span>
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-controller">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="quantity font-mono">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            className="remove-item-btn text-magenta"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cart Footer / Totals */}
                <div className="cart-totals-section">
                  {/* Table Selection Dropdown */}
                  <div className="cart-bill-row" style={{ marginBottom: "15px", flexDirection: "column", alignItems: "flex-start", gap: "5px" }}>
                    <label className="font-mono text-xs bold" style={{ color: "var(--dark-espresso)" }}>Select Table Number:</label>
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        background: "var(--white-surface)",
                        fontSize: "0.9rem",
                        fontFamily: "monospace",
                        color: "var(--dark-espresso)"
                      }}
                    >
                      <option value="Takeaway">Takeaway / Self-Pickup</option>
                      {Array.from({ length: 15 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1)}>Table {i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="cart-bill-row">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>
                  {discountClaimed && (
                    <div className="cart-bill-row text-green">
                      <span>10% Scan Discount</span>
                      <span className="font-mono">-₹{discount}</span>
                    </div>
                  )}
                  <div className="divider"></div>
                  <div className="cart-bill-row grand-total">
                    <span>Total Amount</span>
                    <span className="font-mono text-green">₹{total}</span>
                  </div>

                  <button
                    className="place-order-btn font-mono"
                    onClick={handleCheckout}
                    disabled={isPlacing}
                  >
                    {isPlacing ? "TRANSMITTING ORDER..." : "PLACE ORDER & SEND WHATSAPP"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const CAFE_INFO = {
  phone: "073484 92014"
};

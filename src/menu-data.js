import pizzaImg from "./assets/pizza.jpg";
import pastaImg from "./assets/pasta.jpg";
import sandwichImg from "./assets/sandwich.jpg";
import shakeImg from "./assets/shake.jpg";
import coffeeImg from "./assets/coffee.jpg";
import logoImg from "./assets/logo.jpg";

export const CAFE_INFO = {
  name: "BARCODE CAFE",
  phone: "073484 92014",
  address: "571, Dabouli-1, Neemeshwar MahaMandir Society, Ratan Lal Nagar, Kanpur, Uttar Pradesh 208022",
  gmapsLink: "https://maps.app.goo.gl/uX73xQv8y6kU2m1n9",
  rating: 4.5,
  reviewCount: 47,
  instagram: "https://www.instagram.com/baarcod__cafe__/",
  reviews: [
    { id: 1, author: "Food_milai_jodi", rating: 5, text: "Beautiful place and good food. Taste was great! Tried noodles, hot coffee, honey chilli potato and nuggets. Enjoy your meal with family!" },
    { id: 2, author: "Himanshu Singh", rating: 5, text: "This place has the best vibe and a cozy atmosphere. A coffee shop is more than a place; it's an experience in every sip. Fantastic taste!" },
    { id: 3, author: "Pratik Thacker", rating: 5, text: "The food was amazing. Really loved it. Good food, good atmosphere and good service. Highly recommended to all." },
    { id: 4, author: "Ishita", rating: 5, text: "Ambiance bhut pyara hai or sitting area bhi acha hai kaafi. Food is so good I can't explain! Highly budget friendly." },
    { id: 5, author: "Priyanshi Srivastava", rating: 5, text: "Amazing experience! Offers incredibly tasty food at budget-friendly prices. Each dish was bursting with flavor and fresh ingredients." },
    { id: 6, author: "Ranjit Gutam", rating: 5, text: "Must visit! Just loved their Italian pasta and pizza sandwich. Their thick shakes were absolute heaven." },
    { id: 7, author: "Jitendra Kushwaha", rating: 5, text: "A perfect dreamy cafe to eat. Perfect aesthetic vibes with high quality meals at reasonable price. A perfect experience." },
    { id: 8, author: "Kartik S4", rating: 5, text: "Best place to spend time with your friends and enjoy. Reasonable price and good vibes as well!" },
    { id: 9, author: "Ankush Gupta", rating: 5, text: "Best place I have visited. Superb taste with good ambience and perfect pricing." },
    { id: 10, author: "Sameer Verma", rating: 5, text: "Outstanding taste, staff behaviour is good and food presentation was awesome." },
    { id: 11, author: "Vaibhav Pandey", rating: 5, text: "Amazing food and best cafe for couples and friend groups. Taste is outstanding and fully in budget." },
    { id: 12, author: "Jayesh Sharma", rating: 5, text: "Positive atmosphere and staff is also good. At this price, the quality and quantity is highly appreciable." },
    { id: 13, author: "Krish Kumar", rating: 5, text: "Amazing experience! The noodles and the chilly paneer was outstanding. Absolutely loved it!" },
    { id: 14, author: "Sonia Marwah", rating: 5, text: "Food was very delicious, and the ambience is very good." },
    { id: 15, author: "Mahek Srivastava", rating: 5, text: "Pleasant, soothing ambience and awesome taste." },
    { id: 16, author: "Ishan Srivastava", rating: 5, text: "Wonderful service with fantastic taste!!" },
    { id: 17, author: "Raj Yadav", rating: 5, text: "Commendable service, great food." },
    { id: 18, author: "Abhay Sengar", rating: 4, text: "Good food, early service, and good prices." },
    { id: 19, author: "Shreya", rating: 5, text: "Good food, good ambience." },
    { id: 20, author: "Tanya Srivastava", rating: 5, text: "Excellent experience and great customer care." },
    { id: 21, author: "Yash Raj", rating: 5, text: "Nice cafeeeee! Love the vibes here." },
    { id: 22, author: "Sneha Gupta", rating: 5, text: "Superb taste with good ambience and perfect pricing." },
    { id: 23, author: "Aditya Mishra", rating: 5, text: "Perfect Aesthetic Vibes with high quality meals at reasonable price." },
    { id: 24, author: "Rohit Verma", rating: 4, text: "Good food, good atmosphere and good service." },
    { id: 25, author: "Ishita Kapoor", rating: 5, text: "Appreciate the budget-friendly prices, Italian pasta, pizza sandwiches, and thick shakes." }
  ],
  hours: {
    open: "11:00",
    close: "23:30"
  }
};

export const MENU_ITEMS = [
  // --- MAGGIE (Indian street style cooked yellow masala noodles with veggies, no eggs) ---
  { id: "mg1", name: "Plain Maggi", price: 49, description: "Classic hot instant noodles prepared plain and warm, just like home.", category: "maggie", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a3e?w=400&q=80" },
  { id: "mg2", name: "Masala Maggi", price: 59, description: "Instant noodles prepared with extra aromatic spices and chopped veggies.", category: "maggie", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a3e?w=400&q=80", badge: "Popular" },
  { id: "mg3", name: "Paneer Maggi", price: 79, description: "Spicy instant noodles loaded with soft paneer cubes.", category: "maggie", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a3e?w=400&q=80" },
  { id: "mg4", name: "Butter Maggi", price: 79, description: "Classic noodles prepared with a rich dollop of salted butter.", category: "maggie", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a3e?w=400&q=80" },
  { id: "mg5", name: "Cheese Maggi", price: 89, description: "Creamy instant noodles loaded with melted cheese.", category: "maggie", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80" },
  { id: "mg6", name: "Cheese Corn Maggi", price: 89, description: "Creamy noodles prepared with sweet corn kernels and melted cheese.", category: "maggie", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80" },
  { id: "mg7", name: "Cheese Paneer Maggi", price: 99, description: "Deluxe noodles loaded with paneer blocks and rich cheese.", category: "maggie", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80" },
  { id: "mg8", name: "Barcode Special Maggi", price: 99, description: "Our chef's specialty Maggi prepared with secret barcode herbs and spices.", category: "maggie", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a3e?w=400&q=80", badge: "Chef's Special" },

  // --- BURGER ---
  { id: "bg1", name: "Aloo Tikki Burger", price: 59, description: "Crisp potato patty with fresh onion, tomato slices, and secret burger sauce.", category: "burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { id: "bg2", name: "Veg Burger", price: 69, description: "Mixed vegetable patty with greens, mayonnaise, and dynamic herbs.", category: "burger", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80" },
  { id: "bg3", name: "Cheese Delight Burger", price: 89, description: "Gourmet vegetable patty loaded with a thick slice of cheddar cheese.", category: "burger", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&q=80", badge: "Bestseller" },
  { id: "bg4", name: "Tandoori Burger", price: 89, description: "Spiced patty with smoky tandoori sauce and fresh veggies.", category: "burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80" },
  { id: "bg5", name: "Paneer Burger", price: 99, description: "Crispy fried paneer slab layered with fresh lettuce and cream sauce.", category: "burger", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80" },

  // --- SANDWICH ---
  { id: "sw1", name: "Veg Sandwich", price: 59, description: "Fresh sliced sandwich with butter, mint chutney, and raw vegetables.", category: "sandwich", image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&q=80" },
  { id: "sw2", name: "Veg Grilled Sandwich", price: 79, description: "Toasted golden grilled sandwich filled with seasoned vegetables.", category: "sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80" },
  { id: "sw3", name: "Paneer Tikka Sandwich", price: 88, description: "Grilled sandwich loaded with marinated tandoori paneer chunks.", category: "sandwich", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80", badge: "Trending" },
  { id: "sw4", name: "Cheese Corn Sandwich", price: 89, description: "Melted cheese and sweetcorn kernels grilled in buttered bread.", category: "sandwich", image: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=400&q=80" },
  { id: "sw5", name: "Tandoori Sandwich", price: 99, description: "Spicy grilled sandwich with vegetables tossed in rich tandoori mayonnaise.", category: "sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80" },
  { id: "sw6", name: "Cheesy Pizza Sandwich", price: 99, description: "Open toasted sandwich layered with pizza sauce, capsicum, olives, and mozzarella.", category: "sandwich", image: "https://images.unsplash.com/photo-1540713434306-585258ecc37b?w=400&q=80", badge: "Highly Rated" },

  // --- PASTA ---
  { id: "ps1", name: "White Sauce Pasta", price: 129, description: "Penne tossed in a velvety, rich white cheese sauce with herbs.", category: "pasta", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80" },
  { id: "ps2", name: "Red Sauce Pasta", price: 129, description: "Penne in a tangy, spicy red plum tomato sauce with fresh basil.", category: "pasta", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
  { id: "ps3", name: "Makhni Pasta", price: 139, description: "Indo-Italian fusion pasta in a creamy, sweet-spicy makhani gravy.", category: "pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80" },
  { id: "ps4", name: "Pink Sauce Pasta", price: 149, description: "Penne cooked in a blend of rich cream sauce and tomato concassé.", category: "pasta", image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0bc6?w=400&q=80", badge: "Chef's Special" },

  // --- MOCKTAILS ---
  { id: "mk1", name: "Cold Drink", price: 29, description: "Chilled carbonated soft drinks.", category: "mocktails", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
  { id: "mk2", name: "Masala Colddrink", price: 49, description: "Soft drink spiked with black salt, lemon, and spice powders.", category: "mocktails", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
  { id: "mk3", name: "Masala Lemonade", price: 49, description: "Refreshing sweet and sour soda flavored with chat masala.", category: "mocktails", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
  { id: "mk4", name: "Virgin Mojito", price: 69, description: "Classic coolers with fresh lime, mint leaves, and white sugar syrup.", category: "mocktails", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80", badge: "Refreshing" },
  { id: "mk5", name: "Blue Berry", price: 69, description: "Vibrant sweet blueberry syrup mocktail blended with soda.", category: "mocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
  { id: "mk6", name: "Blue Lagoon", price: 69, description: "Ocean blue curacao syrup mocktail with lemon juice and soda.", category: "mocktails", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
  { id: "mk7", name: "Kiwi Mint", price: 69, description: "Exotic kiwi and mint syrup blend served chilled.", category: "mocktails", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
  { id: "mk8", name: "Black Currant", price: 69, description: "Sweet, tart black currant mocktail served over crushed ice.", category: "mocktails", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80" },
  { id: "mk9", name: "Strawberry", price: 69, description: "Sweet strawberry crush blended with carbonated water.", category: "mocktails", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80" },
  { id: "mk10", name: "Watermelon", price: 69, description: "Cool summer melon mocktail with mint garnishing.", category: "mocktails", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80" },

  // --- THICK SHAKE ---
  { id: "ts1", name: "Oreo Thick Shake", price: 99, description: "Super thick milkshake blended with vanilla ice cream and Oreos.", category: "thick-shake", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80" },
  { id: "ts2", name: "Chocolate Shake", price: 99, description: "Creamy chocolate ice cream blended with fudge and cocoa syrup.", category: "thick-shake", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80" },
  { id: "ts3", name: "Kit Kat Shake", price: 99, description: "Thick milk shake blended with crunchy Kit Kat bars.", category: "thick-shake", image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400&q=80", badge: "Must Try" },
  { id: "ts4", name: "Almond Shake", price: 99, description: "Warm/Cold shake blended with almonds and milk solids.", category: "thick-shake", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80" },
  { id: "ts5", name: "Hazelnut Shake", price: 99, description: "Creamy hazelnut paste blended with ice cream and milk.", category: "thick-shake", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=400&q=80" },
  { id: "ts6", name: "Strawberry Thick Shake", price: 99, description: "Artisanal strawberry shake topped with strawberry sauce.", category: "thick-shake", image: "https://images.unsplash.com/photo-1553787499-6f9133860242?w=400&q=80" },
  { id: "ts7", name: "Vanilla Thick Shake", price: 99, description: "Creamy thick vanilla extract shake.", category: "thick-shake", image: "https://images.unsplash.com/photo-1586959142239-0f470d56ee36?w=400&q=80" },
  { id: "ts8", name: "Butter Scotch Thick Shake", price: 99, description: "Rich butterscotch granules blended with caramel drizzle.", category: "thick-shake", image: "https://images.unsplash.com/photo-1586195830916-246f54936a30?w=400&q=80" },
  { id: "ts9", name: "Black Currant Thick Shake", price: 99, description: "Thick black currant base shake.", category: "thick-shake", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
  { id: "ts10", name: "Kesar Badam Shake", price: 99, description: "Traditional saffron and almond milk shake.", category: "thick-shake", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80" },
  { id: "ts11", name: "Banana Thick Shake", price: 99, description: "Nutritious thick banana shake.", category: "thick-shake", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80" },

  // --- BASIC SHAKES ---
  { id: "bs1", name: "Basic Oreo Shake", price: 69, description: "Light shake with milk and crushed Oreos.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=80" },
  { id: "bs2", name: "Basic Strawberry Shake", price: 69, description: "Standard milk shake flavored with sweet strawberry crush.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1553787499-6f9133860242?w=400&q=80" },
  { id: "bs3", name: "Basic Vanilla Shake", price: 69, description: "Traditional vanilla-flavored cold milkshake.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1586959142239-0f470d56ee36?w=400&q=80" },
  { id: "bs4", name: "Basic Chocolate Shake", price: 69, description: "Chilled milk shake with dark chocolate syrup.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80" },
  { id: "bs5", name: "Basic Butter Scotch Shake", price: 69, description: "Light butterscotch-flavored milkshake.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1586195830916-246f54936a30?w=400&q=80" },
  { id: "bs6", name: "Basic Black Currant Shake", price: 69, description: "Classic black currant shake.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80" },
  { id: "bs7", name: "Basic Blueberry Shake", price: 69, description: "Light blueberry flavored shake.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
  { id: "bs8", name: "Basic Banana Shake", price: 69, description: "Simple cold banana milkshake.", category: "basic-shakes", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80" },

  // --- FRIES ---
  { id: "fr1", name: "Salted Fries", price: 49, description: "Crisp potato fries sprinkled with table salt.", category: "fries", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&q=80" },
  { id: "fr2", name: "Masala Fries", price: 59, description: "Golden fries tossed in spicy chat masala.", category: "fries", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80" },
  { id: "fr3", name: "Peri Peri Fries", price: 79, description: "Crispy fries dusted with fiery African peri-peri spices.", category: "fries", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&q=80", badge: "Popular" },
  { id: "fr4", name: "Cheesy Fries", price: 89, description: "Warm golden fries smothered in melted liquid cheese sauce.", category: "fries", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
  { id: "fr5", name: "Makhani Fries", price: 89, description: "Potato fries loaded with rich, sweet-spicy butter gravy.", category: "fries", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&q=80" },

  // --- DRINKS ---
  { id: "dk1", name: "Chocolate Coffee", price: 49, description: "Chilled cold coffee with chocolate syrup drizzle.", category: "drinks", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80" },
  { id: "dk2", name: "Cold Coffee", price: 59, description: "Classic creamy blended cold coffee.", category: "drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80", badge: "Bestseller" },
  { id: "dk3", name: "Hot Chocolate", price: 59, description: "Rich, warm milk beverage with melted dark chocolate.", category: "drinks", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
  { id: "dk4", name: "Thick Cold Coffee", price: 69, description: "Ultra-thick, rich cold coffee blend.", category: "drinks", image: "https://images.unsplash.com/photo-1461023058043-07fc21e7d85f?w=400&q=80" },
  { id: "dk5", name: "Cold Coffee With Ice Cream", price: 79, description: "Blended cold coffee served topped with vanilla ice cream.", category: "drinks", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80", badge: "Bestseller" },

  // --- NUGGETS ---
  { id: "ng1", name: "Chilly Flakes Nuggets", price: 69, description: "Crispy veg nuggets tossed with hot red chili flakes.", category: "nuggets", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80" },
  { id: "ng2", name: "Cheese Shots", price: 89, description: "Crispy breaded bites filled with hot melted cheese.", category: "nuggets", image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&q=80" },
  { id: "ng3", name: "Cheese Corn Bites", price: 89, description: "Golden fried bites with cheese and sweetcorn stuffings.", category: "nuggets", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80" },

  // --- NOODLES ---
  { id: "nl1", name: "Veg Noodles", price: 69, description: "Stir-fried noodles with fresh spring vegetables and soy sauce.", category: "noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80" },
  { id: "nl2", name: "Hakka Noodles", price: 79, description: "Indo-Chinese street style salted garlic stir-fry noodles.", category: "noodles", image: "https://images.unsplash.com/photo-1612966608967-3e2b747ff444?w=400&q=80" },
  { id: "nl3", name: "Singapore Noodles", price: 99, description: "Curry-flavored stir-fry noodles with rich spices and vegetables.", category: "noodles", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=80" },
  { id: "nl4", name: "Schezwan Noodles", price: 99, description: "Fiery wok-tossed noodles in hot garlic Schezwan chili paste.", category: "noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80", badge: "Spicy" },
  { id: "nl5", name: "Chilly Garlic Noodles", price: 99, description: "Stir-fried noodles infused with minced garlic and green chilies.", category: "noodles", image: "https://images.unsplash.com/photo-1612966608967-3e2b747ff444?w=400&q=80" },
  { id: "nl6", name: "Barcode Special Noodles", price: 119, description: "Signature noodles stir-fried in our chef's secret spicy barcode sauces.", category: "noodles", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&q=80", badge: "Must Try" },
  { id: "nl7", name: "Paneer Noodles", price: 119, description: "Classic stir-fry noodles loaded with grilled paneer blocks.", category: "noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80" },

  // --- MOMOS (Specific authentic dumplings, steamed and fried) ---
  { id: "mm1", name: "Veg Momos (Steam)", price: 59, description: "Steamed dumplings filled with finely chopped cabbage, onion, and carrots.", category: "momos", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80" },
  { id: "mm2", name: "Veg Momos (Fry)", price: 69, description: "Golden fried vegetable dumplings served with spicy garlic-red chili dip.", category: "momos", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },
  { id: "mm3", name: "Paneer Momos (Steam)", price: 79, description: "Steamed dumplings filled with seasoned paneer blocks.", category: "momos", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=400&q=80" },
  { id: "mm4", name: "Kurkure Momos", price: 89, description: "Dumplings coated in crispy cornflakes batter and deep fried.", category: "momos", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", badge: "Bestseller" },
  { id: "mm5", name: "Tandoori Momos", price: 89, description: "Dumplings marinated in tikka spices and cooked in clay oven style.", category: "momos", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80" },

  // --- WRAPS ---
  { id: "wp1", name: "Aloo Tikki Wrap", price: 69, description: "Soft tortilla rolling crispy potato patty, raw onions, and chat sauces.", category: "wraps", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f06?w=400&q=80" },
  { id: "wp2", name: "Veg Tandoori Wrap", price: 89, description: "Mixed veg nuggets wrapped with lettuce and smoky tandoori sauce.", category: "wraps", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" },
  { id: "wp3", name: "Paneer Wrap", price: 99, description: "Tortilla wrap filled with seasoned grilled paneer blocks.", category: "wraps", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f06?w=400&q=80", badge: "Popular" },
  { id: "wp4", name: "Cheesy Pizza Wrap", price: 99, description: "Wrap loaded with pizza toppings, sauce, and melted mozzarella.", category: "wraps", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" },
  { id: "wp5", name: "Maharaja Wrap", price: 129, description: "Huge double-patty deluxe wrap loaded with paneer, vegetables, and three dressings.", category: "wraps", image: "https://images.unsplash.com/photo-1626700051175-6518c4793f06?w=400&q=80", badge: "Chef's Special" }
];

export const DEFAULT_GALLERY = [
  {
    id: "vibe-logo",
    image: logoImg,
    caption: "Barcode Cafe Signature Logo"
  },
  {
    id: "vibe-1",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    caption: "Aesthetic Cafe Ambience & Cozy Seating"
  },
  {
    id: "vibe-2",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    caption: "Balloons & Birthday Celebrations"
  },
  {
    id: "vibe-3",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    caption: "Premium Coffee Conversations"
  },
  {
    id: "vibe-4",
    image: "https://images.unsplash.com/photo-1522336572468-97b06eca219b?w=800&q=80",
    caption: "Warm Fairy Lights & Evening Dinner"
  },
  {
    id: "vibe-5",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
    caption: "Laughter, Friends & Cheers"
  },
  {
    id: "vibe-6",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    caption: "Artisanal Decor & Soothing Vibe"
  }
];



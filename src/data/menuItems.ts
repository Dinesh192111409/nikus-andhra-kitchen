export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
};

const biryani =
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200";
const chicken =
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200";
const mutton =
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200";
const fish =
  "https://images.unsplash.com/photo-1611171711914-bf4f0c4f0f7d?q=80&w=1200";
const prawns =
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200";
const paneer =
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200";
const veg =
  "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200";
const mushroom =
  "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1200";
const rice =
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200";
const noodles =
  "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200";
const soup =
  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200";
const dessert =
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200";
const drink =
  "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1200";
const bread =
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200";
const egg =
  "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=1200";
const gobi =
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200";
const babyCorn =
  "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1200";
const iceCream =
  "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1200";
const lassi =
  "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1200";

const makeId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const rawItems = [
  // Main Course
  ["Chicken Curry", 220, "Main Course", chicken],
  ["Kadai Chicken", 220, "Main Course", chicken],
  ["Butter Chicken", 230, "Main Course", chicken],
  ["Chicken Hyderabadi", 220, "Main Course", chicken],
  ["Chicken Kolhapuri", 220, "Main Course", chicken],
  ["Chicken Punjabi", 230, "Main Course", chicken],
  ["Ginger Chicken", 220, "Main Course", chicken],
  ["Niku's Special Chicken Curry", 240, "Main Course", chicken],
  ["Methi Chicken Curry", 220, "Main Course", chicken],
  ["Gongura Chicken Curry", 230, "Main Course", chicken],
  ["Nati Kodi Pulusu", 290, "Main Course", chicken],
  ["Mutton Masala", 340, "Main Course", mutton],
  ["Mutton Hyderabadi", 340, "Main Course", mutton],
  ["Mutton Guntur Gravy", 350, "Main Course", mutton],
  ["Mutton Rogan Josh", 350, "Main Course", mutton],
  ["Gongura Mutton Curry", 350, "Main Course", mutton],
  ["Fish Curry", 230, "Main Course", fish],
  ["Prawns Curry", 280, "Main Course", prawns],
  ["Egg Curry", 180, "Main Course", egg],
  ["Paneer Butter Masala", 220, "Main Course", paneer],
  ["Aloo Gobi Masala", 190, "Main Course", gobi],
  ["Mix Veg Curry", 190, "Main Course", veg],
  ["Kadai Veg", 180, "Main Course", veg],
  ["Dal Fry", 170, "Main Course", veg],
  ["Dal Tadka", 170, "Main Course", veg],
  ["Kadai Paneer", 220, "Main Course", paneer],
  ["Kaju Masala", 230, "Main Course", veg],
  ["Cashew Masala", 230, "Main Course", veg],
  ["Malai Kofta", 220, "Main Course", veg],
  ["Mushroom Masala", 200, "Main Course", mushroom],
  ["Palak Paneer", 230, "Main Course", paneer],
  ["Veg Hyderabadi", 200, "Main Course", veg],
  ["Veg Kolhapuri", 220, "Main Course", veg],
  ["Niku's Special Veg Curry", 200, "Main Course", veg],
  ["Chicken Do Pyaza", 220, "Main Course", chicken],

  // Bread
  ["Chapati 2 Pcs", 50, "Bread", bread],
  ["Parota 2 Pcs", 60, "Bread", bread],
  ["Phulka 2 Pcs", 40, "Bread", bread],

  // Rice
  ["Full Meals", 180, "Rice", rice],
  ["Non Veg Meals", 260, "Rice", chicken],
  ["Fish Meals", 250, "Rice", fish],
  ["Curd Rice", 100, "Rice", rice],
  ["Carrier Meals", 450, "Rice", rice],
  ["Non Veg Carrier Meals", 600, "Rice", chicken],

  // Biriyani
  ["Veg Biriyani", 190, "Biriyani", biryani],
  ["Paneer Biriyani", 220, "Biriyani", biryani],
  ["Mushroom Biriyani", 190, "Biriyani", biryani],
  ["Kaju Biriyani", 220, "Biriyani", biryani],
  ["Hyderabadi Chicken Dum Biriyani Single", 170, "Biriyani", biryani],
  ["Hyderabadi Chicken Dum Biriyani Regular", 230, "Biriyani", biryani],
  ["Boneless Chicken Biriyani", 260, "Biriyani", biryani],
  ["Fry Piece Biriyani", 230, "Biriyani", biryani],
  ["Kebab Biriyani", 230, "Biriyani", biryani],
  ["Fish Biriyani", 230, "Biriyani", fish],
  ["Gongura Chicken Biriyani", 240, "Biriyani", biryani],
  ["Prawns Biriyani", 280, "Biriyani", prawns],
  ["Egg Biriyani", 180, "Biriyani", egg],
  ["Omelette Biriyani", 160, "Biriyani", egg],
  ["Mutton Dum Biriyani", 350, "Biriyani", mutton],
  ["Mutton Fry Piece Biriyani", 350, "Biriyani", mutton],
  ["Gongura Mutton Biriyani", 350, "Biriyani", mutton],
  ["Guntur Chicken Biriyani", 230, "Biriyani", biryani],
  ["Rayalaseema Chicken Biriyani", 230, "Biriyani", biryani],
  ["Niku's Special Biriyani", 250, "Biriyani", biryani],
  ["Lollipop Biriyani", 230, "Biriyani", biryani],

  // Family Packs
  ["Hyderabadi Chicken Dum Biriyani Family Pack", 650, "Family Packs", biryani],
  ["Boneless Biriyani Family Pack", 680, "Family Packs", biryani],
  ["Kebab Biriyani Family Pack", 650, "Family Packs", biryani],
  ["Mutton Fry Piece Biriyani Family Pack", 850, "Family Packs", biryani],
  ["Hyderabadi Veg Biriyani Family Pack", 600, "Family Packs", biryani],
  ["Mushroom Biriyani Family Pack", 600, "Family Packs", biryani],
  ["Paneer Biriyani Family Pack", 620, "Family Packs", biryani],

  // Combos
  ["Dal Rice + Pickle Rice + Curd Rice", 160, "Combos", rice],
  ["Chapati with Mix Veg Curry", 195, "Combos", veg],
  ["Parota with Mix Veg Curry", 195, "Combos", veg],
  ["Chapati with Paneer Butter Masala", 210, "Combos", paneer],
  ["Biriyani + Soft Drink + Gulab Jamoon", 200, "Combos", biryani],
  ["Chapati with Gongura Chicken Curry", 215, "Combos", chicken],
  ["Parota with Chicken Curry", 215, "Combos", chicken],
  ["Chapati with Mutton Curry", 295, "Combos", mutton],
  ["Parota with Mutton Curry", 295, "Combos", mutton],

  // Bucket Biriyani
  ["Chicken Dum Biriyani Bucket", 1000, "Bucket Biriyani", biryani],
  ["Chicken Boneless Biriyani Bucket", 1060, "Bucket Biriyani", biryani],
  ["Mutton Biriyani Bucket", 1150, "Bucket Biriyani", biryani],
  ["Prawns Biriyani Bucket", 1120, "Bucket Biriyani", prawns],
  ["Veg Biriyani Bucket", 750, "Bucket Biriyani", veg],
  ["Paneer Biriyani Bucket", 900, "Bucket Biriyani", paneer],

  // Soups
  ["Cream of Tomato Soup", 100, "Soups", soup],
  ["Sweet Corn Veg Soup", 100, "Soups", soup],
  ["Hot & Sour Veg Soup", 100, "Soups", soup],
  ["Veg Clear Soup", 100, "Soups", soup],
  ["Veg Manchow Soup", 100, "Soups", soup],
  ["Hot & Sour Chicken Soup", 120, "Soups", soup],
  ["Sweet Corn Chicken Soup", 120, "Soups", soup],
  ["Chicken Manchow Soup", 120, "Soups", soup],
  ["Chicken Clear Soup", 120, "Soups", soup],

  // Chinese
  ["Jeera Rice", 120, "Chinese", rice],
  ["Ghee Rice", 130, "Chinese", rice],
  ["Veg Noodles", 140, "Chinese", noodles],
  ["Schezwan Veg Noodles", 150, "Chinese", noodles],
  ["Veg Fried Rice", 155, "Chinese", rice],
  ["Schezwan Veg Fried Rice", 165, "Chinese", rice],
  ["Egg Noodles", 140, "Chinese", noodles],
  ["Schezwan Egg Noodles", 150, "Chinese", noodles],
  ["Egg Fried Rice", 145, "Chinese", rice],
  ["Schezwan Egg Fried Rice", 155, "Chinese", rice],
  ["Chicken Noodles", 160, "Chinese", noodles],
  ["Chicken Fried Rice", 165, "Chinese", rice],
  ["Schezwan Chicken Fried Rice", 175, "Chinese", rice],
  ["Schezwan Chicken Noodles", 180, "Chinese", noodles],

  // Starters
  ["Gobi Chilli", 180, "Starters", gobi],
  ["Gobi Pepper", 180, "Starters", gobi],
  ["Gobi 65", 180, "Starters", gobi],
  ["Gobi Kebab", 170, "Starters", gobi],
  ["Gobi Pakoda", 170, "Starters", gobi],
  ["Veg Manchurian", 180, "Starters", veg],
  ["Veg Chilli", 170, "Starters", veg],
  ["Dragon Chicken", 260, "Starters", chicken],
  ["Chicken Hyderabadi Dry", 230, "Starters", chicken],
  ["Wings Kebab", 190, "Starters", chicken],
  ["Chicken Kebab", 200, "Starters", chicken],
  ["Niku's Special Kebab", 250, "Starters", chicken],
  ["Boneless Kebab", 240, "Starters", chicken],
  ["Chicken Lollipop", 210, "Starters", chicken],
  ["Niku's Special Lollipop", 230, "Starters", chicken],
  ["Pepper Chicken", 220, "Starters", chicken],
  ["Chilli Chicken", 220, "Starters", chicken],
  ["Guntur Chicken Fry", 220, "Starters", chicken],
  ["Rayalaseema Chicken Fry", 220, "Starters", chicken],
  ["Gongura Chicken", 220, "Starters", chicken],
  ["Konaseema Kodi Vepudu", 230, "Starters", chicken],
  ["Nati Kodi Fry", 280, "Starters", chicken],
  ["Kshatriya Dry", 300, "Starters", chicken],
  ["Nellore Chicken", 230, "Starters", chicken],
  ["Golden Chicken", 260, "Starters", chicken],
  ["Garlic Chicken Boneless", 260, "Starters", chicken],
  ["Lemon Chicken Boneless", 260, "Starters", chicken],
  ["Mutton Pepper Fry", 320, "Starters", mutton],
  ["Mutton Roast", 320, "Starters", mutton],
  ["Mutton Ghee Roast", 330, "Starters", mutton],
  ["Gongura Mutton Dry", 300, "Starters", mutton],
  ["Guntur Mutton Dry", 300, "Starters", mutton],
  ["Imperial Chicken Boneless", 260, "Starters", chicken],
  ["Chicken 65 Boneless", 260, "Starters", chicken],
  ["Chicken Manchurian Boneless", 250, "Starters", chicken],
  ["Chilli Chicken Boneless", 250, "Starters", chicken],
  ["Chicken Pepper Dry Boneless", 250, "Starters", chicken],
  ["Sholay Kebab Boneless", 260, "Starters", chicken],
  ["French Chicken Boneless", 260, "Starters", chicken],
  ["Golden Chicken Boneless", 260, "Starters", chicken],
  ["Chicken 555 Boneless", 260, "Starters", chicken],
  ["Chicken 88 Boneless", 260, "Starters", chicken],
  ["Ginger Chicken Boneless", 260, "Starters", chicken],
  ["Guntur Chicken Boneless", 260, "Starters", chicken],
  ["Chicken Majestic Boneless", 260, "Starters", chicken],
  ["Apollo Fish", 250, "Starters", fish],
  ["Fish Manchurian", 240, "Starters", fish],
  ["Fish Kebab", 200, "Starters", fish],
  ["Fish Chilli", 230, "Starters", fish],
  ["Fish Pepper", 230, "Starters", fish],
  ["Prawns Chilli", 270, "Starters", prawns],
  ["Prawns Pepper Dry", 270, "Starters", prawns],
  ["Prawns Ghee Roast", 280, "Starters", prawns],
  ["Royyala Vepudu", 270, "Starters", prawns],
  ["Bangda Oil Fry", 200, "Starters", fish],
  ["Egg Chilli", 160, "Starters", egg],
  ["Egg 65", 160, "Starters", egg],
  ["Egg Manchurian", 160, "Starters", egg],
  ["Egg Pepper Fry", 150, "Starters", egg],
  ["Boiled Egg 2 Eggs", 40, "Starters", egg],
  ["Egg Omelette", 70, "Starters", egg],
  ["Egg Bhurji 2 Eggs", 90, "Starters", egg],
  ["Paneer Manchurian", 220, "Starters", paneer],
  ["Paneer Chilli", 220, "Starters", paneer],
  ["Paneer Pepper Dry", 220, "Starters", paneer],
  ["Paneer Sholay Kebab", 230, "Starters", paneer],
  ["Paneer 65", 220, "Starters", paneer],
  ["Mushroom Manchurian", 190, "Starters", mushroom],
  ["Mushroom Anarkali", 180, "Starters", mushroom],
  ["Mushroom 65", 190, "Starters", mushroom],
  ["Mushroom Pepper Dry", 180, "Starters", mushroom],
  ["Baby Corn Manchurian", 180, "Starters", babyCorn],
  ["Baby Corn Pepper", 180, "Starters", babyCorn],
  ["Baby Corn 65", 180, "Starters", babyCorn],
  ["Baby Corn Chilli", 190, "Starters", babyCorn],
  ["Gobi Manchurian", 180, "Starters", gobi],

  // Beverages
  ["Water Bottle Half Litre", 10, "Beverages", drink],
  ["Water Bottle", 20, "Beverages", drink],
  ["Soft Drink", 25, "Beverages", drink],
  ["Lime Soda", 40, "Beverages", drink],
  ["Lime Juice", 40, "Beverages", drink],
  ["Butter Milk", 30, "Beverages", drink],
  ["Sweet Lassi", 50, "Beverages", lassi],
  ["Vanilla Milk Shake", 90, "Beverages", drink],
  ["Butterscotch Milk Shake", 90, "Beverages", drink],
  ["Strawberry Milk Shake", 100, "Beverages", drink],
  ["Chocolate Milkshake", 100, "Beverages", drink],

  // Desserts
  ["Gulab Jamoon", 35, "Desserts", dessert],
  ["Carrot Halwa", 45, "Desserts", dessert],
  ["Kheer", 45, "Desserts", dessert],
  ["Bread Halwa", 45, "Desserts", dessert],
  ["Vanilla", 90, "Desserts", iceCream],
  ["Butterscotch", 90, "Desserts", iceCream],
  ["Strawberry", 90, "Desserts", iceCream],
  ["Chocolate", 90, "Desserts", iceCream],
] as const;

export const menuItems: MenuItem[] = rawItems.map(
  ([name, price, category, image]) => ({
    id: makeId(name),
    name,
    price,
    category,
    image,
    available: true,
  }),
);

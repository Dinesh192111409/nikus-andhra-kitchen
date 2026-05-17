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
const fish =
  "https://images.unsplash.com/photo-1611171711914-bf4f0c4f0f7d?q=80&w=1200";
const prawns =
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200";
const paneer =
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200";
const veg =
  "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200";
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

const makeId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const rawItems = [
  ["Veg Biryani", 190, "Biryani", biryani],
  ["Paneer Biryani", 220, "Biryani", biryani],
  ["Mushroom Biryani", 190, "Biryani", biryani],
  ["Kaaju Biryani", 220, "Biryani", biryani],
  ["Hyderabadi Chicken Dum Biryani", 230, "Biryani", biryani],
  ["Boneless Chicken Biryani", 260, "Biryani", biryani],
  ["Fry Piece Biryani", 230, "Biryani", biryani],
  ["Kebab Biryani", 230, "Biryani", biryani],
  ["Fish Biryani", 230, "Biryani", fish],
  ["Gongura Chicken Biryani", 240, "Biryani", biryani],
  ["Prawns Biryani", 280, "Biryani", prawns],
  ["Egg Biryani", 180, "Biryani", rice],
  ["Omelette Biryani", 160, "Biryani", rice],
  ["Mutton Dum Biryani", 350, "Biryani", chicken],
  ["Mutton Fry Piece Biryani", 350, "Biryani", chicken],
  ["Gongura Mutton Biryani", 350, "Biryani", chicken],
  ["Guntur Chicken Biryani", 230, "Biryani", biryani],
  ["Rayalaseema Chicken Biryani", 230, "Biryani", biryani],
  ["Niku's Special Biryani", 250, "Biryani", biryani],
  ["Lollipop Biryani", 230, "Biryani", biryani],

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
  ["Kona Seema Kodi Vepudu", 230, "Starters", chicken],
  ["Nati Kodi Fry", 280, "Starters", chicken],
  ["Kshatriya Dry", 300, "Starters", chicken],
  ["Nellore Chicken", 230, "Starters", chicken],
  ["Golden Chicken", 260, "Starters", chicken],
  ["Garlic Chicken Boneless", 260, "Starters", chicken],
  ["Lemon Chicken Boneless", 260, "Starters", chicken],
  ["Chicken 65 Boneless", 260, "Starters", chicken],
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

  ["Gobi Chilli", 180, "Veg Starters", veg],
  ["Gobi Pepper", 180, "Veg Starters", veg],
  ["Gobi 65", 180, "Veg Starters", veg],
  ["Gobi Kebab", 170, "Veg Starters", veg],
  ["Gobi Pakoda", 170, "Veg Starters", veg],
  ["Veg Manchurian", 180, "Veg Starters", veg],
  ["Veg Chilli", 170, "Veg Starters", veg],
  ["Paneer Manchurian", 220, "Veg Starters", paneer],
  ["Paneer Chilli", 220, "Veg Starters", paneer],
  ["Paneer Pepper Dry", 220, "Veg Starters", paneer],
  ["Paneer Sholay Kebab", 230, "Veg Starters", paneer],
  ["Paneer 65", 220, "Veg Starters", paneer],
  ["Mushroom Manchurian", 190, "Veg Starters", veg],
  ["Mushroom Anarkali", 180, "Veg Starters", veg],
  ["Mushroom 65", 190, "Veg Starters", veg],
  ["Mushroom Pepper Dry", 180, "Veg Starters", veg],
  ["Babycorn Manchurian", 180, "Veg Starters", veg],
  ["Babycorn Pepper", 180, "Veg Starters", veg],
  ["Babycorn 65", 180, "Veg Starters", veg],
  ["Babycorn Chilli", 190, "Veg Starters", veg],

  ["Chicken Curry", 220, "Curries", chicken],
  ["Kadai Chicken", 220, "Curries", chicken],
  ["Butter Chicken", 230, "Curries", chicken],
  ["Chicken Hyderabadi", 220, "Curries", chicken],
  ["Chicken Kolhapuri", 220, "Curries", chicken],
  ["Chicken Punjabi", 230, "Curries", chicken],
  ["Ginger Chicken", 220, "Curries", chicken],
  ["Niku's Special Chicken Curry", 240, "Curries", chicken],
  ["Methi Chicken Curry", 220, "Curries", chicken],
  ["Gongura Chicken Curry", 230, "Curries", chicken],
  ["Nati Kodi Pulusu", 290, "Curries", chicken],
  ["Mutton Masala", 340, "Curries", chicken],
  ["Mutton Hyderabadi", 340, "Curries", chicken],
  ["Mutton Guntur Gravy", 350, "Curries", chicken],
  ["Mutton Rogan Josh", 350, "Curries", chicken],
  ["Gongura Mutton Curry", 350, "Curries", chicken],
  ["Fish Curry", 230, "Curries", fish],
  ["Prawns Curry", 280, "Curries", prawns],
  ["Egg Curry", 180, "Curries", rice],

  ["Paneer Butter Masala", 220, "Veg", paneer],
  ["Aloo Gobi Masala", 190, "Veg", veg],
  ["Mix Veg Curry", 190, "Veg", veg],
  ["Kadai Veg", 180, "Veg", veg],
  ["Dal Fry", 170, "Veg", veg],
  ["Dal Tadka", 170, "Veg", veg],
  ["Kadai Paneer", 220, "Veg", paneer],
  ["Kaju Masala", 230, "Veg", veg],
  ["Cashew Masala", 230, "Veg", veg],
  ["Malai Kofta", 220, "Veg", veg],
  ["Mushroom Masala", 200, "Veg", veg],
  ["Palak Paneer", 230, "Veg", paneer],
  ["Veg Hyderabadi", 200, "Veg", veg],
  ["Veg Kolhapuri", 220, "Veg", veg],
  ["Niku's Special Veg Curry", 200, "Veg", veg],

  ["Jeera Rice", 120, "Rice & Noodles", rice],
  ["Ghee Rice", 130, "Rice & Noodles", rice],
  ["Veg Noodles", 140, "Rice & Noodles", noodles],
  ["Schezwan Veg Noodles", 150, "Rice & Noodles", noodles],
  ["Veg Fried Rice", 155, "Rice & Noodles", rice],
  ["Schezwan Veg Fried Rice", 165, "Rice & Noodles", rice],
  ["Egg Noodles", 140, "Rice & Noodles", noodles],
  ["Schezwan Egg Noodles", 150, "Rice & Noodles", noodles],
  ["Egg Fried Rice", 145, "Rice & Noodles", rice],
  ["Schezwan Egg Fried Rice", 155, "Rice & Noodles", rice],
  ["Chicken Noodles", 160, "Rice & Noodles", noodles],
  ["Chicken Fried Rice", 165, "Rice & Noodles", rice],
  ["Schezwan Chicken Fried Rice", 175, "Rice & Noodles", rice],
  ["Schezwan Chicken Noodles", 180, "Rice & Noodles", noodles],

  ["Chapati 2 Pcs", 50, "Bread & Meals", bread],
  ["Parota 2 Pcs", 60, "Bread & Meals", bread],
  ["Pulka 2 Pcs", 40, "Bread & Meals", bread],
  ["Full Meals", 180, "Bread & Meals", rice],
  ["Non Veg Meals", 260, "Bread & Meals", chicken],
  ["Fish Meals", 250, "Bread & Meals", fish],
  ["Curd Rice", 100, "Bread & Meals", rice],

  ["Cream of Tomato Soup", 100, "Soups", soup],
  ["Sweet Corn Veg Soup", 100, "Soups", soup],
  ["Hot & Sour Veg Soup", 100, "Soups", soup],
  ["Veg Clear Soup", 100, "Soups", soup],
  ["Veg Manchow Soup", 100, "Soups", soup],
  ["Hot & Sour Chicken Soup", 120, "Soups", soup],
  ["Sweet Corn Chicken Soup", 120, "Soups", soup],
  ["Chicken Manchow Soup", 120, "Soups", soup],
  ["Chicken Clear Soup", 120, "Soups", soup],

  ["Egg Chilli", 160, "Egg", rice],
  ["Egg 65", 160, "Egg", rice],
  ["Egg Manchurian", 160, "Egg", rice],
  ["Egg Pepper Fry", 150, "Egg", rice],
  ["Boiled Egg 2 Eggs", 40, "Egg", rice],
  ["Egg Omelette", 70, "Egg", rice],
  ["Egg Bhurji 2 Eggs", 90, "Egg", rice],

  ["Gulab Jamoon", 35, "Desserts", dessert],
  ["Carrot Halwa", 45, "Desserts", dessert],
  ["Kheer", 45, "Desserts", dessert],
  ["Bread Halwa", 45, "Desserts", dessert],
  ["Vanilla Ice Cream", 90, "Desserts", dessert],
  ["Butterscotch Ice Cream", 90, "Desserts", dessert],
  ["Strawberry Ice Cream", 90, "Desserts", dessert],
  ["Chocolate Ice Cream", 90, "Desserts", dessert],

  ["Water Bottle Half Litre", 10, "Beverages", drink],
  ["Water Bottle", 20, "Beverages", drink],
  ["Soft Drink", 25, "Beverages", drink],
  ["Lime Soda", 40, "Beverages", drink],
  ["Lime Juice", 40, "Beverages", drink],
  ["Butter Milk", 30, "Beverages", drink],
  ["Sweet Lassi", 50, "Beverages", drink],
  ["Vanilla Milk Shake", 90, "Beverages", drink],
  ["Butterscotch Milk Shake", 90, "Beverages", drink],
  ["Strawberry Milk Shake", 100, "Beverages", drink],
  ["Chocolate Milkshake", 100, "Beverages", drink],
] as const;

export const menuItems: MenuItem[] = rawItems.map(
  ([name, price, category, image]) => ({
    id: makeId(name),
    name,
    price,
    category,
    image,
    available: true,
  })
);
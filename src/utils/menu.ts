import { menuItems, MenuItem } from "../data/menuItems";

export function getActiveMenuItems(): MenuItem[] {
  if (typeof window === "undefined") {
    return menuItems.filter((item) => item.available);
  }

  const savedMenu = localStorage.getItem("nikus_menu");

  if (!savedMenu) {
    localStorage.setItem("nikus_menu", JSON.stringify(menuItems));
    return menuItems.filter((item) => item.available);
  }

  try {
    const parsedMenu = JSON.parse(savedMenu) as MenuItem[];
    return parsedMenu.filter((item) => item.available);
  } catch {
    return menuItems.filter((item) => item.available);
  }
}
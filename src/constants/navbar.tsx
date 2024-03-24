import { Camera, Home, Images } from "lucide-react";

const menuList = [
  {
    key: "camera",
    text: "Camera",
    icon: Camera,
  },
  {
    key: "home",
    text: "Home",
    icon: Home,
  },
  {
    key: "gallery",
    text: "Gallery",
    icon: Images,
  },
] as const;

export type MenuKey = (typeof menuList)[number]["key"];

export { menuList };

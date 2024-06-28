import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 4,
    title: "Calculators",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Afghan Tax Calculator",
        path: "/afghan-tax-calculators",
        newTab: false,
      },
      {
        id: 42,
        title: "Afghan Date Converter",
        path: "/afghan-date-converter",
        newTab: false,
      },
    ],
  },
  {
    id: 2,
    title: "Tools",
    newTab: false,
    submenu: [
      {
        id: 81,
        title: "Afghan AI Emoji Generator",
        path: "/afghan-ai-emoji-generator",
        newTab: false,
      },
    ],
  },
  {
    id: 33,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "/contact",
    newTab: false,
  }
];
export default menuData;

import { HomeIcon, PencilAltIcon, SearchIcon } from "@heroicons/react/outline";

export const pages = [
  {
    name: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    name: "Search",
    href: "",
    Icon: SearchIcon,
    isSearch: true,
  },
  {
    name: "Create",
    href: "/content/create",
    Icon: PencilAltIcon,
  },
];

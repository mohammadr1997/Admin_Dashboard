import {
  LayoutDashboard,
  Newspaper,
  GalleryHorizontal,
  SlidersHorizontal,
  Map,
  MessageCircle,
  MailQuestionMark,
  Database,
  Settings,
  Users,
  UserRound,
  BadgeCent,
  LogIn,
  MessageSquareReply,
  Activity,
} from "lucide-react";
export const menuItem = [
  {
    mainItem: [
      { name: "Dashboard", icon: LayoutDashboard, url: "dashboard" },
      { name: "News", icon: Newspaper, url: "news" },

      { name: "Gallery", icon: GalleryHorizontal, url: "gallery" },
      { name: "Slide Banner", icon: SlidersHorizontal, url: "banner" },
    ],
    restItem: [
      { name: "Sitemap", icon: Map, url: "SiteMap" },
      { name: "FAQ", icon: MailQuestionMark, url: "faq" },

      { name: "Message", icon: MessageCircle, url: "message" },
      { name: "DataBase", icon: Database, url: "dataBase" },
      { name: "Setting", icon: Settings, url: "setting" },
    ],
  },
];
export const stats = [
  {
    icon: UserRound,
    title: "Visitors",
    value: "2.2 K",
    note: "Lower than last week",
    bg: "bg-green-700 text-gray-200",
  },
  {
    icon: BadgeCent,
    title: "Sales / Revenue",
    value: "$ 12,430",
    note: "Stable this month",
    bg: "bg-indigo-900 text-gray-200",
  },
  {
    icon: MessageSquareReply,
    title: "Responses / Tickets",
    value: "320",
    note: "Increased by 12%",
    bg: "bg-emerald-800 text-gray-200",
  },
  {
    icon: Activity,
    title: "Bounce Rate",
    value: "38 %",
    note: "Slightly higher than target",
    bg: "bg-sky-800 text-gray-200",
  },
  {
    icon: Users,
    title: "Daily Active Users",
    value: "890",
    note: "Consistent daily growth",
    bg: "bg-indigo-700 text-gray-200",
  },
  {
    icon: LogIn,
    title: "Signups / Registrations",
    value: "430",
    note: "Less than expected",
    bg: "bg-cyan-800 text-gray-300",
  },
];
export const API_KEY = "108b184ea7a5977a6865035c94a4a258";

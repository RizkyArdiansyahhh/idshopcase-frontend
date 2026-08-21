import { DeviceConfig, ProductTypeItem } from "../types/customizer.types";

export const SUPPORTED_DEVICES: DeviceConfig[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    badge: "17 Pro Max",
    caseType: "Clear Case Shockproof",
    price: "Rp 45.000",
    pattern: {
      containerClass:
        "absolute left-[22.8%] right-[22.8%] top-[33.5%] bottom-[11.8%] rounded-b-[2.6rem] overflow-hidden [clip-path:inset(0_round_0_0_2.6rem_2.6rem)] [transform:translateZ(0)]",
      rows: 5,
      paddingClass: "w-full h-full flex flex-col justify-between pt-1 pb-1",
    },
    colors: [
      {
        id: "navy",
        name: "Titanium Navy",
        badge: "Navy",
        bodyImage: "/images/mockup/iphone-17-pro-max/navy_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/navy_camera_top.png",
        bgClass: "bg-[#1b2838]",
        borderClass: "border-slate-800",
      },
      {
        id: "orange",
        name: "Sunset Orange",
        badge: "Orange",
        bodyImage: "/images/mockup/iphone-17-pro-max/orange_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/orange_camera_top.png",
        bgClass: "bg-[#e8601c]",
        borderClass: "border-orange-600",
      },
      {
        id: "silver",
        name: "Titanium Silver",
        badge: "Silver",
        bodyImage: "/images/mockup/iphone-17-pro-max/silver_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/silver_camera_top.png",
        bgClass: "bg-[#e2e8f0]",
        borderClass: "border-gray-400",
      },
    ],
  },
  {
    id: "iphone-16-basic",
    name: "iPhone 16",
    badge: "16 Basic",
    caseType: "Clear Case Shockproof",
    price: "Rp 45.000",
    pattern: {
      containerClass:
        "absolute left-[22.8%] right-[22.8%] top-[11.8%] bottom-[11.8%] rounded-[2.6rem] overflow-hidden [clip-path:inset(0_round_2.6rem_2.6rem_2.6rem_2.6rem)] [transform:translateZ(0)]",
      rows: 6,
      paddingClass: "w-full h-full flex flex-col justify-between pt-1 pb-1",
    },
    colors: [
      {
        id: "pink",
        name: "Pastel Pink",
        badge: "Pink",
        bodyImage: "/images/mockup/iphone-16-basic/pink_full.png",
        cameraOverlay: "/images/mockup/iphone-16-basic/pink_camera_top.png",
        bgClass: "bg-[#fad6dc]",
        borderClass: "border-pink-300",
      },
      {
        id: "teal",
        name: "Ocean Teal",
        badge: "Teal",
        bodyImage: "/images/mockup/iphone-16-basic/teal_full.png",
        cameraOverlay: "/images/mockup/iphone-16-basic/teal_camera_top.png",
        bgClass: "bg-[#9dd5d6]",
        borderClass: "border-teal-400",
      },
    ],
  },
];

export const PRODUCT_TYPES: ProductTypeItem[] = [
  {
    id: "phone-case",
    title: "Phone Cases",
    subtitle: "iPhone & Android",
    image: "/images/mockup/iphone-17-pro-max/navy_full.png",
  },
  {
    id: "popstand",
    title: "Grip Stand",
    subtitle: "Custom Acrylic Popstand",
    image: "/images/mockup/popstand/depan_phone.png",
  },
];

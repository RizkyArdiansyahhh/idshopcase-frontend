export interface PhoneColorVariant {
  id: string;
  name: string;
  badge: string;
  bodyImage: string;
  cameraOverlay: string;
  bgClass: string;
  borderClass: string;
}

export interface DeviceConfig {
  id: string;
  name: string;
  badge: string;
  caseType: string;
  price: string;
  pattern: {
    containerClass: string;
    rows: number;
    paddingClass: string;
  };
  colors: PhoneColorVariant[];
}

export interface ProductTypeItem {
  id: "phone-case" | "popstand";
  title: string;
  subtitle: string;
  image: string;
}

export type PatternMode = "grid-staggered" | "grid-straight" | "single-center";

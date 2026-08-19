import { Metadata } from "next";
import { CustomStudio } from "@/features/customizer/components/custom-studio";

export const metadata: Metadata = {
  title: "Custom Case Studio | IDSHOPCASE",
  description: "Rancang custom case HP impianmu secara langsung dengan simulasi perangkat 3D fotorealistis (iPhone 17 Pro Max, iPhone 16 Pro Max, dan banyak lagi).",
};

export default function CustomizerPage() {
  return (
    <div className="w-full pb-12">
      <CustomStudio />
    </div>
  );
}

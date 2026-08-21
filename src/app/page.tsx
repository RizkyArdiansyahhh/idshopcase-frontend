import { Navbar } from "@/components/layouts/navbar";
import { SectionCustomStudioStatement } from "./_components/section-custom-studio-statement";
import { SectionFeaturedGrid } from "./_components/section-featured-grid";
import { BannerVideoHomePage } from "./_components/baner-video-home-page";
import { SectionShopTheLook } from "./_components/section-shop-the-look";
import { SectionBrandPromise } from "./_components/section-brand-promise";
import { Separator } from "@/components/ui/separator";
import { CarouselHomePage } from "./_components/carousel-homepage";
import { SectionCategories } from "./_components/section-categories";
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget";
import { SectionInstagram } from "./_components/section-instagram";
import { SectionFaqHome } from "./_components/section-faq-home";
import { SectionEndorse } from "./_components/section-endorse";
import { SectionReviews } from "./_components/section-reviews";
import { Footer } from "./_components/footer";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col items-center">
      <Navbar isTransparentOnTop={true} />
      <CarouselHomePage />

      {/* Categories Showcase (With smooth margin gap from Carousel) */}
      <div className="w-screen mt-4 sm:mt-6 md:mt-8 pt-2 pb-2 sm:pt-3 sm:pb-3 flex justify-center items-center">
        <SectionCategories />
      </div>

      {/* Bold Custom Studio Statement Callout (Compact Vertical Spacing) */}
      <SectionCustomStudioStatement />
      <BannerVideoHomePage />
      {/* 4-Column Editorial Featured Collection Grid (Sejauh Reference Style) */}
      <SectionFeaturedGrid />

      <Separator className="my-8 md:my-10 max-w-[1240px]" />

      {/* Endorse & Creator Spotlight Section */}
      <div className="w-full">
        <SectionEndorse />
      </div>

      <Separator className="my-8 md:my-10 max-w-[1240px]" />

      {/* Interactive Shop The Look Section */}
      <SectionShopTheLook />

      <Separator className="my-8" />

      {/* Customer Reviews Accommodation Section (Static Left Stats Card + Infinite Looping Cards via LogoLoop) */}
      <SectionReviews />

      {/* Brand Craft & Quality Guarantee Section (2-Column Editorial Reference) */}
      <div className="w-full mt-10">
        <SectionBrandPromise />
      </div>

      <div className="h-[90vh] w-screen flex flex-col justify-center gap-4 font-[family-name:var(--font-fustat)] select-none">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-neutral-900 font-[family-name:var(--font-fustat)]">
          {t("followInstagram")}{" "}
          <a
            href="https://www.instagram.com/idshopcase/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 font-bold hover:text-black transition-colors lowercase"
          >
            @idshopcase
          </a>
        </h2>
        <SectionInstagram />
      </div>
      <SectionFaqHome />
      <WhatsAppWidget />
      <Footer />
    </div>
  );
}

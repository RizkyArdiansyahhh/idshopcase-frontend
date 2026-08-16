import { Navbar } from "@/components/layouts/navbar";
import { ListProductsHomePage } from "@/features/products/components/list-products";
import GradientFillButton from "@/components/shared/gradient-fill-button";
import { BannerVideoHomePage } from "./_components/baner-video-home-page";
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
      <Navbar isBlur={true} />
      <CarouselHomePage />
      <div className="h-[70vh] w-screen flex justify-center items-center">
        <SectionCategories />
      </div>
      <div className="w-full flex justify-end">
        <div className="px-10 flex flex-col gap-2 py-6">
          <h1 className="text-5xl font-bold w-4/5 leading-16">
            {t("featuredProducts")}{" "}
            <span className="text-foreground/40 font-black text-5xl">
              IDSHOPCASE
            </span>
            .
          </h1>
          <div className="flex flex-col gap-5">
            <p className="w-2/3 font-semibold text-base text-foreground/60">
              {t("featuredSubtitle")}
            </p>
            <GradientFillButton />
          </div>
        </div>
        <div className="w-2/3 py-6 overflow-hidden">
          <ListProductsHomePage />
        </div>
      </div>
      <BannerVideoHomePage />
      <div className="w-full h-fit py-4 px-4 flex flex-row gap-4" />

      <Separator className="my-6" />
      
      {/* Endorse & Creator Spotlight Section */}
      <SectionEndorse />

      <Separator className="my-8" />

      {/* Customer Reviews Accommodation Section (Static Left Stats Card + Infinite Looping Cards via LogoLoop) */}
      <SectionReviews />

      <Separator className="mt-10" />
      <div className="h-[90vh] w-screen flex flex-col justify-center gap-3">
        <h1 className="text-center text-4xl font-semibold">
          {t("followInstagram")}{" "}
          <a
            href="https://www.instagram.com/idshopcase/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 underline font-bold"
          >
            Instagram
          </a>
        </h1>
        <div className="w-full flex justify-center items-center">
          <SectionInstagram />
        </div>
      </div>

      <Separator />
      {/* FAQ Section */}
      <SectionFaqHome />

      <Separator />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

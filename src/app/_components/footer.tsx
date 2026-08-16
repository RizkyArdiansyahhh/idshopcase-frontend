import { Separator } from "@/components/ui/separator";
import { FaInstagram } from "react-icons/fa";
import { TbBrandShopee } from "react-icons/tb";
import { PiTiktokLogo } from "react-icons/pi";

import { FooterAccordionMobile, FooterLink } from "./footer-link";

export const Footer = () => {
  return (
    <>
      <footer className="w-full pt-10 pb-4 md:h-fit lg:h-[60vh] bg-foreground text-background flex flex-col justify-between">
        <div className="w-full px-5 md:px-10 lg:px-16 flex flex-row flex-wrap gap-8 lg:gap-10">
          {/* Brand Info & Socials */}
          <div className="w-full md:w-[30%] h-full flex flex-col justify-between">
            <div className="w-full h-fit">
              <h2 className="text-2xl lg:text-3xl font-bold text-background tracking-tight">
                IDSHOPCASE.
              </h2>
              <p className="text-xs md:text-sm font-normal text-background/70 mt-1.5 leading-relaxed">
                Ekspresikan Gaya & Uniknya Dirimu Lewat Custom Case Premium
              </p>
            </div>

            <div className="w-full mt-6">
              <Separator className="border-1 my-5 opacity-20" />
              <div className="flex flex-col gap-4">
                <div className="flex justify-center md:justify-start">
                  <div className="flex flex-row gap-3">
                    <div className="p-0.5 bg-transparent border border-background/30 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-background hover:border-background transition-all duration-150 ease-in-out">
                      <a
                        href="https://www.tiktok.com/@idshopcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok Idshopcase"
                      >
                        <PiTiktokLogo className="text-background text-lg group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                      </a>
                    </div>

                    <div className="p-0.5 bg-transparent border border-background/30 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-background hover:border-background transition-all duration-150 ease-in-out">
                      <a
                        href="https://www.instagram.com/idshopcase/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Idshopcase"
                      >
                        <FaInstagram className="text-background text-lg group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                      </a>
                    </div>

                    <div className="p-0.5 bg-transparent border border-background/30 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-background hover:border-background transition-all duration-150 ease-in-out">
                      <a
                        href="https://shopee.co.id/idshopcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Shopee Idshopcase"
                      >
                        <TbBrandShopee className="text-background text-lg group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                      </a>
                    </div>

                    <div className="p-0.5 bg-transparent border border-background/30 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-background hover:border-background transition-all duration-150 ease-in-out">
                      <a
                        href="https://www.tokopedia.com/idshopcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Tokopedia Idshopcase"
                      >
                        <svg
                          viewBox="0 0 192 192"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="h-[18px] text-background group-hover:text-foreground transition-all duration-150 ease-in-out"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M96 28c-9.504 0-17.78 5.307-22.008 13.127C82.736 42.123 88.89 44 96 47.332c7.11-3.332 13.264-5.209 22.008-6.205C113.781 33.31 105.506 28 96 28Zm0-12c-15.973 0-29.568 10.117-34.754 24.28C52.932 40 42.462 40 28.53 40H28a6 6 0 0 0-6 6v124a6 6 0 0 0 6 6h92c27.614 0 50-22.386 50-50V46a6 6 0 0 0-6-6h-.531c-13.931 0-24.401 0-32.715.28C125.566 26.113 111.97 16 96 16ZM34 52.001V164h86c20.987 0 38-17.013 38-38V52.001c-18.502.009-29.622.098-37.872.966-8.692.915-13.999 2.677-21.445 6.4a6 6 0 0 1-5.366 0c-7.446-3.723-12.753-5.485-21.445-6.4-8.25-.868-19.37-.957-37.872-.966ZM50 96c0-9.941 8.059-18 18-18s18 8.059 18 18-8.059 18-18 18-18-8.059-18-18Zm18-30c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 1.126 0 2.238-.062 3.332-.183l20.425 20.426a6 6 0 0 0 8.486 0l20.425-20.426c1.094.121 2.206.183 3.332.183 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30-12.764 0-23.666 7.971-28 19.207C91.666 73.971 80.764 66 68 66Zm40.082 55.433A30.1 30.1 0 0 1 96 106.793a30.101 30.101 0 0 1-12.082 14.64L96 133.515l12.082-12.082ZM124 78c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18ZM76 96a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm48 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-background/60 font-normal leading-relaxed">
                    Ikuti kami di media sosial dan e-commerce resmi untuk
                    update produk terbaru dan promo menarik.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="hidden md:flex-1 lg:w-[48%] h-full text-background md:flex flex-col pl-0 lg:pl-6">
            <FooterLink />
          </div>

          {/* Mobile Accordion */}
          <div className="w-full block md:hidden">
            <FooterAccordionMobile />
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-[100%] lg:w-[22%] h-full flex flex-col lg:flex-row gap-4 lg:gap-8">
            <Separator
              orientation="horizontal"
              className="block lg:hidden opacity-20"
            />
            <Separator
              orientation="vertical"
              className="hidden lg:block opacity-20"
            />
            <div className="flex-1 flex flex-col md:flex-row lg:flex-col gap-4 md:gap-6 md:justify-between lg:justify-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
                  Telepon / WhatsApp
                </h3>
                <a
                  href="https://wa.me/message/UGIJPSGHHWKHL1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animation-link-background w-fit inline-block"
                >
                  +62 851-1745-3862
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
                  Email Kami
                </h3>
                <a
                  href="mailto:idshopcase.id@gmail.com"
                  className="animation-link-background w-fit inline-block"
                >
                  idshopcase.id@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
                  Lokasi Toko
                </h3>
                <a
                  href="https://maps.app.goo.gl/U8q1VCrTGxTXAFcx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animation-link-background w-fit inline-block"
                >
                  Temukan Toko Kami
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="w-full pt-6 mt-6">
          <Separator className="opacity-15" />
          <div className="w-full px-5 md:px-10 lg:px-16 flex items-center justify-center md:justify-start py-4">
            <p className="text-background/50 text-xs font-normal">
              © 2026 Idshopcase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

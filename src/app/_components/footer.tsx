"use client";

import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { FaInstagram } from "react-icons/fa";
import { TbBrandShopee } from "react-icons/tb";
import { PiTiktokLogo } from "react-icons/pi";
import { useTranslations } from "next-intl";

import { FooterAccordionMobile, FooterLink } from "./footer-link";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <>
      <footer className="w-full pt-10 pb-4 md:h-fit lg:min-h-[50vh] bg-white border-t border-neutral-200 text-neutral-900 flex flex-col justify-between font-sans select-none">
        <div className="w-full px-5 md:px-10 lg:px-16 flex flex-row flex-wrap gap-8 lg:gap-10">
          {/* Brand Info & Socials */}
          <div className="w-full md:w-[30%] h-full flex flex-col justify-between">
            <div className="w-full h-fit">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
                IDSHOPCASE.
              </h2>
              <p className="text-xs md:text-sm font-normal text-neutral-500 mt-1.5 leading-relaxed">
                {t("brandTagline")}
              </p>
            </div>

            <div className="w-full mt-6">
              <Separator className="my-5 border-neutral-200" />
              <div className="flex flex-col gap-4">
                <div className="flex justify-center md:justify-start">
                  <div className="flex flex-row gap-3">
                    {/* TikTok */}
                    <div className="p-0.5 bg-transparent border border-neutral-300 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
                      <a
                        href="https://www.tiktok.com/@idshopcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok Idshopcase"
                      >
                        <PiTiktokLogo className="text-neutral-700 text-lg group-hover:text-white transition-colors duration-150" />
                      </a>
                    </div>

                    {/* Instagram */}
                    <div className="p-0.5 bg-transparent border border-neutral-300 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
                      <a
                        href="https://www.instagram.com/idshopcase/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Idshopcase"
                      >
                        <FaInstagram className="text-neutral-700 text-lg group-hover:text-white transition-colors duration-150" />
                      </a>
                    </div>

                    {/* Shopee */}
                    <div className="p-0.5 bg-transparent border border-neutral-300 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
                      <a
                        href="https://shopee.co.id/idshopcase"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Shopee Idshopcase"
                      >
                        <TbBrandShopee className="text-neutral-700 text-lg group-hover:text-white transition-colors duration-150" />
                      </a>
                    </div>

                    {/* Tokopedia */}
                    <div className="p-0.5 bg-transparent border border-neutral-300 h-9 w-9 rounded-full flex justify-center items-center group hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
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
                          className="h-[18px] text-neutral-700 group-hover:text-white transition-colors duration-150"
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
                  <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                    {t("socialNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="hidden md:flex-1 lg:w-[48%] h-full text-neutral-900 md:flex flex-col pl-0 lg:pl-6">
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
              className="block lg:hidden border-neutral-200"
            />
            <Separator
              orientation="vertical"
              className="hidden lg:block border-neutral-200"
            />
            <div className="flex-1 flex flex-col md:flex-row lg:flex-col gap-4 md:gap-6 md:justify-between lg:justify-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {t("phoneWhatsApp")}
                </h3>
                <a
                  href="https://wa.me/message/UGIJPSGHHWKHL1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
                >
                  +62 851-1745-3862
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {t("emailUs")}
                </h3>
                <a
                  href="mailto:idshopcase.id@gmail.com"
                  className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
                >
                  idshopcase.id@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {t("storeLocation")}
                </h3>
                <a
                  href="https://maps.app.goo.gl/U8q1VCrTGxTXAFcx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
                >
                  {t("findStore")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="w-full pt-6 mt-6">
          <Separator className="border-neutral-200" />
          <div className="w-full px-5 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
            <p className="text-neutral-400 text-xs font-normal">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy"
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

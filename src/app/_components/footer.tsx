import { Separator } from "@/components/ui/separator";
import { FaInstagram } from "react-icons/fa";
import { TbBrandShopee } from "react-icons/tb";
import { PiTiktokLogo } from "react-icons/pi";

import { FooterAccordionMobile, FooterLink } from "./footer-link";

export const Footer = () => {
  return (
    <>
      <footer className="w-full  pt-9 md:h-fit lg:h-[60vh] bg-foreground  flex flex-col">
        <div className="h-[85%] pb-9 w-full px-5  md:px-10 lg:px-16 flex flex-row flex-wrap gap-5">
          <div className="w-full md:w-[30%] h-full flex flex-col">
            <div className="w-full h-fit">
              <h2 className="text-2xl lg:text-4xl font-bold text-background">
                IDSHOPCASE.
              </h2>
              <p className="text-sm md:text-base lg:text-lg font-semibold text-background/75">
                Ekspresikan Dirimu Lewat Case
              </p>
            </div>
            <div className="w-full flex-1 flex items-end">
              <div className="w-full">
                <Separator className="border-1 my-7"></Separator>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-center md:justify-start">
                    <div className="flex flex-row gap-7 md:gap-2">
                      <div className="p-.5 bg-transparent border border-background h-10 w-10 rounded-full flex justify-center items-center group hover:bg-background transition-all duration-150 ease-in-out">
                        <a
                          href={"https://www.tiktok.com/@idshopcase"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PiTiktokLogo className="text-background text-2xl group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                        </a>
                      </div>

                      <div className="p-.5 bg-transparent border border-background h-10 w-10 rounded-full flex justify-center items-center group hover:bg-background transition-all duration-150 ease-in-out">
                        <a
                          href={"https://www.instagram.com/idshopcase/"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="text-background text-2xl group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                        </a>
                      </div>

                      <div className="p-.5 bg-transparent border border-background h-10 w-10 rounded-full flex justify-center items-center group hover:bg-background transition-all duration-150 ease-in-out">
                        <a
                          href={"https://shopee.co.id/idshopcase"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TbBrandShopee className="text-background text-2xl group-hover:fill-foreground transition-all duration-150 ease-in-out" />
                        </a>
                      </div>

                      <div className="p-.5 bg-transparent border border-background h-10 w-10 rounded-full flex justify-center items-center group hover:bg-background transition-all duration-150 ease-in-out">
                        <a
                          href={"https://www.tokopedia.com/idshopcase"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            // width="800px"
                            // height="800px"
                            viewBox="0 0 192 192"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-[24px] text-background group-hover:text-foreground transition-all duration-150 ease-in-out"
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
                    <p className="text-xs md:text-sm lg:text-base  text-background font-medium">
                      Ikuti kami di media sosial dan e-commerce resmi untuk
                      update produk terbaru dan promo menarik
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex-1 lg:w-[50%] h-full text-background md:flex flex-col pl-0 lg:pl-8 md:gap-10 lg:gap-0">
            <FooterLink></FooterLink>
          </div>
          <div className="w-full block md:hidden">
            <FooterAccordionMobile></FooterAccordionMobile>
          </div>
          <div className="w-full md:w-[100%] lg:w-[20%] h-full flex flex-col lg:flex-row gap-4 lg:gap-10">
            <Separator
              orientation="horizontal"
              className="block lg:hidden"
            ></Separator>
            <Separator
              orientation="vertical"
              className="hidden lg:block"
            ></Separator>
            <div className="flex-1 flex flex-col md:flex-row lg:flex-col gap-3 md:gap-7 md:justify-between lg:justify-start">
              <div className="flex flex-col md:gap-1.5 lg:gap-3">
                <h3 className="text-sm lg:text-lg font-semibold text-background">
                  Telepon Kami
                </h3>
                <p className="text-sm lg:text-base font-medium text-background">
                  +62 812 3456 7891
                </p>
              </div>
              <div className="flex flex-col md:gap-1.5 lg:gap-3">
                <h3 className="text-sm lg:text-lg font-semibold text-background">
                  Email Kami
                </h3>
                <p className="text-sm lg:text-base font-medium text-background">
                  idshopcase@example.com
                </p>
              </div>
              <div className="flex flex-col md:gap-1.5 lg:gap-3">
                <h3 className="text-sm lg:text-lg font-semibold text-background">
                  Lokasi Kami
                </h3>
                <a
                  href="https://maps.app.goo.gl/U8q1VCrTGxTXAFcx9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm lg:text-base font-medium text-background underline"
                >
                  Temukan Toko Kami
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[15%] flex flex-col ">
          <Separator></Separator>
          <div className="w-full flex-1 px-12 lg:px-16 flex items-center justify-center md:justify-start py-5 lg:py-0">
            <p className="text-background/80 text-sm lg:text-base">
              © 2026 idshopcase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

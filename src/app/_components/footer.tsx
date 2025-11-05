import { FooterLink } from "@/components/ui/link";

export const Footer = () => {
  return (
    <>
      <footer className="w-screen h-fit md:h-[50vh] bg-foreground">
        <div className="h-full flex flex-col md:flex-row gap-5 md:gap-0 items-start md:items-center py-10 md:pt-0 md:pb-20 lg:pb-36 px-5 md:px-7 lg:px-20">
          <div className="md:w-1/4 text-white flex flex-col gap-4">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              IDshop
            </h2>
            <ul>
              <FooterLink href="/">Beranda</FooterLink>
              <FooterLink href="/">Custom Case</FooterLink>
              <FooterLink href="/">Tentang Kami</FooterLink>
            </ul>
          </div>
          <div className="md:w-1/4 text-white flex flex-col gap-4">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              Hubungi Kami
            </h2>
            <ul>
              <FooterLink href="/">Email: support@idshop.com</FooterLink>
              <FooterLink href="/">WhatsApp: 0812-3456-7890</FooterLink>
              <FooterLink href="/">Instagram: @idshop.official</FooterLink>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  PaymentGateway,
  PaymentMethodList,
  ShippingMethod,
} from "./payment-gateway-list-";
import {
  Accordion,
  AccordionContent,
  AccordionItem2,
  AccordionTrigger2,
} from "@/components/ui/accordion";

export const FooterLink = () => {
  const t = useTranslations("footer");

  return (
    <>
      <div className="w-full h-fit grid grid-cols-3 gap-6 font-sans">
        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {t("customerService")}
          </h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("helpCenter")}
              </a>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("paymentMethods")}
              </Link>
            </li>
            <li>
              <Link
                href="/account/track-order"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("trackOrder")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {t("exploreIdshopcase")}
          </h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link
                href="/about"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("warrantyPolicy")}
              </a>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("faq")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Collections */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            {t("collections")}
          </h3>
          <ul className="flex flex-col gap-2 text-xs">
            <li>
              <Link
                href="/products/collections?category=custom_case"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("customCase")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=keychain"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("keychain")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=phone_charm"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("phoneCharm")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=pop_socket"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("popSocket")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment & Shipping Methods */}
      <div className="flex-1 w-full flex items-end mt-6">
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              {t("paymentMethods")}
            </h3>
            <div>
              <PaymentMethodList />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                {t("shippingMethods")}
              </h3>
              <div>
                <ShippingMethod />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Payment Gateway
              </h3>
              <div>
                <PaymentGateway />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export function FooterAccordionMobile() {
  const t = useTranslations("footer");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full md:hidden divide-y divide-neutral-200"
    >
      {/* Layanan Pelanggan */}
      <AccordionItem2 value="customer" className="border-b-neutral-200">
        <AccordionTrigger2 className="text-neutral-900 text-xs font-bold uppercase tracking-wider py-3">
          {t("customerService")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1 pb-3 text-xs">
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("helpCenter")}
              </a>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("paymentMethods")}
              </Link>
            </li>
            <li>
              <Link
                href="/account/track-order"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("trackOrder")}
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem2>

      {/* Jelajah */}
      <AccordionItem2 value="explore" className="border-b-neutral-200">
        <AccordionTrigger2 className="text-neutral-900 text-xs font-bold uppercase tracking-wider py-3">
          {t("exploreIdshopcase")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1 pb-3 text-xs">
            <li>
              <Link
                href="/about"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("warrantyPolicy")}
              </a>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("faq")}
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem2>

      {/* Koleksi */}
      <AccordionItem2 value="collection" className="border-b-neutral-200">
        <AccordionTrigger2 className="text-neutral-900 text-xs font-bold uppercase tracking-wider py-3">
          {t("collections")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1 pb-3 text-xs">
            <li>
              <Link
                href="/products/collections?category=custom_case"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("customCase")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=keychain"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("keychain")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=phone_charm"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("phoneCharm")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=pop_socket"
                className="text-neutral-600 hover:text-neutral-900 transition-colors w-fit inline-block"
              >
                {t("popSocket")}
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem2>
    </Accordion>
  );
}

export default FooterLink;

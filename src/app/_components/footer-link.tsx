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
      <div className="w-full h-fit grid grid-cols-3 gap-6">
        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
            {t("customerService")}
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="animation-link-background w-fit inline-block"
              >
                {t("helpCenter")}
              </a>
            </li>
            <li>
              <Link
                href="/cart"
                className="animation-link-background w-fit inline-block"
              >
                {t("paymentMethods")}
              </Link>
            </li>
            <li>
              <Link
                href="/account/track-order"
                className="animation-link-background w-fit inline-block"
              >
                {t("trackOrder")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
            {t("exploreIdshopcase")}
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/about"
                className="animation-link-background w-fit inline-block"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="animation-link-background w-fit inline-block"
              >
                {t("warrantyPolicy")}
              </a>
            </li>
            <li>
              <Link
                href="/faq"
                className="animation-link-background w-fit inline-block"
              >
                {t("faq")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Collections */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
            {t("collections")}
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/products/collections?category=custom_case"
                className="animation-link-background w-fit inline-block"
              >
                {t("customCase")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=keychain"
                className="animation-link-background w-fit inline-block"
              >
                {t("keychain")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=phone_charm"
                className="animation-link-background w-fit inline-block"
              >
                {t("phoneCharm")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=pop_socket"
                className="animation-link-background w-fit inline-block"
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
            <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
              {t("paymentMethods")}
            </h3>
            <div>
              <PaymentMethodList />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
                {t("shippingMethods")}
              </h3>
              <div>
                <ShippingMethod />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-background/90 uppercase tracking-wider">
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
    <Accordion type="single" collapsible className="w-full md:hidden">
      {/* Layanan Pelanggan */}
      <AccordionItem2 value="customer">
        <AccordionTrigger2 className="text-background text-xs font-semibold uppercase tracking-wider">
          {t("customerService")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1">
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="animation-link-background w-fit inline-block"
              >
                {t("helpCenter")}
              </a>
            </li>
            <li>
              <Link
                href="/cart"
                className="animation-link-background w-fit inline-block"
              >
                {t("paymentMethods")}
              </Link>
            </li>
            <li>
              <Link
                href="/account/track-order"
                className="animation-link-background w-fit inline-block"
              >
                {t("trackOrder")}
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem2>

      {/* Jelajah */}
      <AccordionItem2 value="explore">
        <AccordionTrigger2 className="text-background text-xs font-semibold uppercase tracking-wider">
          {t("exploreIdshopcase")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1">
            <li>
              <Link
                href="/about"
                className="animation-link-background w-fit inline-block"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/message/UGIJPSGHHWKHL1"
                target="_blank"
                rel="noopener noreferrer"
                className="animation-link-background w-fit inline-block"
              >
                {t("warrantyPolicy")}
              </a>
            </li>
            <li>
              <Link
                href="/faq"
                className="animation-link-background w-fit inline-block"
              >
                {t("faq")}
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem2>

      {/* Koleksi */}
      <AccordionItem2 value="collection">
        <AccordionTrigger2 className="text-background text-xs font-semibold uppercase tracking-wider">
          {t("collections")}
        </AccordionTrigger2>
        <AccordionContent>
          <ul className="flex flex-col gap-2 pt-1">
            <li>
              <Link
                href="/products/collections?category=custom_case"
                className="animation-link-background w-fit inline-block"
              >
                {t("customCase")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=keychain"
                className="animation-link-background w-fit inline-block"
              >
                {t("keychain")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=phone_charm"
                className="animation-link-background w-fit inline-block"
              >
                {t("phoneCharm")}
              </Link>
            </li>
            <li>
              <Link
                href="/products/collections?category=pop_socket"
                className="animation-link-background w-fit inline-block"
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

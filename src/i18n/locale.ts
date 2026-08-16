"use server";

import { cookies } from "next/headers";
import { routing } from "./routing";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(COOKIE_NAME)?.value || cookieStore.get("locale")?.value;
  return locale && routing.locales.includes(locale as "id" | "en")
    ? locale
    : routing.defaultLocale;
}

export async function setUserLocale(locale: "id" | "en") {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  cookieStore.set("locale", locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
}

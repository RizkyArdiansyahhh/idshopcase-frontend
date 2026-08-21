import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  const [common, navbar, footer, home, auth, order, faq, privacy, account, product, about, customizer] = await Promise.all([
    import(`../../messages/${locale}/common.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/navbar.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/footer.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/home.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/auth.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/order.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/faq.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/privacy.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/account.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/product.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/about.json`).then((m) => m.default).catch(() => ({})),
    import(`../../messages/${locale}/customizer.json`).then((m) => m.default).catch(() => ({})),
  ]);

  return {
    locale,
    messages: {
      ...common,
      ...navbar,
      ...footer,
      ...home,
      ...auth,
      ...order,
      ...faq,
      ...privacy,
      ...account,
      ...product,
      ...about,
      ...customizer,
    },
  };
});

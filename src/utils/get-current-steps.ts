export const ORDER_STEPS = [
  { key: "detail", label: "Detail Order", path: "/order" },
  { key: "payment", label: "Pembayaran", path: "/order/:orderId/payment" },
  { key: "status", label: "Selesai", path: "/order/:orderId/status" },
] as const;

export const getCurrentStep = (pathname: string) => {
  if (!pathname) return 0;

  // // /order/:orderId
  // if (/^\/order\/\d+$/.test(pathname)) {
  //   return 0;
  // }

  // /order/:orderId/payment
  if (/^\/order\/\d+\/payment$/.test(pathname)) {
    return 1;
  }
  if (/^\/order\/\d+\/status$/.test(pathname)) {
    return 2;
  }

  return 0;
};

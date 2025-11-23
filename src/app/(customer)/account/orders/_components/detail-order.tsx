/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Order, OrderItem, User } from "@/types/api";
import { CardProductDetail } from "../detail/[orderId]/_components/card-product-detail";
import { imageUrlPrimary } from "@/utils/image-utils";
import { add } from "@dnd-kit/utilities";
import { formatDate } from "@/lib/format-date";

export default function OrderDetail({
  order,
  user,
}: {
  order: Order;
  user: User;
}) {
  if (!order) return <p>Loading...</p>;

  const orderItems = order.OrderItems;
  const payment = order.Payment;
  const address = order.Address;
  const totalPriceBeforeShipping = orderItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const shipping = Number(order.total_price) - totalPriceBeforeShipping;

  return (
    <>
      <div className="w-full h-ful p-2">
        <Link
          href="/account/orders"
          className="flex flex-row text-foreground/70 text-sm font-medium gap-2 mt-2 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </Link>

        <div className="w-full h-full flex flex-row gap-5 ">
          <div className="w-2/3 h-fit ">
            <div className="border shadow-xs rounded-md mb-3 p-3 flex flex-col gap-2">
              {orderItems.map((item: OrderItem) => (
                <CardProductDetail
                  key={item.id}
                  imageUrl={imageUrlPrimary(item.Product.ProductImages) ?? ""}
                  productName={item.Product.name}
                  price={item.Product.price}
                  quantity={item.quantity}
                ></CardProductDetail>
              ))}
            </div>
            <div className="border shadow-xs rounded-md my-3 p-3 flex flex-col gap-2">
              <p className="font-semibold text-foreground/80">Pengiriman</p>
              <div className="flex flex-row gap-1.5">
                <div className="h-14 w-14 border relative rounded-md overflow-hidden">
                  <Image
                    src={"/images/logo-jnt.jpg"}
                    alt="icon-jpg"
                    fill
                    className="object-cover object-center"
                  ></Image>
                </div>
                <div className="flex-1 flex flex-row justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground/80">
                      J&T Express
                    </p>
                    <p className="text-sm text-foreground/50">Ekspedisi</p>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">
                      {formatCurrency(shipping)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border shadow-xs rounded-md my-3 flex flex-col gap-1">
              <div className="px-3">
                <div className="my-3">
                  <p className="font-semibold text-foreground/80">
                    Ringkasan Pembayaran
                  </p>
                </div>

                <div className="flex flex-row justify-between mb-1">
                  <p className="text-sm">
                    Subtotal{" "}
                    <span className="text-foreground/50">{`(${orderItems.length} produk)`}</span>
                  </p>
                  <p className="font-semibold text-sm">
                    {formatCurrency(totalPriceBeforeShipping)}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-sm">Ongkos Kirim</p>
                  <p className="font-semibold text-sm">
                    {formatCurrency(shipping)}
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between bg-foreground/5 px-3 py-1.5">
                <p className="text-sm font-semibold">Total Pembayaran</p>
                <p className="font-semibold text-sm">
                  {formatCurrency(Number(order.total_price))}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/3 h-full flex flex-col gap-2">
            <div className=" border rounded-md p-5">
              <p className="font-semibold text-foreground/80">
                Detail Pelanggan
              </p>
              <div className="my-3">
                <p className="font-semibold text-sm text-foreground/80 mb-2">
                  Info Kontak
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center text-foreground/70">
                    <Mail size={18} />
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center text-foreground/70">
                    <Phone size={18} />
                    <p className="text-sm">{user.phone}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-3"></Separator>

              <div>
                <p className="font-semibold text-sm text-foreground/80 mb-2">
                  Alamat Pengiriman
                </p>
                <div className="text-sm text-foreground/70 flex flex-col gap-1.5">
                  <p>{address.recipient_name}</p>
                  <p>{address.phone}</p>
                  <p>{address.province}</p>
                  <p>{address.city}</p>
                  <p>{address.district}</p>
                  {address.details && <p>{address.details}</p>}
                  <p>{address.postal_code}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-md px-5 pt-2 pb-5">
              <p className="text-2xl font-semibold text-foreground/80 mb-3">
                Order #{order.id}
              </p>
              <div className="flex flex-row gap-2 justify-between">
                <CalendarDays size={18} className="text-foreground/50" />
                <p className="text-sm text-foreground/50">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex justify-between text-sm text-foreground/50">
                <p>Resi : </p>
                <p>{order.tracking_number ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

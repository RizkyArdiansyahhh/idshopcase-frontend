"use client";
import { useGetOrderAdmin } from "@/features/orders/api/get-order-admin";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardStatusOrder, ListCardStatusOrder } from "./card-status-order";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CardOrderItem } from "./card-order-item";
import { ButtonCopyResi } from "@/components/shared/button-copy-resi";
import { formatCurrency } from "@/lib/format-currency";
import { Mail, Phone, SquareUserRound } from "lucide-react";
import { OrderTimeline } from "@/components/shared/order-timeline";

export const DetailOrderAdmin = () => {
  const params = useParams();
  const orderId = Number(params.orderId);
  const [infoStatusMessage, setInfoStatusMessage] = useState<string>("");

  const { data: order } = useGetOrderAdmin({ id: orderId });

  const totalPriceBeforeShipping =
    order?.OrderItems?.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0) ?? 0;

  const shipping = Number(order?.total_price) - totalPriceBeforeShipping;

  console.log(order, "order");

  useEffect(() => {
    if (order?.status === "pending") {
      setInfoStatusMessage("Order sedang diproses");
    } else if (order?.status === "shipped") {
      setInfoStatusMessage("Order sedang disiapkan untuk dikirim");
    } else if (order?.status === "completed") {
      setInfoStatusMessage("Order telah selesai");
    }
  }, [order]);
  if (!order) return null;

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full  flex flex-row gap-2 items-center font-semibold text-2xl text-foreground/80">
        <p>Order Id :</p>
        <p className="">#{order.id}</p>
      </div>
      <div className="w-full flex-1 border rounded-md flex flex-row">
        <div className="h-full w-2/3 border-r p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="h-3 w-3 bg-foreground rounded-full    text-foreground/80"></div>
              <p className="text-sm">{infoStatusMessage}</p>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-foreground/80">
              <p>No Resi : </p>
              <div className="flex flex-row items-center">
                <p>{order.tracking_number ? order.tracking_number : "-"}</p>
                {order.tracking_number &&
                  ButtonCopyResi(order.tracking_number ?? "")}
              </div>
            </div>
          </div>
          <div className="my-3">
            <ListCardStatusOrder status={order.status} />
          </div>
          <Separator className="my-5"></Separator>
          <div className="w-full flex flex-row gap-3">
            <div className="w-1/2 border rounded-md p-3">
              <p className="text-foreground/80 font-semibold text-sm mb-2">
                Alamat Penjual
              </p>
              <div className="flex flex-col gap-0.5 text-sm font-medium text-foreground/70">
                <span>Jawa Barat</span>
                <span>Kab. Bogor</span>
                <span>Kota Bogor</span>
                <span>Jl. Raya Bogor No. 1</span>
              </div>
            </div>
            <div className="w-1/2 border rounded-md p-3">
              <p className="text-foreground/80 font-semibold text-sm mb-2">
                Alamat Pembeli
              </p>
              <div className="flex flex-col gap-0.5 text-sm font-medium text-foreground/70">
                <span>{order.Address.province.toLowerCase()}</span>
                <span>{order.Address.city.toLowerCase()}</span>
                <span>{order.Address.district.toLowerCase()}</span>
                <span>{order.Address.postal_code.toLowerCase()}</span>
              </div>
            </div>
          </div>
          <Separator className="my-5"></Separator>
          <div className="border rounded-md p-2">
            <p className="text-foreground/80 font-semibold text-sm mb-2">
              Order Item
            </p>
            <div className="flex flex-col gap-3">
              {order.OrderItems.map((item) => {
                return <CardOrderItem key={item.id} item={item} />;
              })}
            </div>
          </div>
          <Separator className="my-5"></Separator>
          <div>
            <div className="border rounded-md p-2">
              <p className="text-foreground/80 font-semibold text-sm mb-2">
                Ringkasan Pesanan
              </p>
              <div className="text-xs text-foreground/60 font-medium flex flex-row items-center justify-between">
                <p>Harga Produk</p>
                <p>{order.OrderItems.length} Item</p>
                <p className="font-semibold text-foreground/80">
                  {formatCurrency(Number(totalPriceBeforeShipping))}
                </p>
              </div>
              <div className="text-xs text-foreground/60 font-medium flex flex-row items-center justify-between">
                <p>Harga Produk</p>
                <p>J&T Express</p>
                <p className="font-semibold text-foreground/80">
                  {formatCurrency(Number(shipping))}
                </p>
              </div>
              <div className="text-xs text-foreground/80 font-semibold flex flex-row items-center justify-between">
                <p>Total Harga</p>
                <p>{formatCurrency(Number(order.total_price))}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 p-3">
          <div className="border rounded-md p-3">
            <p className="text-foreground/80 font-semibold text-sm mb-2">
              Informasi Pelanggan
            </p>
            <div className="flex flex-col gap-1 text-xs font-medium text-foreground/70">
              <div className="flex flex-row justify-between items-center">
                <SquareUserRound size={18} className="text-foreground/70" />
                <span>{order.User.name}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <Mail size={18} className="text-foreground/70" />
                <span>{order.User.email}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <Phone size={18} className="text-foreground/70" />
                <span>{order.User.phone}</span>
              </div>
            </div>
          </div>
          <Separator className="my-5"></Separator>
          <div>
            <OrderTimeline
              events={[
                { label: "Order Dibuat", date: order.createdAt },
                { label: "Sedang Diproses Penjual", date: order.updatedAt },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsListV2,
  TabsTriggerV2,
} from "@/components/ui/tabs";
import { CreditCard, Package, Truck } from "lucide-react";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbClockCancel } from "react-icons/tb";
import { OrdersList } from "@/features/orders/components/orders-list";
// import { OrdersList } from "@/features/orders/components/orders-list";

export const Orders = () => {
  return (
    <>
      <div className="w-full h-full py-5 ">
        <Tabs defaultValue="all" className="w-full h-full flex flex-col">
          <TabsListV2 className="bg-transparent gap-4 px-4 item w-full">
            <TabsTriggerV2 value="all">All</TabsTriggerV2>
            <TabsTriggerV2 value="pending" className="">
              <MdOutlinePendingActions size={24} />
              Pending
            </TabsTriggerV2>
            <TabsTriggerV2 value="paid">
              <CreditCard size={24} />
              Paid
            </TabsTriggerV2>
            <TabsTriggerV2 value="shipped">
              <Package size={24} />
              Shipped
            </TabsTriggerV2>
            <TabsTriggerV2 value="delivered">
              <Truck size={24} />
              Delivered
            </TabsTriggerV2>
            <TabsTriggerV2 value="cancelled">
              <TbClockCancel size={24} />
              Cancelled
            </TabsTriggerV2>
          </TabsListV2>
          <Separator className="my-3 w-full"></Separator>

          <TabsContent value="all" className="h-full">
            <OrdersList status="all"></OrdersList>
          </TabsContent>
          <TabsContent value="pending" className="h-full">
            <OrdersList status="pending"></OrdersList>
          </TabsContent>
          <TabsContent value="paid" className="h-full">
            <OrdersList status="paid"></OrdersList>
          </TabsContent>
          <TabsContent value="shipped" className="h-full">
            <OrdersList status="shipped"></OrdersList>
          </TabsContent>
          <TabsContent value="delivered" className="h-full">
            <OrdersList status="delivered"></OrdersList>
          </TabsContent>
          <TabsContent value="cancelled" className="h-full">
            <OrdersList status="cancelled"></OrdersList>
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

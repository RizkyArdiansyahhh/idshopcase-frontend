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
    <div className="w-full h-full flex flex-col min-h-0 min-w-0">
      <Tabs defaultValue="all" className="flex flex-col h-full min-h-0 min-w-0">
        {/* TAB LIST */}
        <div className="shrink-0 py-2 w-full overflow-x-auto min-w-0">
          <TabsListV2 className="bg-transparent flex w-max min-w-full">
            <TabsTriggerV2 value="all">All</TabsTriggerV2>
            <TabsTriggerV2 value="pending">
              <MdOutlinePendingActions size={20} /> Pending
            </TabsTriggerV2>
            <TabsTriggerV2 value="paid">
              <CreditCard size={20} /> Paid
            </TabsTriggerV2>
            <TabsTriggerV2 value="shipped">
              <Package size={20} /> Shipped
            </TabsTriggerV2>
            <TabsTriggerV2 value="delivered">
              <Truck size={20} /> Delivered
            </TabsTriggerV2>
            <TabsTriggerV2 value="cancelled">
              <TbClockCancel size={20} /> Cancelled
            </TabsTriggerV2>
          </TabsListV2>
        </div>
        <Separator></Separator>

        {/* CONTENT */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <TabsContent value="all" className="h-full">
            <OrdersList status="all" />
          </TabsContent>
          <TabsContent value="pending" className="h-full">
            <OrdersList status="pending" />
          </TabsContent>
          <TabsContent value="paid" className="h-full">
            <OrdersList status="paid" />
          </TabsContent>
          <TabsContent value="shipped" className="h-full">
            <OrdersList status="shipped" />
          </TabsContent>
          <TabsContent value="delivered" className="h-full">
            <OrdersList status="delivered" />
          </TabsContent>
          <TabsContent value="cancelled" className="h-full">
            <OrdersList status="cancelled" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

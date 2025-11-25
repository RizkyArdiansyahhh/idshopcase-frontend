"use client";
import { useGetTrackOrder } from "@/features/orders/api/get-track-order";
import { TrackingOrderResponse } from "./_components/track-order";

const TrackOrderPage = () => {
  const { data: tracking } = useGetTrackOrder({
    orderId: 60,
  });
  console.log(tracking, "tracking");
  return (
    <>
      <TrackingOrderResponse tracking={tracking}></TrackingOrderResponse>
    </>
  );
};

export default TrackOrderPage;

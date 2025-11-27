import React from "react";
import { Package, MapPin, User, Check } from "lucide-react";

// Types sesuai response API
type TrackingHistory = {
  agentName: string;
  city_name: string;
  date_time: string;
  driverName: string;
  driverPhone: string;
  nextSiteName: string;
  note: string;
  presenter: string;
  presentername: string;
  receiver: string;
  status: string;
  status_code: number;
  storeName: string;
};

type TrackingData = {
  awb: string;
  detail: {
    actual_amount: number;
    delivDriver: {
      id: string;
      name: string;
      phone: string;
      photo: string;
    };
    detail_cost: {
      add_cost: number;
      cod: number;
      insurance_cost: number;
      return_cost: number;
      shipping_cost: number;
    };
    driver: {
      name: string;
    };
    itemname: string;
    note: string;
    qty: number;
    receiver: {
      addr: string;
      city: string;
      geoloc: string;
      name: string;
      zipcode: string;
    };
    sender: {
      addr: string;
      city: string;
      geoloc: string;
      name: string;
      zipcode: string;
    };
    services_code: string;
    services_type: string;
    shipped_date: string;
    weight: number;
  };
  history: TrackingHistory[];
  orderid: string;
};

type ApiResponse = {
  message: string;
  tracking: TrackingData;
};

// Status mapping untuk timeline dengan logic yang lebih detail
const getTimelineStep = (statusCode: number, status: string): number => {
  // Step 1: Order Created/Manifested
  if (statusCode === 101) return 1;

  // Step 2: Picked up / In Transit (general movement)
  if (statusCode === 100) {
    if (status.includes("diterima")) return 2; // Picked up
    if (status.includes("sampai")) return 3; // Arrived at center
    if (status.includes("dikirim ke alamat")) return 4; // Out for delivery
    return 2; // Default untuk status 100 lainnya
  }

  // Step 5: Delivered
  if (statusCode === 200) return 5;

  // Problem statuses (keep at current step, don't advance)
  if ([150, 151, 152, 162, 163, 401, 402].includes(statusCode)) return 0;

  return 1; // Default
};

const STATUS_LABELS: Record<number, string> = {
  101: "Manifes",
  100: "In Process",
  162: "Cancelled by Seller",
  163: "Cancelled by J&T",
  150: "On Hold",
  151: "Pickup Failed",
  152: "Delivery Problem",
  200: "Delivered",
  401: "Return in Progress",
  402: "Returned to Sender",
};

export const TrackOrderTimeline = ({
  tracking,
}: {
  tracking: TrackingData;
}) => {
  const latestHistory = tracking.history[0];
  let currentStep = 1;

  tracking.history.forEach((h) => {
    const step = getTimelineStep(h.status_code, h.status);
    if (step > currentStep) currentStep = step;
  });

  // Check for problem statuses
  const hasProblem = [150, 151, 152, 162, 163, 401, 402].includes(
    latestHistory?.status_code
  );
  const isCancelled = [162, 163].includes(latestHistory?.status_code);
  const isReturned = [401, 402].includes(latestHistory?.status_code);

  const steps = [
    { step: 1, label: "Pesanan Diterima", date: "" },
    { step: 2, label: "Diambil", date: "" },
    { step: 3, label: "Di Pusat Sortir", date: "" },
    { step: 4, label: "Sedang Dikirim", date: "" },
    { step: 5, label: "Terkirim", date: "" },
  ];

  tracking.history.forEach((h) => {
    const stepNum = getTimelineStep(h.status_code, h.status);
    if (stepNum > 0) {
      const step = steps.find((s) => s.step === stepNum);
      if (step && !step.date) {
        step.date = new Date(h.date_time).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Order #{tracking.orderid}
        </h1>
        {hasProblem && (
          <div
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              isCancelled
                ? "bg-red-100 text-red-700"
                : isReturned
                ? "bg-orange-100 text-orange-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isCancelled
              ? "❌ Cancelled"
              : isReturned
              ? "↩️ Returned"
              : "⚠️ Issue Detected"}
          </div>
        )}
      </div>

      <div className="relative mb-12">
        <div className="flex justify-between items-start">
          {steps.map((step, idx) => {
            const isActive = step.step <= currentStep && !isCancelled;
            const isCurrentStep = step.step === currentStep;

            return (
              <div
                key={step.step}
                className="flex flex-col items-center relative"
                style={{ flex: 1 }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10 transition-all ${
                    isCancelled
                      ? "bg-red-400"
                      : isActive
                      ? isCurrentStep
                        ? "bg-foreground ring-5 ring-foreground/50 "
                        : "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {isActive && !isCurrentStep ? <Check size={24} /> : step.step}
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-6 left-1/2 h-0.5 ${
                      isCancelled
                        ? "bg-red-300"
                        : step.step < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    style={{
                      width: "calc(100% + 3rem)",
                      transform: "translateX(1.5rem)",
                    }}
                  />
                )}

                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCancelled
                        ? "text-red-600"
                        : isActive
                        ? isCurrentStep
                          ? "text-foreground"
                          : "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Package className="text-gray-600" size={20} />
            <h3 className="font-semibold text-gray-800">Order Information</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase">AWB Number</p>
              <p className="font-medium text-gray-800">{tracking.awb}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Item Name</p>
              <p className="font-medium text-gray-800">
                {tracking.detail.itemname}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Quantity</p>
              <p className="font-medium text-gray-800">{tracking.detail.qty}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-gray-600" size={20} />
            <h3 className="font-semibold text-gray-800">Locations</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase">Pickup Location</p>
              <p className="font-medium text-gray-800">
                {tracking.detail.sender.name}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                {tracking.detail.sender.city}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-gray-500 text-xs uppercase">
                Drop-off Location
              </p>
              <p className="font-medium text-gray-800">
                {tracking.detail.receiver.name}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                {tracking.detail.receiver.city},{" "}
                {tracking.detail.receiver.zipcode}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-gray-600" size={20} />
            <h3 className="font-semibold text-gray-800">Customer Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase">Full Name</p>
              <p className="font-medium text-gray-800">
                {tracking.detail.receiver.name}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Address</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                {tracking.detail.receiver.addr}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Tracking History</h3>
        <div className="space-y-3">
          {tracking.history.map((item, idx) => {
            const isProblem = [150, 151, 152, 162, 163, 401, 402].includes(
              item.status_code
            );
            const dotColor = isProblem
              ? "bg-red-500"
              : item.status_code === 200
              ? "bg-green-500"
              : "bg-foreground";

            return (
              <div
                key={idx}
                className="flex gap-4 pb-3 border-b border-gray-200 last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full ${dotColor} mt-2 flex-shrink-0`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">{item.status}</p>
                    {isProblem && (
                      <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                        Issue
                      </span>
                    )}
                    {item.status_code === 200 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.city_name}</p>
                  {item.note && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      {item.note}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.date_time).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { TotalRevenue } from "@/features/dashboard/components/total-revenue";
import { TotalUserCard } from "@/features/dashboard/components/total-user";
import { TotalOrderCard } from "@/features/dashboard/components/total-order";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <TotalRevenue />
      <TotalUserCard />
      <TotalOrderCard />
    </div>
  );
}

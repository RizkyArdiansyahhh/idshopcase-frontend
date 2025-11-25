import { DataTable } from "@/app/(admin)/admin/components/data-table";
import { SectionCards } from "@/app/(admin)/admin/components/section-cards";

import data from "./data.json";
import { ChartAreaOrders } from "../components/chart-area-interactive";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaOrders />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

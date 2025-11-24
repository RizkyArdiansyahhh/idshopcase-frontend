import { Container, PackageCheck } from "lucide-react";
import { MdPendingActions } from "react-icons/md";

type CardStatusOrderProps = {
  status: string;
};

export const ListCardStatusOrder = ({ status }: CardStatusOrderProps) => {
  return (
    <>
      <div className="w-full h-fit flex flex-row gap-2">
        <CardStatusOrder
          status="Pending"
          description="Order sedang diproses"
          isActive={status === "pending"}
        >
          <MdPendingActions size={30} className="text-background" />
        </CardStatusOrder>
        <CardStatusOrder
          status="Shipped"
          description="Order sedang disiapkan"
          isActive={status === "shipped"}
        >
          <Container size={30} className="text-background" />
        </CardStatusOrder>
        <CardStatusOrder
          status="Completed"
          description="Order telah selesai"
          isActive={status === "completed"}
        >
          <PackageCheck size={30} className="text-background" />
        </CardStatusOrder>
      </div>
    </>
  );
};

export const CardStatusOrder = ({
  status,
  description,
  children,
  isActive,
}: {
  status: string;
  description: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <>
      <div
        className={`w-1/3 h-16 rounded-md p-1 flex flex-row gap-2 ${
          isActive
            ? "border-1 border-foreground shadow-md"
            : "border border-foreground/5"
        }`}
      >
        <div className="w-1/4 h-full bg-foreground rounded-md flex justify-center items-center">
          {children}
        </div>
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="text-foreground/80 font-semibold">{status}</p>
          <p className="text-foreground/60 font-medium">{description}</p>
        </div>
      </div>
    </>
  );
};

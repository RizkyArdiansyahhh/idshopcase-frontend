import { FaCircleInfo } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { CgDanger } from "react-icons/cg";
import { cn } from "@/lib/utils";

type AlertMessageProps = {
  message: string;
  variant: "info" | "warning" | "danger";
  clasname?: string;
};

export const AlertMessage = (props: AlertMessageProps) => {
  const { message, variant, clasname } = props;
  return (
    <>
      <div
        className={cn(
          "max-w-full whitespace-normal text-left flex flex-row items-start gap-2 border rounded-md p-2 border-dashed border-foreground/10",
          clasname,
        )}
      >
        {variant === "info" && <FaCircleInfo size={16} />}
        {variant === "warning" && <TiWarning size={16} />}
        {variant === "danger" && <CgDanger size={16} />}

        <p className="text-xs break-words">{message}</p>
      </div>
    </>
  );
};

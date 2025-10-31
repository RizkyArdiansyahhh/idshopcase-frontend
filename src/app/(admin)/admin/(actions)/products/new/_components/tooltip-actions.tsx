import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipActionsProps = {
  children: React.ReactNode;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (i: any) => void;
  isDisabled?: boolean;
};
export const TooltipActions = (props: TooltipActionsProps) => {
  const { children, variant, icon, action, isDisabled } = props;
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size={"icon-sm"}
            variant={variant}
            className="rounded-full"
            onClick={action}
            disabled={isDisabled}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </>
  );
};

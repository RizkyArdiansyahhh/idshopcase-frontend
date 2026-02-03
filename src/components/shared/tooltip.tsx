import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TooltipActionsProps = {
  children: React.ReactNode;
  message: string;
};

export const TooltipCustom = (props: TooltipActionsProps) => {
  const { children, message } = props;
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

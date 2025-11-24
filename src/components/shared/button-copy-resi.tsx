import { TbCopy } from "react-icons/tb";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { copyToClipboard } from "@/utils/copy-clipboard";

export const ButtonCopyResi = (resi: string) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => copyToClipboard(resi)}
        >
          <TbCopy className="font-semibold text-foreground/70" size={19} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>copy resi</p>
      </TooltipContent>
    </Tooltip>
  );
};

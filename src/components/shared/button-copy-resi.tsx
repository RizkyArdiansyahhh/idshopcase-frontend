import { TbCopy } from "react-icons/tb";
import { Button } from "../ui/button";
import { copyToClipboard } from "@/utils/copy-clipboard";
import { TooltipCustom } from "./tooltip";

export const ButtonCopyResi = (resi: string) => {
  return (
    <TooltipCustom message="copy resi">
      <Button
        variant="ghost"
        size={"icon"}
        onClick={() => copyToClipboard(resi)}
      >
        <TbCopy className="font-semibold text-foreground/70" size={19} />
      </Button>
    </TooltipCustom>
  );
};

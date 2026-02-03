import { TooltipCustom } from "@/components/shared/tooltip";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { useDeleteAddress } from "../api/delete-address";

export const DeleteAddress = ({ id }: { id: number }) => {
  const { mutate: deleteAddress, isPending: deleteAddressIsLoading } =
    useDeleteAddress();
  return (
    <>
      <TooltipCustom message="hapus">
        <Button
          variant="default"
          size={"icon"}
          onClick={() => deleteAddress(id)}
          className="rounded-full h-7 w-7 hover:bg-background  border border-foreground flex justify-center items-center hover:text-foreground transition-all ease-in duration-100"
          disabled={deleteAddressIsLoading}
        >
          <FaTrash className="font-semibold text-lg" />
        </Button>
      </TooltipCustom>
    </>
  );
};

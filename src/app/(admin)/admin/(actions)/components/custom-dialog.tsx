import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type CustomDialogProps = {
  action: () => void;
  isLoading?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
};
export const CustomDialog = (props: CustomDialogProps) => {
  const { action, isLoading, isOpen, onClose, title } = props;
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Delete {title}</DialogTitle>
          <DialogDescription>Apakah anda yakin?</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={action} disabled={isLoading}>
              {isLoading ? (
                <Spinner className="size-6 text-background" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { Dialog, DialogContent } from "../ui/dialog";

export function RingSpinner({
  size = 32,
  thickness = 4,
}: {
  size?: number;
  thickness?: number;
}) {
  return (
    <div
      className="animate-spin rounded-full border-muted border-t-foreground"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
      }}
    />
  );
}

export const LoadingDialog = ({ loading }: { loading: boolean }) => {
  return (
    <Dialog open={loading}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="border-0 bg-transparent shadow-none"
      >
        <div className="flex items-center justify-center h-20 ">
          <div className="h-fit w-fit p-5 rounded-md bg-background flex justify-center items-center">
            <RingSpinner size={50} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

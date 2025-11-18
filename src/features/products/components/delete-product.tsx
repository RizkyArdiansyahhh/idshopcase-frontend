import { Product } from "@/types/api";
import { useDeleteProduct } from "../api/delete-product";
import { CustomDialog } from "@/app/(admin)/admin/(actions)/components/custom-dialog";

type DeleteProductProps = {
  id: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  setSelectedProduct: (v: Product | null) => void;
};

export const DeleteProduct = (props: DeleteProductProps) => {
  const { id, isOpen, setIsOpen, setSelectedProduct } = props;

  const { mutate: deleteProduct, isPending: deleteProductIsLoading } =
    useDeleteProduct({
      mutationConfig: {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedProduct(null);
        },
      },
    });
  return (
    <CustomDialog
      title="Product"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      action={() => {
        deleteProduct(id);
      }}
      isLoading={deleteProductIsLoading}
    />
  );
};

import { CustomDialog } from "@/app/(admin)/admin/(actions)/components/custom-dialog";
import { useDeleteUser } from "../api/delete-user";
import { User } from "@/types/api";

export const DeleteUser = ({
  id,
  isOpen,
  setIsOpen,
  setSelectedUser,
}: {
  id: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  setSelectedUser: (v: User | null) => void;
}) => {
  const { mutate: deleteUser, isPending: deleteUserIsLoading } = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedUser(null);
      },
    },
  });

  return (
    <CustomDialog
      isOpen={isOpen}
      title="User"
      onClose={() => setIsOpen(false)}
      action={() => {
        deleteUser(id);
      }}
      isLoading={deleteUserIsLoading}
    />
  );
};

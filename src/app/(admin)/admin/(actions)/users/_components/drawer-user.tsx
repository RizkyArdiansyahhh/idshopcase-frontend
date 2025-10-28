import { DrawerDetail } from "../../../components/drawer-detail";
import { User } from "@/types/api";
import { ViewUser } from "./view-user";
import { EditUser } from "./edit-user";
import { CreateUser } from "./create-user";

type DrawerUserProps = {
  isOpen: boolean;
  user?: User | null;
  setIsOpen: (value: boolean) => void;
  children?: React.ReactNode;
  actions?: "view" | "edit" | "create";
};

export const DrawerUser = (props: DrawerUserProps) => {
  const { isOpen, setIsOpen, user, actions } = props;

  return (
    <>
      <DrawerDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={
          actions === "create"
            ? "Tambah User"
            : actions === "edit"
            ? "Edit User"
            : "Detail User"
        }
      >
        {actions === "view" && <ViewUser user={user as User} />}
        {actions === "edit" && <EditUser user={user as User} />}
        {actions === "create" && <CreateUser />}
      </DrawerDetail>
    </>
  );
};

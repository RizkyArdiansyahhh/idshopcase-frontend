import { CreateUserForm } from "@/features/users/components/create-user";
import { User } from "@/types/api";

type EditUserProps = {
  user: User;
};

export const EditUser = (props: EditUserProps) => {
  const { user } = props;
  return (
    <>
      <CreateUserForm user={user}></CreateUserForm>
    </>
  );
};

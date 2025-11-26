import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { useGetUser } from "@/features/auth/api/get-user";

export const NavMainAccount = () => {
  const { data: user } = useGetUser();

  console.log(user);

  if (!user) return null;
  return (
    <div className="flex flex-row gap-4 p-5 items-center">
      <UserAvatar
        name={user?.name}
        image={user.profile_picture ?? ""}
        className="h-10 w-10"
      ></UserAvatar>
      <div>
        <p className="text-xs font-semibold">{user?.name || "Anonymous"}</p>
        <Badge variant={"outline"}>{user?.role}</Badge>
      </div>
    </div>
  );
};

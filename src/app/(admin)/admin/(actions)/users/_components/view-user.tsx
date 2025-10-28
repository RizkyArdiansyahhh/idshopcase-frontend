import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/api";

type ViewUserProps = {
  user: User;
};

export const ViewUser = ({ user }: ViewUserProps) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <div className="border p-2 rounded-md flex flex-col items-center">
        <UserAvatar
          name={user.name}
          image=""
          className="h-40 w-40"
        ></UserAvatar>
        <h2 className="text-2xl font-semibold text-foreground">{user.name}</h2>

        <div className="flex flex-col gap-2.5 items-center">
          <div className="text-foreground/60 font-medium text-sm flex flex-col gap-2 items-center">
            <div>
              <span>Email :</span>
              <span>{user.email}</span>
            </div>
            <div>
              <span>No. HP :</span>
              <span>{user.phone}</span>
            </div>
          </div>
          <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
            {user.role.charAt(0).toUpperCase() +
              user.role.slice(1).toLowerCase()}
          </Badge>
        </div>
      </div>
    </>
  );
};

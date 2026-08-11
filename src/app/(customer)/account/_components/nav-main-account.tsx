import { UserAvatar } from "@/components/shared/user-avatar";
import { useGetUser } from "@/features/auth/api/get-user";

export const NavMainAccount = () => {
  const { data: user } = useGetUser();

  if (!user) return null;
  return (
    <div className="flex items-center gap-3.5 p-4 border-b border-border/60">
      <UserAvatar
        name={user?.name || "User"}
        image={user.profile_picture ?? user.image ?? ""}
        className="h-11 w-11 border border-border"
      />
      <div className="flex flex-col min-w-0">
        <p className="text-sm font-bold text-foreground truncate">
          {user?.name || "Pelanggan"}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

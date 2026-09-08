"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUsers } from "@/features/users/api/get-users"; // misal ada API ini
import { IconUserPlus } from "@tabler/icons-react";

export const TotalUserCard = () => {
  const { data: users } = useGetUsers();

  if (!users) return null;

  const normalUsers = users.filter((u) => u.role === "customer");

  const totalUsers = normalUsers.length;

  const monthlyNewUsers: Record<string, number> = {};
  normalUsers.forEach((user) => {
    const date = new Date(user.createdAt);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (!monthlyNewUsers[monthKey]) monthlyNewUsers[monthKey] = 0;
    monthlyNewUsers[monthKey] += 1;
  });

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const thisMonthUsers = monthlyNewUsers[currentMonthKey] || 0;

  return (
    <Card className="@container/card border-border/60 min-w-0">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardDescription>Total User</CardDescription>
          <CardAction>
            <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/70">
              <IconUserPlus className="size-3.5 mr-1" />
              +{thisMonthUsers} bulan ini
            </Badge>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {totalUsers}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          User baru bulan terakhir <IconUserPlus className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Data dari user biasa saja, bukan admin
        </div>
      </CardFooter>
    </Card>
  );
};

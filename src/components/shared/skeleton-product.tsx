import { Skeleton } from "../ui/skeleton";

export const SkeletonProduct = () => {
  return (
    <div className="border rounded-lg p-3 space-y-3">
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
};

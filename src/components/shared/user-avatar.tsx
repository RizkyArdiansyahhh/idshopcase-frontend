import { cleanImageUrl } from "@/utils/image-utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type AvatarFallbackProps = {
  name?: string;
  image?: string | null;
  className?: string;
  fallbackClassName?: string;
  noBg?: boolean;
};

export const UserAvatar = (props: AvatarFallbackProps) => {
  const {
    name = "User",
    image = "",
    className,
    fallbackClassName,
    noBg = false,
  } = props;

  const randomColor = [
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-slate-600",
  ];

  const safeName = (name || "User").trim();
  const splitName = safeName.split(" ").filter(Boolean);
  const initials =
    splitName.length > 1
      ? (splitName[0][0] + splitName[1][0]).toUpperCase()
      : safeName.substring(0, 2).toUpperCase() || "U";

  const color = randomColor[safeName.charCodeAt(0) % randomColor.length];

  const isBlob = image?.startsWith("blob:") || image?.startsWith("data:");
  const imageSrc = isBlob ? image : (cleanImageUrl(image || "") ?? "");

  // Auto-detect font size if fallbackClassName is not provided
  const isLarge = className?.includes("h-40") || className?.includes("w-40");
  const isMedium =
    className?.includes("h-16") ||
    className?.includes("w-16") ||
    className?.includes("h-20") ||
    className?.includes("w-20");
  const defaultFontSize = isLarge
    ? "text-4xl font-bold"
    : isMedium
      ? "text-lg font-semibold"
      : "text-xs font-semibold";

  return (
    <Avatar className={cn("relative overflow-hidden", className)}>
      {image ? (
        <Image
          src={imageSrc || (image as string)}
          alt={name || "User Avatar"}
          className="object-cover"
          fill
        />
      ) : (
        <AvatarFallback
          className={cn(
            noBg
              ? "bg-transparent text-foreground border border-border/80 select-none flex items-center justify-center font-medium"
              : `${color} text-white select-none flex items-center justify-center font-bold`,
            fallbackClassName || defaultFontSize
          )}
        >
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

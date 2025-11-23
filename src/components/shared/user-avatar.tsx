import { cleanImageUrl } from "@/utils/image-utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useGetUser } from "@/features/auth/api/get-user";
import Image from "next/image";

type AvatarFallbackProps = {
  name: string;
  image: string;
  className: string;
};
export const UserAvatar = (props: AvatarFallbackProps) => {
  const { name, image, className } = props;

  const randomColor = [
    "bg-lime-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-pink-400",
    "bg-slate-400",
  ];

  const { data: user } = useGetUser();

  const safeName = name.trim();
  const splitName = name.split(" ");
  const initials =
    splitName.length > 1
      ? splitName[0][0] + splitName[1][0].toUpperCase()
      : safeName.substring(0, 2).toUpperCase();

  const color = randomColor[safeName.charCodeAt(0) % randomColor.length];

  const isBlob = image?.startsWith("blob:") || image?.startsWith("data:");
  const imageSrc = isBlob ? image : cleanImageUrl(image) ?? "";

  console.log(image, "image");

  return (
    <Avatar className={cn(className)}>
      {image ? (
        <Image
          src={imageSrc ?? image}
          alt="avatar-image"
          className="object-cover"
          fill
        ></Image>
      ) : (
        <AvatarFallback className={`${color} text-white font-bold text-4xl`}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

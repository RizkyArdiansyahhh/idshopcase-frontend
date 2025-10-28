import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

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

  const safeName = name.trim();
  const splitName = name.split(" ");
  const initials =
    splitName.length > 1
      ? splitName[0][0] + splitName[1][0].toUpperCase()
      : safeName.substring(0, 2).toUpperCase();

  const color = randomColor[safeName.charCodeAt(0) % randomColor.length];

  return (
    <Avatar className={cn(className)}>
      {image ? (
        <AvatarImage
          src={image}
          alt="avatar-image"
          className="object-cover"
        ></AvatarImage>
      ) : (
        <AvatarFallback className={`${color} text-white font-bold text-4xl`}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

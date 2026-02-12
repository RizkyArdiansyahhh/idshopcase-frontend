import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export const CardTestimoni = ({
  isDark,
  children,
  imageProfileUrl,
}: {
  isDark: boolean;
  children: string;
  imageProfileUrl: string;
}) => {
  return (
    <>
      <div
        className={`w-full  ${
          isDark ? "bg-foreground/5 h-3/12" : "bg-background h-4/12"
        } border shadow-xs rounded-sm my-3 p-3`}
      >
        <div className="flex flex-row gap-3 items-center mb-3 ">
          <div className="h-10 w-10 bg-yellow-700 rounded-full relative overflow-hidden">
            <Image
              src={`/images/testimoni/picture-${imageProfileUrl}.jpg`}
              alt="picture-1"
              fill
              className="object-center object-cover"
            ></Image>
          </div>
          <div className="h-full w-full">
            <p
              className={`${
                isDark ? "text-foreground/90" : "text-foreground/80"
              } font-semibold text-sm`}
            >
              John Doe
            </p>
            <p
              className={` ${
                isDark ? "text-foreground/70" : "text-foreground/60"
              } font-medium text-sm`}
            >
              @johndoe
            </p>
          </div>
        </div>
        <p
          className={`${
            isDark ? "text-xs font-normal" : "text-sm font-medium"
          } font-normal ${
            isDark ? "text-foreground/90" : "text-foreground/80"
          } h-full w-full`}
        >
          {children}
        </p>
      </div>
    </>
  );
};

export const CardTestimoniSpeaker = ({
  image,
  imageProfileUrl,
}: {
  image: string;
  imageProfileUrl: string;
}) => {
  return (
    <>
      <div className="w-full h-5/12 shadow-xs rounded-sm my-3 relative overflow-hidden border">
        <Image
          src={image}
          alt="speak-1"
          fill
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-b from-transparent to-foreground/60"></div>
        <div className="absolute bottom-0 left-5 h-12 bg-transparent w-1/2 flex flex-row items-center gap-2">
          <div className="h-8 w-8 relative rounded-full overflow-hidden">
            <Image
              src={`/images/testimoni/picture-${imageProfileUrl}.jpg`}
              alt="picture"
              fill
              className="object-cover object-center"
            ></Image>
          </div>
          <div>
            <p className="text-sm font-semibold text-background">@Amara</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <FaPlay size={65} className="text-background/80" />
        </div>
      </div>
    </>
  );
};

export const CardTestimoniMobile = ({
  isDark,
  children,
  imageProfileUrl,
}: {
  isDark: boolean;
  children: string;
  imageProfileUrl: string;
}) => {
  return (
    <div
      className={`w-full ${
        isDark ? "bg-foreground/5" : "bg-background"
      } border rounded-md shadow-xs p-3 my-2 h-auto`}
    >
      <div className="flex flex-row gap-3 items-center mb-2">
        <div className="h-8 w-8 bg-yellow-700 rounded-full relative overflow-hidden">
          <Image
            src={`/images/testimoni/picture-${imageProfileUrl}.jpg`}
            alt="profile"
            fill
            className="object-cover object-center"
          />
        </div>
        <div>
          <p
            className={`${
              isDark ? "text-foreground/90" : "text-foreground"
            } text-xs font-semibold`}
          >
            John Doe
          </p>
          <p
            className={`${
              isDark ? "text-foreground/70" : "text-foreground/60"
            } text-xs`}
          >
            @johndoe
          </p>
        </div>
      </div>

      <p
        className={`${
          isDark ? "text-foreground/80" : "text-foreground/80"
        } text-xs leading-relaxed`}
      >
        {children}
      </p>
    </div>
  );
};

export const CardTestimoniSpeakerMobile = ({
  image,
  imageProfileUrl,
}: {
  image: string;
  imageProfileUrl: string;
}) => {
  return (
    <div className="w-full h-[200px] rounded-md my-2 shadow-xs relative overflow-hidden border">
      <Image
        src={image}
        alt="speaker"
        fill
        className="object-cover object-center"
      />

      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-b from-transparent to-black/60" />

      <div className="absolute bottom-2 left-3 flex flex-row items-center gap-2">
        <div className="h-7 w-7 rounded-full overflow-hidden relative">
          <Image
            src={`/images/testimoni/picture-${imageProfileUrl}.jpg`}
            alt="profile"
            fill
            className="object-cover object-center"
          />
        </div>
        <p className="text-white text-xs font-medium">@Amara</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <FaPlay size={42} className="text-white/75" />
      </div>
    </div>
  );
};

"use client";

export const BannerVideoHomePage = () => {
  return (
    <div className="w-full h-[65vh] overflow-hidden rounded-xs ">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dy9gtwsh7/video/upload/f_auto,q_auto/baner_1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

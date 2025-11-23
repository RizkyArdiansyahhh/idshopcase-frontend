"use client";
import { useGetUser } from "@/features/auth/api/get-user";
import { ProfileForm } from "@/features/profile/components/profile-form";

export const Profile = () => {
  const { data: user } = useGetUser({});
  if (!user) {
    return null;
  }
  const cleanPath = user?.profile_picture?.split("/uploads/")[1] ?? null;
  const imageUrl = cleanPath ? `/images/${cleanPath}` : null;

  console.log(imageUrl);

  if (!user) return null;
  return (
    <>
      <div className="py-7">
        <ProfileForm {...user} imageurl={imageUrl ?? ""}></ProfileForm>
      </div>
    </>
  );
};

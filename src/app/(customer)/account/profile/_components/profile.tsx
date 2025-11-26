"use client";
import { useGetUser } from "@/features/auth/api/get-user";
import { ProfileForm } from "@/features/profile/components/profile-form";

export const Profile = () => {
  const { data: user } = useGetUser({});
  if (!user) {
    return null;
  }

  if (!user) return null;
  return (
    <>
      <div className="py-7">
        <ProfileForm
          {...user}
          imageurl={user.profile_picture ?? ""}
        ></ProfileForm>
      </div>
    </>
  );
};

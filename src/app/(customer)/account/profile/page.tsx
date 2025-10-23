"use client";
import Image from "next/image";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { useGetUser } from "@/features/auth/api/get-user";

const ProfilePage = () => {
  const id = localStorage.getItem("id");
  const { data: user } = useGetUser({
    id: Number(id),
    queryConfig: { enabled: !!id },
  });

  if (!user) return null;
  return (
    <>
      <div className="px-16">
        <div className="w-40 h-40 rounded-full relative overflow-hidden">
          <Image
            src="/images/default-profile.jpg"
            alt="avatar"
            fill
            className="object-cover object-center"
          />
        </div>
        <ProfileForm {...user}></ProfileForm>
      </div>
    </>
  );
};

export default ProfilePage;

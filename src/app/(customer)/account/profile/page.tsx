// "use client";
// import Image from "next/image";
// import { ProfileForm } from "@/features/profile/components/profile-form";
// import { useGetUser } from "@/features/auth/api/get-user";
// import { UserAvatar } from "@/components/shared/user-avatar";

// const ProfilePage = () => {
//   const { data: user } = useGetUser({

//   });

//   if (!user) return null;
//   return (
//     <>
//       <div className="px-16">
//         <UserAvatar
//           name={user.name}
//           image={user.image}
//           className={"h-40 w-40"}
//         ></UserAvatar>
//         {/* <div className="w-40 h-40 rounded-full relative overflow-hidden">
//           <Image
//             src="/images/default-profile.jpg"
//             alt="avatar"
//             fill
//             className="object-cover object-center"
//           />
//         </div> */}
//         <ProfileForm {...user}></ProfileForm>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;

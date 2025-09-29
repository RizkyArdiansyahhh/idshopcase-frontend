import { InputCardProfile } from "./_components/input-card-profile";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <>
      <div className="px-16">
        <div className="w-40 h-40 rounded-full bg-sky-300"></div>
        <form action="#">
          <div className="grid grid-cols-2 gap-4">
            <InputCardProfile
              label="Nama Depan"
              value="John"
              type="text"
              id="firstName"
            />
            <InputCardProfile
              label="Nama Belakang"
              value="Doe"
              type="text"
              id="lastName"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputCardProfile
              label="Email"
              value="email@gmail.com"
              type="email"
              id="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputCardProfile
              label="No. Handphone"
              value="08123456789"
              type="tel"
              id="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button className="py-5">Update Data</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;

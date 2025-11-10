import { Separator } from "@/components/ui/separator";
import { FormUpdatePassword } from "@/features/users/components/form-update-password";

const UpdatePassword = () => {
  return (
    <>
      <div className="h-full w-full p-5">
        <div>
          <h2 className="text-2xl font-semibold">Atur Password</h2>
          <p className="text-foreground/65">
            Untuk Keamanan Akun Anda, mohon untuk tidak membagikan password anda
            ke orang lain
          </p>
        </div>
        <Separator className="my-6"></Separator>
        <FormUpdatePassword></FormUpdatePassword>
      </div>
    </>
  );
};

export default UpdatePassword;

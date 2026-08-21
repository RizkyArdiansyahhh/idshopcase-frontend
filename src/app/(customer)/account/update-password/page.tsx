import { FormUpdatePassword } from "@/features/users/components/form-update-password";

const UpdatePassword = () => {
  return (
    <div className="w-full space-y-6 font-sans text-neutral-900">
      <div className="pb-4 border-b border-neutral-200">
        <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-neutral-900">
          Ubah Password
        </h2>
        <p className="text-xs text-neutral-500 font-normal">
          Perbarui kata sandi Anda secara berkala untuk menjaga keamanan akun
        </p>
      </div>
      <FormUpdatePassword />
    </div>
  );
};

export default UpdatePassword;

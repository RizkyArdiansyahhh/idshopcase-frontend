import { Eye, EyeClosed } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type UserFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isPasswordVisible: boolean;
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmPasswordVisible: boolean;
  setIsConfirmPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
};
export const UserForm = <T extends FieldValues>(props: UserFormProps<T>) => {
  const {
    form,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    isEdit,
  } = props;
  return (
    <>
      <FormField
        control={form.control}
        name={"name" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                id="name"
                placeholder="Username"
                {...field}
                value={field.value || ""}
              ></Input>
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"email" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                disabled={isEdit}
                id="email"
                placeholder="Email"
                {...field}
                value={field.value || ""}
              ></Input>
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"phone" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>No Handphone</FormLabel>
            <FormControl>
              <Input
                type="text"
                id="phone"
                disabled={isEdit}
                placeholder="+62 XXX"
                {...field}
                value={field.value || ""}
              ></Input>
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      {!isEdit && (
        <>
          <FormField
            control={form.control}
            name={"password" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      className="pr-10"
                      {...field}
                      value={field.value || ""}
                    ></Input>
                    <div
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                    >
                      {isPasswordVisible ? (
                        <EyeClosed className="text-ring" />
                      ) : (
                        <Eye className="text-ring" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"confirmPassword" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="pr-10"
                      {...field}
                      value={field.value || ""}
                    ></Input>
                    <div
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeClosed className="text-ring" />
                      ) : (
                        <Eye className="text-ring" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { SpinnerV2 } from "@/components/ui/spinner";
import {
  updateSchema as userFormUpdateSchema,
  registerSchema as userSchema,
} from "@/features/auth/api/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCreateUser } from "../api/create-user";
import { UserForm } from "@/components/shared/user-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/api";
import { useUpdateUser } from "../api/update-user";

type CreateUserFormProps = {
  user?: User;
};
export const CreateUserForm = (props: CreateUserFormProps) => {
  const { user } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const isEdit = user !== undefined;
  const userFormCreateSchema = userSchema.safeExtend({
    role: z.enum(["admin", "customer"]).default("customer"),
  });

  // type UserFormCreateSchema = z.infer<typeof userFormCreateSchema>;
  // type UserFormUpdateSchema = z.infer<typeof userFormUpdateSchema>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(isEdit ? userFormUpdateSchema : userFormCreateSchema),
    mode: "onChange",
    defaultValues: isEdit && {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "customer",
    },
  });

  const { mutate: createUser, isPending: createUserIsLoading } =
    useCreateUser();

  const { mutate: updateUser, isPending: updateUserIsLoading } =
    useUpdateUser();
  return (
    <>
      <div>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit((values) => {
              if (isEdit) {
                updateUser({ id: user!.id, data: values });
              } else {
                console.log(values);
                createUser({ data: values });
              }
            })}
          >
            <UserForm
              form={form}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              isConfirmPasswordVisible={isConfirmPasswordVisible}
              setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
              isEdit={user !== undefined}
            ></UserForm>
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="font-bold py-3"
              disabled={isEdit ? updateUserIsLoading : createUserIsLoading}
            >
              {updateUserIsLoading || createUserIsLoading ? (
                <SpinnerV2 className="text-background size-6" />
              ) : isEdit ? (
                "Update User"
              ) : (
                "Tambah User"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

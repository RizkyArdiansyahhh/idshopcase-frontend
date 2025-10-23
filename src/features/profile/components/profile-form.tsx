"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateUser } from "../api/update-user";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type ProfileFormProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
};
export const ProfileForm = (props: ProfileFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { id, name, email, phone } = props;
  const profileFormSchema = z.object({
    first_name: z
      .string({ message: "First name is required" })
      .min(4, {
        message: "First name must be at least 8 characters",
      })
      .nonempty("First name is required"),
    last_name: z
      .string({ message: "Last name is required" })
      .min(4, {
        message: "Last name must be at least 8 characters",
      })
      .optional(),
    email: z.email().nonempty("Email is required"),
    phone: z
      .string({ message: "Phone number is required" })
      .min(12, {
        message: "Phone number must be at least 12 characters",
      })
      .nonempty(),
  });
  type ProfileFormType = z.infer<typeof profileFormSchema>;
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: name,
      last_name: "",
      email: email,
      phone: phone,
    },
  });

  const { mutate: updateUser, isPending: updateUserPending } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        setIsEditing(false);
        router.refresh();
      },
    },
  });

  const onSubmit = (data: ProfileFormType) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.last_name) formData.append("last_name", data.last_name);

    updateUser({ id: Number(id), data: formData });
  };

  return (
    <Form {...form}>
      <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Depan</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="firstName"
                    {...field}
                    value={field.value || ""}
                    disabled={!isEditing}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Belakang</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="lastName"
                    {...field}
                    value={field.value || ""}
                    disabled={!isEditing}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    {...field}
                    value={field.value || ""}
                    disabled={!isEditing}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="phone"
                    {...field}
                    value={field.value || ""}
                    disabled={!isEditing}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {isEditing ? (
            <>
              <Button
                disabled={updateUserPending}
                type="submit"
                className="py-5"
              >
                {updateUserPending ? (
                  <Spinner className="size-6"></Spinner>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="py-5"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="py-5"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

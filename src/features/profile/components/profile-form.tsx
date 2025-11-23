"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateUser } from "../api/update-user";
import { useRouter } from "next/navigation";
import { SpinnerV2 } from "@/components/ui/spinner";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Separator } from "@/components/ui/separator";
import { TbEditCircle } from "react-icons/tb";

type ProfileFormProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageurl: string;
};
export const ProfileForm = (props: ProfileFormProps) => {
  const { name, email, phone, imageurl } = props;

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(imageurl);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const profileFormSchema = z.object({
    name: z
      .string({ message: "First name is required" })
      .min(4, {
        message: "First name must be at least 8 characters",
      })
      .nonempty("First name is required"),
    email: z.email().nonempty("Email is required"),
    phone: z
      .string({ message: "Phone number is required" })
      .min(12, {
        message: "Phone number must be at least 12 characters",
      })
      .nonempty(),
    image: z.instanceof(File).optional(),
  });
  type ProfileFormType = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    },
  });

  const { mutate: updateUser, isPending: updateUserPending } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        setIsEditing(false);
        // router.refresh();
      },
    },
  });

  const onSubmit = (data: ProfileFormType) => {
    if (!isEditing) return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.image) {
      console.log(data.image);
      formData.append("profile_picture", data.image);
    }
    formData.append("role", "customer");

    updateUser(formData);
  };

  console.log(previewImage, "previewImage");
  return (
    <div>
      <div className="flex flex-row items-center gap-5 px-16">
        <UserAvatar
          key={previewImage}
          name={name}
          image={previewImage}
          className={"h-40 w-40 transition-all duration-300 ease-in-out"}
        ></UserAvatar>
        <div className="flex flex-col gap-5">
          <Button
            variant={"outline"}
            type="button"
            disabled={!isEditing}
            onClick={() => {
              imageRef.current?.click();
            }}
          >
            Unggah Foto Baru
          </Button>
          <div className="text-xs text-foreground/60">
            <p>Ukuran file maksimal 2MB</p>
            <p>Format Gambar: .jpg, .jpeg, .png</p>
          </div>
        </div>
      </div>
      <Separator className="my-4"></Separator>
      <Form {...form}>
        <form className="mt-5 px-10" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="border rounded-[12px] px-6 py-4 shadow-xs">
            <div className="flex flex-row justify-between">
              <p className="text-foreground font-semibold">Informasi Pribadi</p>
              <Button
                variant={"outline"}
                disabled={isEditing}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                <TbEditCircle />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="imageInput"
                        type="file"
                        ref={imageRef}
                        accept="image/*"
                        disabled={!isEditing}
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

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
                    <FormMessage></FormMessage>
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
                      <div className="relative w-full">
                        <p className="text-sm text-foreground absolute left-3 top-1/2 -translate-y-1/2">
                          (+62)
                        </p>
                        <Input
                          type="text"
                          id="phone"
                          className="pl-12"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditing}
                        />
                      </div>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {isEditing && (
              <>
                <Button
                  disabled={updateUserPending}
                  type="submit"
                  className="py-5"
                >
                  {updateUserPending ? (
                    <SpinnerV2 className="size-6"></SpinnerV2>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="py-5"
                  onClick={() => {
                    form.reset();
                    setPreviewImage(imageurl);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

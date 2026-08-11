"use client";

import { UserAvatar } from "@/components/shared/user-avatar";
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
import { SpinnerV2 } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import z from "zod";
import { useUpdateUser } from "../api/update-user";

type ProfileFormProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageurl: string;
};
export const ProfileForm = (props: ProfileFormProps) => {
  const { name, email, phone, imageurl } = props;

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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Avatar Picture Box (Tokopedia Style) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-muted/20 rounded-2xl border border-border/40 space-y-4">
              <div className="relative group">
                <UserAvatar
                  key={previewImage}
                  name={name}
                  image={previewImage}
                  className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => imageRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer font-medium text-xs"
                  >
                    Ubah Foto
                  </button>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Button
                  variant="outline"
                  type="button"
                  disabled={!isEditing}
                  onClick={() => imageRef.current?.click()}
                  className="w-full font-semibold rounded-xl"
                >
                  Pilih Foto
                </Button>
                <div className="text-[11px] text-muted-foreground leading-relaxed space-y-0.5">
                  <p>Ukuran file maksimum 2MB</p>
                  <p>Format yang diterima: JPG, JPEG, PNG</p>
                </div>
              </div>
            </div>

            {/* Right Column: User Info Form Fields (Tokopedia Style) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  Ubah Biodata Diri
                </h2>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(true);
                    }}
                    className="gap-2 rounded-xl font-semibold text-xs sm:text-sm"
                  >
                    <LuPencil className="w-3.5 h-3.5" />
                    Ubah Profile
                  </Button>
                ) : (
                  <span className="text-xs text-primary font-semibold animate-pulse">
                    Mode Pengeditan Aktif
                  </span>
                )}
              </div>

              {/* Hidden File Input */}
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input
                        type="file"
                        ref={imageRef}
                        accept="image/*"
                        disabled={!isEditing}
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

              {/* Form Input Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-semibold">
                        Nama Lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={!isEditing}
                          className="rounded-xl h-11 focus-visible:ring-primary disabled:opacity-75 disabled:bg-muted/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          value={field.value || ""}
                          disabled={!isEditing}
                          className="rounded-xl h-11 focus-visible:ring-primary disabled:opacity-75 disabled:bg-muted/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm font-semibold">
                        Nomor Telepon
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <span className="text-sm font-semibold text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2">
                            (+62)
                          </span>
                          <Input
                            type="text"
                            className="pl-14 rounded-xl h-11 focus-visible:ring-primary disabled:opacity-75 disabled:bg-muted/30"
                            {...field}
                            value={field.value || ""}
                            disabled={!isEditing}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Save & Cancel Buttons */}
              {isEditing && (
                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <Button
                    disabled={updateUserPending}
                    type="submit"
                    className="px-8 h-11 font-semibold rounded-xl shadow-md shadow-primary/10"
                  >
                    {updateUserPending ? (
                      <SpinnerV2 className="size-5" />
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 h-11 font-semibold rounded-xl"
                    onClick={() => {
                      form.reset();
                      setPreviewImage(imageurl);
                      setIsEditing(false);
                    }}
                  >
                    Batal
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

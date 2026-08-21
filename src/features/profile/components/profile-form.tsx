"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useLogout } from "@/features/auth/api/login";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuCamera,
  LuArrowRight,
  LuCheck,
  LuLogOut,
} from "react-icons/lu";
import z from "zod";
import { useUpdateUser } from "../api/update-user";

type ProfileFormProps = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  imageurl: string;
};

export const ProfileForm = (props: ProfileFormProps) => {
  const { name, email, phone, imageurl } = props;
  const t = useTranslations("account");
  const tp = useTranslations("account.profileForm");
  const router = useRouter();
  const logout = useLogout();

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
      .string()
      .min(3)
      .nonempty(),
    email: z.string().email().nonempty(),
    phone: z
      .string()
      .regex(/^[0-9]+$/, { message: "Hanya angka" })
      .min(9)
      .max(15)
      .optional()
      .or(z.literal("")),
    image: z.instanceof(File).optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      image: undefined,
    },
  });

  const { mutate: updateUser, isPending: updateUserPending } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        setIsEditing(false);
      },
    },
  });

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace("/login"),
    });
  };

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    if (data.image) {
      formData.append("profile_picture", data.image);
    }
    formData.append("role", "customer");

    updateUser(formData);
  };

  return (
    <div className="w-full space-y-6 font-sans text-neutral-900 select-none">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            form.setValue("image", file, { shouldDirty: true });
            setPreviewImage(URL.createObjectURL(file));
            if (!isEditing) setIsEditing(true);
          }
        }}
      />

      {/* Mode Edit Form */}
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-900">
                {tp("editMode")}
              </h3>
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="text-xs font-semibold text-neutral-600 hover:text-black underline cursor-pointer"
              >
                {tp("uploadPhoto")}
              </button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold text-neutral-700">
                      {tp("fullName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-xl h-10 border-neutral-300 focus-visible:ring-0 focus-visible:border-black text-sm bg-white"
                        placeholder={tp("fullName")}
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
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold text-neutral-700">
                      {tp("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={field.value || ""}
                        className="rounded-xl h-10 border-neutral-300 focus-visible:ring-0 focus-visible:border-black text-sm bg-white"
                        placeholder="alamat@email.com"
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
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-semibold text-neutral-700">
                      {tp("phone")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <span className="text-xs font-semibold text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2">
                          (+62)
                        </span>
                        <Input
                          type="text"
                          className="pl-13 rounded-xl h-10 border-neutral-300 focus-visible:ring-0 focus-visible:border-black text-sm bg-white"
                          {...field}
                          value={field.value || ""}
                          placeholder="81234567890"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                disabled={updateUserPending}
                type="submit"
                className="px-6 h-10 font-bold text-xs rounded-full bg-black hover:bg-neutral-800 text-white transition-all cursor-pointer"
              >
                {updateUserPending ? (
                  <SpinnerV2 className="size-4 text-white" />
                ) : (
                  tp("saveChanges")
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-5 h-10 font-semibold text-xs rounded-full border-neutral-300 hover:border-black transition-all cursor-pointer"
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                }}
              >
                {tp("cancel")}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        /* Action Rows */
        <div className="space-y-2.5">
          {/* Row 1: Profile Name */}
          <div className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50/60 transition-all flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0">
                <LuUser className="w-4 h-4 text-neutral-700" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                  {tp("fullName")}
                </h4>
                <p className="text-xs text-neutral-500 font-normal truncate">
                  {name || tp("notSet")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-black group-hover:underline cursor-pointer shrink-0 transition-all"
            >
              <span>{tp("editData")}</span>
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Row 2: Email */}
          <div className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50/60 transition-all flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0">
                <LuMail className="w-4 h-4 text-neutral-700" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                    {tp("email")}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-semibold text-neutral-600">
                    <LuCheck className="w-3 h-3 text-emerald-600" />
                    <span>{tp("verified")}</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-normal truncate">
                  {email || tp("notSet")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-black group-hover:underline cursor-pointer shrink-0 transition-all"
            >
              <span>{tp("editData")}</span>
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Row 3: WhatsApp Number */}
          <div className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50/60 transition-all flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0">
                <LuPhone className="w-4 h-4 text-neutral-700" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                  {tp("phone")}
                </h4>
                <p className="text-xs text-neutral-500 font-normal truncate">
                  {phone ? `(+62) ${phone}` : tp("notSet")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-black group-hover:underline cursor-pointer shrink-0 transition-all"
            >
              <span>{tp("editData")}</span>
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Row 4: Photo Profile */}
          <div className="p-3.5 sm:p-4 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50/60 transition-all flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    <LuCamera className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                  {tp("photo")}
                </h4>
                <p className="text-xs text-neutral-500 font-normal truncate">
                  {previewImage ? tp("customPhotoSet") : tp("photoFormat")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 group-hover:text-black group-hover:underline cursor-pointer shrink-0 transition-all"
            >
              <span>{tp("changePhoto")}</span>
              <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Subtle Security & Privacy Footnote */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-neutral-500 text-[11px] leading-relaxed">
        <p>
          {tp("securityNote")}
        </p>
      </div>

      {/* Clean Sign Out Action (Matching Reference Design) */}
      <div className="pt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logout.isPending}
          className="px-4 py-2 text-xs font-bold rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-900 transition-all cursor-pointer shadow-2xs inline-flex items-center gap-2"
        >
          <LuLogOut className="w-3.5 h-3.5 text-neutral-600" />
          <span>{t("signOut")}</span>
        </button>
        <span className="text-xs text-neutral-400 font-normal">
          {t("signOutDescription")}
        </span>
      </div>
    </div>
  );
};

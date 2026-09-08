"use client";

import React, { useState, useRef } from "react";
import { useGetUser } from "@/features/auth/api/get-user";
import { useUpdateUser } from "@/features/profile/api/update-user";
import { useUpdatePassword } from "@/features/users/api/update-password";
import { useLogout } from "@/features/auth/api/login";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpinnerV2 } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  IconUser,
  IconLock,
  IconShieldLock,
  IconCamera,
  IconCheck,
  IconLogout,
  IconKey,
  IconMail,
  IconPhone,
  IconCalendar,
  IconDeviceDesktop,
} from "@tabler/icons-react";

export function AdminAccountView() {
  const { data: user, isLoading: userLoading } = useGetUser();
  const router = useRouter();
  const logout = useLogout();

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Populate initial profile values once user loads
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      if (user.profile_picture) {
        setPreviewUrl(user.profile_picture);
      }
    }
  }, [user]);

  const { mutate: updateUserMutate, isPending: isUpdatingUser } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Profil admin berhasil diperbarui!");
        setSelectedFile(null);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || err?.message || "Gagal memperbarui profil admin");
      },
    },
  });

  const { mutate: updatePasswordMutate, isPending: isUpdatingPassword } = useUpdatePassword({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Password berhasil diubah!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || err?.message || "Gagal mengubah password");
      },
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size
    const extValid = /\.(jpe?g|png|webp)$/i.test(file.name.toLowerCase());
    const typeValid = ["image/jpeg", "image/png", "image/webp"].includes(file.type);

    if (!extValid || !typeValid) {
      toast.error("Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama lengkap tidak boleh kosong");
      return;
    }
    if (!email.trim()) {
      toast.error("Email tidak boleh kosong");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    if (selectedFile) {
      formData.append("profile_picture", selectedFile);
    }

    updateUserMutate(formData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword) {
      toast.error("Masukkan password saat ini");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password baru tidak cocok");
      return;
    }

    updatePasswordMutate({
      oldPassword,
      newPassword,
    });
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace("/login"),
    });
  };

  if (userLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <SpinnerV2 className="h-8 w-8 text-primary" />
      </div>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Administrator";

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl pb-10 min-w-0">
      {/* Top Banner & Profile Overview */}
      <Card className="overflow-hidden border-border/60 bg-gradient-to-r from-card via-card to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <UserAvatar
                  name={name || user?.name || "Admin"}
                  image={previewUrl || user?.profile_picture}
                  className="h-20 w-20 rounded-2xl border-2 border-primary/20"
                  fallbackClassName="rounded-2xl text-xl font-bold"
                  noBg={true}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer"
                  title="Ganti Foto Profil"
                >
                  <IconCamera className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {user?.name || "Admin"}
                  </h1>
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/20 border-primary/30 uppercase text-xs font-semibold px-2 py-0.5">
                    {user?.role || "ADMIN"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <IconMail className="size-3.5" />
                  {user?.email || "admin@mail.com"}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <IconCalendar className="size-3.5" />
                    Terdaftar: {joinDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-foreground/60 inline-block" />
                    Status: Aktif (Super Administrator)
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30 shrink-0 self-end sm:self-center"
            >
              <IconLogout className="size-4 mr-1.5" />
              Keluar Akun
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Profile, Security, & System Roles */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md h-10 p-1 bg-muted/60">
          <TabsTrigger value="profile" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <IconUser className="size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <IconLock className="size-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <IconShieldLock className="size-4" />
            Hak Akses
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile Information */}
        <TabsContent value="profile" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <IconUser className="size-5 text-primary" />
                Informasi Data Pribadi
              </CardTitle>
              <CardDescription>
                Perbarui informasi akun administrator untuk kebutuhan notifikasi sistem dan identitas operasional.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4 max-w-2xl">
                {/* Hidden input for avatar upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="space-y-2">
                  <Label htmlFor="admin-name">Nama Lengkap</Label>
                  <Input
                    id="admin-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap Admin"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Alamat Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mail.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Nomor Telepon / WhatsApp</Label>
                  <Input
                    id="admin-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: 08xxx atau +62xxx untuk integrasi kontak darurat.
                  </p>
                </div>

                {selectedFile && (
                  <div className="p-3 bg-primary/10 rounded-lg text-xs text-primary flex items-center justify-between">
                    <span>Foto baru dipilih: {selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(user?.profile_picture || null);
                      }}
                      className="text-destructive font-semibold hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t border-border/40 pt-4 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setName(user?.name || "");
                    setEmail(user?.email || "");
                    setPhone(user?.phone || "");
                    setSelectedFile(null);
                    setPreviewUrl(user?.profile_picture || null);
                  }}
                  disabled={isUpdatingUser}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isUpdatingUser} className="min-w-32">
                  {isUpdatingUser ? (
                    <>
                      <SpinnerV2 className="size-4 mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <IconCheck className="size-4 mr-1.5" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 2: Security & Password */}
        <TabsContent value="security" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <IconKey className="size-5 text-primary" />
                Ganti Kata Sandi
              </CardTitle>
              <CardDescription>
                Pastikan kata sandi Anda kuat dan diperbarui secara berkala untuk menjaga keamanan data toko.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="old-password">Password Saat Ini</Label>
                  <Input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan kata sandi lama"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 8 karakter kombinasi"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    required
                  />
                </div>

                <div className="p-3.5 bg-muted/60 rounded-lg text-xs space-y-1.5 text-muted-foreground">
                  <p className="font-semibold text-foreground">Kriteria Keamanan Sandi:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li className={newPassword.length >= 8 ? "text-foreground font-semibold" : ""}>
                      Minimal 8 karakter
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? "text-foreground font-semibold" : ""}>
                      Mengandung huruf besar (A-Z)
                    </li>
                    <li className={/[a-z]/.test(newPassword) ? "text-foreground font-semibold" : ""}>
                      Mengandung huruf kecil (a-z)
                    </li>
                    <li className={/\d/.test(newPassword) ? "text-foreground font-semibold" : ""}>
                      Mengandung angka (0-9)
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t border-border/40 pt-4 mt-6">
                <Button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="min-w-36"
                >
                  {isUpdatingPassword ? (
                    <>
                      <SpinnerV2 className="size-4 mr-2" />
                      Memperbarui...
                    </>
                  ) : (
                    <>
                      <IconLock className="size-4 mr-1.5" />
                      Ubah Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 3: System Roles & Permissions */}
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <IconShieldLock className="size-5 text-primary" />
                  Hak Akses & Otoritas
                </CardTitle>
                <CardDescription>
                  Daftar modul yang dapat dikelola oleh akun Administrator Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Kelola Pengguna & Pelanggan",
                    desc: "Melihat, menambah, mengubah, dan menghapus akun pengguna.",
                    granted: true,
                  },
                  {
                    title: "Katalog & Produk Custom",
                    desc: "Manajemen katalog case, popstand, keychain, varian, dan harga.",
                    granted: true,
                  },
                  {
                    title: "Manajemen Pesanan & Resi J&T",
                    desc: "Verifikasi pembayaran, proses custom printing, input resi, dan live tracking.",
                    granted: true,
                  },
                  {
                    title: "Billing & Settlement DOKU",
                    desc: "Akses riwayat pembayaran masuk, status gateway DOKU, dan pencairan dana.",
                    granted: true,
                  },
                  {
                    title: "API Platform & Webhook",
                    desc: "Manajemen API Key untuk integrasi pihak ketiga & webhook status.",
                    granted: true,
                  },
                ].map((perm, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/40 border border-border/40"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-foreground">{perm.title}</p>
                      <p className="text-xs text-muted-foreground">{perm.desc}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      Aktif
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <IconDeviceDesktop className="size-5 text-primary" />
                  Sesi Login & Perangkat
                </CardTitle>
                <CardDescription>
                  Informasi sesi browser dan keamanan login saat ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Sesi Saat Ini</span>
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Online Sekarang
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Login sebagai: <strong className="text-foreground">{user?.email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Role: <strong className="text-primary uppercase">{user?.role}</strong>
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Tips Keamanan Administrator:</p>
                  <p>• Jangan pernah membagikan kredensial login atau token JWT kepada siapa pun.</p>
                  <p>• Selalu klik Logout ketika selesai mengakses komputer atau perangkat bersama.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <IconLogout className="size-4 mr-2" />
                  Keluar dari Sesi Ini
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconCreditCard,
  IconHelp,
  IconLogin,
  IconSearch,
  IconArrowUpRight,
  IconDownload,
  IconPhoto,
  IconDeviceMobile,
  IconFileText,
} from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function AdminGuideView() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("products");

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl pb-16 font-sans text-foreground min-w-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-5 w-full min-w-0">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Panduan & Bantuan Admin
            </h1>
            <Badge variant="outline" className="text-xs font-mono text-muted-foreground border-border/70">
              Manual Book IDSHOPCASE
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Instruksi resmi pengoperasian web admin IDSHOPCASE. Pilih tab panduan di bawah untuk melihat langkah demi langkah.
          </p>
        </div>

        <a
          href="https://wa.me/6285117453862?text=Halo%20Admin%20Support%20IDSHOPCASE,%20saya%20butuh%20bantuan%20operasional"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/70 px-3 py-1.5 rounded-lg transition-colors shrink-0 group self-start"
        >
          <span>Chat Bantuan Teknis</span>
          <IconArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Main Tabs Horizontal Container */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-w-0">
        <div className="w-full overflow-x-auto pb-1 min-w-0">
          <TabsList className="inline-flex h-auto p-1 bg-muted/60 gap-1 rounded-lg">
            <TabsTrigger value="products" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconPackage className="size-4 shrink-0" />
              <span>1. Kelola Produk</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconShoppingCart className="size-4 shrink-0" />
              <span>2. Kelola Order & Desain</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconUsers className="size-4 shrink-0" />
              <span>3. Kelola User</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconCreditCard className="size-4 shrink-0" />
              <span>4. Keuangan & DOKU</span>
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconLogin className="size-4 shrink-0" />
              <span>5. Login & Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 whitespace-nowrap">
              <IconHelp className="size-4 shrink-0" />
              <span>6. Tanya Jawab (FAQ)</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: KELOLA PRODUK */}
        <TabsContent value="products" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <IconPackage className="size-5 text-muted-foreground" />
                    Panduan Kelola Produk & Varian (Bab 3.4)
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Standar pembuatan produk baru, penentuan tipe handphone, konfigurasi varian, dan batasan foto kustom.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Menu: /admin/products
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm min-w-0">
              {/* Langkah 1 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">01.</span>
                  Membuka Halaman & Tambah Produk
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Buka menu <strong>&quot;Kelola Produk&quot;</strong> di sidebar kiri. Anda akan melihat tabel produk aktif beserta rentang harga min–max dan stok. Untuk mendaftarkan produk baru, klik tombol <strong>&quot;Tambah Produk&quot;</strong> di sudut kanan atas tabel.
                </p>
              </div>

              {/* Langkah 2 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02.</span>
                  Mengisi Informasi & Foto Produk (Maks 5 Foto)
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Isi <strong>Nama Produk</strong>, pilih <strong>Kategori</strong> (Custom Case, Keychain, Pop Socket, atau Phone Charm), serta tuliskan <strong>Deskripsi</strong> spesifikasi bahan. Unggah gambar katalog produk dengan batas <strong>maksimal 5 (lima) foto</strong> beresolusi tinggi agar tampilan toko menarik bagi pembeli.
                </p>
              </div>

              {/* Langkah 3 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">03.</span>
                  Konfigurasi Tipe Handphone (Khusus Case)
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Jika produk berupa casing HP, centang checkbox <em>&quot;Apakah produk memiliki tipe handphone?&quot;</em>. Anda dapat mencentang tipe yang tersedia di sistem, atau menambahkan merek dan tipe HP baru di luar daftar secara manual dengan mengetikkannya pada form tambah tipe.
                </p>
              </div>

              {/* Langkah 4 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">04.</span>
                  Pengaturan Varian & Maksimal Gambar Kustom
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Sistem mewajibkan <strong>minimal satu varian</strong> pada setiap produk:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-muted/30 rounded-lg border border-border/40 space-y-1">
                    <p className="font-semibold text-foreground text-xs">Kasus Produk Tanpa Varian:</p>
                    <p className="text-muted-foreground text-[11px]">
                      Gunakan label tanda strip <strong>&quot;-&quot;</strong> pada nama varian, lalu isi harga, stok barang, dan maksimal gambar.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg border border-border/40 space-y-1">
                    <p className="font-semibold text-foreground text-xs">Aturan &quot;Maksimal Gambar&quot;:</p>
                    <p className="text-muted-foreground text-[11px]">
                      Menentukan batas jumlah foto yang wajib diunggah customer saat checkout. <strong>Isi nilai 0 (nol)</strong> apabila produk tidak memerlukan foto kustom dari customer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Langkah 5 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">05.</span>
                  View & Edit Produk
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Pada tabel daftar produk, klik tombol titik tiga (⋮) pada baris produk yang diinginkan:
                </p>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 pl-1">
                  <li><strong>View:</strong> Membuka popup rincian spesifikasi produk, galeri gambar, daftar tipe HP, dan tabel varian.</li>
                  <li><strong>Edit:</strong> Mengubah harga, stok varian, menambah tipe HP baru, atau memperbarui foto katalog.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: KELOLA ORDER & GAMBAR KUSTOM */}
        <TabsContent value="orders" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <IconShoppingCart className="size-5 text-muted-foreground" />
                    Panduan Kelola Order & Pengunduhan Desain (Bab 3.5)
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Memantau pesanan masuk, memverifikasi alamat pengiriman, dan mengunduh berkas foto kustom untuk dicetak.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Menu: /admin/orders
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm min-w-0">
              {/* Langkah 1 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">01.</span>
                  Daftar Pesanan & Filter Status
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Buka menu <strong>&quot;Orders&quot;</strong> pada navigasi sidebar. Gunakan tab filter di atas tabel untuk menyaring transaksi: <strong>All Order</strong>, <strong>Pending</strong> (menunggu pembayaran), <strong>Shipped</strong> (dalam pengiriman), atau <strong>Completed</strong> (selesai).
                </p>
              </div>

              {/* Langkah 2 */}
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02.</span>
                  Melihat Rincian Faktur Pesanan
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Klik tombol titik tiga (⋮) pada baris pesanan lalu pilih <strong>&quot;Detail&quot;</strong>. Halaman detail pesanan menyajikan:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 bg-muted/20 rounded border border-border/40">
                    <span className="font-medium text-foreground">1. ID Pesanan:</span> Nomor unik pelacakan transaksi.
                  </div>
                  <div className="p-2.5 bg-muted/20 rounded border border-border/40">
                    <span className="font-medium text-foreground">2. Status & Resi:</span> Status terkini serta nomor resi pengiriman logistik.
                  </div>
                  <div className="p-2.5 bg-muted/20 rounded border border-border/40">
                    <span className="font-medium text-foreground">3. Alamat Kirim:</span> Alamat lengkap tujuan pemesan dan toko pengirim.
                  </div>
                  <div className="p-2.5 bg-muted/20 rounded border border-border/40">
                    <span className="font-medium text-foreground">4. Rincian Item & Biaya:</span> Produk, tipe HP, varian, dan rincian ongkos kirim.
                  </div>
                </div>
              </div>

              {/* Langkah 3 & 4 */}
              <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border/60">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                  <IconDownload className="size-4.5 text-foreground" />
                  Alur Pengunduhan Gambar Kustom Pesanan (Bab 3.5.2)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Untuk produk pesanan kustom yang memerlukan pencetakan foto:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs text-muted-foreground pl-1">
                  <li>
                    Pada halaman Detail Pesanan, lihat bagian <strong>Item Pesanan</strong> dan klik thumbnail foto desain kustom pembeli.
                  </li>
                  <li>
                    Sistem akan membuka jendela <strong>Preview Modal</strong> yang menampilkan gambar master customer dalam resolusi asli.
                  </li>
                  <li>
                    Tekan tombol <strong>&quot;Unduh Gambar&quot;</strong>. Jika browser Anda memunculkan dialog perizinan, pilih <strong>&quot;Allow / Izinkan&quot;</strong>.
                  </li>
                  <li>
                    File gambar kustom akan otomatis tersimpan ke penyimpanan komputer Anda (biasanya di folder <em>Downloads</em>) dan siap diteruskan ke mesin cetak fisik.
                  </li>
                </ol>
              </div>

              {/* Langkah 5 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">03.</span>
                  Memperbarui Resi & Menyelesaikan Pesanan
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Setelah barang selesai diproduksi dan diserahkan ke kurir pengiriman, masukkan nomor resi pada sistem untuk mengubah status menjadi <strong>Shipped</strong>. Ketika paket telah diterima oleh pembeli, status otomatis beralih menjadi <strong>Completed</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: KELOLA USER */}
        <TabsContent value="users" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <IconUsers className="size-5 text-muted-foreground" />
                    Panduan Kelola Pengguna (Bab 3.3)
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Pengelolaan direktori akun pembeli, otorisasi hak akses staf admin, dan verifikasi OTP.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Menu: /admin/users
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm min-w-0">
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">01.</span>
                  Daftar Pengguna & Filter Role
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Buka menu <strong>&quot;Kelola User&quot;</strong>. Gunakan tab filter di bagian atas tabel untuk memisahkan daftar antara akun pembeli biasa (Customer) dan akun pengelola (Admin). Setiap halaman menampilkan 10 data pengguna dengan dukungan pagination.
                </p>
              </div>

              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02.</span>
                  Tambah Pengguna Baru & Aktivasi OTP
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Klik tombol <strong>&quot;Tambah User&quot;</strong>. Form panel akan muncul pada sisi kanan layar. Isi data pengguna: Nama, Email, Nomor Handphone, Password, Konfirmasi Password, serta pilihan Role (default: Customer). Setelah disimpan, sistem secara otomatis mengirimkan kode OTP aktivasi ke alamat email pengguna tersebut.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">03.</span>
                  Aksi View, Edit & Hapus Pengguna
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Gunakan tombol titik tiga (⋮) pada tabel untuk melakukan aksi:
                </p>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 pl-1">
                  <li><strong>View:</strong> Membuka drawer ringkasan profil lengkap dan avatar pengguna.</li>
                  <li><strong>Edit:</strong> Menyesuaikan nama dan mengganti role pengguna (informasi privat seperti password tidak dapat diubah oleh admin demi privasi data).</li>
                  <li><strong>Delete:</strong> Menghapus akun pengguna yang tidak aktif atau bermasalah dari sistem toko.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: KEUANGAN & DOKU SETTLEMENT */}
        <TabsContent value="billing" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <IconCreditCard className="size-5 text-muted-foreground" />
                    Panduan Keuangan & Settlement Otomatis DOKU
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Memahami mutasi transaksi bruto/netto, potongan biaya payment gateway, dan jadwal pencairan dana T+1.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Menu: /admin/billing
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm min-w-0">
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">01.</span>
                  Mutasi Transaksi & Potongan MDR
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Pada tab <strong>Mutasi Transaksi</strong> di halaman Billing, sistem mencatat nilai bruto penjualan, estimasi potongan resmi payment gateway (MDR rata-rata 1.5%), serta nilai netto yang menjadi hak toko. Klik salah satu baris transaksi untuk melihat rincian faktur invoice.
                </p>
              </div>

              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02.</span>
                  Siklus Settlement Otomatis (T+1)
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  IDSHOPCASE menggunakan sistem penyaluran otomatis resmi DOKU. <strong>Tidak diperlukan penarikan dana manual (&quot;Tarik Saldo&quot;)</strong>. Seluruh dana pesanan yang berhasil akan ditransfer langsung oleh DOKU ke rekening bank operasional toko setiap hari kerja pukul 10:00 WIB (H+1 hari kerja).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">03.</span>
                  Pengaturan Rekening Bank & Ekspor Laporan
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Buka tab <strong>Settlement Otomatis</strong> untuk memastikan nomor rekening operasional penerima telah terverifikasi. Jika ada pergantian rekening bank toko, klik tombol <em>&quot;Ubah&quot;</em>. Untuk pembukuan akuntansi, klik tombol <strong>&quot;Ekspor CSV&quot;</strong> di bagian atas halaman.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: LOGIN & DASHBOARD */}
        <TabsContent value="auth" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <IconLogin className="size-5 text-muted-foreground" />
                    Panduan Login, Dashboard & Logout (Bab 3.1, 3.2, 3.6)
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Akses masuk sistem, pemantauan grafik operasional, dan pengakhiran sesi kerja admin.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  Modul: Akses & Sesi
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm min-w-0">
              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">01.</span>
                  Akses URL & Login Admin
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Buka peramban dan kunjungi alamat <strong>www.idshopcase.com</strong>. Klik tombol <strong>Login</strong> di navigation bar kanan atas, lalu masukkan email dan password admin Anda untuk masuk ke sistem konsol.
                </p>
              </div>

              <div className="space-y-2 border-b border-border/30 pb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02.</span>
                  Membaca Metrik & Grafik Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Dashboard menyajikan 3 kartu utama (Pendapatan bulan ini, Total Pelanggan, dan Total Order riil). Di bagian bawah, grafik interaktif time series memungkinkan Anda menganalisis tren pesanan dan omset dalam kurun 7 Hari, 30 Hari, atau 3 Bulan Terakhir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">03.</span>
                  Prosedur Log Out (Keluar Akun)
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs">
                  Untuk mengakhiri sesi kerja secara aman, klik tombol titik tiga (⋮) pada kartu profil admin di sudut kiri bawah sidebar, lalu pilih <strong>&quot;Log out&quot;</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: FAQ & TANYA JAWAB */}
        <TabsContent value="faq" className="space-y-4 mt-4 w-full min-w-0">
          <Card className="border-border/60 bg-card min-w-0">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <IconHelp className="size-5 text-muted-foreground" />
                Pertanyaan yang Sering Diajukan (FAQ)
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Solusi cepat untuk kendala operasional harian yang kerap dihadapi admin.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm min-w-0">
              <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1.5">
                <p className="font-semibold text-foreground text-xs sm:text-sm">
                  Q: Bagaimana cara mendownload file gambar kustom yang dikirim pembeli?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: Buka menu <strong>Orders</strong> → klik tombol titik tiga (⋮) pada pesanan terkait → pilih <strong>Detail</strong> → scroll ke bagian item produk dan klik thumbnail gambar kustom → pada jendela preview, klik tombol <strong>&quot;Unduh Gambar&quot;</strong>. File resolusi asli akan tersimpan otomatis di folder Downloads komputer Anda.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1.5">
                <p className="font-semibold text-foreground text-xs sm:text-sm">
                  Q: Apa yang harus diisi pada kolom &quot;Maksimal Gambar&quot; jika produk tidak punya desain kustom?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: Isi dengan angka <strong>0 (nol)</strong>. Dengan demikian, customer tidak akan diminta mengunggah gambar saat checkout dan dapat langsung membeli produk jadi.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1.5">
                <p className="font-semibold text-foreground text-xs sm:text-sm">
                  Q: Bagaimana jika suatu produk tidak memiliki varian ukuran atau warna?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: Sistem mewajibkan minimal satu data varian untuk menentukan harga dan stok produk. Cukup masukkan tanda strip <strong>&quot;-&quot;</strong> pada nama varian.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/40 space-y-1.5">
                <p className="font-semibold text-foreground text-xs sm:text-sm">
                  Q: Kapan dana transaksi masuk ke rekening bank toko?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A: Dana dicairkan secara otomatis oleh payment gateway DOKU setiap hari kerja pada pukul 10:00 WIB (jadwal transfer H+1 kerja) langsung ke rekening bank operasional yang didaftarkan di halaman Billing.
                </p>
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-lg border border-border/50 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-foreground">Masih mengalami kendala lain?</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">
                      Tim dukungan teknis siap membantu menyelesaikan kendala sistem atau transaksi Anda.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/6285117453862?text=Halo%20Admin%20Support%20IDSHOPCASE,%20saya%20butuh%20bantuan%20teknis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/80 text-foreground bg-background hover:bg-muted transition-colors font-medium shrink-0"
                  >
                    <span>Hubungi WhatsApp Support</span>
                    <IconArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

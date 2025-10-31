````markdown
# IDShopCase

![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-13-blue)
![React](https://img.shields.io/badge/React-18-blueviolet)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-teal)
![ShadCN](https://img.shields.io/badge/ShadCN-UI-purple)
![Build](https://img.shields.io/github/actions/workflow/status/username/idshopcase/ci.yml?branch=main)

IDShopCase adalah aplikasi web **toko online** berbasis **Next.js**

---

## Demo

> GIF demo interaktif:

![IDShopCase Demo](./public/demo/demo.gif)

> Live Demo: [https://idshopcase.vercel.app](https://idshopcase.vercel.app)

---

## Features

- **Produk**
  - Tambah, edit, hapus produk
  - Upload multiple images per product
- **Variasi Produk**
  - Tambahkan variasi produk
  - Kombinasi otomatis variasi
  - Atur harga & stok per kombinasi
- **Tabel Interaktif**
  - Sorting, filtering, pagination dengan React Table
- **Data Fetching & Caching**
  - React Query untuk performa maksimal
- **Responsive Design**
  - Tailwind CSS + ShadCN UI
- **Reusable Components**
  - Form, input, checkbox, modal siap pakai
- **Form Validation**
  - React Hook Form + Zod

---

## Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **UI & Styling**: Tailwind CSS, ShadCN UI
- **State Management & API**: React Query
- **Forms & Validation**: React Hook Form, Zod
- **Table**: React Table
- **Icons**: Lucide, React Icons

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm / yarn / pnpm

### Installation

1. Clone repository:

```bash
git clone https://github.com/username/idshopcase.git
cd idshopcase
```
````

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Jalankan development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Buka browser di: [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├─ app/                # Next.js pages & layouts
│   ├─ (admin)/        # Halaman admin
│   └─ page.tsx        # Landing page
├─ components/         # Reusable UI components
├─ features/           # Feature-specific hooks & logic
├─ lib/                # Utility functions / custom hooks
├─ types/              # TypeScript types
├─ public/             # Assets, GIFs, screenshot
└─ styles/             # Tailwind / global CSS
```

---

## Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | Jalankan dev server       |
| `npm run build` | Build untuk production    |
| `npm run start` | Jalankan production build |
| `npm run lint`  | Lint project              |

---

## Contributing

1. Fork repository
2. Buat branch baru:

```bash
git checkout -b feature/nama-fitur
```

3. Commit perubahan:

```bash
git commit -m "Deskripsi fitur atau perbaikan"
```

4. Push branch:

```bash
git push origin feature/nama-fitur
```

5. Buat pull request

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

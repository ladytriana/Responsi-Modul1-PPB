# REST API Layanan Cuci Sepatu
## Deskripsi Umum Proyek
Proyek ini adalah sebuah REST API yang dikembangkan sebagai tugas responsi untuk modul "Pembuatan API dengan JavaScript".Proyek ini merupakan Sebuah REST API sederhana yang dibangun dengan Node.js, Express, dan Supabase untuk mengelola data orderan pada layanan cuci sepatu.
## Tujuan dan Fitur Utama
Tujuan utama dari proyek ini adalah menyediakan backend service yang andal untuk aplikasi pencatatan order cuci sepatu.
* **Menerapkan Operasi CRUD:** Membangun endpoint RESTful yang mendukung semua operasi data fundamental: Create, Read, Update, dan Delete.
* **Penguasaan Framework:** Memperdalam pemahaman praktis tentang Express.js untuk membangun server backend yang efisien, mulai dari routing hingga penanganan request.
* **Standardisasi Data:** Memanfaatkan JSON sebagai format standar untuk struktur request dan response, memastikan komunikasi yang lancar antara klien dan server.
* **Relevansi Proyek:** Mengembangkan sebuah API yang solutif dan dapat diterapkan langsung pada studi kasus bisnis di dunia nyata.

## Fitur Utama API
| Metode | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| **GET** | `/items` | Menampilkan seluruh daftar sepatu yang sedang dicuci. |
| **POST** | `/items` | Menambahkan data sepatu baru ke dalam daftar. |
| **PUT** | `/items/:id` | Memperbarui status sepatu (misalnya dari Sedang Dicuci menjadi Selesai). |
| **DELETE** | `/items/:id` | Menghapus data sepatu yang sudah selesai dicuci. |

## Struktur Data
API ini menggunakan satu tabel utama bernama `items` di Supabase dengan struktur kolom sebagai berikut:
| Nama Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `int8` | Primary Key, nomor unik untuk setiap order. |
| `created_at` | `timestamptz` | Waktu kapan data pertama kali dibuat. |
| `nama_sepatu` | `text` | Nama atau jenis sepatu yang dicuci. |
| `nama_pelanggan` | `text` | Nama pelanggan. |
| `status` | `text` | Status pengerjaan (contoh: 'Diterima', 'Selesai'). |
| `tanggal_masuk` | `timestamptz` | Tanggal sepatu diterima, diisi otomatis. |
| `tanggal_selesai`| `timestamptz` | Tanggal sepatu selesai, diisi otomatis. |

## Contoh Penggunaan API

#### 1. GET /items - Mengambil Semua Data
Mendapatkan daftar semua orderan, diurutkan dari yang terbaru.
Response (200 OK):
```
 [
    {
        "id": 13,
        "created_at": "2025-10-18",
        "nama_sepatu": "Vans",
        "nama_pelanggan": "Triana",
        "status": "Selesai",
        "tanggal_masuk": "2025-10-18",
        "tanggal_selesai": "2025-10-18"
    },
    {
        "id": 12,
        "created_at": "2025-10-18",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Lady",
        "status": "Selesai",
        "tanggal_masuk": "2025-10-18",
        "tanggal_selesai": "2025-10-18"
    }
 ]

#### 2. POST /items - Membuat Data Baru
Menambahkan orderan baru ke dalam sistem.

**Request Body:**

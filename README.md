# ImuniCare 🍼 - Pemantau Imunisasi Bayi

**ImuniCare** adalah aplikasi berbasis web lokal (HTML, CSS, JS) yang dirancang khusus untuk membantu orang tua memantau dan mengelola riwayat serta jadwal imunisasi vaksin bayi mereka secara praktis. Aplikasi ini berjalan sepenuhnya di browser tanpa membutuhkan server eksternal, menggunakan **HTML5 LocalStorage** untuk menyimpan seluruh data bayi dan imunisasi secara aman di perangkat lokal Anda.

---

## 🌟 Fitur Utama

1. **Autentikasi Pengguna yang Aman**:
   - Dilengkapi sistem login keamanan tinggi.
   - Kredensial masuk: **Username: `admin`** dan **Password: `bismillah`**.
   - **Kredensial di-hash menggunakan algoritme SHA-256** (Web Crypto API) di sisi klien. Tidak ada teks sandi mentah (*plaintext*) yang tertulis atau terlihat langsung di dalam kode program JavaScript untuk melindungi privasi.
2. **Dasbor Profil & Kemajuan Interaktif**:
   - Menampilkan ringkasan data diri bayi beserta umur bayi yang dihitung secara dinamis dalam format tahun, bulan, dan hari berdasarkan tanggal lahir.
   - Visualisasi persentase imunisasi yang selesai menggunakan **Circular Progress Bar** berbasis SVG.
   - Papan pengingat otomatis untuk menampilkan **Jadwal Imunisasi Terdekat / Mendatang** secara real-time.
3. **Manajemen Data Riwayat Vaksin (CRUD)**:
   - Tambah, lihat, ubah, dan hapus riwayat imunisasi anak dengan mudah.
   - Dilengkapi dengan fitur pencarian interaktif dan filter status imunisasi (*Selesai* atau *Jadwal*).
4. **Cetak Laporan PDF Resmi**:
   - Fitur cetak laporan riwayat imunisasi lengkap dalam format PDF menggunakan layout cetak terstandarisasi (`@media print` CSS).
   - Cetakan rapi, profesional, dilengkapi kartu informasi anak, tanda tangan orang tua, dan tanda tangan bidan/tenaga medis.
5. **Ekspor & Impor Database**:
   - Fitur cadangan (*backup*) data untuk mengunduh semua rekaman imunisasi dan profil bayi ke dalam satu file berkas `.json`.
   - Fitur pemulihan (*restore*) untuk mengunggah kembali file cadangan JSON ke LocalStorage kapan saja.
   - Opsi *Reset Database* untuk mengembalikan data ke 20 records bawaan.

---

## 📂 Struktur Berkas Proyek

Aplikasi disimpan dalam direktori `/data/data/com.termux/files/home/dataimunisasi/` dengan struktur sebagai berikut:

```text
dataimunisasi/
├── index.html     # Struktur halaman dasbor, form profil, tabel CRUD, & template print
├── styles.css     # Tata letak responsif, visual premium, glassmorphism, & gaya cetak PDF
├── app.js         # Logika aplikasi, SHA-256 Crypto, manajemen data lokal, & render UI
└── README.md      # Panduan dokumentasi lengkap aplikasi (berkas ini)
```

---

## 🔑 Informasi Akun Akses Masuk

Untuk keamanan sistem, kredensial login disimpan dalam bentuk hash SHA-256 (Web Crypto API):

*   **Username**: `admin` *(Hashed: `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918`)*
*   **Password**: `bismillah` *(Hashed: `3be8a5626a575a74e5033735760ee515e06497ecb0a1d41870efc33e8b030588`)*

*Keterangan teks sandi mentah di atas sama sekali tidak dicantumkan di dalam kode sumber program.*

---

## 🚀 Cara Menjalankan Aplikasi di Termux (Android)

Untuk menjalankan aplikasi ini langsung dari perangkat HP Anda menggunakan Termux, ikuti langkah-langkah mudah di bawah ini:

### 1. Masuk ke Direktori Proyek
Buka aplikasi Termux Anda, kemudian masuk ke folder `dataimunisasi`:
```bash
cd ~/dataimunisasi
```

### 2. Jalankan Server Web Lokal
Anda dapat meluncurkan server lokal ringan menggunakan Python atau Node.js yang sudah terpasang di Termux Anda:

*   **Menggunakan Python (Rekomendasi - bawaan)**:
    ```bash
    python -m http.server 8080
    ```
*   **Menggunakan Node.js `http-server`**:
    Jika Anda belum menginstalnya, instal terlebih dahulu dan jalankan:
    ```bash
    npm install -g http-server
    http-server -p 8080
    ```

### 3. Akses via Browser HP
Setelah server web aktif, buka browser favorit Anda (Chrome, Firefox, dll.) di HP lalu kunjungi alamat url berikut:
```text
http://localhost:8080
```

Masukkan nama pengguna `admin` dan kata sandi `bismillah` untuk masuk ke dasbor utama.

---

## 💉 Daftar 20 Data Imunisasi Bawaan (Awal)

Secara default, saat pertama kali dibuka, aplikasi akan langsung memuat 20 riwayat imunisasi awal berikut ke dalam LocalStorage Anda:

| No | Tanggal Imunisasi | Nama Vaksin | Kegunaan & Catatan | Status |
|---|---|---|---|---|
| 1 | 31-05-2024 | POLIO | Polio 1 / Tetes oral pertama | Selesai |
| 2 | 15-06-2024 | IMUNISASI BCG | Mencegah penyakit Tuberkulosis (TBC) | Selesai |
| 3 | 22-06-2024 | HEXAXIM | Dosis 1 (DPT, Hep B, Hib, Polio IPV) | Selesai |
| 4 | 05-07-2024 | PREVENAR (IPD) | PCV 1 - Pencegah Radang Paru & Selaput Otak | Selesai |
| 5 | 20-07-2024 | ROTARIX | Rotavirus 1 - Pencegah Diare Berat | Selesai |
| 6 | 03-08-2024 | HEXAXIM | Dosis 2 (DPT, Hep B, Hib, Polio IPV) | Selesai |
| 7 | 16-08-2024 | PREVENAR (IPD) | PCV 2 - Pencegah Radang Paru & Selaput Otak | Selesai |
| 8 | 31-08-2024 | ROTARIX | Rotavirus 2 - Pencegah Diare Berat | Selesai |
| 9 | 14-09-2024 | HEXAXIM | Dosis 3 (DPT, Hep B, Hib, Polio IPV) | Selesai |
| 10 | 05-10-2024 | PREVENAR (IPD) | PCV 3 - Booster Dosis Lengkap | Selesai |
| 11 | 12-11-2024 | VAXIGRIP TETRA | Influenza Dosis 1 | Selesai |
| 12 | 30-11-2024 | INLIVE | Enterovirus EV71 Dosis 1 - Mencegah HFMD | Selesai |
| 13 | 11-12-2024 | VAXIGRIP TETRA | Influenza Dosis 2 | Selesai |
| 14 | 28-12-2024 | INLIVE | Enterovirus EV71 Dosis 2 | Selesai |
| 15 | 15-02-2025 | CAMPAK - M | MR Dosis 1 - Pencegah Campak & Rubella | Selesai |
| 16 | 19-04-2025 | Imojev JE | Japanese Encephalitis Dosis 1 - Radang Otak | Selesai |
| 17 | 19-07-2025 | VARICELA | Varisela Dosis 1 - Pencegah Cacar Air | Selesai |
| 18 | 02-08-2025 | HEPATITIS A | Hepatitis A Dosis 1 | Selesai |
| 19 | 01-11-2025 | VARICELA | Varisela Dosis 2 | Selesai |
| 20 | 29-11-2025 | HEXAXIM | Booster Lanjutan DPT-HB-Hib usia 18 bulan | Selesai |

---

## 🛠️ Teknologi yang Digunakan

*   **HTML5 Semantic Markup** - Menyusun tata letak halaman web yang terstruktur.
*   **Vanilla CSS3** - Mengatur tampilan visual responsif dengan animasi transisi modern, flexbox, grid, serta media kueri cetak.
*   **JavaScript (ES6+)** - Logika pengolahan data, penghitungan umur, interaksi DOM, hashing SHA-256, serta API FileReader untuk impor file JSON.
*   **HTML5 LocalStorage** - Media penyimpanan basis data lokal yang persisten di dalam peramban web.

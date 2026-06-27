# ImuniCare 🍼 - Pemantau Imunisasi Bayi

**ImuniCare** adalah aplikasi berbasis web lokal (HTML, CSS, JS) yang dirancang khusus untuk membantu orang tua memantau dan mengelola riwayat serta jadwal imunisasi vaksin bayi mereka secara praktis. Aplikasi ini berjalan sepenuhnya di browser tanpa membutuhkan server eksternal, menggunakan **HTML5 LocalStorage** untuk menyimpan seluruh data bayi dan imunisasi secara aman di perangkat lokal Anda.

---

## 🌟 Fitur Utama

1. **Autentikasi Pengguna yang Aman**:
   - Dilengkapi sistem login keamanan tinggi.
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

Masukkan nama pengguna dan kata sandi Anda untuk masuk ke dasbor utama.

---

## 🛠️ Teknologi yang Digunakan

*   **HTML5 Semantic Markup** - Menyusun tata letak halaman web yang terstruktur.
*   **Vanilla CSS3** - Mengatur tampilan visual responsif dengan animasi transisi modern, flexbox, grid, serta media kueri cetak.
*   **JavaScript (ES6+)** - Logika pengolahan data, penghitungan umur, interaksi DOM, hashing SHA-256, serta API FileReader untuk impor file JSON.
*   **HTML5 LocalStorage** - Media penyimpanan basis data lokal yang persisten di dalam peramban web.

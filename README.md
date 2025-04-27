Management penyimpanan System
Sebuah aplikasi sederhana untuk mengelola inventaris, meliputi fitur:
-Menambahkan produk
-Mengupdate stok
-Menghapus produk
-Melihat daftar produk
-Otentikasi pengguna

Fitur Utama
Manajemen Produk: Tambah, edit, hapus, dan lihat produk.
Autentikasi User: Login/Logout menggunakan token (JWT).
Dashboard Admin: Kelola semua inventaris.
REST API: Backend berbasis Express.js untuk interaksi data.
Dockerized: Mudah di-deploy menggunakan Docker dan Docker Compose.

🛠️ Teknologi yang Digunakan
Node.js + Express.js
MongoDB + Mongoose
JWT (JSON Web Token)
Docker & Docker Compose
bcryptjs
dotenv

📂 Struktur Folder

inventory-management-system/
│
├── controllers/    
├── models/         
├── routes/         
├── config/         
├── middleware/     
├── public/         
├── Dockerfile      # Docker build instructions
├── docker-compose.yml # Docker orchestration
├── .env            
├── server.js       
├── package.json    
└── README.md    


⚙️ Cara Menjalankan Project

Menjalankan Menggunakan Docker
a. Build dan Run menggunakan Docker Compose
Pastikan Docker dan Docker Compose sudah terinstall.

Copy file .env.example ke .env dan sesuaikan isinya.

Jalankan perintah berikut:

Copy code
docker-compose up --build
pada terminal

Ini akan:
Membuat container untuk aplikasi Node.js
Membuat container untuk database MongoDB
Aplikasi akan berjalan di http://localhost:3000

UNTUK LOGIN ADDMIN
USERNAME:admin1
PASSWORD:password123

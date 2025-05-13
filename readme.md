# Smart Home Controller API

Aplikasi ini adalah API Controller untuk sistem Smart Home menggunakan Express.js. Untuk saat ini, API hanya mengontrol lampu, dengan dukungan MQTT sebagai komunikasi real-time.

## 🚀 Fitur Utama

- Kontrol perangkat smart home (lampu)
- Dukungan MQTT untuk komunikasi real-time
- Manajemen perangkat secara terpusat
- Dokumentasi API yang lengkap

---

## ⚙️ Instalasi dan Menjalankan Aplikasi

1. **Clone repository**

   ```bash
   git clone https://github.com/tado3002/smartHomeWebserver-express-mqqt.git
   cd smartHomeWebserver-express-mqqt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment** Buat file `.env` dan isi dengan konfigurasi berikut:

   ```env
   SECRET_KEY=your-secret-key
   MQTT_IP_HOST=192.168.1.10
   ```

4. **Jalankan aplikasi**

   ```bash
   npm start
   ```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🐳 Menjalankan dengan Docker

1. **Build Docker Image**

   ```bash
   docker build -t smarthome-controller-server .
   ```

2. **Jalankan Docker Container**

   ```bash
   docker run -d -p 3000:3000 --env-file .env --name smarthome-server smarthome-controller-server
   ```

3. **Akses aplikasi** Buka browser atau API client:

   ```
   http://localhost:3000
   ```

4. **Stop container**

   ```bash
   docker stop smarthome-server
   docker rm smarthome-server
   ```

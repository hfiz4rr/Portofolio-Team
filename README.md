# 🚀 Studio Portfolio Engine: Professional Game Developer Showcase

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Deployment](https://img.shields.io/badge/deployment-GitHub_Pages-orange.svg)

A high-end, scalable portfolio engine designed specifically for Game Studios and Creative Agencies. This project leverages a data-driven approach to separate content management from the presentation layer, ensuring a lightweight and maintainable codebase.

---

## 💎 Project Philosophy
Website ini dibangun dengan prinsip **Performance, Scalability, and Clean UI**. Fokus utamanya adalah meminimalisir penggunaan *third-party libraries* berat dan mengandalkan efisiensi Vanilla JavaScript serta utilitas Tailwind CSS untuk mencapai *load time* yang instan.

## 🛠️ Technical Specifications

### 1. Data-Driven Architecture
Tidak seperti website statis pada umumnya, seluruh konten dikelola melalui objek JavaScript (`JSON-like structure`). Hal ini memungkinkan:
* **Easy Maintenance**: Update konten tanpa menyentuh struktur HTML.
* **Dynamic Rendering**: Elemen DOM dibuat secara otomatis berdasarkan panjang data.
* **Centralized Logic**: Satu fungsi untuk menangani ribuan entri data.

### 2. Core Modules & Functionality
* **Advanced Filtering Engine**: Logika filter kategori berbasis *state* yang menangani transisi antar-elemen dengan *Cubic-Bezier easing*.
* **Dynamic Modal Injector**: Sistem modal tunggal yang melakukan re-render konten secara dinamis untuk menghemat penggunaan memori RAM pada browser.
* **Adaptive Navigation**: Dropdown filter yang responsif dan mendukung aksesibilitas (click-outside-to-close).
* **Bento Social Architecture**: Layouting grid asimetris yang memprioritaskan konversi komunitas (Discord).

### 3. Interactive UI Features
* **Custom Mouse Spotlight**: Efek *radial-gradient* yang mengikuti kursor untuk memberikan kedalaman (depth) pada desain Glassmorphism.
* **Mobile-First Responsiveness**: Breakpoint yang dioptimasi untuk perangkat mobile, tablet, hingga layar ultra-wide.

## 📂 Directory Structure
```text
├── index.html          # Core structure & Modal templates
├── assets/
│   ├── images/         # Game thumbnails & Team avatars
│   └── icons/          # Optimized SVG system branding
├── style.css           # Custom animations, Glassmorphism, & Hover effects
└── script.js           # Content Database & Core Logic (Filtering, Modals, Rendering)

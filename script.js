// Menunggu seluruh elemen HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. HAMBURGER MENU NAVIGASI MOBILE
    // ==========================================
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", function() {
            // Toggle class 'active' untuk memunculkan/menyembunyikan menu
            navMenu.classList.toggle("active");
            // Animasi tombol hamburger menjadi silang (opsional)
            mobileMenuBtn.classList.toggle("is-active");
        });

        // Menutup menu mobile otomatis jika salah satu link diklik
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // ==========================================
    // 2. SMOOTH SCROLL UNTUK NAVIGASI
    // ==========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Mencegah aksi loncatan default browser
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Menghitung posisi dan melakukan scroll smooth terkontrol
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Dikurangi tinggi navbar agar tidak tertutup
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 3. ANIMASI MUNCUL SAAT DI-SCROLL (Scroll Animation)
    // ==========================================
    // Menambahkan class animasi secara dinamis ke semua section utama
    const sections = document.querySelectorAll("section, header");
    sections.forEach(sec => {
        sec.classList.add("fade-in-section");
    });

    // Fungsi memeriksa posisi scroll layar
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4; // Aturan batas munculan

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("is-visible");
            }
        });
    }

    // Jalankan fungsi saat web di-scroll dan saat pertama kali dibuka
    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // ==========================================
    // 4. PENANGANAN ERROR GAMBAR (Fallback Image)
    // ==========================================
    const allImages = document.querySelectorAll("img");
    
    allImages.forEach(img => {
        img.addEventListener("error", function() {
            // Jika gambar gagal dimuat, buat pengganti berupa box bergaya abu-abu
            const fallbackDiv = document.createElement("div");
            fallbackDiv.className = "image-error-fallback image-cover";
            fallbackDiv.style.width = this.offsetWidth ? this.offsetWidth + "px" : "100%";
            fallbackDiv.style.height = this.offsetHeight ? this.offsetHeight + "px" : "250px";
            fallbackDiv.innerText = "Gambar belum ditambahkan";

            // Pasang fallback menggantikan tag img asal
            this.parentNode.replaceChild(fallbackDiv, this);
        });
    });

});
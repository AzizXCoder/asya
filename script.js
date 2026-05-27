document.addEventListener('DOMContentLoaded', () => {

    // === 1. FITUR LOADING SCREEN (PRELOADER) ===
    const preloader = document.getElementById('preloader');
    
    // Hilangkan loading screen saat seluruh aset web (gambar, font) kelar di-load
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
            // Mulai efek ketikan setelah preloader menghilang
            typeEffect();
        }, 600); // Memberi jeda visual halus
    });


    // === 2. FITUR TYPEWRITER EFFECT ===
    const titleElement = document.getElementById('typewriter-title');
    const textToType = "Buku Harian Si Cantik ✨";
    let index = 0;

    function typeEffect() {
        if (index < textToType.length) {
            titleElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeEffect, 120);
        }
    }


    // === 3. FITUR EFEK PARALLAX DI HERO HEADER ===
    const heroElement = document.getElementById('parallax-hero');
    
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        // Geser posisi vertikal background hero sedikit lebih lambat dari scroll utama
        if (heroElement && scrollValue <= 500) {
            heroElement.style.transform = `translateY(${scrollValue * 0.25}px)`;
        }
    });


    // === 4. FITUR FILTER MENU KATEGORI ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas aktif dari tombol lain, pindahkan ke yang diklik
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide-card');
                    // Picu ulang efek scroll reveal agar langsung muncul mulus
                    card.classList.add('active');
                } else {
                    card.classList.add('hide-card');
                }
            });
        });
    });


    // === 5. FITUR DARK / LIGHT MODE TOGGLE ===
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(themeToggle) themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌓 Dark';

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️ Light';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌓 Dark';
            }
        });
    }


    // === 6. FITUR ANIMASI MUNCUL PAS DI-SCROLL (SCROLL REVEAL) ===
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // === 7. FITUR TOMBOL LIKE + FLOATING HEARTS EFFECT ===
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLiked = btn.getAttribute('data-liked') === 'true';
            const countSpan = btn.querySelector('.like-count');
            let currentCount = parseInt(countSpan.textContent);

            if (!isLiked) {
                btn.setAttribute('data-liked', 'true');
                countSpan.textContent = currentCount + 1;
                createFloatingHearts(e.clientX, e.clientY);
            } else {
                btn.setAttribute('data-liked', 'false');
                countSpan.textContent = currentCount - 1;
            }
        });
    });

    function createFloatingHearts(x, y) {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('span');
            heart.classList.add('floating-heart');
            heart.innerText = ['❤️', '💖', '✨', '🌸'][Math.floor(Math.random() * 4)];
            
            heart.style.left = `${x + (Math.random() * 30 - 15)}px`;
            heart.style.top = `${y + (Math.random() * 30 - 15)}px`;
            heart.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`;
            
            document.body.appendChild(heart);

            setTimeout(() => { heart.remove(); }, 1000);
        }
    }


    // === 8. LOGIKA MOOD METER ===
    const moodBtn = document.getElementById('moodBtn');
    const moodResult = document.getElementById('moodResult');
    const travelPredictions = [
        "🔮 Ramalan: Kamu lagi butuh 'Rebahan Berkedok Staycation' di hotel bintang 5 yang bantalnya empuk banget, minimal 3 hari gak usah mikirin tugas/kerjaan!",
        "🔮 Ramalan: Tingkat stresmu butuh diobati dengan 'Wisata Kulineran Malem' sampe kenyang bgt, trus besoknya nyesel pas nimbang berat badan. Klasik.",
        "🔮 Ramalan: Wah, kamu butuh ke Pantai dengerin suara ombak biar tenang, sekalian hunting foto estetik buat nyindir orang yang udah bikin kamu kesel!",
        "🔮 Ramalan: Kamu butuh kabur ke Gunung yang dingin, pake syal tebel, trus melamun estetik ala-ala video klip indie sambil nungguin jodoh dateng.",
        "🔮 Ramalan: Fix! Kamu cuma butuh 'Mall Keliling Seharian', beli jajanan manis, trus beli baju baru yang sebenernya ga butuh-butuh banget tapi bikin seneng."
    ];

    if (moodBtn) {
        moodBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * travelPredictions.length);
            moodResult.textContent = travelPredictions[randomIndex];
            moodResult.classList.remove('hidden');
        });
    }


 // === 9. LOGIKA KOTAK PESAN RAHASIA (SECRET MESSAGE WITH FORMSUBMIT) ===
    const secretForm = document.getElementById('secretForm');
    const secretInput = document.getElementById('secretInput');
    const secretSuccess = document.getElementById('secretSuccess');

    if (secretForm) {
        secretForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Menahan halaman agar tidak pindah/refresh otomatis

            // Mengirim data form secara background (AJAX) ke FormSubmit
            fetch(secretForm.action, {
                method: 'POST',
                body: new FormData(secretForm)
            })
            .then(response => {
                if (response.ok) {
                    // Munculkan notifikasi sukses di web
                    secretSuccess.classList.remove('hidden');
                    secretInput.value = ""; // Kosongkan inputan teks
                    
                    // Sembunyikan notifikasi sukses kembali setelah 4 detik
                    setTimeout(() => {
                        secretSuccess.classList.add('hidden');
                    }, 4000);
                } else {
                    alert("Waduh, ada gangguan sistem. Coba lagi nanti ya! 😢");
                }
            })
            .catch(error => {
                alert("Gagal mengirim, periksa koneksi internetmu! 🌐");
            });
        });
    }

    // === 10. LOGIKA LIGHTBOX OVERLAY ===
    const images = document.querySelectorAll('.clickable-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    images.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.remove('hidden');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxClose) {
                closeLightbox();
            }
        });
    }
});

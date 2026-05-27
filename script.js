// ==========================================================
// SCRIPT UTAMA: JURNAL PETUALANGAN (EFEK & LOGIKA INTERAKTIF)
// ==========================================================

// --- FUNGSI GLOBAL UNTUK UPDATE ELEMEN BARU (FIREBASE & ADMIN) ---
// Dipasang di objek window agar bisa diakses oleh script type="module" di HTML
window.bindNewCardEvents = function(cardElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Logika Like untuk kartu baru
    const likeBtn = cardElement.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLiked = likeBtn.getAttribute('data-liked') === 'true';
            const countSpan = likeBtn.querySelector('.like-count');
            let currentCount = parseInt(countSpan.textContent) || 0;
            
            if (!isLiked) {
                likeBtn.setAttribute('data-liked', 'true');
                countSpan.textContent = currentCount + 1;
                if (typeof window.createFloatingHearts === 'function') {
                    window.createFloatingHearts(e.clientX, e.clientY);
                }
            } else {
                likeBtn.setAttribute('data-liked', 'false');
                countSpan.textContent = currentCount - 1;
            }
        });
    }

    // Logika Lightbox Zoom Gambar untuk kartu baru
    const img = cardElement.querySelector('.clickable-img');
    if (img && lightbox && lightboxImg && lightboxCaption) {
        img.addEventListener('click', () => {
            lightbox.classList.remove('hidden');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || "Jejak Petualangan";
            document.body.style.overflow = 'hidden';
        });
    }
};

// Fungsi Global untuk menembakkan efek hati (Biar bisa diakses dari mana saja)
window.createFloatingHearts = function(x, y) {
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
};


document.addEventListener('DOMContentLoaded', () => {

    // === 1. FITUR LOADING SCREEN (PRELOADER) ===
    const preloader = document.getElementById('preloader');
    
    // Trigger fail-safe: Jalankan typewriter duluan tanpa nunggu gambar luar selesai load
    typeEffect();

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.visibility = 'hidden';
                }, 500);
            }
        }, 400); 
    });


    // === 2. FITUR TYPEWRITER EFFECT ===
    const titleElement = document.getElementById('typewriter-title');
    const textToType = "Buku Harian Si Cantik ✨";
    let index = 0;

    function typeEffect() {
        if (titleElement && index < textToType.length) {
            titleElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeEffect, 120);
        }
    }


    // === 3. FITUR EFEK PARALLAX DI HERO HEADER ===
    const heroElement = document.getElementById('parallax-hero');
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        if (heroElement && scrollValue <= 600) {
            // Menggeser background internal, bukan container utamanya agar layout tetap kokoh
            heroElement.style.backgroundPositionY = `${scrollValue * 0.4}px`;
        }
    });


    // === 4. FITUR FILTER MENU KATEGORI ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const currentCards = document.querySelectorAll('.card');

            currentCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide-card');
                    card.classList.add('active');
                } else {
                    card.classList.add('hide-card');
                    card.classList.remove('active');
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


    // === 7. FITUR TOMBOL LIKE UNTUK ELEMEN BAWAAN HTML ===
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLiked = btn.getAttribute('data-liked') === 'true';
            const countSpan = btn.querySelector('.like-count');
            let currentCount = parseInt(countSpan.textContent) || 0;

            if (!isLiked) {
                btn.setAttribute('data-liked', 'true');
                countSpan.textContent = currentCount + 1;
                window.createFloatingHearts(e.clientX, e.clientY);
            } else {
                btn.setAttribute('data-liked', 'false');
                countSpan.textContent = currentCount - 1;
            }
        });
    });


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

    if (moodBtn && moodResult) {
        moodBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * travelPredictions.length);
            moodResult.textContent = travelPredictions[randomIndex];
            moodResult.classList.remove('hidden');
        });
    }


    // === 9. KOTAK PESAN RAHASIA (SECRET MESSAGE WITH FORMSUBMIT) ===
    const secretForm = document.getElementById('secretForm');
    const secretInput = document.getElementById('secretInput');
    const secretSuccess = document.getElementById('secretSuccess');

    if (secretForm) {
        secretForm.addEventListener('submit', function(e) {
            e.preventDefault();

            fetch(secretForm.action, {
                method: 'POST',
                body: new FormData(secretForm)
            })
            .then(response => {
                if (response.ok) {
                    if (secretSuccess) secretSuccess.classList.remove('hidden');
                    if (secretInput) secretInput.value = "";
                    
                    setTimeout(() => {
                        if (secretSuccess) secretSuccess.classList.add('hidden');
                    }, 4000);
                } else {
                    alert("Waduh, ada gangguan sistem. Coba lagi nanti ya! 😢");
                }
            })
            .catch(() => {
                alert("Gagal mengirim, periksa koneksi internetmu! 🌐");
            });
        });
    }


    // === 10. LOGIKA LIGHTBOX OVERLAY ELEMEN AWAL ===
    const staticImages = document.querySelectorAll('.clickable-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    staticImages.forEach(img => {
        img.addEventListener('click', () => {
            if (lightbox && lightboxImg && lightboxCaption) {
                lightbox.classList.remove('hidden');
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt || "";
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxClose) {
                closeLightbox();
            }
        });
    }


    // === 11. SISTEM LOGIN ADMIN & OTENTIKASI (ASYA & AZIZ) ===
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const adminPanel = document.getElementById('adminPanel');
    const logoutBtn = document.getElementById('logoutBtn');

    if (sessionStorage.getItem('isAdmin') === 'true') {
        showAdminMode();
    }

    if (adminLoginBtn && loginModal) {
        adminLoginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
    }
    if (closeLogin && loginModal) {
        closeLogin.addEventListener('click', () => loginModal.classList.add('hidden'));
    }

    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === 'asya' && password === 'azizganteng') {
                alert('Otentikasi Berhasil! Selamat datang di Mode Admin ✨');
                sessionStorage.setItem('isAdmin', 'true');
                showAdminMode();
                if (loginModal) loginModal.classList.add('hidden');
                if (usernameInput) usernameInput.value = '';
                if (passwordInput) passwordInput.value = '';
            } else {
                alert('Username atau Sandi salah! Tolong periksa kembali ❌');
            }
        });
    }

    function showAdminMode() {
        if (adminPanel) {
            adminPanel.classList.remove('hidden');
            adminPanel.classList.add('active'); 
        }
        if (adminLoginBtn) adminLoginBtn.classList.add('hidden');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isAdmin');
            if (adminPanel) adminPanel.classList.add('hidden');
            if (adminLoginBtn) adminLoginBtn.classList.remove('hidden');
            alert('Keluar dari Mode Admin. Keamanan terkunci kembali! 🔒');
        });
    }


    // === 12. LOGIKA PANEL ADMIN: SUBMIT KONTEN BARU SECARA INSTAN ===
    const cardsColumn = document.querySelector('.cards-column');
    const sidebarColumn = document.querySelector('.sidebar-column');

    const saveCardBtn = document.getElementById('saveCardBtn');
    if (saveCardBtn && cardsColumn) {
        saveCardBtn.addEventListener('click', () => {
            const loc = document.getElementById('newCardLoc').value.trim();
            const img = document.getElementById('newCardImg').value.trim() || 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80';
            const highlight = document.getElementById('newCardHighlight').value.trim();
            const story = document.getElementById('newCardStory').value.trim();
            const category = document.getElementById('newCardCategory').value;

            if (!loc || !highlight || !story) {
                alert('Harap isi semua teks box petualangan terlebih dahulu! ⚠️');
                return;
            }

            const newCard = document.createElement('article');
            newCard.className = 'card active'; 
            newCard.setAttribute('data-category', category);
            newCard.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${img}" alt="${loc}" class="card-img clickable-img">
                    <span class="card-location">📍 ${loc}</span>
                    <button class="like-btn" data-liked="false">
                        <span class="heart-icon">❤️</span> <span class="like-count">0</span>
                    </button>
                </div>
                <div class="card-content">
                    <div class="highlight-box">
                        <span class="highlight-badge">HIGHLIGHT MENARIK 🌟</span>
                        <p class="highlight-text">"${highlight}"</p>
                    </div>
                    <h3 class="story-title">Behind The Scene 🎬</h3>
                    <p class="story-text">${story}</p>
                </div>
            `;

            // Panggil jembatan fungsi global
            window.bindNewCardEvents(newCard);

            cardsColumn.insertBefore(newCard, cardsColumn.children[1]);
            
            document.getElementById('newCardLoc').value = '';
            document.getElementById('newCardImg').value = '';
            document.getElementById('newCardHighlight').value = '';
            document.getElementById('newCardStory').value = '';
            alert('Jejak Kaki baru berhasil dipublikasikan! 🐾✨');
        });
    }

    const saveThoughtBtn = document.getElementById('saveThoughtBtn');
    if (saveThoughtBtn && sidebarColumn) {
        saveThoughtBtn.addEventListener('click', () => {
            const text = document.getElementById('newThoughtText').value.trim();
            const meta = document.getElementById('newThoughtMeta').value.trim() || '— Baru Saja';

            if (!text) {
                alert('Isi pikiranmu tidak boleh kosong, Admin! 🧠');
                return;
            }

            const newThought = document.createElement('div');
            newThought.className = 'thought-box pop-box active';
            newThought.innerHTML = `
                <div class="quote-mark">“</div>
                <p class="thought-text-content">"${text}"</p>
                <span class="thought-meta">${meta}</span>
            `;

            sidebarColumn.insertBefore(newThought, sidebarColumn.children[1]);

            document.getElementById('newThoughtText').value = '';
            document.getElementById('newThoughtMeta').value = '';
            alert('Isi pikiran acak berhasil ditambahkan ke sidebar! 🧠💭');
        });
    }
});

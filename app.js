// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {

    // 1. Année dynamique pour le Copyright
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Menu Mobile (Toggle)
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 3. Changement d'apparence du Header au défilement (Scroll)
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-3');
                header.classList.add('py-4');
            }
        });
    }

    // 4. Initialisation des Carrousels Swiper

    // Carrousel des Témoignages
    if (document.querySelector('.testimonialSwiper')) {
        new Swiper('.testimonialSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    // Carrousel Europe
    if (document.querySelector('.europeSwiper')) {
        new Swiper('.europeSwiper', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            navigation: {
                nextEl: '#euro-next',
                prevEl: '#euro-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.5, spaceBetween: 24 }
            }
        });
    }

    // Carrousel Afrique & Local
    if (document.querySelector('.localSwiper')) {
        new Swiper('.localSwiper', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            navigation: {
                nextEl: '#local-next',
                prevEl: '#local-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.5, spaceBetween: 24 }
            }
        });
    }

    // 5. Animations GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Effet Parallaxe sur l'image Hero
        if (document.querySelector('.hero-bg-img')) {
            gsap.to('.hero-bg-img', {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#accueil',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Animation d'apparition Fade Up sur les sections
        gsap.utils.toArray('.gsap-reveal').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
});

// 6. Fonction globale de filtrage par budget (accessible par onclick dans le HTML)
window.filterBudget = function(maxPrice) {
    const items = document.querySelectorAll('.budget-item');
    const buttons = document.querySelectorAll('.budget-btn');

    // Mise à jour du style des boutons de filtre
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-dark', 'text-white');
        btn.classList.add('bg-white', 'text-brand-dark');
    });

    items.forEach(item => {
        const price = parseInt(item.getAttribute('data-price'));
        if (maxPrice === 'all') {
            item.style.display = 'flex';
        } else if (maxPrice === 500 && price <= 500) {
            item.style.display = 'flex';
        } else if (maxPrice === 1000 && price <= 1000) {
            item.style.display = 'flex';
        } else if (maxPrice === 1500 && price > 1000 && price <= 1500) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

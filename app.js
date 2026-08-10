// Force le retour en haut de page lors du rechargement
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

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

    // Carrousel Destinations Internationales
    if (document.querySelector('.internationalSwiper')) {
        new Swiper('.internationalSwiper', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            navigation: {
                nextEl: '#inter-next',
                prevEl: '#inter-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.5, spaceBetween: 24 }
            }
        });
    }

    // Carrousel Destinations Locales
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

    // 5. Animations GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

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

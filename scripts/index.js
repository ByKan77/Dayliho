  // Swiper des coachs sur mobile
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },

    // Autoplay parameters
    autoplay: {
        delay: 2500, // Delay between slides in milliseconds
        disableOnInteraction: false, // Continue autoplay after user interactions
    },
});



// Animation entre les pages 

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Optionnel, pour réinitialiser
            }
        });
    }, {
        threshold: 0.3 // Déclenche lorsque 20% de la section est visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
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
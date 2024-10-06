<?php 
    session_start();

    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit();
    }

    require_once '../back/header.php';
    require '../requires/nav.php';
    require '../requires/index_section_1.php';
    require '../requires/index_section_2.php';
    require '../requires/index_section_3.php';
    require '../requires/index_footer.php';
?>
<div id="footer">
    
</div>
<script>
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
</script>
</body>
</html>
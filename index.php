<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dayliho</title>
    <link rel="stylesheet" href="style/style.css">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>
<body>
    <!-- Navbar -->
    <div id="nav_bar">
   
    </div>
     <!-- Première section, avec une photo / vidéo -->
    <div class="section" id="section_1">
        <img src="addons/image_index.jpg" alt="">
        <div id="section_1_infos">
            <h1>Entraînements personnaliés M2L</h1>
            <h2>Créé par des coachs, pour les joeurs.</h2>
        </div>
        <div id="bouton_nous_contacter">
            <a href="">CONTACTEZ-NOUS</a>
        </div>
    </div>
     <!-- Deuxième section avec les coachs inscrits -->
    <div class="section" id="section_2">
        <div id="titre_section_2">
            <h1>Des coachs certifiés</h1>
        </div>
        <div class="liste_coach" id="liste_coach_pc">
            <div class="carte_coach">
                <div class="image_coach">

                </div>
                <div class="nom_coach">
                    <h3>Thomas DUPONT</h3>
                    <p>Coach en musculation</p>
                </div>
                <div class="bouton_informations_coach">
                    <a href="">En savoir plus</a>
                </div>
            </div>

            <div class="carte_coach">
                <div class="image_coach">

                </div>
                <div class="nom_coach">
                    <h3>Julie GARNIER</h3>
                    <p>Coach en musculation</p>
                </div>
                <div class="bouton_informations_coach">
                    <a href="">En savoir plus</a>
                </div>
            </div>

            <div class="carte_coach">
                <div class="image_coach">

                </div>
                <div class="nom_coach">
                    <h3>Bryan RUKIA</h3>
                    <p>Coach universel</p>
                </div>
                <div class="bouton_informations_coach">
                    <a href="">En savoir plus</a>
                </div>
            </div>
        </div>

        

         <!-- Même section mais pour mobile, avec un swiper -->
        <div class="liste_coach" id="liste_coach_mobile">
            <div class="swiper">
                <div class="swiper-wrapper">
                    <!-- Slide 1 -->
                    <div class="swiper-slide" id="swiper-slide">
                        <div class="carte_coach">
                            <div class="image_coach">

                            </div>
                            <div class="nom_coach">
                                <h3>Thomas DUPONT</h3>
                                <p>Coach en musculation</p>
                            </div>
                            <div class="bouton_informations_coach">
                                <a href="">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                     <!-- Slide 2 -->
                    <div class="swiper-slide" id="swiper-slide">
                        <div class="carte_coach">
                            <div class="image_coach">

                            </div>
                            <div class="nom_coach">
                                <h3>Julie GARNIER</h3>
                                <p>Coach renforcement musculaire</p>
                            </div>
                            <div class="bouton_informations_coach">
                                <a href="">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                     <!-- Slide 3 -->
                     <div class="swiper-slide" id="swiper-slide">
                        <div class="carte_coach">
                            <div class="image_coach">

                            </div>
                            <div class="nom_coach">
                                <h3>Bryan RUKIA</h3>
                                <p>Coach universel</p>
                            </div>
                            <div class="bouton_informations_coach">
                                <a href="">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- If we need pagination -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- If we need navigation buttons -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->

                <!-- If we need scrollbar -->
                <!-- <div class="swiper-scrollbar"></div> -->
            </div>
        </div>
    </div>
      <!-- Footer / formulaire de contact -->
    <div class="section" id="section_3">
        <div id="contact_form">
            <h2>Contactez-nous</h2>
            <form action="contact.php" method="post">
                <div class="form-group">
                    <label for="name">Nom:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    </div>
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
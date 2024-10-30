<?php
   session_start();

   // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
   if (!isset($_SESSION['user_id'])) {
       header('Location: login.php');
       exit();
   }

   require '../back/header.php';
   require '../requires/nav.php';
?>

<div id="tab_navigation" style="display:flex;justify-content:center; margin:20vh 10vh 10vh 10vh">
    <!-- Onglets de navigation -->
    <button onclick="showTab('videos')">Toutes les vidéos</button>
    <button onclick="showTab('bonjour')">Planning</button>
</div>

<!-- Contenu de l'onglet "Vidéos" -->
<div id="videos_tab" class="tab_content">
    <div id="videos_body_unique">
        <div id="container_videos_unique">
            <div id="search_area_unique">
                <div id="single_search_unique">
                    <input type="text" id="custom_input_unique" placeholder="Quel sport recherches-tu ?">
                    <a href="#" id="icon_area_unique">
                        <i id="fa_search_unique" class="fa fa-search"></i>
                    </a>
                </div>
            </div>
        </div>

        <div id="container_videos_unique">
            <div id="liste_videos_unique">
                <!-- Les vidéos seront affichées ici dans un div "video_container_unique" -->
            </div>
        </div>
    </div>
</div>

<!-- Contenu de l'onglet "Bonjour" -->
<div id="bonjour_tab" class="tab_content" style="display:none;">
    <h1>Futur planning</h1>
</div>

<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;
    console.log(userId);
    const listeVideosUnique = document.getElementById("liste_videos_unique");
    const searchBarUnique = document.getElementById("custom_input_unique");
    let videosUnique = [];

    // Basculement entre les onglets
    function showTab(tabName) {
        document.getElementById('videos_tab').style.display = (tabName === 'videos') ? 'block' : 'none';
        document.getElementById('bonjour_tab').style.display = (tabName === 'bonjour') ? 'block' : 'none';
    }

    // Récupérer les vidéos du serveur
    axios.get("http://localhost:1234/video/getVideos")
        .then(response => {
            videosUnique = response.data;
            afficherVideosUnique(videosUnique); // Afficher toutes les vidéos au chargement
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des vidéos:', error);
        });

    // Fonction pour afficher les vidéos dans la liste
    function afficherVideosUnique(videos) {
        listeVideosUnique.innerHTML = ''; // Vider la liste actuelle

        videos.forEach(video => {
            // Créer le conteneur de la vidéo
            const videoContainer = document.createElement('div');
            videoContainer.id = 'video_container_unique';

            // Bloc blanc (côté gauche)
            const blancBlock = document.createElement('div');
            blancBlock.id = 'blanc_block_unique';

            // Contenu de la vidéo (titre, description, auteur)
            const videoContent = document.createElement('div');
            videoContent.id = 'video_content_unique';

            // Titre de la vidéo
            const titreVideo = document.createElement('div');
            titreVideo.id = 'titre_video_unique';
            const h3 = document.createElement('h3');
            h3.textContent = `${video.titre}`;
            titreVideo.appendChild(h3);

            // Description de la vidéo
            const descriptionVideo = document.createElement('div');
            descriptionVideo.id = 'description_video_unique';
            descriptionVideo.textContent = `${video.description}`;

            // Auteur de la vidéo
            const auteurVideo = document.createElement('div');
            auteurVideo.id = 'auteur_video_unique';
            auteurVideo.textContent = `Auteur: ${video.auteur}`;

            videoContent.appendChild(titreVideo);
            videoContent.appendChild(descriptionVideo);
            videoContent.appendChild(auteurVideo);

            // Ajouter le bloc blanc et le contenu de la vidéo au conteneur de la vidéo
            videoContainer.appendChild(blancBlock);
            videoContainer.appendChild(videoContent);

            // Ajouter chaque vidéo à la liste
            listeVideosUnique.appendChild(videoContainer);
        });
    }

    // Écouteur d'événement pour la barre de recherche
    searchBarUnique.addEventListener('input', () => {
        const searchQuery = searchBarUnique.value.toLowerCase();
        const filteredVideos = videosUnique.filter(video => video.titre.toLowerCase().includes(searchQuery));
        afficherVideosUnique(filteredVideos); // Afficher uniquement les vidéos filtrées
    });
</script>

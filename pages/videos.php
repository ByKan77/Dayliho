<?php
    require '../back/header.php';
    require '../requires/nav.php';
?>
<div class="container">
    <div id="listeVideos">
        <!-- Les vidéos seront affichées ici dans une div "video-container", avec une div pour chaque attribut -->
        <!-- Ordre : videoContainer puis dedans titreVideo + descriptionVideo + auteurVideo -->
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    const listeVideos = document.getElementById("listeVideos"); // Sélectionne l'élément avec l'ID "listeVideos"
    
    axios.get("http://localhost:1234/getVideos") // Effectue une requête GET à l'URL spécifiée
        .then(response => { // Traite la réponse de la requête
            const videos = response.data; // Stocke les données de la réponse
            listeVideos.innerHTML = ''; // Vide le contenu de la div "listeVideos"

            videos.forEach(video => { 
                const videoContainer = document.createElement('div'); // Crée une nouvelle div "video-container"
                videoContainer.classList.add('video-container'); // Ajoute la classe "video-container"

                // Crée des divs pour chaque attribut de la vidéo avec des classes spécifiques
                const titreVideo = document.createElement('div');
                titreVideo.classList.add('titre-video'); // Ajoute la classe "titre-video"
                titreVideo.textContent = `Intitulé: ${video.intitule}`;
                
                const descriptionVideo = document.createElement('div');
                descriptionVideo.classList.add('description-video'); // Ajoute la classe "description-video"
                descriptionVideo.textContent = `Description: ${video.description}`;
                
                const auteurVideo = document.createElement('div');
                auteurVideo.classList.add('auteur-video'); // Ajoute la classe "auteur-video"
                auteurVideo.textContent = `Auteur: ${video.auteur}`;

                // Ajoute les divs dans la "video-container"
                videoContainer.appendChild(titreVideo);
                videoContainer.appendChild(descriptionVideo);
                videoContainer.appendChild(auteurVideo);

                // Ajoute la "video-container" à la liste
                listeVideos.appendChild(videoContainer);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des vidéos:', error);
        });
</script>

<?php
   session_start();

   // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
   if (!isset($_SESSION['user_id'])) {
       header('Location: login.php');
       exit();
   }
   
    require '../back/header.php';
    require '../requires/nav.php';
?>
<style>

body {
    background-color: #000;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
}

.container {
    padding-top: 90px;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
}

#listeVideos {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start; 
}

.video-container {
    position: relative;
    flex: 0 1 calc(33.33% - 20px); /* La largeur reste fixe pour 3 éléments par ligne */
    display: flex;
    gap: 20px;
    background-color: #060e31;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    max-width: calc(33.33% - 20px);
    overflow: hidden;
    transition: transform 0.3s ease;
}

.video-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.3s ease;
    border-radius: 10px; 
    z-index: 1;
}

.video-container:hover::before {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Effet de zoom */
.video-container:hover {
    transform: scale(1.05);
    z-index: 2;
}

@media (max-width: 1024px) {
    .video-container {
        flex: 0 1 calc(50% - 20px);
        max-width: calc(50% - 20px);
    }
}

@media (max-width: 768px) {
    .video-container {
        flex: 0 1 calc(100% - 20px);
        max-width: calc(100% - 20px);
    }
}

.video-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.titre-video, .description-video, .auteur-video {
    background-color: black;
    padding: 10px;
    margin: 0; 
}

.titre-video h3 {
    font-size: 1.5rem;
    margin: 0;
}

.description-video {
    font-size: 1rem;
}

.auteur-video {
    font-size: 0.9rem;
}

/* Style du bloc blanc */
.blanc-block {
    background-color: #fff; 
    width: 200px; 
    height: 100%; 
    border-radius: 10px;
}




</style>


<div class="container"> 

    <input type="text" id="searchBar" placeholder="Rechercher une vidéo" />
    
</div>

<form id="ajoutVideoForm" enctype="multipart/form-data">
    <input type="text" name="title" placeholder="Titre de la vidéo" required>
    <input type="text" name="description" placeholder="Description" required>
    <input type="text" name="auteur" placeholder="Auteur" required>
    <input type="date" name="date" required>
    <input type="file" name="videoFile" required> <!-- Champ de fichier pour la vidéo -->
    <button type="submit">Ajouter la vidéo</button>
</form>

<div class="container">
    <div id="listeVideos">
        <!-- Les vidéos seront affichées ici dans une div "video-container" -->
    </div>
</div>

<script>

    document.getElementById('ajoutVideoForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(e.target); // Crée un FormData à partir du formulaire

        axios.post("http://localhost:1234/video/addVideo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then(response => {
            console.log(response.data.message); // Message de confirmation
            // Optionnel : Ajouter la nouvelle vidéo à la liste sans recharger la page
            videos.push(response.data.result); // Ajoute la nouvelle vidéo aux vidéos existantes
            afficherVideos(videos); // Met à jour l'affichage des vidéos
        })
        .catch(error => {
            console.error("Erreur lors de l'ajout de la vidéo:", error);
        });
    });



    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;
    console.log(userId);
    const listeVideos = document.getElementById("listeVideos");
    const searchBar = document.getElementById("searchBar");
    let videos = [];

    // Récupération des vidéos depuis le serveur
    axios.get("http://localhost:1234/video/getVideos")
        .then(response => {
            videos = response.data;
            afficherVideos(videos); // Affiche toutes les vidéos au chargement
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des vidéos:', error);
        });

    // Fonction pour afficher les vidéos dans la liste
    function afficherVideos(videos) {
        listeVideos.innerHTML = ''; // Vide la liste actuelle

        videos.forEach(video => {
            // Création du conteneur de la vidéo
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');

            // Création du bloc blanc (à gauche)
            const blancBlock = document.createElement('div');
            blancBlock.classList.add('blanc-block');

            // Contenu de la vidéo (titre, description, auteur)
            const videoContent = document.createElement('div');
            videoContent.classList.add('video-content');

            // Titre de la vidéo
            const titreVideo = document.createElement('div');
            titreVideo.classList.add('titre-video');
            const h3 = document.createElement('h3');
            h3.textContent = `${video.titre}`;
            titreVideo.appendChild(h3);

            // Description de la vidéo
            const descriptionVideo = document.createElement('div');
            descriptionVideo.classList.add('description-video');
            descriptionVideo.textContent = `${video.description}`;

            // Auteur de la vidéo
            const auteurVideo = document.createElement('div');
            auteurVideo.classList.add('auteur-video');
            auteurVideo.textContent = `Auteur: ${video.auteur}`;

            videoContent.appendChild(titreVideo);
            videoContent.appendChild(descriptionVideo);
            videoContent.appendChild(auteurVideo);

            // Ajout du bloc blanc et du contenu vidéo dans le conteneur de la vidéo
            videoContainer.appendChild(blancBlock);
            videoContainer.appendChild(videoContent);

            // Ajout de chaque vidéo dans la liste
            listeVideos.appendChild(videoContainer);
        });
    }

    // Écouteur d'événements pour la barre de recherche
    searchBar.addEventListener('input', () => {
        const recherche = searchBar.value.toLowerCase();
        const videosFiltrees = videos.filter(video => video.titre.toLowerCase().includes(recherche));
        afficherVideos(videosFiltrees); // Affiche seulement les vidéos filtrées
    });
</script>
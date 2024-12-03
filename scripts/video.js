document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek', // Choisissez une vue qui montre les heures
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
        },
        eventColor: '#fd9d1f',
        slotMinTime: '10:00:00', // Heure de début de la plage horaire
        slotMaxTime: '21:00:00', // Heure de fin de la plage horaire
        events: function(info, successCallback, failureCallback) {
            fetch('../back/events.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    successCallback(data); // Retourne les données au calendrier
                })
                .catch(error => failureCallback(error)); // Gestion des erreurs
        },
        eventContent: function(arg) {
            return {
                html: `<strong>${arg.event.title}</strong>` // Affiche le titre
            };
        }
    });

    calendar.render(); // Rendu du calendrier
});





    const listeVideosUnique = document.getElementById("liste_videos_unique");
    const searchBarUnique = document.getElementById("custom_input_unique");
    let videosUnique = [];

    // Basculement entre les onglets
    function showTab(tabName) {
        document.getElementById('videos_tab').style.display = (tabName === 'videos') ? 'block' : 'none';
        document.getElementById('planning_tab').style.display = (tabName === 'planning') ? 'block' : 'none';
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

    searchBarUnique.addEventListener('input', () => {
        const searchQuery = searchBarUnique.value.toLowerCase();
        const filteredVideos = videosUnique.filter(video => video.titre.toLowerCase().includes(searchQuery));
        afficherVideosUnique(filteredVideos); // Afficher uniquement les vidéos filtrées
    });

    async function getUser(req) {
        const userId = req.query.id;
        return userId;
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("session-modal");
        const openModalBtn = document.getElementById("create-session-btn");
        const closeModalBtn = document.getElementById("close-modal");
        const submitBtn = document.getElementById("submitAddSeance");
        
    
        openModalBtn.onclick = function() {
            modal.style.display = "flex";
        };
    
        closeModalBtn.onclick = function() {
            modal.style.display = "none";
        };
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    
        submitBtn.addEventListener("click", async function(event) {
            event.preventDefault();
    
            // Remplace cette partie par ta requête réelle pour obtenir userId
            const req = { query: { id: '123' } }; // Exemple de requête
            const userId = await getUser(req); // Récupère l'ID utilisateur
            const dateFin = document.getElementById("session-dateDebut").value
            const sessionData = {
                titre: document.getElementById("session-name").value,
                description: document.getElementById("session-name").value,
                dateDebut: document.getElementById("session-dateDebut").value,
                dateFin,
                lieu: document.getElementById("session-lieu").value,
                nombrePlaces: document.getElementById("session-taille").value,
                id_sport: document.getElementById("session-sport").value,
                userId: userId // Ajoute l'ID utilisateur
            }; 

            console.log(sessionData);
            
            const formData = new FormData();
                formData.append('titre', sessionData.titre);
                formData.append('description', sessionData.description);
                formData.append('dateDebut', sessionData.dateDebut);
                formData.append('dateFin', sessionData.dateFin);
                formData.append('lieu', sessionData.lieu);
                formData.append('nombrePlaces', sessionData.nombrePlaces);
                formData.append('id_sport', sessionData.id_sport);
                formData.append('id_utilisateur', sessionData.userId);

            console.log(localStorage.getItem("token"));

            try {
                
                const response = await axios.post('http://localhost:1234/video/addSeance', formData,  
                    {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                  }});
                alert("Séance ajoutée avec succès !");
                modal.style.display = "none";
            } catch (error) {
                console.error("Erreur lors de l'ajout de la séance:", error);
                alert("Erreur lors de l'ajout de la séance.");
            }
        });
    });


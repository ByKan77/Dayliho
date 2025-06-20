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
        slotMinTime: '10:00:00', 
        slotMaxTime: '21:00:00', 
        events: function(info, successCallback, failureCallback) {
            fetch('http://localhost:1234/video/getVideos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau');
                    }
                    return response.json();
                })
                .then(data => {
                    // Map the data to the format expected by FullCalendar
                    const events = data.map(event => ({
                        id: event.id,
                        title: event.titre,
                        start: event.dateDebut,
                        end: event.dateFin,
                        extendedProps: {
                            description: event.description,
                            lieu: event.lieu,
                            url: event.URL_video
                        }
                    }));
                    successCallback(events); // Retourne les données au calendrier
                })
                .catch(error => failureCallback(error)); // Gestion des erreurs
        },
        eventContent: function(arg) {
            return {
                html: `<strong>${arg.event.title}</strong>
                <br>${arg.event.extendedProps.description}` // Affiche la description de la séance
            };
        },
        eventClick: function(info) {
            // Récupérer les informations de l'événement cliqué
            var event = info.event;

            // Mettre à jour le modal avec les informations de l'événement
            document.getElementById('eventId').textContent = event.id;
            document.getElementById('eventTitle').textContent = event.title;
            document.getElementById('eventDesc').textContent = event.extendedProps.description;
            document.getElementById('eventLieu').textContent = event.extendedProps.lieu;
            document.getElementById('eventUrl').href = event.extendedProps.url;
            document.getElementById('eventStart').textContent = event.start.toLocaleString(); // Affiche l'heure locale
            document.getElementById('eventEnd').textContent = event.end.toLocaleString(); // Affiche l'heure locale

            // Afficher le modal
            document.getElementById('eventModal').style.display = 'block';
        }
    });

    calendar.render(); // Rendu du calendrier

    // Fermer le modal quand on clique sur le bouton de fermeture
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('eventModal').style.display = 'none';
    });

    // Fermer le modal quand on clique en dehors du contenu
    window.onclick = function(event) {
        if (event.target === document.getElementById('eventModal')) {
            document.getElementById('eventModal').style.display = 'none';
        }
    }
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

        // Contenu de la vidéo (titre, description)
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

        // Section des notes
        const notesSection = document.createElement('div');
        notesSection.id = 'notes_section';
        notesSection.innerHTML = `
            <div class="rating-display">
                <span class="stars">★★★★★</span>
                <span class="rating-text">Chargement...</span>
            </div>
        `;

        // Charger les notes pour cette séance
        loadRatingsForSeance(video.id, notesSection);

        // Vérifier si la séance est passée et si l'utilisateur peut la noter
        const seanceDate = new Date(video.dateFin);
        const now = new Date();
        const isPast = seanceDate < now;
        const currentUserId = localStorage.getItem('userId');
        const canNotate = isPast && video.id_utilisateur != currentUserId;

        // Bouton de notation (seulement pour les séances passées et non créées par l'utilisateur)
        if (canNotate) {
            const notationBtn = document.createElement('button');
            notationBtn.textContent = 'Noter cette séance';
            notationBtn.className = 'notation-btn';
            notationBtn.onclick = () => openNotationModal(video.id);
            videoContent.appendChild(notationBtn);
        }

        videoContent.appendChild(titreVideo);
        videoContent.appendChild(descriptionVideo);
        videoContent.appendChild(notesSection);

        // Ajouter le bloc blanc et le contenu de la vidéo au conteneur de la vidéo
        videoContainer.appendChild(blancBlock);
        videoContainer.appendChild(videoContent);

        // Ajouter chaque vidéo à la liste
        listeVideosUnique.appendChild(videoContainer);
    });
}

searchBarUnique.addEventListener('input', () => {
    const searchQuery = searchBarUnique.value.toLowerCase();
    const filteredVideos = videosUnique.filter(video => 
        video.titre.toLowerCase().includes(searchQuery) || 
        video.description.toLowerCase().includes(searchQuery)
    );
    afficherVideosUnique(filteredVideos); // Afficher uniquement les vidéos filtrées
});

// Fonctions pour le système de notation
function openNotationModal(seanceId) {
    document.getElementById('notationSeanceId').value = seanceId;
    document.getElementById('notationModal').style.display = 'block';
}

function closeNotationModal() {
    document.getElementById('notationModal').style.display = 'none';
    document.getElementById('notationForm').reset();
}

// Fonction pour charger les notes d'une séance
async function loadRatingsForSeance(seanceId, notesSection) {
    try {
        const response = await axios.get(`http://localhost:1234/notation/getNotationsBySeance/${seanceId}`);
        const notations = response.data;
        
        if (notations.length > 0) {
            // Calculer la moyenne
            const total = notations.reduce((sum, notation) => sum + notation.note, 0);
            const moyenne = (total / notations.length).toFixed(1);
            
            // Afficher les étoiles colorées
            const starsElement = notesSection.querySelector('.stars');
            const ratingText = notesSection.querySelector('.rating-text');
            
            // Colorer les étoiles selon la note
            const fullStars = Math.floor(moyenne);
            const hasHalfStar = moyenne % 1 >= 0.5;
            
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    starsHTML += '<span class="star filled">★</span>';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    starsHTML += '<span class="star half">★</span>';
                } else {
                    starsHTML += '<span class="star empty">☆</span>';
                }
            }
            
            starsElement.innerHTML = starsHTML;
            ratingText.textContent = `${moyenne}/10 (${notations.length} avis)`;
            
            // Ajouter un bouton pour voir tous les avis
            const viewReviewsBtn = document.createElement('button');
            viewReviewsBtn.textContent = 'Voir tous les avis';
            viewReviewsBtn.className = 'view-reviews-btn';
            viewReviewsBtn.onclick = () => showAllReviews(seanceId, notations);
            notesSection.appendChild(viewReviewsBtn);
            
        } else {
            notesSection.innerHTML = `
                <div class="rating-display">
                    <span class="stars">☆☆☆☆☆</span>
                    <span class="rating-text">Aucune note</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des notes:', error);
        notesSection.innerHTML = `
            <div class="rating-display">
                <span class="stars">☆☆☆☆☆</span>
                <span class="rating-text">Erreur de chargement</span>
            </div>
        `;
    }
}

// Fonction pour afficher tous les avis
function showAllReviews(seanceId, notations) {
    const reviewsHTML = notations.map(notation => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${notation.prenom} ${notation.nom}</span>
                <span class="review-rating">
                    ${'★'.repeat(notation.note)}${'☆'.repeat(10-notation.note)} ${notation.note}/10
                </span>
            </div>
            ${notation.commentaire ? `<div class="review-comment">${notation.commentaire}</div>` : ''}
        </div>
    `).join('');
    
    // Créer un modal pour afficher les avis
    const reviewsModal = document.createElement('div');
    reviewsModal.className = 'modal';
    reviewsModal.style.display = 'block';
    reviewsModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Avis sur cette séance</h2>
            <div class="reviews-container">
                ${reviewsHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(reviewsModal);
    
    // Fermer le modal en cliquant en dehors
    reviewsModal.onclick = function(event) {
        if (event.target === reviewsModal) {
            reviewsModal.remove();
        }
    };
}

// Gestion du formulaire de notation
document.addEventListener('DOMContentLoaded', function() {
    const notationModal = document.getElementById('notationModal');
    const closeNotationBtn = document.getElementById('closeNotationModal');
    const notationForm = document.getElementById('notationForm');

    // Fermer le modal de notation
    closeNotationBtn.onclick = closeNotationModal;

    // Fermer le modal en cliquant en dehors
    window.onclick = function(event) {
        if (event.target === notationModal) {
            closeNotationModal();
        }
    };

    // Soumettre la notation
    notationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const seanceId = document.getElementById('notationSeanceId').value;
        const note = document.getElementById('notationNote').value;
        const commentaire = document.getElementById('notationCommentaire').value;

        try {
            const response = await axios.post('http://localhost:1234/notation/addNotation', {
                idSeance: seanceId,
                note: parseInt(note),
                commentaire: commentaire
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            if (response.data.success) {
                alert('Notation envoyée avec succès !');
                closeNotationModal();
                // Recharger les vidéos pour mettre à jour l'affichage
                location.reload();
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la notation:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Erreur lors de l\'envoi de la notation.');
            }
        }
    });
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
    
        try {
            // Envoie d'une requête GET pour récupérer les informations de l'utilisateur
            const response = await axios.get(`http://localhost:1234/user/getUserById?id=${localStorage.getItem("userId")}`);
            
            if (response.data) {
                const utilisateur = response.data;  // Récupère l'utilisateur depuis la réponse
                const userIdFromAPI = utilisateur.id;  // L'ID de l'utilisateur
    
                const sessionData = {
                    titre: document.getElementById("session-name").value,
                    description: document.getElementById("session-description").value,
                    URL_video: document.getElementById("session-url").value,
                    dateDebut: document.getElementById("session-dateDebut").value,
                    dateFin: document.getElementById("session-dateFin").value,
                    lieu: document.getElementById("session-lieu").value,
                    nombrePlaces: document.getElementById("session-taille").value,
                    userId: userIdFromAPI // Ajoute l'ID utilisateur
                };
    
                console.log(sessionData);
                
                const formData = new FormData();
                formData.append('titre', sessionData.titre);
                formData.append('description', sessionData.description);
                formData.append('URL_video', sessionData.URL_video);
                formData.append('dateDebut', sessionData.dateDebut);
                formData.append('dateFin', sessionData.dateFin);
                formData.append('lieu', sessionData.lieu);
                formData.append('nombrePlaces', sessionData.nombrePlaces);
                formData.append('id_utilisateur', sessionData.userId);
    
                console.log(localStorage.getItem("token"));
    
                try {
                    const axiosResponse = await axios.post('http://localhost:1234/video/addSeance', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    alert("Séance ajoutée avec succès !");
                    modal.style.display = "none";
                } catch (error) {
                    console.error("Erreur lors de l'ajout de la séance:", error);
                    alert("Erreur lors de l'ajout de la séance.");
                }
            } else {
                throw new Error("Utilisateur non trouvé");
            }
        } catch (error) {
            console.error("Erreur de récupération de l'utilisateur:", error);
            alert("Erreur lors de la récupération de l'utilisateur.");
        }
    });
});
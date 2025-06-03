document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
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
                    const events = data.map(event => ({
                        id: event.id,
                        title: event.titre,
                        start: event.dateDebut,
                        end: event.dateFin,
                        extendedProps: {
                            description: event.description,
                            lieu: event.lieu
                        }
                    }));
                    successCallback(events);
                })
                .catch(error => failureCallback(error));
        },
        eventContent: function(arg) {
            return {
                html: `<strong>${arg.event.title}</strong>
                <br>${arg.event.extendedProps.description}`
            };
        },
        eventClick: function(info) {
            var event = info.event;
            document.getElementById('eventId').textContent = event.id;
            document.getElementById('eventTitle').textContent = event.title;
            document.getElementById('eventDesc').textContent = event.extendedProps.description;
            document.getElementById('eventStart').textContent = event.start.toLocaleString();
            document.getElementById('eventEnd').textContent = event.end.toLocaleString();
            document.getElementById('eventModal').style.display = 'block';
        }
    });

    calendar.render();

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('eventModal').style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === document.getElementById('eventModal')) {
            document.getElementById('eventModal').style.display = 'none';
        }
    }
});

const listeVideosUnique = document.getElementById("liste_videos_unique");
const searchBarUnique = document.getElementById("custom_input_unique");
let videosUnique = [];

function showTab(tabName) {
    document.getElementById('videos_tab').style.display = (tabName === 'videos') ? 'block' : 'none';
    document.getElementById('planning_tab').style.display = (tabName === 'planning') ? 'block' : 'none';
}

function deleteSeance(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
        axios.delete(`http://localhost:1234/video/deleteSeance/${id}`)
            .then(response => {
                alert('Séance supprimée avec succès');
                // Rafraîchir la liste des séances
                axios.get("http://localhost:1234/video/getVideos")
                    .then(response => {
                        videosUnique = response.data;
                        afficherVideosUnique(videosUnique);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des vidéos:', error);
                    });
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la séance:', error);
                alert('Une erreur est survenue lors de la suppression');
            });
    }
}

axios.get("http://localhost:1234/video/getVideos")
    .then(response => {
        videosUnique = response.data;
        afficherVideosUnique(videosUnique);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des vidéos:', error);
    });

function afficherVideosUnique(videos) {
    listeVideosUnique.innerHTML = '';

    videos.forEach(video => {
        const videoContainer = document.createElement('div');
        videoContainer.id = 'video_container_unique';

        const blancBlock = document.createElement('div');
        blancBlock.id = 'blanc_block_unique';

        const videoContent = document.createElement('div');
        videoContent.id = 'video_content_unique';

        const titreVideo = document.createElement('div');
        titreVideo.id = 'titre_video_unique';
        const h3 = document.createElement('h3');
        h3.textContent = `${video.titre}`;
        titreVideo.appendChild(h3);

        const descriptionVideo = document.createElement('div');
        descriptionVideo.id = 'description_video_unique';
        descriptionVideo.textContent = `${video.description}`;

        // Ajout du bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteSeance(video.id);
        deleteButton.style.backgroundColor = '#ff4444';
        deleteButton.style.marginTop = '10px';
        deleteButton.style.width = 'auto';
        deleteButton.style.padding = '5px 10px';

        videoContent.appendChild(titreVideo);
        videoContent.appendChild(descriptionVideo);
        videoContent.appendChild(deleteButton);

        videoContainer.appendChild(blancBlock);
        videoContainer.appendChild(videoContent);

        listeVideosUnique.appendChild(videoContainer);
    });
}

searchBarUnique.addEventListener('input', () => {
    const searchQuery = searchBarUnique.value.toLowerCase();
    const filteredVideos = videosUnique.filter(video => video.titre.toLowerCase().includes(searchQuery));
    afficherVideosUnique(filteredVideos);
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
            const response = await axios.get(`http://localhost:1234/user/getUserById?id=${localStorage.getItem("userId")}`);
            
            if (response.data) {
                const utilisateur = response.data;
                const userIdFromAPI = utilisateur.id;
    
                const sessionData = {
                    titre: document.getElementById("session-name").value,
                    description: document.getElementById("session-name").value,
                    dateDebut: document.getElementById("session-dateDebut").value,
                    dateFin: document.getElementById("session-dateFin").value,
                    lieu: document.getElementById("session-lieu").value,
                    nombrePlaces: document.getElementById("session-taille").value,
                    userId: userIdFromAPI
                };
    
                console.log(sessionData);
                
                const formData = new FormData();
                formData.append('titre', sessionData.titre);
                formData.append('description', sessionData.description);
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
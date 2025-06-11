<script>
    localStorage.removeItem('redirected')
</script>
<?php
   require '../back/header.php';
   require '../requires/nav.php';
?>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js"></script> 

<div id="tab_navigation" style="display:flex;justify-content:center; margin:20vh 10vh 10vh 10vh">
    <button onclick="showTab('videos')">Toutes les séances</button>
    <button onclick="showTab('planning')">Planning</button>
    <button id="create-session-btn"><i class="fa-solid fa-plus"></i></button>
</div>

<!-- Fenêtre modale pour créer une séance -->
<div id="session-modal" class="modal"  style="z-index:1000;">
    <div class="modal-content">
        <span class="close-btn" id="close-modal">&times;</span>
        <h2>Nouvelle Séance</h2>
        <form>
            <label for="session-name">Nom de la séance :</label>
            <input type="text" id="session-name" name="session-name" required><br><br>
            
            <label for="session-lieu">Lieu :</label>
            <input type="text" id="session-lieu" name="session-lieu" required><br><br>

            <label for="session-taille">Nombre de Places</label>
            <select id="session-taille" name="session-taille">
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
                <option value=6>6</option>
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
            </select><br><br>

            <label for="session-dateDebut">Date et heure de début :</label>
            <input type="datetime-local" id="session-dateDebut" name="session-dateDebut" required><br><br>

            <label for="session-dateFin">Date et heure de fin :</label>
            <input type="datetime-local" id="session-dateFin" name="session-dateFin" required><br><br>
            
            <button id="submitAddSeance" type="submit">Enregistrer</button>
        </form>
    </div>
</div>

<!-- Fenêtre modale pour modifier une séance -->
<div id="update-session-modal" class="modal" style="z-index:1000;">
    <div class="update-modal-content">
        <span class="close-btn" id="close-update-modal">&times;</span>
        <h2>Modifier la Séance</h2>
        <form>
            <label for="update-session-name">Nom de la séance :</label>
            <input type="text" id="update-session-name" name="update-session-name" required><br><br>
            
            <label for="update-session-lieu">Lieu :</label>
            <input type="text" id="update-session-lieu" name="update-session-lieu" required><br><br>

            <label for="update-session-taille">Nombre de Places</label>
            <select id="update-session-taille" name="update-session-taille">
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
                <option value=6>6</option>
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
            </select><br><br>

            <label for="update-session-dateDebut">Date et heure de début :</label>
            <input type="datetime-local" id="update-session-dateDebut" name="update-session-dateDebut" required><br><br>

            <label for="update-session-dateFin">Date et heure de fin :</label>
            <input type="datetime-local" id="update-session-dateFin" name="update-session-dateFin" required><br><br>
            
            <button id="submitUpdateSeance" type="submit">Modifier</button>
        </form>
    </div>
</div>

<!-- Contenu de l'onglet "Vidéos" -->
<div id="videos_tab" class="tab_content" style="display:none;">
    <div id="videos_body_unique">
        <div id="container_videos_unique">
            <div id="search_area_unique">
                <div id="single_search_unique">
                    <input type="text" id="custom_input_unique" placeholder="Rechercher une séance...">
                    <a href="#" id="icon_area_unique">
                        <i id="fa_search_unique" class="fa fa-search"></i>
                    </a>
                </div>
            </div>
        </div>

        <div id="container_videos_unique">
            <div id="liste_videos_unique">
                <!-- Ajout de l'icône d'engrenage ici -->
                <div id="loading_area">
                    <i class="fa-solid fa-gear fa-spin" style="font-size: 24px; color: red;"></i>
                </div>

                <!-- Les vidéos seront affichées ici dans un div "video_container_unique" -->
            </div>
        </div>
    </div>
</div>

<!-- Contenu de l'onglet "planning" -->
<div id="planning_tab" class="tab_content">
    <div id="calendrier" class="tab-content"> <!-- Enlever 'hidden' pour charger le calendrier dès le début -->
        <div class="container">
            <div id="calendar"></div> <!-- Rendu du calendrier dans la div -->
        </div>
    </div>
</div>

<!-- Modal structure -->
<div id="eventModal" class="modal">
    <div class="modal-content">
        <span id="closeModal" class="close">&times;</span>
        <h2>Détails de la séance</h2>
        <p><strong>ID :</strong> <span id="eventId"></span></p>
        <p><strong>Titre :</strong> <span id="eventTitle"></span></p>
        <p><strong>Description :</strong> <span id="eventDesc"></span></p>
        <p><strong>Début :</strong> <span id="eventStart"></span></p>
        <p><strong>Fin :</strong> <span id="eventEnd"></span></p>
    </div>
</div>

<style>

/* Style pour le modal */
.modal {
    display: none; /* Cacher le modal par défaut */
    position: fixed;
    z-index: 1; /* Placer le modal au-dessus du contenu */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4); /* Fond sombre */
}

/* Contenu du modal */
.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
}

/* Style pour le bouton de fermeture */
.close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    float: right;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>

<script src="../scripts/video.js" defer></script>
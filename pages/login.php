<?php
require '../back/header.php';
require '../requires/nav.php';
?>
<title>Connexion</title>
<style>
    
    body {
    display: flex;
    justify-content: flex-start; /* Position à gauche */
    align-items: center;
    height: 100vh;
    margin: 0;
    background-image: url('../addons/image_connexion.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

#connexion {
    width: 40vw; /* Largeur de la boîte */
    padding: 20px;
    margin: 70px; /* Marge autour de la boîte */
    border: 1px solid #444;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    background-color: #fff; /* Fond blanc */
    text-align: center; /* Centre le texte à l'intérieur de la boîte */
}

#connexion h1 {
    margin-bottom: 20px; /* Espace sous le titre */
}

#connexion div {
    margin-bottom: 15px; /* Espace sous chaque groupe */
}

#connexion label {
    display: block; /* Affiche le label en bloc */
    margin-bottom: 5px; /* Espace sous le label */
    text-align: center; /* Centre le texte du label */
}

#connexion input {
    width: calc(100% - 20px); /* Largeur complète moins le padding */
    padding: 10px;
    border: 1px solid #ccc; /* Bordure sombre */
    border-radius: 5px;
    background-color: #fafafa; /* Fond blanc pour les champs */
    color: #333; /* Couleur du texte dans les champs */
}

#connexion .btn {
    width: calc(100% - 20px); /* Largeur complète moins le padding */
    padding: 10px;
    background-color: #fd9d1f; /* Couleur orange du bouton */
    border: none; /* Pas de bordure */
    border-radius: 5px; /* Bordure arrondie */
    color: white; /* Couleur du texte en blanc */
    font-size: 16px; /* Taille de police */
    cursor: pointer; /* Curseur main au survol */
    transition: background-color 0.3s ease; /* Transition pour le survol */
}

#connexion .btn:hover {
    background-color: #bd6e06; /* Couleur orange plus sombre au survol */
}

.alert {
    color: red; /* Couleur rouge pour les alertes */
    text-align: center; /* Centre le texte de l'alerte */
    margin-top: 10px; /* Espace au-dessus de l'alerte */
    font-size: 14px; /* Taille de police de l'alerte */
}





</style>
<div id="connexion">
    <h1>Connexion</h1>
    <form id="formulaire_de_connexion" method="POST">
        <div>
            <label for="email">Email :</label>
            <input type="email" name="email" id="email" class="form-control" required>
        </div>
        <div>
            <label for="mot_de_passe">Mot de passe :</label>
            <input type="password" name="mot_de_passe" id="mot_de_passe" class="form-control" required>
        </div>
        <br>
        <input type="submit" value="Se connecter" class="btn">
    </form>
</div>
<script>
    document.getElementById('formulaire_de_connexion').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        const formEmail = document.getElementById('email').value;
        const formPassword = document.getElementById('mot_de_passe').value;

        // Envoi des informations de connexion à l'API pour vérification
        fetch('http://localhost:1234/checkUser', { // Route API pour vérifier les infos
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formEmail,
                mot_de_passe: formPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Connexion réussie, on envoie les données à PHP pour gérer la session
                fetch('../back/login_handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formEmail,
                        user_id: data.user_id // On récupère l'ID utilisateur renvoyé par l'API
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirection vers la page protégée
                        window.location.href = 'index.php';
                    } else {
                        alert('Erreur de session : ' + data.message);
                    }
                });
            } else {
                // Erreur de connexion
                alert('Email ou mot de passe incorrect.');
            }
        })
        .catch(error => console.error('Erreur lors de la connexion:', error));
    });
</script>



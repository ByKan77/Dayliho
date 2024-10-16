<?php
require '../back/header.php';
require '../requires/nav.php';
?>
<title>Connexion</title>
<style>
    body {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    #connexion {
        width: 40vw;
        padding: 20px;
        margin: 70px;
        border: 1px solid #444;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        background-color: #fff;
        text-align: center;
    }

    #connexion h1 {
        margin-bottom: 20px;
    }

    #connexion div {
        margin-bottom: 15px;
    }

    #connexion label {
        display: block;
        margin-bottom: 5px;
        text-align: center;
    }

    #connexion input {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fafafa;
        color: #333;
    }

    #connexion .btn {
        width: calc(100% - 20px);
        padding: 10px;
        background-color: #fd9d1f;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    #connexion .btn:hover {
        background-color: #bd6e06;
    }

    .alert {
        color: red; /* Couleur rouge pour les alertes */
        text-align: center; /* Centre le texte de l'alerte */
        margin-top: 10px; /* Espace au-dessus de l'alerte */
        font-size: 14px; /* Taille de police de l'alerte */
    }
</style>

<form id="formulaire_de_connexion">
    <label for="email">Email :</label>
    <input type="email" id="email" name="email" required>
    <br>
    <label for="mot_de_passe">Mot de passe :</label>
    <input type="password" id="mot_de_passe" name="mot_de_passe" required>
    <br>
    <button type="submit">Se connecter</button>
</form>

<script>
    document.getElementById('formulaire_de_connexion').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        const formEmail = document.getElementById('email').value;
        const formPassword = document.getElementById('mot_de_passe').value;

        // Envoi des informations de connexion à l'API pour vérification
        fetch('http://localhost:1234/user/checkUser', { // Route API
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
                        user_id: data.user_id // Récupère l'ID utilisateur
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




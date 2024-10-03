<?php
require '../back/header.php';
?>
<title>Connexion</title>
<style>
    #formulaire_connexion {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #connexion {
        width: 40vw;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #connexion h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    #connexion div {
        margin-bottom: 15px;
    }

    #connexion label {
        display: block;
        margin-bottom: 5px;
    }

    #connexion input {
        width: 20vw;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    #connexion .btn {
        width: 20vw;
        padding: 10px;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    #connexion .btn:hover {
        background-color: #0056b3;
    }

    .alert {
        color: red;
        text-align: center;
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
<div style="display:flex;justify-content:center;align-item:center; margin:20px;">
    <a href="index.php" style="color:red;">CONNEXION DIRECTE</a>
</div>
<script>
    axios.get("http://localhost:1234/getUser") // Effectue une requête GET à l'URL spécifiée
        .then(response => { // Traite la réponse de la requête
            const utilisateurs = response.data; // Récupère la liste des utilisateurs
            if (utilisateurs.length > 0) { // Vérifie que des utilisateurs ont été récupérés
                utilisateurs.forEach(utilisateur => {
                    const userEmail = utilisateur.email; // Récupère l'email de l'utilisateur
                    const userPassword = utilisateur.mot_de_passe; // Récupère le mot de passe de l'utilisateur
                    document.getElementById('formulaire_de_connexion').addEventListener('submit', function(event) {
                        event.preventDefault(); // Empêche l'envoi du formulaire
                        const formEmail = document.getElementById('email').value;
                        const formPassword = document.getElementById('mot_de_passe').value;
                        if (formEmail === userEmail && formPassword === userPassword) {
                            window.location.href = 'index.php';
                        } else {
                            alert('Email ou mot de passe incorrect.');
                        }
                    });
                });
            } else {
                console.log("Aucun utilisateur trouvé.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
        });
</script>

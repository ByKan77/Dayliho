<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

require '../back/header.php';
require '../requires/nav.php';

?>

<style>
    body {
        background-image: url('../addons/image_profile.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column; /* S'assure que le contenu est empilé verticalement */
    }

    #user_profile_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        max-width: 1200px;
        width: 100%;
    }

    #user_profile {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 20px;
    }

    #user_info, #admin_section {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 48%;
        box-sizing: border-box;
        text-align: center;
    }

    #admin_section {
        display: none;
        margin-left: 4%;
    }

    .bouton_deconnexion {
        padding: 10px;
        background-color: #fd9d1f;
        border: none; 
        border-radius: 5px;
        color: white; 
        font-size: 16px; 
        cursor: pointer; 
        transition: background-color 0.3s ease; 
    }

    .bouton_deconnexion:hover { 
        background-color: #bd6e06; 
    }
    
    #accounts_table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    #accounts_table th, #accounts_table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    #accounts_table th {
        background-color: #f2f2f2;
    }

    .container {
        width: 60%;
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        #user_profile {
            flex-direction: column;
            align-items: center;
        }

        #user_info, #admin_section {
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>

<div id="user_profile_container">
    <div id="user_profile">
        <div id="user_info">
            <!-- Informations sur User ici -->
        </div>
        <div id="admin_section">
            <h2>Liste des comptes</h2>
            <table id="accounts_table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Liste des comptes ici -->
                </tbody>
            </table>
        </div>
    </div>
    <!-- Bouton de déconnexion -->
    <a href="../back/logout.php" class="bouton_deconnexion">Déconnexion</a>
</div>

<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>; // Récupère l'ID de l'utilisateur à partir de la session

    // Récupérer les informations de l'utilisateur connecté via l'API
    axios.get(`http://localhost:1234/user/getUserById?id=${userId}`)
    .then(response => {
        const utilisateur = response.data;
        
        if (utilisateur) {
            // Affichage des infos de l'utilisateur
            document.getElementById('user_info').innerHTML = `
                <br>
                <p><strong>Email :</strong> ${utilisateur.email}</p>
                <br>
                <p><strong>Nom :</strong> ${utilisateur.nom}</p>
                <br>
                <p><strong>Prénom :</strong> ${utilisateur.prenom}</p>
                <br>
                <p><strong>Sport :</strong> ${utilisateur.sport}</p>
                <br>
                <p><strong>Rôle :</strong> ${utilisateur.role}</p>
            `;

            // Si l'utilisateur est un administrateur, affichez la section administrateur et récupérez la liste des comptes
            if (utilisateur.role === 'administrateur') {
                document.getElementById('admin_section').style.display = 'block';

                axios.get('http://localhost:1234/user/getUsers') // Récupérer tous les utilisateurs
                    .then(response => {
                        const allUsers = response.data;
                        const accountsTableBody = document.getElementById('accounts_table').querySelector('tbody');
                        accountsTableBody.innerHTML = ''; 

                        allUsers.forEach(user => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${user.nom}</td>
                                <td>${user.prenom}</td>
                                <td>${user.email}</td>
                            `;
                            accountsTableBody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération de la liste des comptes:", error);
                        document.getElementById('admin_section').innerHTML = '<p>Erreur lors de la récupération de la liste des comptes.</p>';
                    });
            }
        } else {
            document.getElementById('user_info').innerHTML = '<p>Aucun utilisateur trouvé.</p>';
        }
    })
    
    .catch(error => {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
        document.getElementById('user_info').innerHTML = '<p>Erreur lors de la récupération des données.</p>';
    });
</script>

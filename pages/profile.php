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
    align-items:center;
    min-height: 100vh;
}

#user_profile {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    max-width: 1200px;
    width: 100%;
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
    display: block;
    margin-left: 4%;
}

/* Styles pour le tableau des comptes */
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



</style>

</style> 
<div id="user_profile" >
    <h1>Profil de l'utilisateur</h1>
    <div id="user_info">
        <!-- Informations de l'utilisateur -->
    </div>
    <div id="admin_section" style="display: none;">
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
                <!-- La liste des comptes sera ici -->
            </tbody>
        </table>
    </div>
    <a href="../back/logout.php" class="bouton_nav">Déconnexion</a>
<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>; // Récupérer l'ID de l'utilisateur connecté

    // Récupérer les informations de l'utilisateur
    axios.get(`http://localhost:1234/getUser?id=${userId}`)
        .then(response => {
            const utilisateurs = response.data; // Récupère la liste des utilisateurs
            const utilisateur = utilisateurs.find(user => user.id === userId); // Trouver l'utilisateur correspondant
            
            if (utilisateur) {
                // Afficher les informations de l'utilisateur
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

                // Si l'utilisateur est un administrateur, afficher la section admin et récupérer la liste des comptes
                if (utilisateur.role === 'administrateur') {
                    document.getElementById('admin_section').style.display = 'block';

                    axios.get('http://localhost:1234/getUser') // Utilisez la bonne URL pour récupérer tous les utilisateurs
                        .then(response => {
                            const allUsers = response.data;
                            const accountsTableBody = document.getElementById('accounts_table').querySelector('tbody');
                            accountsTableBody.innerHTML = ''; // Clear existing rows

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

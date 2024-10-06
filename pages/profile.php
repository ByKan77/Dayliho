<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

require '../back/header.php';
require '../requires/nav.php';
?>

<div id="user_profile">
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
                    <p><strong>Nom :</strong> ${utilisateur.nom}</p>
                    <p><strong>Prénom :</strong> ${utilisateur.prenom}</p>
                    <p><strong>Sport :</strong> ${utilisateur.sport}</p>
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

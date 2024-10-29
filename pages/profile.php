<?php
    session_start();

    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit();
    }

    require '../back/header.php';
    require '../requires/nav.php';
?>

<div id="profile">
    <div class="container">
        <div class="profile-sidebar">
            <a href="#" class="menu-item active" id="details-tab">Détails</a>
            <a href="#" class="menu-item" id="accounts-tab">Liste des comptes</a>
            <a href="#" class="menu-item" id="password-tab">Mot de passe</a>
            <a href="" class="menu-item" id="logout-tab">Déconnexion</a>
        </div>
        <div class="profile-content"></div>
    </div>
</div>

<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;

    document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.menu-item');
        const profileContent = document.querySelector('.profile-content');

        function showDetails() {
            axios.get(`http://localhost:1234/user/getUserById?id=${userId}`)
                .then(response => {
                    const utilisateur = response.data;
                    if (utilisateur) {
                        profileContent.innerHTML = `
                            <h2>Account Settings</h2>
                            <form id="profileForm">
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" id="email" value="${utilisateur.email}" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="firstName">First name</label>
                                    <input type="text" id="firstName" value="${utilisateur.prenom}" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last name</label>
                                    <input type="text" id="lastName" value="${utilisateur.nom}" readonly>
                                </div>
                            </form>
                        `;
                    } else {
                        profileContent.innerHTML = '<p>Aucun utilisateur trouvé.</p>';
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
                    profileContent.innerHTML = '<p>Erreur lors de la récupération des données.</p>';
                });
        }

        function showAccounts() {
            profileContent.innerHTML = `
                <h2>Liste des comptes</h2>
                <div id="accounts_table_container">
                    <table id="accounts_table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            `;

            axios.get('http://localhost:1234/user/getUsers')
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
                            <td id="actionColumn"><button id="deleteButton" onClick="deleteUser('${user.id}')">Supprimer</button></td>
                        `;
                        accountsTableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération de la liste des comptes:", error);
                    profileContent.innerHTML = '<p>Erreur lors de la récupération de la liste des comptes.</p>';
                });
        }

        function showPassword() {
            profileContent.innerHTML = `
                <h2>Changer le mot de passe</h2>
                <form id="passwordForm">
                    <div class="form-group">
                        <label for="oldPassword">Ancien mot de passe</label>
                        <input type="password" id="oldPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Nouveau mot de passe</label>
                        <input type="password" id="newPassword" required>
                    </div>
                    <button type="button" onclick="changePassword()">Changer le mot de passe</button>
                </form>
            `;
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', event => {
                event.preventDefault();
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                switch (tab.id) {
                    case 'details-tab':
                        showDetails();
                        break;
                    case 'accounts-tab':
                        showAccounts();
                        break;
                    case 'password-tab':
                        showPassword();
                        break;
                    case 'logout-tab':
                        window.location.href = '../back/logout.php';
                        break;
                }
            });
        });

        showDetails();
    });

    
    function deleteUser(id) {
        alert(`L'ID de l'utilisateur est : ${id}`);
    }
</script>


<style>
    body{
        background-color: black;
    }

    #profile {
        margin-top: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
    }

    .container {
        display: flex;
        margin: 0;
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
        width: 80%;
    }

    .profile-sidebar {
        width: 250px;
        min-height: 50vh;
        background-color: #444;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menu-item {
        display: block;
        padding: 10px 15px;
        color: white;
        text-decoration: none;
        font-size: 16px;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .menu-item.active, .menu-item:hover {
        background-color: #1a2735;
    }

    .profile-content {
        flex-grow: 1;
        padding: 20px;
    }

    .profile-content h2 {
        margin-top: 0;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        color: #333;
    }

    .form-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 15px;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
    
    #actionColumn {
        display: flex;
        align-items: center;
        justify-content: center;
    }
     #deleteButton {
        background-color: red;
        margin: 5px
     }
    #accounts_table {
        width: 90%;
        height: auto;
    }

    table {
        border: 1px solid black;
    }

    th, td {
        border: 1px solid black;
    }
</style>

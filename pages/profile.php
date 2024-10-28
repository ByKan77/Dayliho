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
            <a href="logout.php" class="menu-item" id="logout-tab">Déconnexion</a>
        </div>
        <div class="profile-content"></div>
    </div>
</div>

<style>
    #profile {
        margin-top: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
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
        background-color: #2d3e50;
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
</style>

<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;

    document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.menu-item');
        const profileContent = document.querySelector('.profile-content');

        function showDetails() {
            profileContent.innerHTML = `
                <h2>Account Settings</h2>
                <form id="profileForm">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" id="email" placeholder="support@profilepress.net" required>
                    </div>
                    <div class="form-group">
                        <label for="firstName">First name</label>
                        <input type="text" id="firstName" placeholder="John" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last name</label>
                        <input type="text" id="lastName" placeholder="Doe" required>
                    </div>
                    <button type="button" onclick="saveChanges()">Save Changes</button>
                </form>
            `;
        }

        function showAccounts() {
            profileContent.innerHTML = `
                <h2>Liste des comptes</h2>
                <table id="accounts_table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `;
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
                        window.location.href = 'logout.php';
                        break;
                }
            });
        });

        showDetails();
    });
</script>

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.menu-item');
    const profileContent = document.getElementById('profile-content');

    function showDetails() {
        const userId = localStorage.getItem('userId');
        axios.get(`http://localhost:1234/user/getUserById?id=${userId}`)
            .then(response => {
                const utilisateur = response.data;
                if (utilisateur) {
                    profileContent.innerHTML = `
                        <h2>Informations du compte</h2>
                        <form id="profileForm">
                            <div id="form-group-email" class="form-group">
                                <label for="email">Adresse email</label>
                                <input type="email" id="email" value="${utilisateur.email}" readonly>
                            </div>
                            <div id="form-group-firstName" class="form-group">
                                <label for="firstName">Prénom</label>
                                <input type="text" id="firstName" value="${utilisateur.prenom}" readonly>
                            </div>
                            <div id="form-group-lastName" class="form-group">
                                <label for="lastName">Nom</label>
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
            <div id="accounts-table-container">
                <table id="accounts-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Est bloqué</th>
                            <th>Bloquer / débloquer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `;

        axios.get('http://localhost:1234/user/getUsers')
            .then(response => {
                const allUsers = response.data;
                const accountsTableBody = document.getElementById('accounts-table').querySelector('tbody');
                accountsTableBody.innerHTML = '';

                allUsers.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${user.nom}</td>
                    <td>${user.prenom}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.estBloque}</td>
                    <td><button id="banButton" onclick="banUser('${user.id}', '${user.role}')">X</button></td>
                     <td><button id="deleteButton" onclick="deleteUser('${user.id}', '${user.role}')">X</button></td>
                `;         

                    accountsTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste des comptes:", error);
                profileContent.innerHTML = '<p>Erreur lors de la récupération de la liste des comptes.</p>';
            });
    }

    function banUser(id, role) {
        if(role === 'daylidmin') {
            alert("Vous ne pouvez pas bloquer un administrateur, vous devez plutôt supprimer son compte.");
            return;
        }
        
        console.log('1 - Envoie de la requête de blocage / déblocage pour l\'utilisateur avec ID:', id);
        
        axios.patch(`http://localhost:1234/user/banUser/${id}`, {
            data: { role: role } // Envoi aussi le role pour faire la vérificcation plus tard
        })    
    }

    function deleteUser(id, role) {
        axios.delete(`http://localhost:1234/user/deleteUser/${id}`, {
            data: { role: role } // Envoi aussi le role pour faire la vérificcation plus tard
        })
        .then(response => {
            alert('Utilisateur supprimé avec succès');
            console.log(id,role);
            showAccounts(); // Actualise la liste des comptes
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            alert('Une erreur est survenue lors de la suppression');
        });
    }

    // Rendre les fonctions accessibles globalement pour les boutons onclick
    window.banUser = banUser;
    window.deleteUser = deleteUser;

    function showUpdatePasswordForm() {
        profileContent.innerHTML = `
            <h2>Modifier votre mot de passe</h2>
            <form id="update-password-form">
                <label for="oldPassword">Ancien mot de passe:</label>
                <input type="password" id="oldPassword" name="oldPassword" required>
                <label for="newPassword">Nouveau mot de passe:</label>
                <input type="password" id="newPassword" name="newPassword" required>
                <button type="submit">Mettre à jour</button>
            </form>
        `;

        document.getElementById('update-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const userId = localStorage.getItem('userId');

            axios.put('http://localhost:1234/user/updatePassword', { userId, oldPassword, newPassword })
                .then(response => {
                    alert(response.data.message);
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour du mot de passe:', error);
                    alert('Une erreur est survenue lors de la mise à jour du mot de passe.');
                });
        });
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
                    if (localStorage.getItem('role') === 'daylidmin') {
                        showAccounts();
                    } else {
                        alert("Vous n'êtes pas autorisé à accéder à cette section.");
                        tab.classList.remove('active');
                    }
                    break;
                case 'update-password-tab':
                    showUpdatePasswordForm();
                    break;
                default:
                    showDetails();
            }
        });
    });

    showDetails();
});




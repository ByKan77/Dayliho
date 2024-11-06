// const userId = <?php echo json_encode($_SESSION['user_id']); ?>;
const userId = 1; // TEST
const tabs = document.querySelectorAll('.menu-item');
const profileContent = document.getElementById('profile-content');

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
            const accountsTableBody = document.getElementById('accounts-table').querySelector('tbody');
            accountsTableBody.innerHTML = '';

            allUsers.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.nom}</td>
                    <td>${user.prenom}</td>
                    <td>${user.email}</td>
                     <td>${user.role}</td>
                    <td><button id="deleteButton" onclick="deleteUser('${user.id}')">Supprimer</button></td>
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
        <h1 style="color:red;">NON FONCTIONNEL</h1>
        <form id="passwordForm">
            <div id="form-group-oldPassword" class="form-group">
                <label for="oldPassword">Ancien mot de passe</label>
                <input type="password" id="oldPassword" required>
            </div>
            <div id="form-group-newPassword" class="form-group">
                <label for="newPassword">Nouveau mot de passe</label>
                <input type="password" id="newPassword" required>
            </div>
            <button type="button">Changer le mot de passe</button>
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
            default:
                showDetails();
        }
    });
});

showDetails();


function deleteUser(id) {
    alert(`L'ID de l'utilisateur est : ${id}`);
}

function showDetails() {
    axios.get(`http://localhost:1234/user/getUserById?id=${userId}`)
        .then(response => {
            const utilisateur = response.data;
            if (utilisateur) {
                profileContent.innerHTML = `
                        <h2>Account Settings</h2>
                        <form id="profileForm">
                            <div id="form-group-email" class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" id="email" value="${utilisateur.email}" readonly>
                            </div>
                            <div id="form-group-firstName" class="form-group">
                                <label for="firstName">First name</label>
                                <input type="text" id="firstName" value="${utilisateur.prenom}" readonly>
                            </div>
                            <div id="form-group-lastName" class="form-group">
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
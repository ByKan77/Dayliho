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

function deleteUser(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
        axios.delete(`http://localhost:1234/user/delete?id=${id}`)
            .then(response => {
                alert("Compte supprimé avec succès.");
                // Recharge la liste des utilisateurs
                location.reload();
            })
            .catch(error => {
                console.error("Erreur lors de la suppression du compte :", error);
                alert("Une erreur s'est produite lors de la suppression du compte.");
            });
    }
}


function showPassword() {
    profileContent.innerHTML = `
        <h2>Account Settings</h2>
        <form id="passwordForm">
            <div class="form-group">
                <label for="oldPassword">Ancien mot de passe</label>
                <input type="password" id="oldPassword" required>
            </div>
            <div class="form-group">
                <label for="newPassword">Nouveau mot de passe</label>
                <input type="password" id="newPassword" required>
            </div>
            <button type="submit">Changer le mot de passe</button>
        </form>
    `;

    const passwordForm = document.getElementById("passwordForm");
    passwordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;

        try {
            const response = await axios.put("http://localhost:1234/user/changePassword", {
                oldPassword,
                newPassword,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Inclut le token d'authentification
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Erreur serveur.");
        }
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




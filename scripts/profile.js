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

    axios.get('http://10.74.2.10:1234/user/getUsers')
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
                <td><button id="deleteButton" onclick="deleteUser('${user.id}', '${user.role}')">Supprimer</button></td>
            `;         

                accountsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération de la liste des comptes:", error);
            profileContent.innerHTML = '<p>Erreur lors de la récupération de la liste des comptes.</p>';
        });
}

function deleteUser(id, role) {
    axios.delete(`http://10.74.2.10:1234/user/deleteUser/${id}`, {
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
            default:
                showDetails();
        }
    });
});

showDetails();




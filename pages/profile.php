<script>
    localStorage.removeItem('redirected')
</script>
<?php
    require '../back/header.php';
    require '../requires/nav.php';
?>
<div id="profile-body">
    <div id="profile-container">
        <div id="profile-sidebar">
            <a href="#" id="details-tab" class="menu-item active">Détails</a>
            <a href="#" id="accounts-tab" class="menu-item">Liste des comptes</a>
            <a href="#" id="password-tab" class="menu-item">Mot de passe</a>
        </div>
        <div id="profile-content"></div>
    </div>
</div>

<script src="../scripts/profile.js" defer></script>
<script>
    const userId = localStorage.getItem('userId');
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
</script>


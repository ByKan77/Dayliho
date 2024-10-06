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
    <a href="../back/logout.php" class="bouton_nav">Déconnexion</a>
</div>
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
            } else {
                document.getElementById('user_info').innerHTML = '<p>Aucun utilisateur trouvé.</p>';
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
            document.getElementById('user_info').innerHTML = '<p>Erreur lors de la récupération des données.</p>';
        });
</script>

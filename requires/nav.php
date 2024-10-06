<!-- Navbar -->
<div id="nav_bar">
    <a href="../pages/index.php" class="bouton_nav">
    <i class="fa-solid fa-house"></i>Accueil</a>

    <a href="../pages/videos.php" class="bouton_nav">
    <i class="fa-solid fa-video"></i>Vidéos</a>
    
    <?php 
        // Si l'utilisateur est connecté, afficher le bouton Déconnexion
        if (isset($_SESSION['user_id'])) {
            echo '<a href="../pages/profile.php" class="bouton_nav">
                  <i class="fa-solid fa-user"></i>Profile</a>';
        } else {
            // Si l'utilisateur n'est pas connecté, afficher le bouton Connexion
            echo '<a href="../pages/login.php" class="bouton_nav">
                  <i class="fa-solid fa-user"></i>Connexion</a>';
        }
    ?>
</div>

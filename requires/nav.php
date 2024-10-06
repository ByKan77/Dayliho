<!-- Navbar -->
<div id="nav_bar">
    <a href="../pages/index.php" class="bouton_nav">
    <i class="fa-solid fa-house"></i>Accueil</a>
    <a href="../pages/videos.php" class="bouton_nav">
    <i class="fa-solid fa-video"></i>Vidéos</a>
    
    <?php 
        if (isset($_SESSION['user_id'])) {
            echo '  <a href="../back/logout.php" class="bouton_nav">
                    <i class="fa-solid fa-user"></i>Déconnexion</a>';
        } else {
            echo '  <a href="../pages/login.php" class="bouton_nav"> 
                    <i class="fa-solid fa-user"></i>Connexion</a>';
        }
    ?>
   
    
</div>
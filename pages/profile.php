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
            <a href="#" id="update-password-tab" class="menu-item">Changer le mot de passe</a>
            <!-- <a href="#" id="password-tab" class="menu-item">Mot de passe</a> -->
        </div>
        <div id="profile-content"></div>
    </div>
</div>

<script src="../scripts/profile.js" defer></script>
<script>
    const userId = localStorage.getItem('userId');
</script>


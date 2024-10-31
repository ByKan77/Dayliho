<?php
    require '../back/header.php';
    require '../requires/nav.php';
?>

<div id="login-body">
    <div id="connexion">
        <h1>Connexion</h1>
        <form id="formulaire_de_connexion">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="mot_de_passe">Mot de passe :</label>
            <input type="password" id="mot_de_passe" name="mot_de_passe" required>
            <br>
            <button type="submit" class="btn">Se connecter</button>
        </form>
    </div>
</div>

<script src="../scripts/login.js" defer></script>

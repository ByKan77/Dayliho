<?php
    require '../back/header.php';
    require '../requires/nav.php';
?>

<div id="changePassword-body" style="margin-top: 10vh;">
    <div id="changementMotDePasse">
        <h1>Connexion</h1>
        <form id="formulaire_de_changement_de_mot_de_passe">
            <label for="mot_de_passe_actuel">Mot de passe actuel :</label>
            <input type="password" id="mot_de_passe_actuel" name="mot_de_passe_actuel" required>
            <br>
            <label for="nouveau_mot_de_passe">Nouveau mot de passe :</label>
            <input type="password" id="nouveau_mot_de_passe" name="nouveau_mot_de_passe" required>
            <br>
            <label for="confirmation_nouveau_mot_de_passe">Confirmation du nouveau mot de passe :</label>
            <input type="password" id="confirmation_nouveau_mot_de_passe" name="confirmation_nouveau_mot_de_passe" required>
            <br>
            <button type="submit" class="btn">Valider</button>
        </form>
    </div>
</div>

<script src="../scripts/changePassword.js" defer></script>

<?php
require '../back/header.php';

// Vérifie si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère l'email et le mot de passe
    $email = $_POST['email'];
    $mot_de_passe = $_POST['mot_de_passe'];

    // Prépare et exécute la requête pour récupérer l'utilisateur
    $stmt = $pdo->prepare("SELECT id, nom, prenom, role, mot_de_passe FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if ($user && password_verify($mot_de_passe, $user['mot_de_passe'])) {
        // Stocke les informations de l'utilisateur dans la session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['nom'];
        $_SESSION['user_role'] = $user['role'];
        
        header('Location: ...');
        
        exit();
    } else {
        // Message d'erreur si l'authentification échoue
        $error_message = "Email ou mot de passe incorrect.";
    }   
}
?>
<title>Connexion</title>
<style>

    #formulaire_connexion {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #connexion {
        width: 40vw;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #connexion h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    #connexion div {
        margin-bottom: 15px;
    }

    #connexion label {
        display: block;
        margin-bottom: 5px;
    }

    #connexion input{
        width: 20vw;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    #connexion .btn {
        width: 20vw;
        padding: 10px;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    #connexion .btn:hover {
        background-color: #0056b3;
    }

    .alert {
        color: red;
        text-align: center;
    }
</style>
<div id="connexion">
    <h1>Connexion</h1>
    <form id="formulaire_connexion" method="POST">
        <div>
            <label for="email">Email :</label>
            <input type="email" name="email" id="email" class="form-control" required>
        </div>
        <div>
            <label for="mot_de_passe">Mot de passe :</label>
            <input type="password" name="mot_de_passe" id="mot_de_passe" class="form-control" required>
        </div>
        <br>
        <input type="submit" value="Se connecter" class="btn">
    </form>
</div>
<div style="display:flex;justify-content:center;align-item:center; margin:20px;">
    <a href="index.php" style="color:red;">CONNEXION DIRECTE</a>
</div>

</body>
</html>

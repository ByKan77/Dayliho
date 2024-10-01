<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dayliho</title>
    <link rel="stylesheet" href="style/style.css">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</head>
<body>
    <main>
        <div id="nav">
            <div id="recherche">
                <input type="text" class="champs_recherche" placeholder=" Type de sport">
                <button id="btn_rechercher"><ion-icon name="search-outline"></ion-icon></button>
            </div>
            <div class="nav-right">
                <span class="onglet_nav">Nous contacter</span>
                <span class="onglet_nav">Partenaires</span>
                <span class="onglet_nav">Informations</span>
                <a href="account.html"><button id="btn_mon_compte">Mon compte</button></a>
            </div>
        </div>
        <div id="image_accueil">
            <img src="./addons/image_index.jpg" alt="">
        </div>
        <div id="cartes_infos">
            <div class="carte">
                <img src="./addons/vacances.jpg" alt="">
                <h2>Slogan carte 1</h2>
            </div>
            <div class="carte">
                <img src="./addons/ia.jpg" alt="">
                <h2>Slogan carte 2</h2>
            </div>
            <div class="carte">
                <img src="./addons/itinéraire.jpg" alt="">
                <h2>Slogan carte 3</h2>
            </div>
        </div>
    </main>
</body>
</html>
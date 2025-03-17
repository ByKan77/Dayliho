let test = document.getElementById("nav_bar");

const navbarUser = async () => {
    try {
        const response = await axios.get('http://localhost:1234/user/navbar', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });

        console.log(response);

        if (response.status === 200) {
            test.innerHTML += `
                <a href="../pages/profile.php" class="bouton_nav">
                    <i class="lev fa-solid fa-user"></i>Profil
                </a>
                 <a href="../pages/videos.php" class="bouton_nav">
                    <i class="lev fa-solid fa-dumbbell"></i>Séances
                </a>
                <a href="../pages/login.php" class="bouton_nav" onclick="localStorage.removeItem('token');localStorage.removeItem('userId');">
                    <i class="lev fa-solid fa-right-from-bracket"></i>Deconnexion
                </a>`;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des informations de la barre de navigation :", error);
        test.innerHTML += `     <a href="../pages/login.php" class="bouton_nav">
                                <i class="lev fa-solid fa-right-to-bracket"></i>Connexion</a>`;
        // Redirection en cas de 401, uniquement si l'utilisateur n'a pas encore été redirigé
        if (error.response && error.response.status === 401 && !localStorage.getItem('redirected')) {
            localStorage.setItem('redirected', 'true');  // Marque l'utilisateur comme redirigé
            alert("Session expirée ou accès non autorisé. Veuillez vous reconnecter.");
            window.location.href = "../pages/login.php";  // Redirection vers la page de connexion
        }
    }
};

// Appel de la fonction navbarUser pour initialiser la barre de navigation
navbarUser();
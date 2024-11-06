let test = document.getElementById("nav_bar");

navbarUser = async () => {
    try {
        const response = await axios.get('http://localhost:1234/user/navbar', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            test.innerHTML += `    
               <a href="../pages/profile.php" class="bouton_nav">
               <i class="lev fa-solid fa-user"></i>Profile</a>    
               <a href="../pages/videos.php" class="bouton_nav">
               <i class="lev fa-solid fa-video"></i>Séances</a>
               <a href="../pages/login.php" class="bouton_nav" onclick="localStorage.removeItem('token');">
               <i class="lev fa-solid fa-user"></i>Deconnexion</a>`;
        }
    } catch (error) {
        // Gérer les erreurs ici
        console.error('Erreur lors de la récupération de la barre de navigation:', error);
        test.innerHTML += `<a href="../pages/login.php" class="bouton_nav">
                               <i class="lev fa-solid fa-user"></i>Connexion</a>`;
    }
}

navbarUser();

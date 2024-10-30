document.getElementById('formulaire_de_connexion').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const formEmail = document.getElementById('email').value;
    const formPassword = document.getElementById('mot_de_passe').value;

    // Envoi des informations de connexion à l'API pour vérification
    fetch('http://localhost:1234/user/checkUser', { // Route API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formEmail,
            mot_de_passe: formPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Connexion réussie, on envoie les données à PHP pour gérer la session
            fetch('../back/login_handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formEmail,
                    user_id: data.user_id // Récupère l'ID utilisateur
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirection vers la page protégée
                    window.location.href = 'index.php';
                } else {
                    alert('Erreur de session : ' + data.message);
                }
            });
        } else {
            // Erreur de connexion
            alert('Email ou mot de passe incorrect.');
        }
    })
    .catch(error => console.error('Erreur lors de la connexion:', error));
});
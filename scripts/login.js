document.getElementById('formulaire_de_connexion').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const formEmail = document.getElementById('email').value;
    const formPassword = document.getElementById('mot_de_passe').value;

    const authentification = async () => {
        try {
            const response = await axios.post('http://localhost:1234/user/checkUser', {
                email: formEmail,
                mot_de_passe: formPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            localStorage.setItem('token', response.data.token);
            if(response.status === 201) {
                window.location.href = "../pages/index.php";
            }
        } catch (error) {
            console.error("Erreur dans l'authentification :", error);
        }
    };

    await authentification();
});
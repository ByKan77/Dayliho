document.getElementById('formulaire_de_connexion').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const formEmail = document.getElementById('email').value;
    const formPassword = document.getElementById('mot_de_passe').value;

    const authentification = async () => {
        try {
            const response = await axios.post('http://10.74.2.10:1234/user/checkUser', {
                email: formEmail,
                mot_de_passe: formPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            
            const data = response.data; 
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);

            localStorage.setItem('userId', response.data.userId);
            console.log(response.data.userId); 

            localStorage.setItem('role', response.data.role);

            if(response.status === 201) {
                window.location.href = "../pages/index.php";
            }
        } catch (error) {
            console.error("Erreur dans l'authentification :", error);
        }
    };

    await authentification();
});
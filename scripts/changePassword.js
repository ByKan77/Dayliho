document.getElementById('formulaire_de_changement_de_mot_de_passe').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const oldPassword = document.getElementById('mot_de_passe_actuel').value;
    const newPassword = document.getElementById('nouveau_mot_de_passe').value;
    const confirmNewPassword = document.getElementById('confirmation_nouveau_mot_de_passe').value;

    // Envoi des informations de connexion à l'API pour vérification
    fetch('http://localhost:1234/user/changePassword', { // Route API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ancienMdp: oldPassword,
            nouveauMdp: newPassword,
            confirmNouveauMdp: confirmNewPassword
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'index.php'; // Redirection si le changement est réussi
            } else {
                alert('Erreur lors du changement du mot de passe : ' + data.message);
            }
        })
        .catch(error => console.error('Erreur lors du changement du mot de passe:', error));
});

<!-- Footer / formulaire de contact -->
<div class="section" id="section_3">
    <div id="contact_form">
        <h2>Contactez-nous</h2>
        <!-- Formulaire avec l'action de Formspree -->
        <form action="https://formspree.io/f/xrbpavpe" method="post">
            <div class="form-group">
                <label for="name">Nom:</label>
                <input type="text" id="name" name="name" placeholder="Ex: Dupont" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Ex: dupont@test.fr" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" placeholder="Tapez votre message ici..." required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Envoyer</button>
            </div>
        </form>
    </div>
</div>

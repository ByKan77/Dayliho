<?php
session_start();

// Récupérer les données POST envoyées par JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$user_id = $data['user_id']; // ID utilisateur renvoyé par l'API

// Démarrer la session PHP avec l'ID utilisateur
if ($user_id) {
    $_SESSION['user_id'] = $user_id;
    $_SESSION['email'] = $email;

    // Répondre avec un succès
    echo json_encode(['success' => true]);
} else {
    // Répondre avec une erreur si l'utilisateur n'existe pas
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la création de la session.']);
}

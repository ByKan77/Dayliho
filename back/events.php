<?php
// Configuration de la base de données
$host = 'localhost';
$db = 'dayliho';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Établir la connexion à la base de données
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Récupérer les séances de sport avec le sport lié
    $stmt = $pdo->query("SELECT seance.* 
                         FROM seance");
    $seances = $stmt->fetchAll();

    // Convertir les séances en format JSON
    $tasks = array();
    foreach ($seances as $seance) {
        $dateDebut = new DateTime($seance['dateDebut']); // Assurez-vous que 'dateDebut' est au format DATETIME
        $dateFin = new DateTime($seance['dateFin']); // Assurez-vous que 'dateFin' est au format DATETIME
        $tasks[] = array(
            'id' => $seance['id'],
            'title' => $seance['titre'], // Changez 'titre' en 'title' pour FullCalendar
            'start' => $dateDebut->format('Y-m-d H:i:s'), // Formaté pour FullCalendar
            'end' => $dateFin->format('Y-m-d H:i:s'), // Formaté pour FullCalendar
            'sport' => $seance['sport_nom'], // Ajout du nom du sport
            'lieu' => $seance['lieu'], // Ajout du nom du sport
            'description' => $seance['description'], // Ajout du nom du sport
        );
    }

    header('Content-Type: application/json');
    echo json_encode($tasks);
} catch (Exception $e) {
    // Gérer les erreurs lors de la récupération des séances
    http_response_code(500); // Code d'erreur interne
    echo json_encode(['error' => $e->getMessage()]);
}
?>

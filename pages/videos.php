<?php
    require '../back/header.php';
    require '../requires/nav.php';

    // Assuming $pdo is already defined and connected to the database
    $query = "SELECT * FROM video";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="video-grid">
    <?php foreach ($videos as $video): ?>
    <div class="video-card">
        <img src="../addons/coach_1.jpeg" alt="Thumbnail" class="video-thumbnail">
        <div class="video-info">
            <p class="titre_video"><?php echo htmlspecialchars($video['titre']); ?></p>
            <p class="description_video"><?php echo htmlspecialchars($video['description']); ?></p>
            <p class="createur_video">Par : <?php echo htmlspecialchars($video['auteur']); ?></p>
        </div>
    </div>
    <?php endforeach; ?>
</div>
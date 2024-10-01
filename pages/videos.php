<?php
    require '../Back/header.php';

    // Assuming $pdo is already defined and connected to the database
    $query = "SELECT * FROM video";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($videos as $video): ?>
        <tr>
            <td><?php echo htmlspecialchars($video['id']); ?></td>
            <td><?php echo htmlspecialchars($video['titre']); ?></td>
            <td><?php echo htmlspecialchars($video['description']); ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>
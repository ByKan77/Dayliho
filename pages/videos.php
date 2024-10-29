<?php
   session_start();

   // Redirect to login if the user is not authenticated
   if (!isset($_SESSION['user_id'])) {
       header('Location: login.php');
       exit();
   }
   
    require '../back/header.php';
    require '../requires/nav.php';
?>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'); /* Font Awesome for search icon */

body {
    background-color: #000;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
}

.container {
    padding-top: 90px;
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
}

#listeVideos {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 fixed columns */
    gap: 30px;
    justify-items: center;
    padding: 0 20px;
}

.video-container {
    display: flex;
    align-items: flex-start;
    background-color: #060e31;
    padding: 25px;
    border-radius: 10px;
    box-sizing: border-box;
    width: 100%; 
    max-width: 500px; /* Width */
    height: 220px; /* Fixed height */
    overflow: hidden;
    transition: transform 0.3s ease;
    position: relative;
}

.video-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.3s ease;
    border-radius: 10px; 
    z-index: 1;
}

.video-container:hover::before {
    background-color: rgba(255, 255, 255, 0.2);
}

.video-container:hover {
    transform: scale(1.05);
    z-index: 2;
}

@media (max-width: 1024px) {
    #listeVideos {
        grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
    }
}

@media (max-width: 768px) {
    #listeVideos {
        grid-template-columns: 1fr; /* 1 column for mobile */
    }
}

.blanc-block {
    background-color: #fff;
    width: 180px;
    min-width: 180px;
    height: 180px;
    border-radius: 10px;
    margin-right: 25px;
    flex-shrink: 0;
}

.video-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 2;
    height: 100%; /* Fixed height to match .video-container */
    overflow: hidden;
}

.titre-video, .description-video, .auteur-video {
    background-color: black;
    padding: 10px;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.titre-video h3 {
    font-size: 1.5rem;
    margin: 0;
}

.description-video {
    font-size: 1rem;
}

.auteur-video {
    font-size: 0.9rem;
}

/* Search Bar Styling */
.wrapper, html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #262626;
}

.search-area {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center;     /* Center vertically */
    padding: 20px;
    width: 100%;             /* Full width */
}

.single-search {
    display: flex;
    align-items: center;
    border-radius: 30px;
    background-color: white;
    padding: 10px;
    transition: width 0.4s linear;
    width: 40px;
    overflow: hidden;
}

.custom-input {
    border: none;
    outline: none;
    width: 0;
    transition: width 0.4s linear;
    font-size: 18px;
}

.custom-input::placeholder {
    color: #262626;
}

.single-search:hover {
    width: 400px;
}

.single-search:hover .custom-input {
    width: 350px;
    padding-left: 10px;
}

a {
    text-decoration: none; /* Enlève le soulignement */
    }

.icon-area {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #262626;
}

.fa-search {
    font-size: 20px;
}

</style>

<div class="container">
   <div class="search-area">
       <div class="single-search">
           <input type="text" id="searchBar" class="custom-input" placeholder="Quel sport recherches tu ?">
           <a href="#" class="icon-area">
               <i class="fa fa-search"></i>
           </a>
       </div>
   </div>
</div>

<div class="container">
    <div id="listeVideos">
        <!-- Videos will display here inside a "video-container" div -->
    </div>
</div>

<script>
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;
    console.log(userId);
    const listeVideos = document.getElementById("listeVideos");
    const searchBar = document.getElementById("searchBar");
    let videos = [];

    // Fetch videos from the server
    axios.get("http://localhost:1234/video/getVideos")
        .then(response => {
            videos = response.data;
            afficherVideos(videos); // Show all videos on load
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });

    // Function to display videos in the list
    function afficherVideos(videos) {
        listeVideos.innerHTML = ''; // Clear current list

        videos.forEach(video => {
            // Create video container
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');

            // White block (left side)
            const blancBlock = document.createElement('div');
            blancBlock.classList.add('blanc-block');

            // Video content (title, description, author)
            const videoContent = document.createElement('div');
            videoContent.classList.add('video-content');

            // Video title
            const titreVideo = document.createElement('div');
            titreVideo.classList.add('titre-video');
            const h3 = document.createElement('h3');
            h3.textContent = `${video.titre}`;
            titreVideo.appendChild(h3);

            // Video description
            const descriptionVideo = document.createElement('div');
            descriptionVideo.classList.add('description-video');
            descriptionVideo.textContent = `${video.description}`;

            // Video author
            const auteurVideo = document.createElement('div');
            auteurVideo.classList.add('auteur-video');
            auteurVideo.textContent = `Auteur: ${video.auteur}`;

            videoContent.appendChild(titreVideo);
            videoContent.appendChild(descriptionVideo);
            videoContent.appendChild(auteurVideo);

            // Add the white block and video content to the video container
            videoContainer.appendChild(blancBlock);
            videoContainer.appendChild(videoContent);

            // Add each video to the list
            listeVideos.appendChild(videoContainer);
        });
    }

    // Search bar event listener
    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase();
        const filteredVideos = videos.filter(video => video.titre.toLowerCase().includes(searchQuery));
        afficherVideos(filteredVideos); // Show only filtered videos
    });
</script>

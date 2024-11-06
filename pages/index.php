<script>
    let index = document.getElementById("index");
    if(axios.get("http://localhost:1234/user/verifUser")===True){
        index.innerHTML= `
            <?php
                require_once '../back/header.php';
                require '../requires/nav.php';
                require '../requires/index_section_1.php';
                require '../requires/index_section_2.php';
                require '../requires/index_section_3.php';
                require '../requires/index_footer.php';
            ?>
        `
    }
</script>

<div id="index"></div>

<script src="../scripts/index.js" defer></script><script src="../scripts/login.js" defer></script>

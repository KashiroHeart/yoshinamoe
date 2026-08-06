<?php 

function ogp(string $title, string $description){
    $url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    ?>

        <meta property="og:title" content="<?= $title ?>">
        <meta property="og:description" content="<?= $description ?>">
        <meta property="og:url" content="<?= $url ?>">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="ツール置き場">
        <meta name="author" content="Yoka">

    <?php 
    return;
}

function header_text(){
    ?>

        <h1><a href="/" target="_self" title="トップへ">ツール置き場</a></h1>

    <?php 
}

function footer_text() {
    ?>
        
        <p>2025 Yoka / <a href="https://x.com/xx7_44" target="_blank">@xx7_44</a></p>

    <?php 
}
<?php
/*
 * 旧デザイン版（legacy）専用のスニペット。
 * 現行版の /snippets.php とは独立しており、legacy 配下のページからのみ読み込まれる。
 * 万一同一リクエストで現行版と同時に読み込まれても致命的エラーにならないよう
 * function_exists() で保護している。
 */

if (!function_exists('ogp')) {
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
}

if (!function_exists('header_text')) {
    function header_text(){
        ?>

        <h1><a href="/legacy/" target="_self" title="トップへ">ツール置き場</a></h1>

        <?php
    }
}

if (!function_exists('footer_text')) {
    function footer_text() {
        ?>

        <p>2025 Yoka / <a href="https://x.com/xx7_44" target="_blank">@xx7_44</a></p>

        <?php
    }
}

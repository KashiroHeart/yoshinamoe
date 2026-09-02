<?php
require_once(__DIR__ . "/snippets.php");
?>
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <!-- OGP -->
    <?php ogp(
        "404 Not Found",
        "お探しのページは見つかりませんでした。"
    ); ?>
    <!-- タイトルタグ -->
    <title>404 Not Found</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
</head>

<body>
    <header class="site-header">
        <?php header_text(null, false) ?>
    </header>
    <main class="notfound">
        <div class="notfound__code">404</div>
        <p class="notfound__message">お探しのページは見つかりませんでした。</p>
        <p class="notfound__back"><a href="/">トップページへ戻る</a></p>
    </main>
    <footer class="site-footer">
        <?php footer_text() ?>
    </footer>
</body>

</html>
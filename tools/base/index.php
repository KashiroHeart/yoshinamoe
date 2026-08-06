<?php
require_once(__DIR__ . "/../../snippets.php");
?>
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow">
    <!-- OGP -->
    <?php ogp(
        "基数変換機",
        "比較的柔軟な基数変換を行います。"
    ); ?>
    <!-- タイトルタグ -->
    <title>基数変換機</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
</head>

<body>
    <header>
      <?php header_text() ?>
    </header>
    <main class="frame-wrapper">
        <iframe src="./frame.html"></iframe>
    </main>
    <footer>
      <?php footer_text() ?>
    </footer>
</body>

</html>
<?php
require_once(__DIR__ . "/prisoner_tools.php");
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
    <link rel="stylesheet" href="/assets/yoshina.lib.css" />
    <script src="/assets/yoshina.lib.js"></script>
    <!-- その他 JS/CSS 読み込み -->
</head>

<body>
    <header>
        <?php header_text() ?>
    </header>
    <main>
        <section>
            <h2>[404 Not Found]</h2>
            <p>お探しのページは見つかりませんでした。</p>
        </section>
    </main>
    <footer>
        <?php footer_text() ?>
    </footer>
</body>

</html>
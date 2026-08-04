<?php 

$protocol = $_SERVER['SERVER_PROTOCOL'];
if( in_array( $protocol, array( 'HTTP/1.1', 'HTTP/2', 'HTTP/2.0' ) ) === false ) {
	$protocol = 'HTTP/1.0';
}

header( "$protocol 447 You are jailed" );

require_once(__DIR__ . "/../prisoner_tools.php");
?>
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <!-- OGP -->
    <?php ogp(
        "447 You are jailed",
        ""
    ); ?>
    <!-- タイトルタグ -->
    <title>447 You are jailed</title>
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
            <h2>[447 You are jailed]</h2>
            <p>
                あなたは何らかの罪で投獄されました。<br />
                抗議の御用は&nbsp;<a href="https://x.com/xx7_44">@xx7_44</a>&nbsp;までお越しください。
            </p>
        </section>
    </main>
    <footer>
        <?php footer_text() ?>
    </footer>
</body>

</html>
<?php
require_once(__DIR__ . "/snippets.php");
?>
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow">
    <!-- OGP -->
    <?php ogp(
        "ツール置き場（旧版）",
        "自作ツール置き場（旧デザイン版）です。"
    ); ?>
    <!-- タイトルタグ -->
    <title>トップページ（旧版）</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/legacy/src/lib.css" />
    <script src="/legacy/src/lib.js"></script>
    <!-- その他 JS/CSS 読み込み -->
</head>

<body>
    <header>
        <?php header_text() ?>
    </header>
    <main>
        <section>
            <article>
                <ul class="whole-width-list">
                    <li>
                        <a href="/legacy/tools/base/" target="_blank">
                            基数変換機
                            <br />
                            <small>任意の基数間での変換、数列の置換等を実装した多機能基数変換機です。</small>
                        </a>
                    </li>
                    <li>
                        <a href="/legacy/tools/codetable/" target="_blank">
                            文字対応表
                            <br />
                            <small>暗号等に使用可能な変換表です。</small>
                        </a>
                    </li>
                    <li>
                        <a href="/legacy/tools/polybius/" target="_blank">
                            ポリュビオス暗号ツール
                            <br />
                            <small>ポリュビオス暗号の作成/解読を行うことができます。</small>
                        </a>
                    </li>
                    <li>
                        <a href="/legacy/tools/tenji/" target="_blank">
                            点字変換
                            <br />
                            <small>かな・漢字と6点/8点点字を相互に変換します。</small>
                        </a>
                    </li>
                </ul>
            </article>
        </section>
    </main>
    <footer>
        <?php footer_text() ?>
    </footer>
</body>

</html>

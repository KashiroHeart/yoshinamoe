<?php
require_once(__DIR__ . "/prisoner_tools.php");
?>
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- OGP -->
    <?php ogp(
        "ツール置き場",
        "自作ツール置き場です。"
    ); ?>
    <!-- タイトルタグ -->
    <title>トップページ</title>
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
            <article>
                <ul class="whole-width-list">
                    <li>
                        <a href="/legacy/base/" target="_blank">
                            基数変換機
                            <br />
                            <small>任意の基数間での変換、数列の置換等を実装した多機能基数変換機です。</small>
                        </a>
                    </li>
                    <li>
                        <a href="/legacy/codetable/" target="_blank">
                            文字対応表
                            <br />
                            <small>暗号等に使用可能な変換表です。</small>
                        </a>
                    </li>
                    <li>
                        <a href="/legacy/polybius-old/" target="_blank">
                            ポリュビオス暗号ツール
                            <br />
                            <small>ポリュビオス暗号の作成/解読を行うことができます。</small>
                        </a>
                    </li>
                </ul>
            </article>
        </section>
        <section>
            <h2>関連サイト</h2>
            <article>
                <ul class="whole-width-list">
                    <li>
                        <a href="https://artworks.yoshina.moe/" target="_blank">
                            監獄日記
                            <br />
                            <small>ウチの看板娘の資料です。将来このサイトにも登場します。</small>
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
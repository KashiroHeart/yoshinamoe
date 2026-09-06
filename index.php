<?php
require_once(__DIR__ . "/snippets.php");
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
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
</head>

<body>
    <header class="site-header">
        <?php header_text() ?>
    </header>
    <main class="page-pad">
        <section>
            <div class="subhead" style="margin-bottom: 11px;">TOOLS</div>
            <article>
                <ul class="whole-width-list">
                    <li>
                        <a href="/tools/base/" target="_blank">
                            <span class="tool-mark" style="background: var(--p1);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">基数変換機</span>
                                <small>任意の基数間での変換、数列の置換等を実装した多機能基数変換機です。</small>
                            </span>
                            <span class="tool-slug">BASE</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tools/codetable/" target="_blank">
                            <span class="tool-mark" style="background: var(--p2);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">文字対応表</span>
                                <small>暗号等に使用可能な変換表です。</small>
                            </span>
                            <span class="tool-slug">CODETABLE</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tools/polybius/" target="_blank">
                            <span class="tool-mark" style="background: var(--p3);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">ポリュビオス暗号ツール</span>
                                <small>ポリュビオス暗号の作成 / 解読を行うことができます。</small>
                            </span>
                            <span class="tool-slug">POLYBIUS</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tools/tenji/" target="_blank">
                            <span class="tool-mark" style="background: var(--p1);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">点字変換</span>
                                <small>かな・漢字と 6 点／8 点点字を相互に変換します。</small>
                            </span>
                            <span class="tool-slug">TENJI</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tools/multicrypt/" target="_blank">
                            <span class="tool-mark" style="background: var(--p2);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">複合暗号変換機</span>
                                <small>複数の変換をドラッグ &amp; ドロップで並べ、段階的に変換します。</small>
                            </span>
                            <span class="tool-slug">MULTICRYPT</span>
                        </a>
                    </li>
                </ul>
                <div class="subhead" style="margin: 26px 0 11px;">LEGACY</div>
                <ul class="whole-width-list">
                    <li>
                        <a href="/legacy/" target="_blank">
                            <span class="tool-mark" style="background: var(--p3);"></span>
                            <span style="flex: 1 1 auto; min-width: 0;">
                                <span class="tool-name">旧デザイン版</span>
                                <small>改修前のデザインのツール一式です。</small>
                            </span>
                            <span class="tool-slug">LEGACY</span>
                        </a>
                    </li>
                </ul>
            </article>
        </section>
    </main>
    <footer class="site-footer">
        <?php footer_text() ?>
    </footer>
</body>

</html>
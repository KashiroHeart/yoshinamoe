<?php
require_once(__DIR__ . "/../../snippets.php");
?>
<!doctype html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow">
    <!-- OGP -->
    <?php ogp(
        "複合暗号変換機",
        "複数の変換を並べて、段階的に変換します。"
    ); ?>
    <!-- タイトルタグ -->
    <title>複合暗号変換機</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
    <script src="/src/encoding.js"></script>
    <link rel="stylesheet" href="./multicrypt.css" />
    <script src="./src/main.js" type="module"></script>
</head>

<body>
    <header class="site-header">
        <?php header_text("複合暗号変換機") ?>
    </header>

    <noscript>
        <p class="page-pad">JavaScript が無効になっているため、このツールは利用できません。</p>
    </noscript>

    <main class="mc-main" id="mc_main">
        <div class="tool-col">
            <div class="tool-field">
                <span class="label label--p1">入力</span>
                <span class="count"><span id="mc_input_len">0</span> 文字</span>
            </div>
            <textarea id="mc_input" class="tool-io" placeholder="変換したい文字列を入力してください。"></textarea>

            <div class="tool-field">
                <span class="label label--p2">出力</span>
                <button type="button" id="mc_copy" class="link-btn">コピー</button>
            </div>
            <textarea id="mc_output" class="tool-io tool-io--out" placeholder="ここに変換結果が表示されます。" readonly></textarea>

            <div id="mc_steps_area" class="mc-steps-area" hidden>
                <div class="subhead">変換プロセス</div>
                <div id="mc_steps" class="mc-steps"></div>
            </div>

            <p class="tool-note"><span id="mc_warn" class="warn" aria-live="polite"></span><span id="mc_error" class="error" aria-live="polite"></span></p>
        </div>

        <div class="tool-col tool-drawer" style="min-width: 0;">
            <button type="button" class="drawer-toggle" data-drawer-toggle>設定</button>
            <div class="tool-settings tool-drawer-body">
                <label style="display: block;">
                    <span class="field-label">表示モード</span>
                    <select id="mc_view">
                        <option value="0">すべて反映した結果のみを表示</option>
                        <option value="1">1 変換ごとの結果を表示</option>
                    </select>
                </label>

                <div>
                    <div class="tool-inline-row">
                        <span class="label label--p1">リスト</span>
                        <span class="count mc-hint">ドックへドラッグして追加</span>
                    </div>
                    <div id="mc_list" class="mc-list"></div>
                </div>

                <div class="mc-dock-block">
                    <div class="tool-inline-row">
                        <span class="label label--p2">ドック</span>
                        <span class="count"><span id="mc_dock_len">0</span> 変換</span>
                    </div>
                    <div id="mc_dock" class="mc-dock"></div>
                </div>
            </div>
        </div>
    </main>

    <footer class="site-footer">
        <?php footer_text() ?>
    </footer>
</body>

</html>

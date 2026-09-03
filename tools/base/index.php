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
        "基数変換機",
        "比較的柔軟な基数変換を行います。"
    ); ?>
    <!-- タイトルタグ -->
    <title>基数変換機</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
    <link rel="stylesheet" href="./base.css" />
    <script src="./base.js" defer></script>
</head>

<body>
    <header class="site-header">
        <?php header_text("基数変換機") ?>
    </header>
    <main class="tool-main">
        <div class="tool-col">
            <div class="tool-field">
                <span class="label label--p1">変換前</span>
                <span class="count"><span id="input_base_echo">10</span> 進数</span>
            </div>
            <textarea id="input" class="tool-io" style="font-family: var(--font-mono); letter-spacing: 0.06em;" placeholder="変換したい値を入力してください。"></textarea>

            <div class="tool-field">
                <span class="label label--p2">変換後</span>
                <span class="count" id="output_caption"></span>
            </div>
            <div id="pattern1" style="display: flex; flex-direction: column; min-height: 0; flex: 1 1 0;">
                <textarea id="output" class="tool-io tool-io--out" style="font-family: var(--font-mono); letter-spacing: 0.06em;" placeholder="ここに変換結果が表示されます。" readonly></textarea>
            </div>
            <div id="pattern2" class="tool-io" style="overflow: auto; padding: 12px 22px; flex: 1 1 0; min-height: 0;" hidden>
                <div id="pattern2_output"></div>
            </div>

            <p class="tool-note"><span id="warn" class="warn" aria-live="polite"></span><span id="error" class="error" aria-live="polite"></span></p>
        </div>

        <div class="tool-col" style="min-width: 0;">
            <div class="tool-settings">
                <div class="subhead">基本設定</div>

                <div class="row2">
                    <label>
                        <span class="field-label">変換前の基数</span>
                        <input type="number" id="input_base" value="10" min="2" style="color: var(--p1);" />
                    </label>
                    <label>
                        <span class="field-label">変換後の基数</span>
                        <input type="number" id="output_base" value="2" min="2" aria-label="変換後の基数" style="color: var(--p2);" />
                    </label>
                </div>

                <label style="display: block;">
                    <span class="field-label">変換モード</span>
                    <select id="mode">
                        <option value="1">一方変換</option>
                        <option value="0">多方変換</option>
                    </select>
                </label>

                <label class="checkbox-row">
                    <input type="checkbox" id="ignore" class="checkbox-native" checked>
                    <span class="checkbox-row__box"><span class="check">✓</span></span>
                    <span>存在しない文字を無視する</span>
                </label>

                <div class="subhead">数列設定</div>

                <label style="display: block;">
                    <span class="field-label">変換設定</span>
                    <select id="mode2">
                        <option value="1">同数列内で変換</option>
                        <option value="0">別数列で置換</option>
                    </select>
                </label>

                <div>
                    <span class="field-label">プリセット</span>
                    <select id="preset">
                        <option value="-">---</option>
                    </select>
                    <div class="tool-btn-row">
                        <button type="button" id="preset_replace" class="btn-accent1">数列に上書き</button>
                        <button type="button" id="preset_replace2" class="btn-accent2" disabled>置換後数列に上書き</button>
                    </div>
                </div>

                <div>
                    <div class="tool-inline-row">
                        <span class="label label--p1">数列</span>
                        <span class="count"><span id="array_len">0</span> 文字</span>
                    </div>
                    <textarea id="array" class="tool-textarea-sm" style="height: 52px;">0123456789abcdefghijklmnopqrstuvwxyz</textarea>
                </div>

                <div class="mode2_array2" hidden>
                    <div class="tool-inline-row">
                        <span class="label label--p2">置換用数列</span>
                        <button type="button" id="array_reverse" class="link-btn">数列を入れ替える</button>
                    </div>
                    <textarea id="array2" class="tool-textarea-sm" style="height: 44px;">ABCDEFGHIJKLMNOPQRSTUVWXYZ</textarea>
                </div>
            </div>
        </div>
    </main>
    <footer class="site-footer">
        <?php footer_text() ?>
    </footer>
</body>

</html>

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
    <!-- その他 JS/CSS 読み込み -->
    <link rel="stylesheet" href="./base.css" />
    <script src="./base.js" defer></script>
</head>

<body>
    <header>
        <?php header_text() ?>
    </header>
    <main>
        <div class="tool">
            <section class="tool-converter">
                <div class="flexbox">
                    <label class="flexhead" for="input">変換前</label>
                    <div class="flexbody">
                        <textarea id="input" placeholder="変換したい値を入力してください。"></textarea>
                    </div>
                </div>
                <p class="center"><button type="button" id="convert" disabled>↓　変換する　↓</button></p>
                <div id="pattern1">
                    <div class="flexbox">
                        <label class="flexhead" for="output">変換後</label>
                        <div class="flexbody">
                            <textarea id="output" placeholder="ここに変換結果が表示されます。" readonly></textarea>
                        </div>
                    </div>
                </div>
                <div id="pattern2" hidden>
                    <div class="flexbox">
                        <div class="flexhead">変換後</div>
                        <div class="flexbody">
                            <div class="table-scroll">
                                <table id="pattern2_output"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="tool-settings">
                <fieldset>
                    <legend>基本設定</legend>
                    <p class="setting-row">
                        <label for="input_base">変換：</label>
                        <input type="number" id="input_base" value="10" min="2">進数&nbsp;から&nbsp;
                        <input type="number" id="output_base" value="2" min="2" aria-label="変換後の基数">進数（各2～）
                    </p>
                    <p class="setting-row">変換モード：&nbsp;<span id="mode_sign" class="mode_simple">一方変換モード</span>&nbsp;<button type="button"
                            id="mode" aria-label="変換モードを変更">変更</button></p>
                    <p class="setting-row">自動変換：&nbsp;<span id="auto_sign" class="enabled">有効</span>&nbsp;<button type="button"
                            id="auto" aria-label="自動変換の有効/無効を変更">変更</button></p>
                    <p class="setting-row">数列に存在しない文字を無視する：&nbsp;<span id="ignore_sign"
                            class="enabled">有効</span>&nbsp;<button type="button"
                            id="ignore" aria-label="存在しない文字を無視するかを変更">変更</button></p>
                    <p class="setting-row"><span id="warn" aria-live="polite"></span>&nbsp;<span id="error"
                            aria-live="polite"></span></p>
                </fieldset>
                <fieldset>
                    <legend>数列設定</legend>
                    <p class="setting-row">変換設定：&nbsp;<span id="mode2_sign" class="mode_simple">同数列内で変換</span>&nbsp;<button type="button"
                            id="mode2" aria-label="数列の変換設定を変更">変更</button></p>
                    <p class="setting-row"><label for="preset">プリセット：</label><select id="preset">
                            <option value="-">---</option>
                        </select>&nbsp;<button type="button" id="preset_replace">数列に上書き</button><button type="button"
                            id="preset_replace2" disabled>変換数列に上書き</button></p>
                    <div class="flexbox">
                        <label class="flexhead" for="array">数列</label>
                        <div class="flexbody">
                            <textarea id="array"
                                placeholder="数列として扱う文字列を入力してください。">0123456789abcdefghijklmnopqrstuvwxyz</textarea>
                        </div>
                    </div>
                    <div class="mode2_array2" hidden>
                        <div class="flexbox">
                            <label class="flexhead" for="array2">置換用数列</label>
                            <div class="flexbody">
                                <textarea id="array2"
                                    placeholder="変換後の置換に使用する文字列を入力してください。">ABCDEFGHIJKLMNOPQRSTUVWXYZ</textarea>
                            </div>
                        </div>
                        <p class="setting-row"><button type="button" id="array_reverse">数列を入れ替える</button></p>
                    </div>
                </fieldset>
            </section>
        </div>
    </main>
    <footer>
        <?php footer_text() ?>
    </footer>
</body>

</html>

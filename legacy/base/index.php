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
    <link rel="stylesheet" href="/src/chrome.css" />
    <script src="/legacy/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./base.css">
    <script src="./base.js" defer></script>
</head>

<body>
    <header class="site-header">
        <?php header_text("基数変換機", true, "/legacy/") ?>
    </header>
    <main>
        <div class="container">
            <div class="ui">
                <div>
                    <div class="flexbox">
                        <div class="flexhead">
                            変換前
                        </div>
                        <div class="flexbody">
                            <textarea id="input" placeholder="変換したい値を入力してください。"></textarea>
                        </div>
                    </div>
                    <p class="center"><button id="convert" disabled>↓　変換する　↓</button></p>
                    <div id="pattern1">
                        <div class="flexbox">
                            <div class="flexhead">
                                変換後
                            </div>
                            <div class="flexbody">
                                <textarea id="output" placeholder="ここに変換結果が表示されます。" readonly></textarea>
                            </div>
                        </div>
                    </div>
                    <div id="pattern2" style="display:none;">
                        <div class="flexbox">
                            <div class="flexhead">
                                変換後
                            </div>
                            <div class="flexbody">
                                <table id="pattern2_output"></table>
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset>
                    <legend>基本設定</legend>
                    <p>変換：
                        <input type="number" id="input_base" value="10" min="2">進数&nbsp;から&nbsp;
                        <input type="number" id="output_base" value="2" min="2">進数（各2～）
                    </p>
                    <p>変換モード：&nbsp;<span id="mode_sign" class="mode_simple">一方変換モード</span>&nbsp;<button
                            id="mode">変更</button></p>
                    <p>自動変換：&nbsp;<span id="auto_sign" class="auto enabled">有効</span>&nbsp;<button id="auto">変更</button>
                    </p>
                    <p>数列に存在しない文字を無視する：&nbsp;<span id="ignore_sign" class="ignore enabled">有効</span>&nbsp;<button
                            id="ignore">変更</button></p>
                    <p><span id="warn"></span>&nbsp;<span id="error"></span></p>
                </fieldset>
                <fieldset>
                    <legend>数列設定</legend>
                    <p>変換設定：&nbsp;<span id="mode2_sign" class="mode_simple">同数列内で変換</span>&nbsp;<button
                            id="mode2">変更</button></p>
                    <p>プリセット：<select id="preset">
                            <option value="-">---</option>
                        </select>&nbsp;<button id="preset_replace">数列に上書き</button><button id="preset_replace2"
                            disabled>変換数列に上書き</button></p>
                    <div class="flexbox">
                        <div class="flexhead">
                            数列
                        </div>
                        <div class="flexbody">
                            <textarea id="array"
                                placeholder="数列として扱う文字列を入力してください。">0123456789abcdefghijklmnopqrstuvwxyz</textarea>
                        </div>
                    </div>
                    <div class="mode2_array2">
                        <div class="flexbox">
                            <div class="flexhead">
                                置換用数列
                            </div>
                            <div class="flexbody">
                                <textarea id="array2"
                                    placeholder="変換後の置換に使用する文字列を入力してください。">ABCDEFGHIJKLMNOPQRSTUVWXYZ</textarea>
                            </div>
                        </div>
                    </div>
                    <p><span class="mode2_array2"><button id="array_reverse">数列を入れ替える</button></span></p>
                </fieldset>
            </div>
        </div>
    </main>
    <footer class="site-footer">
        <?php footer_text() ?>
    </footer>
</body>

</html>

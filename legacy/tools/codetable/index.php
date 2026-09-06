<?php
require_once(__DIR__ . "/../../../snippets.php");
?>
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- OGP -->
    <?php ogp(
        "文字対応表",
        "暗号等に使用可能な変換表です。"
    ); ?>
    <!-- タイトルタグ -->
    <title>対応表</title>
    <!-- 汎用 JS/CSS 読み込み -->
    <link rel="stylesheet" href="/src/chrome.css" />
    <script src="/legacy/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <!-- その他 JS/CSS 読み込み -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./codetable.css">
    <style>
      #nlist {
        margin: 20px auto 20px 20px;
        border-collapse: collapse;
      }
      #nlist th {
        border: 2.5px solid #aaa;
        width: 10em;
        text-align: center;
      }
      #nlist td {
        border: 1px solid #aaa;
        width: 10em;
        text-align: center;
      }
      .table {
        background-color: #222;
        border-radius: 0.25em;
        margin-top: 20px;
        padding: 3px;
      }

      #nshowing {
        padding: 5px;
        background-color: #222;
        border-radius: 0.25em;
      }
      #nshowing label {
        display:inline-block;
        text-align: center;
        min-width: 5em;
        padding: 2px 1em 2px 1em;
        margin: 0px 1px 0px 1px;
        background-color: #777;
      }
    </style>
    <script type="module" src="./codetable.js"></script>
  </head>
  <body>
    <header class="site-header">
      <?php header_text("文字対応表", true, "/legacy/") ?>
    </header>
    <main>
      <div class="container">
        <div class="ui">
          <p>表選択：<select id="nselect"><option value="-">---</option></select></p>
          <fieldset>
            <legend>オプション</legend>
            <p>
              並べ替え：&nbsp;<select id="nsort1"><option value="-">---</option></select>&nbsp;の&nbsp;<select id="nsort2"><option value="0">昇順</option><option value="1">降順</option></select>
            </p>
            <form id="nshowing" name="nshowing"></form>
          </fieldset>
          <div class="table">
            <table id="nlist">
              <thead></thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    <footer class="site-footer">
      <?php footer_text() ?>
    </footer>
  </body>
</html>

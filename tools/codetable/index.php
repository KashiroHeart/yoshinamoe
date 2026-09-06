<?php
require_once(__DIR__ . "/../../snippets.php");
?>
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:url" content="https://4472.web.fc2.com/tools/codetable/">
    <meta property="og:type" content="article">
    <meta property="og:title" content="文字対応表">
    <meta property="og:description" content="暗号等に使用可能な変換表です。">
    <meta property="og:site_name" content="ツール置き場">
    <meta name="author" content="Yoka">
    <title>文字対応表</title>
    <link rel="stylesheet" href="/src/lib.css" />
    <script src="/src/lib.js"></script>
    <script src="/src/palette.js"></script>
    <link rel="stylesheet" href="./codetable.css">
    <script type="module" src="./codetable.js"></script>
  </head>
  <body>
    <header class="site-header">
      <?php header_text("文字対応表") ?>
    </header>

    <noscript>
      <p class="page-pad">JavaScript が無効になっているため、このツールは利用できません。</p>
    </noscript>

    <main class="ct-main">
      <div id="ct_tables" class="ct-tables"></div>

      <div class="ct-controls">
        <label class="ct-field">
          <span class="field-label">並べ替え</span>
          <select id="nsort1"><option value="-">デフォルト</option></select>
        </label>
        <label class="ct-field">
          <span class="field-label">順序</span>
          <select id="nsort2">
            <option value="0">昇順</option>
            <option value="1">降順</option>
          </select>
        </label>
        <div class="ct-field">
          <span class="field-label">表示する列</span>
          <div id="nshowing" class="ct-columns"></div>
        </div>
      </div>

      <div class="ct-table-wrap">
        <table id="nlist">
          <thead></thead>
          <tbody></tbody>
        </table>
      </div>
    </main>

    <footer class="site-footer">
      <?php footer_text() ?>
    </footer>
  </body>
</html>

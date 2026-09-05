<?php
/*
 * 旧デザイン版（legacy）専用のスニペット。
 * 現行版の /snippets.php とは独立しており、legacy 配下のページからのみ読み込まれる。
 * 万一同一リクエストで現行版と同時に読み込まれても致命的エラーにならないよう
 * function_exists() で保護している。
 *
 * ヘッダー / フッターのマークアップは現行版 /snippets.php と同じものを使う
 * （トップへのリンク先だけ /legacy/ に差し替えている）。
 * 対応するスタイルは legacy/src/chrome.css にある。
 */

if (!function_exists('ogp')) {
    function ogp(string $title, string $description){
        $url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

        ?>

        <meta property="og:title" content="<?= $title ?>">
        <meta property="og:description" content="<?= $description ?>">
        <meta property="og:url" content="<?= $url ?>">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="ツール置き場">
        <meta name="author" content="Yoka">

        <?php
        return;
    }
}

if (!function_exists('header_text')) {
    /**
     * ヘッダーを出力する。
     * $toolName を渡すとパンくず（ツール置き場 / $toolName）付きのツールページ用ヘッダーになる。
     * $showChip を false にするとカラーパレットチップを省略する。
     */
    function header_text(?string $toolName = null, bool $showChip = true){
        ?>

        <div class="site-header__crumb">
            <?php if ($toolName === null): ?>
                <span class="site-header__home">ツール置き場</span>
            <?php else: ?>
                <a href="/legacy/" target="_self" title="トップへ" class="site-header__home">ツール置き場</a>
                <span class="site-header__sep">/</span>
                <span class="site-header__title"><?= htmlspecialchars($toolName, ENT_QUOTES, "UTF-8") ?></span>
            <?php endif; ?>
        </div>
        <?php if ($showChip): palette_chip(); endif; ?>

        <?php
    }
}

if (!function_exists('palette_chip')) {
    function palette_chip() {
        ?>

        <button type="button" class="palette-chip" aria-label="カラーパレットを切り替え">
            <span class="palette-chip__name"></span>
            <span class="palette-chip__swatches">
                <span class="sw sw--white"></span><span class="sw sw--p1"></span><span class="sw sw--p2"></span><span class="sw sw--p3"></span><span class="sw sw--black"></span>
            </span>
        </button>

        <?php
    }
}

if (!function_exists('footer_text')) {
    function footer_text() {
        ?>

        <p>2025 Yoka / <a href="https://x.com/xx7_44" target="_blank">@xx7_44</a></p>

        <?php
    }
}

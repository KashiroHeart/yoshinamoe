<?php 

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

/**
 * ヘッダーを出力する。
 * $toolName を渡すとパンくず（ツール置き場 / $toolName）付きのツールページ用ヘッダーになる。
 * $showChip を false にするとカラーパレットチップを省略する（404 ページ用）。
 * $homeUrl はパンくずのトップへのリンク先。旧デザイン版（/legacy/*）は "/legacy/" を渡す。
 */
function header_text(?string $toolName = null, bool $showChip = true, string $homeUrl = "/"){
    ?>

    <div class="site-header__crumb">
        <?php if ($toolName === null): ?>
            <span class="site-header__home">ツール置き場</span>
        <?php else: ?>
            <a href="<?= htmlspecialchars($homeUrl, ENT_QUOTES, "UTF-8") ?>" target="_self" title="トップへ" class="site-header__home">ツール置き場</a>
            <span class="site-header__sep">/</span>
            <span class="site-header__title"><?= htmlspecialchars($toolName, ENT_QUOTES, "UTF-8") ?></span>
        <?php endif; ?>
    </div>
    <?php if ($showChip): palette_chip(); endif; ?>

    <?php
}

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

function footer_text() {
    ?>

        <p>2025 Yoka / <a href="https://x.com/xx7_44" target="_blank">@xx7_44</a></p>

    <?php
}
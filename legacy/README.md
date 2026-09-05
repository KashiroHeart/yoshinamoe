# legacy/

Web サイト改修前の**旧デザイン版**ツール一式を、現行版と併存させるために配置したディレクトリです。

現行版（`/tools/*`, `/src/*`, `/index.php`）とは完全に独立しており、
このディレクトリ配下だけで自己完結しています。

## 構成

```
legacy/
├── index.php            旧デザインのトップページ（/legacy/）
├── snippets.php         旧デザインの ogp()/header_text()/footer_text()
├── src/
│   ├── lib.css          旧デザインの共通スタイル
│   └── lib.js           旧デザインの共通スクリプト
└── tools/
    ├── base/            基数変換機   （/legacy/tools/base/）
    ├── codetable/       文字対応表   （/legacy/tools/codetable/）
    ├── polybius/        ポリュビオス暗号ツール（/legacy/tools/polybius/）
    └── tenji/           点字変換     （/legacy/tools/tenji/）
```

## 現行版との関係

- 現行版のファイル（`/src/*`, `/tools/*`, ルート直下の `index.php` など）には一切変更を加えていません。
- `legacy/src/lib.css` は `header` / `main` / `footer` などの要素セレクタを使いますが、
  読み込まれるのは `legacy/` 配下のページのみのため、現行版のデザインには影響しません。
- `legacy/snippets.php` の関数名は現行版の `snippets.php` と同名です。
  同一リクエストで両方が読み込まれても致命的エラーにならないよう `function_exists()` で保護しています。

## 旧版ソースからの変更点

見た目と入出力は旧版のまま維持し、配置に伴うパスの調整のみを行っています。

- サイト内絶対パスを `/legacy/` 配下に変更
  - `/src/lib.css`, `/src/lib.js` → `/legacy/src/lib.css`, `/legacy/src/lib.js`
  - トップへのリンク `/` → `/legacy/`（`snippets.php`、`codetable/index.html`、`tenji/index.html`）
- `legacy/index.php` のツール一覧のリンク先を `/legacy/tools/*` に変更し、
  旧版一覧に無かった点字変換を旧版と同じマークアップで追加
- `codetable/index.html` から `/jquery_touch_punch.js` の読み込みを削除
  （リポジトリに存在せず 404 になるうえ、jQuery UI の draggable/sortable を
  一切使っていないため未使用のファイル。動作・見た目に変化はありません）

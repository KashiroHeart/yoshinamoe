# legacy/

Web サイト改修前の**旧デザイン版**ツール一式を、現行版と併存させるために配置したディレクトリです。
URL 互換（旧 URL からの移行・リダイレクト先）のために残しています。

メイン領域は現行版（`/tools/*`, `/index.php`）と独立した旧デザインのままですが、
ヘッダー / フッターは現行版と同じものを共有しています。

## 構成

```
legacy/
├── index.php            旧デザインのトップページ（/legacy/）
├── src/
│   ├── lib.css          トップページのメイン領域スタイル（旧デザイン）
│   └── lib.js           旧デザインの共通スクリプト（init()）
└── tools/
    ├── base/            基数変換機   （/legacy/tools/base/）
    ├── codetable/       文字対応表   （/legacy/tools/codetable/）
    └── polybius/        ポリュビオス暗号ツール（/legacy/tools/polybius/）
```

## デザインの方針

- **ヘッダー / フッターのみ現行版と同じ**（パンくず + カラーパレットチップ + フッター）。
- **メイン領域（ヘッダーとフッターの間）は背景も含めて旧デザインのまま**。

ヘッダー / フッターは現行版と**同じ実体**を使っており、legacy 側にコピーはありません。

| 対象 | 実体 | 備考 |
| --- | --- | --- |
| マークアップ | `/snippets.php` | `header_text($toolName, $showChip, $homeUrl)` に `"/legacy/"` を渡す |
| スタイル | `/src/chrome.css` | ヘッダー / フッター・パレットチップ・カスタムプロパティ |
| パレット切り替え | `/src/palette.js` | |

`/src/lib.css`（現行版のメイン領域・フォーム部品の既定スタイル）は読み込みません。
丸ごと読み込むと `body` やフォーム部品まで上書きされ、メイン領域の旧デザインが壊れるためです。
`/src/chrome.css` は現行版でもこの legacy でも成立するよう、
グローバルなリセットに依存しない書き方にしてあります。

パレットが書き換える CSS カスタムプロパティはヘッダー / フッターでしか参照していないため、
メイン領域の配色には影響しません。

## 現行版との関係

- メイン領域のスタイル（`legacy/src/lib.css`、各ツールの CSS）は `main` 配下に限定した
  セレクタを使い、読み込まれるのも `legacy/` 配下のページのみのため、
  現行版のデザインには影響しません。
- ヘッダー / フッターを変更するときは `/snippets.php` と `/src/chrome.css` の 1 か所を直せば、
  現行版と legacy の両方に反映されます。

## 旧版ソースからの変更点

メイン領域の見た目と入出力は旧版のまま維持しています。

- サイト内絶対パスを `/legacy/` 配下に変更
  （`/src/lib.css`, `/src/lib.js` → `/legacy/src/*`、トップへのリンクは `header_text()` に
  `"/legacy/"` を渡す）
- 点字変換（`tools/tenji`）を削除
  旧版時点で未完成であり、以降は現行版 `/tools/tenji/` をメンテナンスするため。
  `legacy/index.php` のツール一覧からも削除しています。
- **脱 jQuery**：`base.js` / `codetable.js` / `polybius.js` を素の DOM API で書き直し、
  CDN（code.jquery.com）の読み込みを削除。処理内容は旧版と同じです。
  唯一の例外として、`base.js` の入力欄の自動変換は旧版では jQuery のイベント名指定の誤り
  （`"change, keyup"`）により `change` が効いていなかったため、`input` / `change` を
  登録して意図どおりに動くようにしています。
- **フレーム構造の廃止**：基数変換機は `index.php` + `iframe`（`frame.html`）の構成でしたが、
  操作性に悪影響があるため 1 ページに統合し、`frame.html` を削除しました。
- **ヘッダー / フッターの更新**：全ページのヘッダー / フッターを現行版と共通のもの
  （`/snippets.php` + `/src/chrome.css`）に差し替えました。
  フッターの無かったポリュビオス暗号ツールにはフッターを追加しています。
  これに伴い、文字対応表・ポリュビオス暗号ツールは `index.html` → `index.php` に変更しました
  （URL は `/legacy/tools/codetable/` などのままで変わりません）。
- 全画面固定の背景（`.background` / `body::before`）は、ヘッダー / フッターの背後まで
  覆ってしまうため廃止し、同じ色をメイン領域（`main`）の背景として指定しています。
- `codetable/index.html` から `/jquery_touch_punch.js` の読み込みを削除
  （リポジトリに存在せず 404 になるうえ、jQuery UI の draggable/sortable を
  一切使っていないため未使用のファイル。動作・見た目に変化はありません）

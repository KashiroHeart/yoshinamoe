# 同梱フォントについて

## HackGen35 Console NF

- ファイル: `HackGen35ConsoleNF-Regular.woff2`
- バージョン: 2.10.0 (`HackGen35ConsoleNF-Regular.ttf`)
- 配布元: [yuru7/HackGen](https://github.com/yuru7/HackGen)
- ライセンス: SIL Open Font License 1.1 (`LICENSE_HackGen.md`)
  - Copyright (c) 2019, Yuko OTAWARA. with Reserved Font Name "白源", "HackGen"

### WOFF2 への変換について

配布物は `.ttf` のみのため、Web 配信用に WOFF2 コンテナへ変換して同梱している。

```sh
pip install fonttools brotli
python3 - <<'PY'
from fontTools.ttLib import TTFont
f = TTFont('HackGen35ConsoleNF-Regular.ttf', recalcTimestamp=False, recalcBBoxes=False)
f.flavor = 'woff2'
f.save('HackGen35ConsoleNF-Regular.woff2')
PY
```

変換は WOFF2 の可逆圧縮のみで、グリフ・cmap・ヒンティング・name テーブルはオリジナルと
バイト単位で一致する（WOFF2 メタデータブロックも付加していない）。
OFL FAQ の定める「単なるフォーマット変換」の条件を満たすため、Reserved Font Name である
`HackGen` を含む元のフォント名をそのまま使用している。

サブセット化（グリフの削除）を行うと OFL 上の Modified Version となり、
`HackGen` / `白源` の名称を使えなくなる点に注意。ファイルサイズ削減のために
サブセット化する場合は、フォント名のリネームが必要。

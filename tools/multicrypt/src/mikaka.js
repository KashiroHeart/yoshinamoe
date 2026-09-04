// for tools/multicrypt/
// みかか暗号（JIS かな配列）の変換表。表は tools/codetable/codes.js を再利用する。

import { list2 } from "/tools/codetable/codes.js";

const buildTable = function () {
  const toKana = new Map();  // ASCII キー -> ひらがな
  const toKey = new Map();   // ひらがな -> ASCII キー

  for (const row of list2.mikaka) {
    if (!row.jp) continue;  // 対応する仮名を持たないキー（"|"）は除く

    if (!toKana.has(row.mikaka)) toKana.set(row.mikaka, row.jp);
    if (!toKey.has(row.jp)) toKey.set(row.jp, row.mikaka);
  }

  return { toKana: toKana, toKey: toKey };
};

export const MIKAKA = buildTable();

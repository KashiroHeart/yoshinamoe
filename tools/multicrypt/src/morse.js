// for tools/multicrypt/
// モールス信号の変換表。表そのものは tools/codetable/codes.js を単一の出所として再利用する。

import { list2 } from "/tools/codetable/codes.js";
import { decomposeKana, composeKana } from "./kana.js";

// 正規記号（表側の表記）。ユーザー定義の記号はこの 2 文字に正規化してから引く。
export const DOT = "・";
export const DASH = "－";

/**
 * 和文モールスで扱える表記へ正規化し、1 要素 1 符号となる配列に分解する。
 * 仮名の正規化に加えて、半角数字→全角数字と長音記号のゆらぎを吸収する。
 */
export const normalizeJa = function (text) {
  return decomposeKana(text).map(function (ch) {
    if (ch >= "0" && ch <= "9") {
      return String.fromCodePoint(ch.codePointAt(0) - 0x30 + 0xff10);
    }
    if (ch === "-" || ch === "‐" || ch === "—" || ch === "―" || ch === "ｰ") {
      return "ー";
    }
    return ch;
  });
};

/** 和文デコード結果の配列から、濁点・半濁点を合成した文字列を作る。 */
export const composeJa = composeKana;

// codes.js の和文モールス表には「さ」「ゆ」「ひ」が収録されていないため、ここで補う。
// （tools/codetable 側の表示も同じ 3 文字を欠いている。表そのものの修正は別途。）
const JA_SUPPLEMENT = [
  { signal: "－・－・－", jp: "さ" },
  { signal: "－・・－－", jp: "ゆ" },
  { signal: "－－・・－", jp: "ひ" },
];

// codes.js の表から、和文／欧文それぞれの双方向マップを組み立てる。
const buildTables = function () {
  const ja = { toSignal: new Map(), toChar: new Map() };
  const en = { toSignal: new Map(), toChar: new Map() };

  for (const row of list2.morse.concat(JA_SUPPLEMENT)) {
    if (row.jp) {
      if (!ja.toSignal.has(row.jp)) ja.toSignal.set(row.jp, row.signal);
      if (!ja.toChar.has(row.signal)) ja.toChar.set(row.signal, row.jp);
    }
    if (row.en) {
      if (!en.toSignal.has(row.en)) en.toSignal.set(row.en, row.signal);
      if (!en.toChar.has(row.signal)) en.toChar.set(row.signal, row.en);
    }
  }

  return { ja: ja, en: en };
};

export const TABLES = buildTables();

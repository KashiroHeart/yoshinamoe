// for tools/multicrypt/
// モールス信号の変換表。表そのものは tools/codetable/codes.js を単一の出所として再利用する。

import { list2 } from "/tools/codetable/codes.js";

// 正規記号（表側の表記）。ユーザー定義の記号はこの 2 文字に正規化してから引く。
export const DOT = "・";
export const DASH = "－";

// 濁音・半濁音・小書き仮名の対応。tools/polybius/polybius.js の shift1/shift2/shiftA と同じ並び。
const VOICED = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'];
const VOICED_BASE = ['か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'は', 'ひ', 'ふ', 'へ', 'ほ'];
const HALF_VOICED = ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
const HALF_VOICED_BASE = ['は', 'ひ', 'ふ', 'へ', 'ほ'];
const SMALL = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'っ', 'ゎ'];
const SMALL_BASE = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ', 'つ', 'わ'];

export const DAKUTEN = "゛";
export const HANDAKUTEN = "゜";

const voicedOf = new Map();       // か -> が
const halfVoicedOf = new Map();   // は -> ぱ
const decomposeOf = new Map();    // が -> ["か", "゛"]

for (let i = 0; i < VOICED.length; i++) {
  voicedOf.set(VOICED_BASE[i], VOICED[i]);
  decomposeOf.set(VOICED[i], [VOICED_BASE[i], DAKUTEN]);
}
for (let i = 0; i < HALF_VOICED.length; i++) {
  halfVoicedOf.set(HALF_VOICED_BASE[i], HALF_VOICED[i]);
  decomposeOf.set(HALF_VOICED[i], [HALF_VOICED_BASE[i], HANDAKUTEN]);
}
for (let i = 0; i < SMALL.length; i++) {
  decomposeOf.set(SMALL[i], [SMALL_BASE[i]]);
}
decomposeOf.set("ゔ", ["う", DAKUTEN]);
decomposeOf.set("ヴ", ["う", DAKUTEN]);

/**
 * 和文モールスで扱える表記へ正規化し、1 要素 1 符号となる配列に分解する。
 * カタカナ→ひらがな、半角数字→全角数字、濁音・半濁音の分解、小書き仮名の大書き化を行う。
 */
export const normalizeJa = function (text) {
  const out = [];

  for (const raw of Array.from(text)) {
    let ch = raw;

    // カタカナ → ひらがな（ヴは decomposeOf 側で処理するため除外）
    const code = ch.codePointAt(0);
    if (ch !== "ヴ" && code >= 0x30a1 && code <= 0x30f6) {
      ch = String.fromCodePoint(code - 0x60);
    }
    // 半角数字 → 全角数字
    if (ch >= "0" && ch <= "9") {
      ch = String.fromCodePoint(ch.codePointAt(0) - 0x30 + 0xff10);
    }
    // 長音記号のゆらぎ
    if (ch === "-" || ch === "‐" || ch === "—" || ch === "―" || ch === "ｰ") ch = "ー";

    const parts = decomposeOf.get(ch);
    if (parts) out.push(...parts);
    else out.push(ch);
  }

  return out;
};

/**
 * 和文デコード結果の配列から、濁点・半濁点を直前の文字へ合成した文字列を作る。
 */
export const composeJa = function (chars) {
  const out = [];

  for (const ch of chars) {
    const prev = out.length ? out[out.length - 1] : null;

    if (ch === DAKUTEN && prev !== null) {
      if (voicedOf.has(prev)) {
        out[out.length - 1] = voicedOf.get(prev);
        continue;
      }
      if (prev === "う") {
        out[out.length - 1] = "ゔ";
        continue;
      }
    }
    if (ch === HANDAKUTEN && prev !== null && halfVoicedOf.has(prev)) {
      out[out.length - 1] = halfVoicedOf.get(prev);
      continue;
    }
    out.push(ch);
  }

  return out.join("");
};

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

  return { ja, en };
};

export const TABLES = buildTables();

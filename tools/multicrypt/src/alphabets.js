// for tools/multicrypt/
// シーザー暗号で使う配列のプリセット。いろは順は tools/codetable/codes.js を再利用する。

import { list1 } from "/tools/codetable/codes.js";
import { toKatakana } from "./kana.js";

/** コードポイント範囲から文字列を作る。 */
const range = function (from, to) {
  let out = "";
  for (let code = from; code <= to; code++) out += String.fromCodePoint(code);
  return out;
};

const DIGITS = range(0x30, 0x39);          // 0-9
const LOWER = range(0x61, 0x7a);           // a-z
const UPPER = range(0x41, 0x5a);           // A-Z
const HIRAGANA = range(0x3041, 0x3094);    // ぁ〜ゔ
const KATAKANA = range(0x30a1, 0x30fa);    // ァ〜ヺ

// 小書き・濁音・半濁音（カタカナ側は ヵヶ と ヷヸヹヺ も対象）
const SMALL = "ぁぃぅぇぉっゃゅょゎ";
const VOICED = "がぎぐげござじずぜぞだぢづでどばびぶべぼゔ";
const HALF_VOICED = "ぱぴぷぺぽ";
const EXCLUDED_KATAKANA = toKatakana(SMALL + VOICED + HALF_VOICED) + "ヵヶヷヸヹヺ";
const EXCLUDED_HIRAGANA = SMALL + VOICED + HALF_VOICED;

const without = function (text, excluded) {
  return Array.from(text).filter(c => excluded.indexOf(c) === -1).join("");
};

const IROHA = list1.iroha.join("");

// [id, 表示名, 文字列]
const DEFS = [
  ["abc", "a-z", LOWER],
  ["ABC", "A-Z", UPPER],
  ["0-9a-z", "0-9a-z", DIGITS + LOWER],
  ["0-9A-Z", "0-9A-Z", DIGITS + UPPER],
  ["hira", "ひらがな (U+3041〜U+3094)", HIRAGANA],
  ["hira-base", "ひらがな (小書き・濁音・半濁音を除く)", without(HIRAGANA, EXCLUDED_HIRAGANA)],
  ["hira-iroha", "ひらがな (いろは順)", IROHA],
  ["kata", "カタカナ (U+30A1〜U+30FA)", KATAKANA],
  ["kata-base", "カタカナ (小書き・濁音・半濁音を除く)", without(KATAKANA, EXCLUDED_KATAKANA)],
  ["kata-iroha", "カタカナ (いろは順)", toKatakana(IROHA)],
  ["b64", "Base64 (A-Za-z0-9+/)", UPPER + LOWER + DIGITS + "+/"],
  ["rot47", "ROT47 (ASCII 0x21〜0x7E)", range(0x21, 0x7e)],
];

/** ドロップダウン用の [id, 表示名] の配列。 */
export const ALPHABET_CHOICES = DEFS.map(([id, name]) => [id, name]);

/** id -> 文字の配列。 */
export const ALPHABETS = new Map(DEFS.map(([id, , text]) => [id, Array.from(text)]));

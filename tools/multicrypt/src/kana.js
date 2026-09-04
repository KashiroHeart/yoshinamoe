// for tools/multicrypt/
// 仮名の正規化ユーティリティ。モールス信号とみかか暗号の双方から使う。

export const DAKUTEN = "゛";
export const HANDAKUTEN = "゜";

// 濁音・半濁音・小書き仮名の対応。tools/polybius/polybius.js の shift1/shift2/shiftA と同じ並び。
const VOICED = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'];
const VOICED_BASE = ['か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'は', 'ひ', 'ふ', 'へ', 'ほ'];
const HALF_VOICED = ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
const HALF_VOICED_BASE = ['は', 'ひ', 'ふ', 'へ', 'ほ'];
const SMALL = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'っ', 'ゎ'];
const SMALL_BASE = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ', 'つ', 'わ'];

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

/** カタカナをひらがなへ寄せる。 */
export const toHiragana = function (text) {
  return Array.from(text).map(function (ch) {
    const code = ch.codePointAt(0);
    return code >= 0x30a1 && code <= 0x30f6 ? String.fromCodePoint(code - 0x60) : ch;
  }).join("");
};

/** ひらがなをカタカナへ寄せる。 */
export const toKatakana = function (text) {
  return Array.from(text).map(function (ch) {
    const code = ch.codePointAt(0);
    return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : ch;
  }).join("");
};

/**
 * 仮名を「1 要素 1 音」の配列へ分解する。
 * カタカナ→ひらがな、濁音・半濁音の分解、小書き仮名の大書き化を行い、
 * 仮名以外の文字はそのまま 1 要素として残す。
 */
export const decomposeKana = function (text) {
  const out = [];

  for (const raw of Array.from(text)) {
    const ch = toHiragana(raw);
    const parts = decomposeOf.get(ch);

    if (parts) out.push(...parts);
    else out.push(ch);
  }

  return out;
};

/**
 * 仮名 1 文字と濁点／半濁点を合成する。合成できない場合は null を返す。
 */
export const composeMark = function (kana, mark) {
  if (mark === DAKUTEN) {
    if (voicedOf.has(kana)) return voicedOf.get(kana);
    if (kana === "う") return "ゔ";
    return null;
  }
  if (mark === HANDAKUTEN && halfVoicedOf.has(kana)) {
    return halfVoicedOf.get(kana);
  }
  return null;
};

/**
 * 分解済みの配列から、濁点・半濁点を直前の文字へ合成した文字列を作る。
 */
export const composeKana = function (chars) {
  const out = [];

  for (const ch of chars) {
    const prev = out.length ? out[out.length - 1] : null;
    const composed = prev === null ? null : composeMark(prev, ch);

    if (composed !== null) out[out.length - 1] = composed;
    else out.push(ch);
  }

  return out.join("");
};

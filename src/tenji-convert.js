/* 点字変換 / 暗号点字変換 の変換処理。DOM には触れない。 */

import {
  braille6Table,
  braille8Table,
  braille2Kanji,
  braille2Kana,
  braille2KanaTable,
}
from "/src/tenji-rules.js";
import {
  getAllCombinations
}
from "/src/combination.js";

/* braille2KanaTable の列と、その前置符号の 6 点値（= braille6Table の添字）の対応。
   例：が = 濁点 ⠐(2) + か ⠡(33)、ぱ = 半濁点 ⠠(1) + は ⠥(41) */
const KANA_MARKS = [
  { column: 0, mark: 2 }, // 濁音   ⠐
  { column: 1, mark: 1 }, // 半濁音 ⠠
  { column: 2, mark: 4 }, // 拗音   ⠈
  { column: 3, mark: 6 }, // 拗濁音 ⠘
  { column: 4, mark: 5 }, // 拗半濁音 ⠨
];

/* braille2KanaTable の行は braille2Kana と同じ並び（index 5 = か / が）。 */
const kana2Marked = new Map(); // "が" -> [2, 33]
const marked2Kana = new Map(); // "2,33" -> "が"
for (let i = 0; i < braille2Kana.length; i++) {
  const row = braille2KanaTable[i];
  if (!row) continue;
  for (const { column, mark } of KANA_MARKS) {
    const kana = row[column];
    if (!kana) continue;
    const base = braille2Kana[i][1];
    kana2Marked.set(kana, [mark, base]);
    marked2Kana.set(`${mark},${base}`, kana);
  }
}

const err = function (e) {
  console.error(e);
  return "?";
};

const k2t = function (input) {
  const result = [];
  for (let i = 0; i < input.length;) {
    /* 拗音は 2 文字（きゃ）なので長い方から照合する。 */
    const digraph = kana2Marked.get(input.slice(i, i + 2));
    const marked = digraph ?? kana2Marked.get(input[i]);
    if (marked) {
      result.push(braille6Table[marked[0]], braille6Table[marked[1]]);
      i += digraph ? 2 : 1;
      continue;
    }

    const dex = braille2Kana.find(dic => dic[0] == input[i]);
    if (!dex) {
      err("変換できない文字が含まれています。：" + input[i]);
      i++;
      continue;
    }
    result.push(braille6Table[dex[1]]);
    i++;
  }
  return result.join("");
};

const t2k = function (input) {
  const cells = input.split("").map(m => braille6Table.indexOf(m)).map(m => m > 0 ? m : 0);
  const kanaInput = [];
  for (let i = 0; i < cells.length;) {
    /* 前置符号（1〜6）と素のかな（8 以上）は値が重ならないので取り違えない。 */
    const kana = i + 1 < cells.length ? marked2Kana.get(`${cells[i]},${cells[i + 1]}`) : undefined;
    if (kana) {
      kanaInput.push(kana);
      i += 2;
      continue;
    }

    const char = braille2Kana.find(dic => dic[1] == cells[i])?.[0];
    kanaInput.push(char || cells[i].toString(2).padStart(6, "0"));
    i++;
  }
  return kanaInput.join("");
};

const k2kt = function (input) {
  const result = [];
  for (const char of input) {
    const dex = braille2Kanji.find(dic => dic[0] == char);
    if (!dex) {
      err("変換できない文字が含まれています。：" + char);
      continue;
    }
    const bin = dex[1].toString(2);
    if (!bin) {
      err("バイナリへの変換に失敗しました。：" + dex[1]);
      continue;
    }
    for (let i = Math.ceil(bin.length / 8) - 1; i >= 0; i--) {
      const currentByte = dex[1] >> (i * 8) & 0xFF;
      result.push(braille8Table[currentByte]);
    }
  }
  return result.join("");
};

const k2kt2 = function (input) {
  const result = [];
  for (const char of input) {
    const dex = braille2Kanji.find(dic => dic[0] == char);
    if (!dex) return err("変換できない文字が含まれています。：" + char);
    const bin = dex[2].toString(2);
    if (!bin) return err("バイナリへの変換に失敗しました。");
    for (let i = Math.ceil(bin.length / 8) - 1; i >= 0; i--) {
      const currentByte = dex[2] >> (i * 8) & 0xFF;
      result.push(braille8Table[currentByte]);
    }
  }
  return result.join("");
};

const kt2k = function (input) {
  let binaryInput = input.split("").map(m => braille8Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(8 - m.length) + m);
  const kanjiInput = [];
  let index = "";
  let isKanji = false;
  for (const binary of binaryInput) {
    index += binary;
    if (binary[0] == 1) {
      isKanji = true;
    }
    if (binary[4] == 1 && isKanji) {
      const char = braille2Kanji.find(dic => dic[1] == parseInt(index, 2))?.[0];
      kanjiInput.push(char || index);
      isKanji = false;
      index = "";
    } else if (!isKanji) {
      kanjiInput.push(binary);
      index = "";
    }
  }

  binaryInput = kanjiInput.map(m => {
    if (m.length >= 8) return m.match(/.{8}/g);
    return m;
  }).flat();

  const kanaInput = [];
  for (const binary of binaryInput) {
    const char = braille2Kana.find(dic => dic[3] == parseInt(binary, 2))?.[0];
    kanaInput.push(char || binary);
  }
  return kanaInput.join("");
};

const forcefix = function (input) {
  const binaryInput = input.split("")
    .map(m => braille8Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(8 - m.length) + m)
    .map(m => [m[3], m[0], m[1], m[2], m[7], m[4], m[5], m[6]]);
  const patterns = getAllCombinations(input.length);
  const result = [];
  for (const pattern of patterns) {
    const binPattern = pattern.map(m => ["11", "1001", "100001"][m - 1]).join("").match(/.{2}/g);
    const braille = [];
    for (let i = 0; i < binaryInput.length; i++) {
      [binaryInput[i][0], binaryInput[i][4]] = [...binPattern[i]];
      const entry = binaryInput[i].join("");
      braille.push(braille8Table[parseInt(entry, 2)]);
    }
    result.push([braille.join(""), kt2k(braille.join(""))]);
  }
  return result;
};

export { k2t, t2k, k2kt, k2kt2, kt2k, forcefix };

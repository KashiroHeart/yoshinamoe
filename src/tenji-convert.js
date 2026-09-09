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

/* braille2KanaTable の列と、その前置符号の値（= 点字テーブルの添字）の対応。
   前置符号は値が 8 未満なので 6 点・8 点で同じ添字だが、参照するテーブルが違うため
   字形は変わる（濁点は 6 点 ⠐ / 8 点 ⠠）。
   例：が = 濁点(2) + か、ぱ = 半濁点(1) + は */
const KANA_MARKS = [
  { column: 0, mark: 2 }, // 濁音
  { column: 1, mark: 1 }, // 半濁音
  { column: 2, mark: 4 }, // 拗音
  { column: 3, mark: 6 }, // 拗濁音
  { column: 4, mark: 5 }, // 拗半濁音
];

/**
 * かなと点字の対応表を組み立てる。braille2KanaTable の行は braille2Kana と
 * 同じ並び（index 5 = か / が）なので、行番号で突き合わせられる。
 * @param {number} valueColumn braille2Kana の列。1 = 6 点値 / 3 = 8 点値
 */
const buildKanaMaps = function (valueColumn) {
  const encode = new Map(); // "が" -> [2, 33]
  const decode = new Map(); // "2,33" -> "が"
  for (let i = 0; i < braille2Kana.length; i++) {
    const base = braille2Kana[i][valueColumn];
    encode.set(braille2Kana[i][0], [null, base]);
    decode.set(`${base}`, braille2Kana[i][0]);

    const row = braille2KanaTable[i];
    if (!row) continue;
    for (const { column, mark } of KANA_MARKS) {
      const kana = row[column];
      if (!kana) continue;
      encode.set(kana, [mark, base]);
      decode.set(`${mark},${base}`, kana);
    }
  }
  return { encode, decode };
};

/* 仮名は 1〜6 の点しか使わないため、8 点点字でも 0 点・7 点は立たない
   （= 漢点字の始点・終点ビットと衝突しない）。 */
const KANA6 = buildKanaMaps(1);
const KANA8 = buildKanaMaps(3);

const err = function (e) {
  console.error(e);
  return "?";
};

/**
 * input[i] から始まるかなを点字にして out へ push する。
 * @returns {number} 消費した文字数。0 なら該当するかなが無い
 */
const encodeKana = function (input, i, maps, table, out) {
  /* 拗音は 2 文字（きゃ）なので長い方から照合する。 */
  const digraph = maps.encode.get(input.slice(i, i + 2));
  const entry = digraph ?? maps.encode.get(input[i]);
  if (!entry) return 0;

  const [mark, base] = entry;
  if (mark !== null) out.push(table[mark]);
  out.push(table[base]);
  return digraph ? 2 : 1;
};

/**
 * cells[i] から始まるかなを 1 文字復号する。
 * @returns {[string, number] | null} [かな, 消費したセル数]。該当が無ければ null
 */
const decodeKana = function (cells, i, maps) {
  /* 前置符号（1〜6）と素のかな（8 以上）は値が重ならないので取り違えない。 */
  if (i + 1 < cells.length) {
    const marked = maps.decode.get(`${cells[i]},${cells[i + 1]}`);
    if (marked) return [marked, 2];
  }
  const kana = maps.decode.get(`${cells[i]}`);
  return kana ? [kana, 1] : null;
};

const k2t = function (input) {
  const result = [];
  for (let i = 0; i < input.length;) {
    const consumed = encodeKana(input, i, KANA6, braille6Table, result);
    if (consumed) {
      i += consumed;
      continue;
    }
    err("変換できない文字が含まれています。：" + input[i]);
    i++;
  }
  return result.join("");
};

const t2k = function (input) {
  const cells = input.split("").map(m => braille6Table.indexOf(m)).map(m => m > 0 ? m : 0);
  const kanaInput = [];
  for (let i = 0; i < cells.length;) {
    const decoded = decodeKana(cells, i, KANA6);
    if (decoded) {
      kanaInput.push(decoded[0]);
      i += decoded[1];
      continue;
    }
    kanaInput.push(cells[i].toString(2).padStart(6, "0"));
    i++;
  }
  return kanaInput.join("");
};

const k2kt = function (input) {
  const result = [];
  for (let i = 0; i < input.length;) {
    const dex = braille2Kanji.find(dic => dic[0] == input[i]);
    if (dex) {
      const bin = dex[1].toString(2);
      if (!bin) {
        err("バイナリへの変換に失敗しました。：" + dex[1]);
        i++;
        continue;
      }
      for (let j = Math.ceil(bin.length / 8) - 1; j >= 0; j--) {
        const currentByte = dex[1] >> (j * 8) & 0xFF;
        result.push(braille8Table[currentByte]);
      }
      i++;
      continue;
    }

    /* braille2Kanji に仮名の行は無いので、漢字を優先しても取り違えは起きない。 */
    const consumed = encodeKana(input, i, KANA8, braille8Table, result);
    if (consumed) {
      i += consumed;
      continue;
    }

    err("変換できない文字が含まれています。：" + input[i]);
    i++;
  }
  return result.join("");
};

/* 始終点符号なしは 8 点点字から 0 点・7 点を切り捨てて詰めた形なので、出力は 6 点点字になる。
   braille2Kanji の 3 列目はその値で、全 6349 行とも 0 点・7 点が立たない
   （= braille8Table で引いても 6 点点字の字形になる）ことを確認済み。 */
const k2kt2 = function (input) {
  const result = [];
  for (let i = 0; i < input.length;) {
    const dex = braille2Kanji.find(dic => dic[0] == input[i]);
    if (dex) {
      const bin = dex[2].toString(2);
      if (!bin) return err("バイナリへの変換に失敗しました。");
      for (let j = Math.ceil(bin.length / 8) - 1; j >= 0; j--) {
        const currentByte = dex[2] >> (j * 8) & 0xFF;
        result.push(braille8Table[currentByte]);
      }
      i++;
      continue;
    }

    /* 仮名も 6 点点字で返す。 */
    const consumed = encodeKana(input, i, KANA6, braille6Table, result);
    if (consumed) {
      i += consumed;
      continue;
    }

    return err("変換できない文字が含まれています。：" + input[i]);
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

  /* 漢字として確定した要素は 1 文字なのでそのまま、8 ビット列は仮名として戻す。 */
  const kanaInput = [];
  for (let i = 0; i < binaryInput.length;) {
    if (binaryInput[i].length < 8) {
      kanaInput.push(binaryInput[i]);
      i++;
      continue;
    }

    const cells = [parseInt(binaryInput[i], 2)];
    if (i + 1 < binaryInput.length && binaryInput[i + 1].length >= 8) {
      cells.push(parseInt(binaryInput[i + 1], 2));
    }
    const decoded = decodeKana(cells, 0, KANA8);
    if (decoded) {
      kanaInput.push(decoded[0]);
      i += decoded[1];
      continue;
    }

    kanaInput.push(binaryInput[i]);
    i++;
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

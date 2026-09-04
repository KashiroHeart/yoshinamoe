// for tools/multicrypt/
// 変換種別の定義。各種別は「オプションのスキーマ」と「変換関数」を持つデータとして表現し、
// UI 側（main.js）はスキーマからフォームを自動生成する。
//
//   run(text, opt, warn) -> string
//     text : 前段の変換結果（先頭の段では入力テキスト）
//     opt  : スキーマの key をキーとしたオプション値
//     warn : 注意喚起を伝えるコールバック（例: 無視した文字がある）
//   利用者に伝えるべき不正入力は Error を throw する。

import { TABLES, DOT, DASH, normalizeJa, composeJa } from "./morse.js";
import { ALPHABETS, ALPHABET_CHOICES } from "./alphabets.js";
import { MIKAKA } from "./mikaka.js";
import { DAKUTEN, HANDAKUTEN, composeMark, decomposeKana, toKatakana } from "./kana.js";

// ---------------------------------------------------------------- 基数変換

const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

/** 10 進の BigInt を、指定基数における各桁の値の配列へ分解する。 */
const decToDigits = function (decimal, to) {
  if (decimal <= 0n) return [0];

  const base = BigInt(to);
  const digits = [];

  while (decimal > 0n) {
    digits.push(Number(decimal % base));
    decimal /= base;
  }

  return digits.reverse();
};

const baseConvert = {
  id: "base",
  name: "基数変換",
  options: [
    { key: "from", type: "number", label: "変換前の基数", value: 10, min: 2, max: 36 },
    { key: "to", type: "number", label: "変換後の基数", value: 2, min: 2, max: 36 },
    {
      key: "case", type: "select", label: "アルファベット", value: "lower",
      choices: [["lower", "小文字"], ["upper", "大文字"]],
    },
  ],
  run(text, opt, warn) {
    const from = Number(opt.from);
    const to = Number(opt.to);

    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 2 || to < 2 || from > 36 || to > 36) {
      throw new Error("基数は 2〜36 の整数で指定してください。");
    }

    const rule = DIGITS.slice(0, from);
    const chars = Array.from(text.toLowerCase());
    const valid = chars.filter(c => rule.indexOf(c) !== -1);

    if (valid.length !== chars.length) {
      warn("空白・改行および変換前の基数に存在しない文字を無視し、全体を 1 つの数値として変換しています。");
    }
    if (!valid.length) return "";

    // any -> 10
    const fromBig = BigInt(from);
    let decimal = 0n;
    for (const c of valid) decimal = decimal * fromBig + BigInt(rule.indexOf(c));

    // 10 -> any
    const out = decToDigits(decimal, to).map(d => DIGITS[d]).join("");

    return opt.case === "upper" ? out.toUpperCase() : out;
  },
};

// ---------------------------------------------------------------- シーザー

const caesar = {
  id: "caesar",
  name: "シーザー",
  options: [
    { key: "alphabet", type: "select", label: "配列", value: "abc", choices: ALPHABET_CHOICES },
    { key: "shift", type: "number", label: "桁数", value: 3 },
    {
      key: "unknown", type: "select", label: "配列に存在しない文字の扱い", value: "remove",
      choices: [["remove", "除去する"], ["keep", "変換せず素通し"], ["error", "変換エラー"]],
    },
  ],
  run(text, opt) {
    const rule = ALPHABETS.get(opt.alphabet);
    if (!rule) throw new Error("配列の指定が不正です。");

    const shift = Number(opt.shift);
    if (!Number.isInteger(shift)) throw new Error("桁数は整数で指定してください。");

    const size = rule.length;
    const out = [];

    for (const ch of Array.from(text)) {
      const at = rule.indexOf(ch);

      if (at === -1) {
        if (opt.unknown === "error") throw new Error("配列に存在しない文字が含まれています。");
        if (opt.unknown === "keep") out.push(ch);
        continue;
      }
      // 負の桁数でも正の剰余になるよう補正する
      out.push(rule[(((at + shift) % size) + size) % size]);
    }

    return out.join("");
  },
};

// ------------------------------------------------- 日本語エンコード／デコード

const CHARSETS = [
  ["utf8", "UTF-8"],
  ["utf16be", "UTF-16BE"],
  ["utf16le", "UTF-16LE"],
  ["sjis", "Shift_JIS"],
  ["eucjp", "EUC-JP"],
];

const FORMATS = [
  ["bin", "2進数"],
  ["dec", "10進数"],
  ["hex", "16進数"],
];

const FORMAT_SPEC = {
  bin: { radix: 2, width: 8, pattern: /^[01]+$/ },
  dec: { radix: 10, width: 3, pattern: /^[0-9]+$/ },
  hex: { radix: 16, width: 2, pattern: /^[0-9A-Fa-f]+$/ },
};

const formatName = function (id) {
  const hit = FORMATS.find(f => f[0] === id);
  return hit ? hit[1] : id;
};

const requireEncoding = function () {
  if (typeof Encoding === "undefined") {
    throw new Error("文字コード変換ライブラリを読み込めませんでした。");
  }
  return Encoding;
};

/** 文字列を、指定文字コードのバイト配列へ変換する。 */
const toBytes = function (text, charset) {
  if (charset === "utf8") {
    return Array.from(new TextEncoder().encode(text));
  }
  if (charset === "utf16be" || charset === "utf16le") {
    const bytes = [];
    for (let i = 0; i < text.length; i++) {
      const unit = text.charCodeAt(i);
      const hi = (unit >> 8) & 0xff;
      const lo = unit & 0xff;
      if (charset === "utf16be") bytes.push(hi, lo);
      else bytes.push(lo, hi);
    }
    return bytes;
  }

  const enc = requireEncoding();
  const to = charset === "sjis" ? "SJIS" : "EUCJP";

  return Array.from(enc.convert(enc.stringToCode(text), { to: to, from: "UNICODE" }));
};

/** バイト配列を、指定文字コードの文字列へ変換する。 */
const fromBytes = function (bytes, charset) {
  if (charset === "utf8") {
    return new TextDecoder("utf-8").decode(Uint8Array.from(bytes));
  }
  if (charset === "utf16be" || charset === "utf16le") {
    if (bytes.length % 2 !== 0) {
      throw new Error("UTF-16 のバイト数が偶数ではありません。");
    }
    let out = "";
    for (let i = 0; i < bytes.length; i += 2) {
      const unit = charset === "utf16be"
        ? (bytes[i] << 8) | bytes[i + 1]
        : (bytes[i + 1] << 8) | bytes[i];
      out += String.fromCharCode(unit);
    }
    return out;
  }

  const enc = requireEncoding();
  const from = charset === "sjis" ? "SJIS" : "EUCJP";

  return enc.codeToString(enc.convert(bytes, { to: "UNICODE", from: from }));
};

const formatBytes = function (bytes, format) {
  const spec = FORMAT_SPEC[format];

  return bytes.map(b => b.toString(spec.radix).toUpperCase().padStart(spec.width, "0")).join("");
};

const jpEncode = {
  id: "jp-encode",
  name: "日本語エンコード",
  options: [
    { key: "charset", type: "select", label: "文字コード", value: "utf8", choices: CHARSETS },
    { key: "format", type: "select", label: "出力フォーマット", value: "hex", choices: FORMATS },
    { key: "sep", type: "checkbox", label: "1 文字ごとに半角スペースで区切る", value: true },
  ],
  run(text, opt) {
    if (!text) return "";
    if (!FORMAT_SPEC[opt.format]) throw new Error("出力フォーマットが不正です。");

    if (!opt.sep) {
      return formatBytes(toBytes(text, opt.charset), opt.format);
    }

    // 元の 1 文字（コードポイント）単位でバイト群をまとめる
    return Array.from(text)
      .map(ch => formatBytes(toBytes(ch, opt.charset), opt.format))
      .join(" ");
  },
};

const jpDecode = {
  id: "jp-decode",
  name: "日本語デコード",
  options: [
    { key: "charset", type: "select", label: "文字コード", value: "utf8", choices: CHARSETS },
    { key: "format", type: "select", label: "入力フォーマット", value: "hex", choices: FORMATS },
  ],
  run(text, opt) {
    const spec = FORMAT_SPEC[opt.format];
    if (!spec) throw new Error("入力フォーマットが不正です。");

    const tokens = text.split(/\s+/).filter(t => t.length);
    if (!tokens.length) return "";

    const bytes = [];

    for (const token of tokens) {
      if (!spec.pattern.test(token)) {
        throw new Error(formatName(opt.format) + "として解釈できない文字が含まれています。");
      }
      if (token.length % spec.width !== 0) {
        throw new Error("各バイトは " + spec.width + " 桁で区切れる必要があります。");
      }
      for (let i = 0; i < token.length; i += spec.width) {
        const value = parseInt(token.slice(i, i + spec.width), spec.radix);
        if (!Number.isInteger(value) || value < 0 || value > 255) {
          throw new Error("1 バイトの範囲（0〜255）を超える値が含まれています。");
        }
        bytes.push(value);
      }
    }

    return fromBytes(bytes, opt.charset);
  },
};

// ------------------------------------------------------------ モールス信号

const LANGS = [["ja", "和文"], ["en", "欧文"]];

const morseOptions = function () {
  return [
    { key: "lang", type: "select", label: "文字体系", value: "ja", choices: LANGS },
    { key: "space", type: "text", label: "空白", value: " " },
    { key: "dot", type: "text", label: "短音", value: DOT },
    { key: "dash", type: "text", label: "長音", value: DASH },
  ];
};

/** 記号定義を検証して取り出す。 */
const morseMarks = function (opt) {
  const space = opt.space;
  const dot = opt.dot;
  const dash = opt.dash;

  if (!space || !dot || !dash) throw new Error("モールス記号の定義を空にはできません。");
  if (dot === dash || dot === space || dash === space) {
    throw new Error("モールス記号の定義が重複しています。");
  }

  return { space: space, dot: dot, dash: dash };
};

const morseEncode = {
  id: "morse-encode",
  name: "モールス信号エンコード",
  options: morseOptions(),
  run(text, opt, warn) {
    const marks = morseMarks(opt);
    const table = opt.lang === "en" ? TABLES.en : TABLES.ja;
    const chars = opt.lang === "en" ? Array.from(text.toUpperCase()) : normalizeJa(text);

    const signals = [];
    let ignored = false;

    for (const ch of chars) {
      if (/\s/.test(ch)) continue;

      const signal = table.toSignal.get(ch);
      if (signal === undefined) {
        ignored = true;
        continue;
      }
      signals.push(Array.from(signal).map(s => (s === DOT ? marks.dot : marks.dash)).join(""));
    }

    if (ignored) warn("モールス信号の表にない文字を無視しました。");

    return signals.join(marks.space);
  },
};

const morseDecode = {
  id: "morse-decode",
  name: "モールス信号デコード",
  options: morseOptions(),
  run(text, opt, warn) {
    const marks = morseMarks(opt);
    const table = opt.lang === "en" ? TABLES.en : TABLES.ja;

    // ユーザー定義の短音／長音を正規記号へ戻す。前方一致で長い定義から照合する。
    const rules = [[marks.dot, DOT], [marks.dash, DASH]].sort((a, b) => b[0].length - a[0].length);

    const tokens = text.split(marks.space).filter(t => t.trim().length);
    const chars = [];
    let ignored = false;

    for (const token of tokens) {
      let rest = token.trim();
      let signal = "";
      let broken = false;

      while (rest.length) {
        const hit = rules.find(r => rest.startsWith(r[0]));
        if (!hit) {
          broken = true;
          break;
        }
        signal += hit[1];
        rest = rest.slice(hit[0].length);
      }

      const ch = broken ? undefined : table.toChar.get(signal);
      if (ch === undefined) {
        ignored = true;
        continue;
      }
      chars.push(ch);
    }

    if (ignored) warn("モールス信号として解釈できない記号を無視しました。");

    return opt.lang === "en" ? chars.join("") : composeJa(chars);
  },
};

// ---------------------------------------------------------------- みかか暗号

// 表にない文字はそのまま通すため、変換中は「表から得た文字か」を持ち回る。
// { text, fromTable, upper }

/** 大文字のアルファベットかどうか。数字・記号・仮名は false。 */
const isUpperAlpha = function (ch) {
  return ch >= "A" && ch <= "Z";
};

/** カタカナかどうか（kana.js の toHiragana が変換する範囲と揃える）。 */
const isKatakana = function (ch) {
  const code = ch.codePointAt(0);
  return code >= 0x30a1 && code <= 0x30f6;
};

const mikakaEncode = {
  id: "mikaka-encode",
  name: "みかかエンコード",
  options: [
    {
      key: "kana", type: "select", label: "出力", value: "hiragana",
      choices: [
        ["hiragana", "ひらがな"],
        ["katakana", "カタカナ"],
        ["lower-hiragana", "小文字→ひらがな、大文字→カタカナ"],
        ["lower-katakana", "小文字→カタカナ、大文字→ひらがな"],
      ],
    },
  ],
  run(text, opt) {
    // 「ひらがな」「カタカナ」は入力の大小を区別しない。
    // 「小文字→…」の 2 つは入力の大小で出力の仮名を切り替える
    //（大小を持たない数字・記号は小文字と同じ側に寄せる）。
    const katakanaFor = function (upper) {
      if (opt.kana === "hiragana") return false;
      if (opt.kana === "katakana") return true;
      if (opt.kana === "lower-hiragana") return upper;
      return !upper;
    };

    const parts = [];

    for (const raw of Array.from(text)) {
      const kana = MIKAKA.toKana.get(raw.toLowerCase());

      if (kana === undefined) {
        parts.push({ text: raw, fromTable: false, upper: false });
        continue;
      }

      // 表から得た濁点・半濁点は、直前の表由来の仮名へ合成する
      const prev = parts.length ? parts[parts.length - 1] : null;
      if ((kana === DAKUTEN || kana === HANDAKUTEN) && prev && prev.fromTable) {
        const composed = composeMark(prev.text, kana);
        if (composed !== null) {
          prev.text = composed;
          continue;
        }
      }

      parts.push({ text: kana, fromTable: true, upper: isUpperAlpha(raw) });
    }

    return parts
      .map(p => (p.fromTable && katakanaFor(p.upper) ? toKatakana(p.text) : p.text))
      .join("");
  },
};

const mikakaDecode = {
  id: "mikaka-decode",
  name: "みかかデコード",
  options: [
    {
      key: "case", type: "select", label: "アルファベット", value: "lower",
      choices: [
        ["lower", "小文字"],
        ["upper", "大文字"],
        ["hiragana-lower", "ひらがな→小文字、カタカナ→大文字"],
        ["hiragana-upper", "ひらがな→大文字、カタカナ→小文字"],
      ],
    },
  ],
  run(text, opt) {
    // 「小文字」「大文字」は入力のひらがな／カタカナを区別しない。
    // 「ひらがな→…」の 2 つは入力の仮名の種類で出力の大小を切り替える。
    const upperFor = function (katakana) {
      if (opt.case === "lower") return false;
      if (opt.case === "upper") return true;
      if (opt.case === "hiragana-lower") return katakana;
      return !katakana;
    };

    const out = [];

    for (const raw of Array.from(text)) {
      const katakana = isKatakana(raw);

      // 濁音・半濁音・小書き仮名は分解してから引く（カタカナはひらがなへ寄せる）
      for (const ch of decomposeKana(raw)) {
        const key = MIKAKA.toKey.get(ch);

        if (key === undefined) out.push(ch);
        else out.push(upperFor(katakana) ? key.toUpperCase() : key);
      }
    }

    return out.join("");
  },
};

// ------------------------------------------------------------ 区切って付加／削除

const POSITIONS = [["head", "先頭"], ["tail", "末尾"]];

/** 入力を size 文字ごとの節へ分ける。末尾の節は size に満たないことがある。 */
const chunk = function (text, size) {
  const chars = Array.from(text);
  const chunks = [];

  for (let i = 0; i < chars.length; i += size) {
    chunks.push(chars.slice(i, i + size).join(""));
  }

  return chunks;
};

/** 節の長さ指定を検証して取り出す。 */
const chunkSize = function (value) {
  const size = Number(value);

  if (!Number.isInteger(size) || size < 1) {
    throw new Error("文字数は 1 以上の整数で指定してください。");
  }
  return size;
};

const splitAdd = {
  id: "split-add",
  name: "区切って付加",
  options: [
    { key: "size", type: "number", label: "文字数", value: 2, min: 1 },
    { key: "position", type: "select", label: "付加位置", value: "head", choices: POSITIONS },
    { key: "text", type: "text", label: "文字列", value: "" },
  ],
  run(text, opt) {
    const size = chunkSize(opt.size);
    const add = opt.text;

    return chunk(text, size)
      .map(part => (opt.position === "head" ? add + part : part + add))
      .join("");
  },
};

const splitRemove = {
  id: "split-remove",
  name: "区切って削除",
  options: [
    { key: "size", type: "number", label: "文字数", value: 2, min: 1 },
    { key: "position", type: "select", label: "削除位置", value: "head", choices: POSITIONS },
    { key: "count", type: "number", label: "削除文字数", value: 1, min: 0 },
  ],
  run(text, opt) {
    const size = chunkSize(opt.size);
    const count = Number(opt.count);

    if (!Number.isInteger(count) || count < 0) {
      throw new Error("削除文字数は 0 以上の整数で指定してください。");
    }
    if (count > size) {
      throw new Error("削除文字数が文字数を超えています。");
    }

    return chunk(text, size).map(function (part) {
      const chars = Array.from(part);
      // 末尾の節が size に満たない場合は、その節の長さまでを削除する
      return (opt.position === "head" ? chars.slice(count) : chars.slice(0, Math.max(0, chars.length - count))).join("");
    }).join("");
  },
};

export const STEP_TYPES = [
  baseConvert, caesar,
  jpEncode, jpDecode,
  morseEncode, morseDecode,
  mikakaEncode, mikakaDecode,
  splitAdd, splitRemove,
];

export const STEP_TYPE_BY_ID = new Map(STEP_TYPES.map(t => [t.id, t]));

/** 種別の既定オプションを生成する。 */
export const defaultOptions = function (type) {
  const opt = {};
  for (const o of type.options) opt[o.key] = o.value;
  return opt;
};

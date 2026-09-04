init(function () {
  // presets
  const presets = {
    "10": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "16": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
    "36": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "b32": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "2", "3", "4", "5", "6", "7"],
    "b64": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-"],
    "z85": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "-", ":", "+", "=", "^", "!", "/", "*", "?", "&", "<", ">", "(", ")", "[", "]", "{", "}", "@", "%", "$", "#"],
    "abc": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "abclarge": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    "50on": ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    "iroha": ['い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と', 'ち', 'り', 'ぬ', 'る', 'を', 'わ', 'か', 'よ', 'た', 'れ', 'そ', 'つ', 'ね', 'な', 'ら', 'む', 'う', 'ゐ', 'の', 'お', 'く', 'や', 'ま', 'け', 'ふ', 'こ', 'え', 'て', 'あ', 'さ', 'き', 'ゆ', 'め', 'み', 'し', 'ゑ', 'ひ', 'も', 'せ', 'す', 'ん'],
    "y252": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "-", ":", "+", "=", "^", "!", "/", "*", "?", "&", "<", ">", "(", ")", "[", "]", "{", "}", "@", "%", "$", "#", "ぁ", "あ", "ぃ", "い", "ぅ", "う", "ぇ", "え", "ぉ", "お", "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご", "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ", "た", "だ", "ち", "ぢ", "っ", "つ", "づ", "て", "で", "と", "ど", "な", "に", "ぬ", "ね", "の", "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ", "ま", "み", "む", "め", "も", "ゃ", "や", "ゅ", "ゆ", "ょ", "よ", "ら", "り", "る", "れ", "ろ", "ゎ", "わ", "ゐ", "ゑ", "を", "ん", "ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ", "カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ", "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ", "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ヮ", "ワ", "ヰ", "ヱ", "ヲ", "ン", "ヴ"],
  };
  const presetName = {
    "10": "10進数/10digit",
    "16": "16進数/16digit",
    "36": "36進数/36digit",
    "b32": "Base32",
    "b64": "Base64",
    "z85": "Z85",
    "abc": "a-z",
    "abclarge": "A-Z",
    "50on": "五十音",
    "iroha": "いろは",
    "y252": "Y252(独自配列)",
  };

  // elements
  const el = {};
  for (const id of [
    "input", "output", "input_base", "output_base", "input_base_echo", "output_caption",
    "mode", "ignore",
    "warn", "error",
    "mode2",
    "preset", "preset_replace", "preset_replace2",
    "array", "array2", "array_reverse", "array_len",
    "pattern1", "pattern2", "pattern2_output",
  ]) {
    el[id] = document.getElementById(id);
  }
  const array2Blocks = document.querySelectorAll(".mode2_array2");

  const state = {
    mode: true,   // true: 一方変換モード / false: 多方変換モード
    mode2: true,  // true: 同数列内で変換 / false: 変換後に別の数列で置換
    ignore: true,
  };

  // define functions
  const error = function (err) {
    el.error.textContent = err;
    if (err) el.output.value = "ERR";
  };
  const warn = function (err) {
    el.warn.textContent = err;
    return true;
  };

  /**
   * 10 進の BigInt を、指定基数における各桁の値の配列へ分解する。
   */
  const decToDigits = function (decimal, to) {
    // 基数が 2 未満だと桁が減らず無限ループになるため弾く
    if (!Number.isInteger(to) || to < 2) return [0];
    if (decimal <= 0n) return [0];

    const base = BigInt(to);
    const digits = [];

    while (decimal > 0n) {
      digits.push(Number(decimal % base));
      decimal /= base;
    }

    return digits.reverse();
  };

  const dectoany = function (decimal, to) {
    const rezRule = state.mode2 ? el.array.value.split("") : el.array2.value.split("");

    return decToDigits(decimal, to).map(s => rezRule[s]).join("");
  };

  const updateCaptions = function () {
    el.input_base_echo.textContent = el.input_base.value;
    el.output_caption.textContent = state.mode
      ? `${el.output_base.value} 進数`
      : `2〜${el.output_base.value} 進数`;
    el.array_len.textContent = el.array.value.length;
  };

  const convert = function () {
    updateCaptions();

    const rule = el.array.value.split("");

    const FROM = parseInt(el.input_base.value);
    const TO = parseInt(el.output_base.value);

    let inp = el.input.value.split("");

    let warned = false;
    // 不正を弾く処理
    if (!Number.isInteger(FROM) || !Number.isInteger(TO) || FROM < 2 || TO < 2) {
      error("基数は 2 以上の整数で指定してください。");
      return;
    }
    if (state.mode2 && rule.length < Math.max(FROM, TO)) {
      error("指定された基数が数列を超過しています。");
      return;
    }
    if (!state.mode2 && (rule.length < FROM || el.array2.value.length < TO)) {
      error("指定された基数が数列を超過しています。");
      return;
    }
    if (inp.some(f => rule.indexOf(f) == -1)) {
      if (state.ignore) {
        warned = warn("存在しない文字または改行があるため、省いて変換しています。");
        inp = inp.filter(f => rule.indexOf(f) != -1);
      } else {
        error("数列に存在しない文字が含まれています。");
        return;
      }
    }
    if (!state.mode2 && TO > el.array2.value.length) {
      error("変換後数列の文字数が不足しています。");
      return;
    }
    if (!warned) warn("");
    error("");

    // any -> 10
    const from = BigInt(FROM);
    let decimal = 0n;

    for (const c of inp) {
      decimal = decimal * from + BigInt(rule.indexOf(c));
    }

    // 10 -> any
    if (state.mode) {
      el.output.value = dectoany(decimal, TO);
    } else {
      const rows = [];

      for (let i = 2; i <= TO; i++) {
        const row = document.createElement("div");
        row.className = "row";

        const base = document.createElement("span");
        base.className = "base";
        base.textContent = i;

        const value = document.createElement("span");
        value.className = "value";
        value.textContent = dectoany(decimal, i);

        row.append(base, value);
        rows.push(row);
      }

      el.pattern2_output.replaceChildren(...rows);
    }
  };

  // setup
  el.input.addEventListener("input", convert);
  for (const target of [el.input_base, el.output_base]) {
    for (const type of ["input", "change"]) {
      target.addEventListener(type, convert);
    }
  }

  el.preset_replace.addEventListener("click", function () {
    const cur = presets[el.preset.value];

    if (cur) {
      el.array.value = cur.join("");
      convert();
    }
  });
  el.preset_replace2.addEventListener("click", function () {
    const cur = presets[el.preset.value];

    if (cur) {
      el.array2.value = cur.join("");
      convert();
    }
  });
  el.array_reverse.addEventListener("click", function () {
    if (state.mode2) return;

    const rule = el.array.value;
    const rule2 = el.array2.value;

    const FROM = el.input_base.value;
    const TO = el.output_base.value;

    const OUTPUT = el.output.value;

    el.array.value = rule2;
    el.array2.value = rule;

    el.input_base.value = TO;
    el.output_base.value = FROM;

    el.input.value = OUTPUT;

    convert();
  });
  el.array.addEventListener("input", convert);
  el.array2.addEventListener("input", convert);

  el.mode.addEventListener("change", function () {
    state.mode = el.mode.value === "1";

    el.pattern1.hidden = !state.mode;
    el.pattern2.hidden = state.mode;

    convert();
  });
  el.mode2.addEventListener("change", function () {
    state.mode2 = el.mode2.value === "1";

    for (const block of array2Blocks) block.hidden = state.mode2;
    el.preset_replace2.disabled = state.mode2;

    convert();
  });
  el.ignore.addEventListener("change", function () {
    state.ignore = el.ignore.checked;

    convert();
  });

  for (const id of Object.keys(presets)) {
    const opt = document.createElement("option");

    opt.value = id;
    opt.textContent = presetName[id];
    el.preset.append(opt);
  }

  updateCaptions();
  convert();
});

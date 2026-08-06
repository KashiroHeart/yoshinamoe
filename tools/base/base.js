init(function () {
  // presets
  const presets = {
    /*
    "2": ["0", "1"],
    "8": ["0", "1", "2", "3", "4", "5", "6", "7"],
    */
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
    "input", "output", "convert",
    "input_base", "output_base",
    "mode", "mode_sign", "auto", "auto_sign", "ignore", "ignore_sign",
    "warn", "error",
    "mode2", "mode2_sign",
    "preset", "preset_replace", "preset_replace2",
    "array", "array2", "array_reverse",
    "pattern1", "pattern2", "pattern2_output",
  ]) {
    el[id] = document.getElementById(id);
  }
  const array2Blocks = document.querySelectorAll(".mode2_array2");

  const state = {
    mode: true,   // true: 一方変換モード / false: 多方変換モード
    mode2: true,  // true: 同数列内で変換 / false: 変換後に別の数列で置換
    auto: true,
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

  const convert = function () {
    const rule = el.array.value.split("");

    const FROM = parseInt(el.input_base.value);
    const TO = parseInt(el.output_base.value);

    let inp = el.input.value.split("");

    let warned = false;
    // 不正を弾く処理
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
      const table = el.pattern2_output;

      const head = document.createElement("tr");
      for (const label of ["基数", "値"]) {
        const th = document.createElement("th");
        th.textContent = label;
        head.append(th);
      }
      table.replaceChildren(head);

      for (let i = 2; i <= TO; i++) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td = document.createElement("td");

        th.textContent = i;
        td.textContent = dectoany(decimal, i);

        tr.append(th, td);
        table.append(tr);
      }
    }
  };

  /**
   * 状態表示（span）の文言と色分けクラスを、現在の状態に合わせて更新する。
   */
  const applySign = function (sign, on, labels, classes) {
    sign.textContent = on ? labels[0] : labels[1];
    sign.className = on ? classes[0] : classes[1];
  };

  // setup
  el.convert.addEventListener("click", function () {
    convert();
  });
  el.input.addEventListener("input", function () {
    if (state.auto) convert();
  });
  for (const target of [el.input_base, el.output_base]) {
    for (const type of ["input", "change"]) {
      target.addEventListener(type, function () {
        if (state.auto) convert();
      });
    }
  }

  el.preset_replace.addEventListener("click", function () {
    const cur = presets[el.preset.value];

    if (cur) {
      el.array.value = cur.join("");
    }
  });
  el.preset_replace2.addEventListener("click", function () {
    const cur = presets[el.preset.value];

    if (cur) {
      el.array2.value = cur.join("");
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

  el.mode.addEventListener("click", function () {
    state.mode = !state.mode;

    el.pattern1.hidden = !state.mode;
    el.pattern2.hidden = state.mode;
    applySign(el.mode_sign, state.mode,
      ["一方変換モード", "多方変換モード"], ["mode_simple", "mode_multiple"]);

    if (state.auto) convert();
  });
  el.mode2.addEventListener("click", function () {
    state.mode2 = !state.mode2;

    applySign(el.mode2_sign, state.mode2,
      ["同数列内で変換", "変換後に別の数列で置換"], ["mode_simple", "mode_multiple"]);
    for (const block of array2Blocks) block.hidden = state.mode2;
    el.preset_replace2.disabled = state.mode2;
  });
  el.auto.addEventListener("click", function () {
    state.auto = !state.auto;

    applySign(el.auto_sign, state.auto, ["有効", "無効"], ["enabled", "disabled"]);
    el.convert.disabled = state.auto;

    if (state.auto) convert();
  });
  el.ignore.addEventListener("click", function () {
    state.ignore = !state.ignore;

    applySign(el.ignore_sign, state.ignore, ["有効", "無効"], ["enabled", "disabled"]);

    convert();
  });

  for (const id of Object.keys(presets)) {
    const opt = document.createElement("option");

    opt.value = id;
    opt.textContent = presetName[id];
    el.preset.append(opt);
  }
});

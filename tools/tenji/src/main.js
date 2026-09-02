import {
  braille6Table,
  braille8Table,
  braille2Kanji,
  braille2Kana,
}
from "./rules.js";
import {
  getAllCombinations
}
from "./combination.js";

const MODES = {
  "6": [
    { id: "k2t", label: "かな→点字" },
    { id: "t2k", label: "点字→かな" },
  ],
  "8": [
    { id: "k2kt", label: "漢字かな→漢点字" },
    { id: "kt2k", label: "漢点字→漢字" },
    { id: "k2kt2", label: "漢字→漢点字（始終点符号なし）" },
    { id: "forcefix", label: "始終点総当たり補完" },
  ],
};

init(function () {
  const el = {
    input: document.getElementById("input"),
    output: document.getElementById("output"),
    rows: document.getElementById("tj_rows"),
    inLabel: document.getElementById("tj_in_label"),
    outLabel: document.getElementById("tj_out_label"),
    warn: document.getElementById("tj_warn"),
    run: document.getElementById("tenji_run"),
  };

  let mode = "k2t";
  const modeButtons = [];

  const getInput = () => el.input.value;

  const setOutput = function (v) {
    el.output.hidden = false;
    el.rows.hidden = true;
    el.output.textContent = v;
    el.outLabel.textContent = `${v.length} 文字`;
  };

  const simulateExport = function (table) {
    el.output.hidden = true;
    el.rows.hidden = false;
    el.rows.replaceChildren();
    for (const [braille, kana] of table) {
      const row = document.createElement("div");
      row.className = "row";

      const b = document.createElement("span");
      b.className = "braille";
      b.textContent = braille;

      const k = document.createElement("span");
      k.className = "kana";
      k.textContent = kana;

      row.append(b, k);
      el.rows.append(row);
    }
    el.outLabel.textContent = `${table.length} 件`;
  };

  const err = function (e) {
    console.error(e);
    return "?";
  };

  const t2k = function (input) {
    const binaryInput = input.split("").map(m => braille6Table.indexOf(m)).map(m => m > 0 ? m.toString(2) : "0").map(m => "0".repeat(6 - m.length) + m);
    const kanaInput = [];
    for (const binary of binaryInput) {
      const char = braille2Kana.find(dic => dic[2] == parseInt(binary, 2))?.[0];
      kanaInput.push(char || binary);
    }
    return kanaInput.join("");
  };

  const k2t = function (input) {
    const result = [];
    for (const char of input) {
      const dex = braille2Kana.find(dic => dic[0] == char);
      if (!dex) {
        err("変換できない文字が含まれています。：" + char);
        continue;
      }

      const bin = dex[1].toString(2);
      if (!bin) {
        err("バイナリへの変換に失敗しました。：" + dex[1]);
        continue;
      }

      for (let i = Math.ceil(bin.length / 6) - 1; i >= 0; i--) {
        const currentByte = dex[1] >> (i * 6) & 0xFF;
        result.push(braille6Table[currentByte]);
      }
    }
    return result.join("");
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

  const runConversion = function () {
    const input = getInput();
    switch (mode) {
      case "k2t": setOutput(k2t(input)); break;
      case "t2k": setOutput(t2k(input)); break;
      case "k2kt": setOutput(k2kt(input)); break;
      case "kt2k": setOutput(kt2k(input)); break;
      case "k2kt2": setOutput(k2kt2(input)); break;
      case "forcefix": simulateExport(forcefix(input)); break;
    }
  };

  const updateWarn = function () {
    el.warn.textContent = mode === "forcefix"
      ? "総当たりモードは自動実行されません。10 文字以上の総当たりはクラッシュの恐れがあります。"
      : "";
  };

  const selectMode = function (id) {
    mode = id;
    for (const btn of modeButtons) btn.classList.toggle("is-active", btn.dataset.tj === id);
    updateWarn();

    el.inLabel.textContent = `${getInput().length} 文字`;

    if (mode !== "forcefix") {
      runConversion();
    }
  };

  for (const group of ["6", "8"]) {
    const container = document.querySelector(`.tenji-modes[data-group="${group}"]`);
    for (const m of MODES[group]) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tenji-mode";
      btn.dataset.tj = m.id;
      btn.innerHTML = `<span class="tenji-mode__dot"></span><span class="tenji-mode__label">${m.label}</span>`;
      btn.addEventListener("click", () => selectMode(m.id));
      container.append(btn);
      modeButtons.push(btn);
    }
  }

  el.input.addEventListener("input", function () {
    el.inLabel.textContent = `${getInput().length} 文字`;
    if (mode !== "forcefix") {
      runConversion();
    }
  });

  el.run.addEventListener("click", runConversion);

  selectMode("k2t");
});

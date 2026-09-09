/* 点字変換 / 暗号点字変換 の DOM 配線。モード構成だけを各ツールの main.js から渡す。 */

import {
  k2t,
  t2k,
  k2kt,
  k2kt2,
  kt2k,
  forcefix,
}
from "/src/tenji-convert.js";

const CONVERTERS = { k2t, t2k, k2kt, k2kt2, kt2k };

/**
 * @param {object} options
 * @param {object} options.modes  { "6": [{ id, label }, ...], "8": [...] }
 * @param {boolean} options.runButton  true なら #tenji_run で総当たりを手動実行する
 */
function setupTenjiUI({ modes, runButton = false }) {
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

    const modeIds = Object.values(modes).flat().map(m => m.id);
    let mode = modeIds[0];
    const modeButtons = [];

    const getInput = () => el.input.value;

    /* 総当たりモードのみ、自動変換すると入力のたびに指数的な探索が走ってしまう。 */
    const isManual = id => runButton && id === "forcefix";

    const setOutput = function (v) {
      el.output.hidden = false;
      if (el.rows) el.rows.hidden = true;
      el.output.textContent = v;
      el.outLabel.textContent = `${v.length} 文字`;
    };

    const simulateExport = function (table) {
      if (!el.rows) return;
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

    const runConversion = function () {
      const input = getInput();
      if (mode === "forcefix") {
        simulateExport(forcefix(input));
        return;
      }
      setOutput(CONVERTERS[mode](input));
    };

    const updateWarn = function () {
      if (!el.warn) return;
      el.warn.textContent = isManual(mode)
        ? "総当たりモードは自動実行されません。10 文字以上の総当たりはクラッシュの恐れがあります。"
        : "";
    };

    const selectMode = function (id) {
      mode = id;
      for (const btn of modeButtons) btn.classList.toggle("is-active", btn.dataset.tj === id);
      updateWarn();

      el.inLabel.textContent = `${getInput().length} 文字`;

      if (!isManual(mode)) {
        runConversion();
      }
    };

    for (const group of Object.keys(modes)) {
      const container = document.querySelector(`.tenji-modes[data-group="${group}"]`);
      if (!container) continue;
      for (const m of modes[group]) {
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
      if (!isManual(mode)) {
        runConversion();
      }
    });

    if (el.run) {
      el.run.addEventListener("click", runConversion);
    }

    selectMode(mode);
  });
}

export { setupTenjiUI };

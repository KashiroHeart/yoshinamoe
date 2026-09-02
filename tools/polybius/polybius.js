init(function () {
  const presets = [
    { name: "a - z（半角）", text: "abcdefghijklmnopqrstuvwxyz" },
    { name: "ａ - ｚ（全角）", text: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ" },
    { name: "a - z（半角、J抜き）", text: "abcdefghiklmnopqrstuvwxyz" },
    { name: "いろは", text: "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん" },
    { name: "五十音（あ - ん）", text: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" },
    { name: "五十音・濁音１（あ - ん＋が - ぽ）", text: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ" },
    { name: "五十音・濁音２（あ - ん　濁点追加）", text: "あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもやゆよらりるれろわをん" },
    { name: "Shift_JIS（ゐゑ抜き）", text: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわをん" },
    { name: "2タッチ入力（横専用）", text: "あいうえおＡＢＣＤＥかきくけこＦＧＨＩＪさしすせそＫＬＭＮＯたちつてとＰＱＲＳＴなにぬねのＵＶＷＸＹはひふへほＺ！？／ーまみむめも￥＆＿＿＿や（ゆ）よ＊＃　＿＿らりるれろ１２３４５わをん゛゜６７８９０" },
  ];

  const num1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const num2 = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９', 'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ'];

  const shift1 = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'];
  const shift2 = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
  const shiftA = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ"];

  const el = {};
  for (const id of [
    "pb_text", "pb_result", "pb_text_len",
    "pb_input_label", "pb_result_label",
    "pb_mode", "pb_preset", "pb_preset_apply",
    "pb_list", "pb_list_len", "pb_grid", "pb_grid_caption",
    "pb_copy",
    "pb_opt_case", "pb_opt_dakuon", "pb_opt_nomultiple", "pb_opt_ij", "pb_opt_wo", "pb_opt_iroha_dakuon", "pb_opt_0a",
  ]) {
    el[id] = document.getElementById(id);
  }
  const sortButtons = document.querySelectorAll(".pb-sort__btn");

  let mode = true; // true: 暗号生成モード / false: 暗号解読モード
  let sortType = "0"; // "0": 縦 / "1": 横

  const isChecked = (id) => el[id].checked;

  const updateExample = function () {
    const listbase = el.pb_list.value;
    el.pb_grid.replaceChildren();

    if (!listbase.length) {
      el.pb_grid_caption.textContent = "";
      return;
    }

    const listMax = Math.ceil(Math.sqrt(listbase.length));
    el.pb_grid_caption.textContent = `${listMax} × ${listMax}`;
    el.pb_grid.style.gridTemplateColumns = `repeat(${listMax + 1}, 1fr)`;

    const cells = [];
    for (let x = 0; x < listMax + 1; x++) {
      for (let y = 0; y < listMax + 1; y++) {
        const span = document.createElement("span");
        if (x === 0 || y === 0) {
          span.className = "head";
          span.textContent = num2[x || y];
        } else {
          span.textContent = sortType === "0"
            ? (listbase[(y - 1) * listMax + (x - 1)] || "")
            : (listbase[(x - 1) * listMax + (y - 1)] || "");
        }
        cells.push(span);
      }
    }
    el.pb_grid.append(...cells);
  };

  const updateResult = function () {
    const listbaseRaw = el.pb_list.value;
    let text = el.pb_text.value;

    if (!listbaseRaw.length || !text.length) {
      el.pb_result.textContent = "";
      return;
    }

    let listbase = listbaseRaw;

    if (isChecked("pb_opt_ij")) {
      text = text.replace(/j/g, "i").replace(/J/g, "I").replace(/ｊ/g, "ｉ").replace(/Ｊ/g, "Ｉ");
    }
    if (isChecked("pb_opt_case")) {
      listbase = listbase.toLowerCase();
      text = text.toLowerCase();
    }
    if (isChecked("pb_opt_0a")) {
      text = text.replace(/[0a]/g, "a");
    }

    const listMax = Math.ceil(Math.sqrt(listbase.length));
    const dakuonFlag = isChecked("pb_opt_iroha_dakuon");

    const base = listbase.split("");
    let result = [];

    if (dakuonFlag && !base[48]) {
      base.push("゛");
    }

    if (mode) {
      let material = text.split("");

      if (dakuonFlag) {
        for (const i in material) {
          if (shift1.indexOf(material[i]) !== -1) {
            material[i] = String.fromCharCode(material[i].charCodeAt() - 1) + "゛";
          } else if (shift2.indexOf(material[i]) !== -1) {
            material[i] = String.fromCharCode(material[i].charCodeAt() - 2) + "゛";
          }
        }
        material = material.join("").split("");
      }

      for (const i in material) {
        const letter = base.findIndex(x => x === material[i]);

        if (!isNaN(letter) && letter !== -1) {
          const x = (letter % listMax) + 1;
          const y = Math.ceil((letter + 1) / listMax);

          result.push(sortType === "0" ? `${num1[x]}${num1[y]}` : `${num1[y]}${num1[x]}`);
        } else {
          result.push("00");
        }
      }
    } else {
      const pos = text.match(/.{2}|.{1}/g);

      if (pos) {
        for (const i in pos) {
          const letter = pos[i].split("");
          const x = num1.indexOf(letter[0]);
          const y = num1.indexOf(letter[1]);

          if (!x || !y) continue;

          result.push(sortType === "0" ? (base[(y - 1) * listMax + (x - 1)] || "") : (base[(x - 1) * listMax + (y - 1)] || ""));
        }
      }
    }

    result = result.join("");
    if (isChecked("pb_opt_0a")) {
      result = result.replace(/a/g, "0");
    }

    el.pb_result.textContent = result;
  };

  const update = function () {
    el.pb_text_len.textContent = el.pb_text.value.length;
    el.pb_list_len.textContent = el.pb_list.value.length;

    updateResult();
    updateExample();
  };

  const updateInput = function () {
    if (isChecked("pb_opt_dakuon") && mode) {
      const input1 = el.pb_list.value;
      const input2 = el.pb_text.value.split("");

      for (const i in input2) {
        if (input1.indexOf(input2[i]) !== -1) continue;
        if (shift1.indexOf(input2[i]) !== -1) {
          input2[i] = String.fromCharCode(input2[i].charCodeAt() - 1);
        } else if (shift2.indexOf(input2[i]) !== -1) {
          input2[i] = String.fromCharCode(input2[i].charCodeAt() - 2);
        } else if (shiftA.indexOf(input2[i]) !== -1) {
          input2[i] = String.fromCharCode(input2[i].charCodeAt() + 1);
        }
      }

      el.pb_text.value = input2.join("");
    }
    if (isChecked("pb_opt_wo") && mode) {
      el.pb_text.value = el.pb_text.value.replace(/を/g, "お");
    }
    if (isChecked("pb_opt_nomultiple") && mode) {
      const input1 = el.pb_list.value.split("");
      const input2 = el.pb_text.value.split("").filter(x => input1.find(y => x === y));

      el.pb_text.value = input2.join("");
    }

    update();
  };

  el.pb_text.addEventListener("input", update);
  el.pb_text.addEventListener("change", updateInput);
  el.pb_list.addEventListener("input", update);
  el.pb_list.addEventListener("change", updateInput);

  for (const btn of sortButtons) {
    btn.addEventListener("click", function () {
      sortType = btn.dataset.sort;
      for (const b of sortButtons) b.classList.toggle("is-active", b === btn);
      update();
    });
  }

  el.pb_preset_apply.addEventListener("click", function () {
    const cur = presets[el.pb_preset.value];
    if (cur) {
      el.pb_list.value = cur.text;
      update();
    }
  });

  el.pb_mode.addEventListener("change", function () {
    mode = el.pb_mode.value === "1";

    el.pb_input_label.textContent = mode ? "平文" : "暗号文";
    el.pb_result_label.textContent = mode ? "暗号文" : "平文";

    el.pb_text.value = "";
    update();
  });

  let copyResetTimer = null;
  el.pb_copy.addEventListener("click", async function () {
    const text = el.pb_result.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents(el.pb_result);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

    el.pb_copy.textContent = "コピーしました";
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => { el.pb_copy.textContent = "コピー"; }, 1500);
  });

  for (const i in presets) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = presets[i].name;
    el.pb_preset.append(opt);
  }

  for (const opts of ["pb_opt_case", "pb_opt_dakuon", "pb_opt_nomultiple", "pb_opt_ij", "pb_opt_wo", "pb_opt_iroha_dakuon", "pb_opt_0a"]) {
    el[opts].addEventListener("change", update);
  }

  update();
});

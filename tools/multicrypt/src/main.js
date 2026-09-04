// for tools/multicrypt/index.php
// リスト／ドックの描画、ポインタ操作によるドラッグ&ドロップ、変換パイプの実行。

import { STEP_TYPES, STEP_TYPE_BY_ID, defaultOptions } from "./steps.js";

init(function () {
  // elements
  const el = {};
  for (const id of [
    "mc_main", "mc_input", "mc_input_len", "mc_output", "mc_copy",
    "mc_steps_area", "mc_steps", "mc_warn", "mc_error",
    "mc_view", "mc_list", "mc_dock", "mc_dock_len",
  ]) {
    el[id] = document.getElementById(id);
  }

  // ドックに並んだ変換の配列がこのツールの唯一の状態。
  // { uid, typeId, opt: { ... } }
  const dock = [];
  let uidSeq = 0;

  const createStep = function (typeId) {
    const type = STEP_TYPE_BY_ID.get(typeId);

    return { uid: ++uidSeq, typeId: typeId, opt: defaultOptions(type) };
  };

  // ============================================================ 変換の実行

  const renderSteps = function (results) {
    const cards = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      const card = document.createElement("div");
      card.className = result.ok ? "mc-step" : "mc-step is-error";

      const head = document.createElement("div");
      head.className = "mc-step__head";

      const no = document.createElement("span");
      no.className = "mc-step__no";
      no.textContent = i + 1;

      const name = document.createElement("span");
      name.textContent = result.name;

      head.append(no, name);

      const body = document.createElement("div");
      body.className = "mc-step__body";

      if (!result.ok) {
        body.textContent = result.msg;
      } else if (result.text === "") {
        body.className += " mc-step__empty";
        body.textContent = "（空）";
      } else {
        body.textContent = result.text;
      }

      card.append(head, body);
      cards.push(card);
    }

    if (!cards.length) {
      const empty = document.createElement("div");
      empty.className = "mc-step__body mc-step__empty";
      empty.textContent = "ドックに変換が配置されていません。";
      cards.push(empty);
    }

    el.mc_steps.replaceChildren(...cards);
  };

  const run = function () {
    el.mc_input_len.textContent = Array.from(el.mc_input.value).length;
    el.mc_dock_len.textContent = dock.length;

    let text = el.mc_input.value;
    const results = [];
    const warns = [];
    let error = "";

    for (let i = 0; i < dock.length; i++) {
      const step = dock[i];
      const type = STEP_TYPE_BY_ID.get(step.typeId);
      const prefix = (i + 1) + ". " + type.name + "：";

      try {
        const collected = [];
        text = type.run(text, step.opt, m => collected.push(m));

        results.push({ ok: true, name: type.name, text: text });
        for (const m of collected) {
          if (warns.indexOf(prefix + m) === -1) warns.push(prefix + m);
        }
      } catch (e) {
        results.push({ ok: false, name: type.name, msg: e.message });
        error = prefix + e.message;
        break;
      }
    }

    el.mc_output.value = text;
    el.mc_warn.textContent = warns.join(" / ");
    el.mc_error.textContent = error;

    if (el.mc_view.value === "1") renderSteps(results);
  };

  // ==================================================== 設定フォームの生成

  const createOptionField = function (step, option) {
    if (option.type === "checkbox") {
      const label = document.createElement("label");
      label.className = "checkbox-row";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "checkbox-native";
      input.checked = !!step.opt[option.key];

      const box = document.createElement("span");
      box.className = "checkbox-row__box";
      const check = document.createElement("span");
      check.className = "check";
      check.textContent = "✓";
      box.append(check);

      const text = document.createElement("span");
      text.textContent = option.label;

      input.addEventListener("change", function () {
        step.opt[option.key] = input.checked;
        run();
      });

      label.append(input, box, text);
      return label;
    }

    const label = document.createElement("label");
    label.style.display = "block";

    const caption = document.createElement("span");
    caption.className = "field-label";
    caption.textContent = option.label;
    label.append(caption);

    if (option.type === "select") {
      const select = document.createElement("select");

      for (const [value, name] of option.choices) {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = name;
        select.append(opt);
      }
      select.value = step.opt[option.key];

      select.addEventListener("change", function () {
        step.opt[option.key] = select.value;
        run();
      });

      label.append(select);
      return label;
    }

    const input = document.createElement("input");
    input.type = option.type === "number" ? "number" : "text";
    input.value = step.opt[option.key];
    if (option.type === "number") {
      if (option.min !== undefined) input.min = option.min;
      if (option.max !== undefined) input.max = option.max;
    }

    for (const type of ["input", "change"]) {
      input.addEventListener(type, function () {
        step.opt[option.key] = input.value;
        run();
      });
    }

    label.append(input);
    return label;
  };

  /** スキーマからカードの設定欄を生成する。同種のテキスト／数値欄は横並びにまとめる。 */
  const createOptionFields = function (step, type) {
    const nodes = [];
    const options = type.options;

    for (let i = 0; i < options.length;) {
      const kind = options[i].type;

      if (kind !== "number" && kind !== "text") {
        nodes.push(createOptionField(step, options[i]));
        i++;
        continue;
      }

      const group = [];
      while (i < options.length && options[i].type === kind) {
        group.push(options[i]);
        i++;
      }

      if (group.length === 1) {
        nodes.push(createOptionField(step, group[0]));
        continue;
      }

      const row = document.createElement("div");
      row.className = "row2";
      row.append(...group.map(o => createOptionField(step, o)));
      nodes.push(row);
    }

    return nodes;
  };

  // ================================================ リスト／ドックの描画

  const renderList = function () {
    const chips = STEP_TYPES.map(function (type) {
      const chip = document.createElement("div");
      chip.className = "mc-chip";
      chip.textContent = type.name;
      chip.addEventListener("pointerdown", function (e) {
        beginPointer(e, { source: "list", typeId: type.id, label: type.name });
      });
      return chip;
    });

    el.mc_list.replaceChildren(...chips);
  };

  const createCard = function (step, index) {
    const type = STEP_TYPE_BY_ID.get(step.typeId);

    const card = document.createElement("div");
    card.className = "mc-card";
    card.dataset.uid = step.uid;

    const head = document.createElement("div");
    head.className = "mc-card__head";

    const handle = document.createElement("span");
    handle.className = "mc-card__handle";
    handle.textContent = "≡";
    handle.title = "ドラッグして並び替え";
    handle.addEventListener("pointerdown", function (e) {
      beginPointer(e, { source: "dock", uid: step.uid, label: type.name });
    });

    const no = document.createElement("span");
    no.className = "mc-card__no";
    no.textContent = index + 1;

    const name = document.createElement("span");
    name.className = "mc-card__name";
    name.textContent = type.name;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "link-btn";
    remove.textContent = "削除";
    remove.addEventListener("click", function () {
      const at = dock.findIndex(s => s.uid === step.uid);
      if (at !== -1) dock.splice(at, 1);
      renderDock();
      run();
    });

    head.append(handle, no, name, remove);

    const body = document.createElement("div");
    body.className = "mc-card__body";
    body.append(...createOptionFields(step, type));

    card.append(head, body);
    return card;
  };

  const renderDock = function () {
    if (!dock.length) {
      const empty = document.createElement("p");
      empty.className = "mc-dock__empty";
      empty.textContent = "リストから変換種別をここへドラッグしてください。";
      el.mc_dock.replaceChildren(empty);
      return;
    }

    el.mc_dock.replaceChildren(...dock.map(createCard));
  };

  // ================================ ドラッグ&ドロップ（Pointer Events 自前実装）

  const DRAG_THRESHOLD = 4;

  let pending = null; // { payload, x, y, pointerId }
  let drag = null;    // { payload, ghost, placeholder, cardEl }

  const dockCards = function () {
    return Array.from(el.mc_dock.querySelectorAll(".mc-card"));
  };

  const beginPointer = function (e, payload) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();

    pending = { payload: payload, x: e.clientX, y: e.clientY, pointerId: e.pointerId };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
  };

  const startDrag = function () {
    const payload = pending.payload;

    const ghost = document.createElement("div");
    ghost.className = "mc-ghost";
    ghost.textContent = payload.label;
    document.body.append(ghost);

    const placeholder = document.createElement("div");
    placeholder.className = "mc-placeholder";

    let cardEl = null;
    if (payload.source === "dock") {
      cardEl = dockCards().find(c => Number(c.dataset.uid) === payload.uid) || null;
      if (cardEl) cardEl.classList.add("is-dragging");
    }

    document.body.classList.add("mc-dragging");

    drag = { payload: payload, ghost: ghost, placeholder: placeholder, cardEl: cardEl };
  };

  /** ポインタ位置からドロップ先を決め、プレースホルダを差し込む。 */
  const updateDrag = function (x, y) {
    drag.ghost.style.left = (x + 14) + "px";
    drag.ghost.style.top = (y + 14) + "px";

    const rect = el.mc_dock.getBoundingClientRect();
    const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (!inside) {
      el.mc_dock.classList.remove("is-target");
      drag.placeholder.remove();
      return;
    }

    el.mc_dock.classList.add("is-target");

    const targets = dockCards().filter(c => c !== drag.cardEl);
    const before = targets.find(function (c) {
      const r = c.getBoundingClientRect();
      return y < r.top + r.height / 2;
    });

    const empty = el.mc_dock.querySelector(".mc-dock__empty");
    if (empty) empty.remove();

    if (before) el.mc_dock.insertBefore(drag.placeholder, before);
    else el.mc_dock.append(drag.placeholder);
  };

  /** プレースホルダの位置を、ドラッグ中の要素を除いた配列上のインデックスへ変換する。 */
  const placeholderIndex = function () {
    if (!drag.placeholder.parentNode) return -1;

    let index = 0;
    for (const node of Array.from(el.mc_dock.children)) {
      if (node === drag.placeholder) return index;
      if (node.classList.contains("mc-card") && node !== drag.cardEl) index++;
    }
    return index;
  };

  const endDrag = function (commit) {
    if (!drag) return;

    const index = commit ? placeholderIndex() : -1;
    const payload = drag.payload;

    drag.ghost.remove();
    drag.placeholder.remove();
    if (drag.cardEl) drag.cardEl.classList.remove("is-dragging");
    el.mc_dock.classList.remove("is-target");
    document.body.classList.remove("mc-dragging");
    drag = null;

    if (index !== -1) {
      if (payload.source === "list") {
        dock.splice(index, 0, createStep(payload.typeId));
      } else {
        const from = dock.findIndex(s => s.uid === payload.uid);
        if (from !== -1) {
          const [step] = dock.splice(from, 1);
          dock.splice(index, 0, step);
        }
      }
    }

    renderDock();
    run();
  };

  const detach = function () {
    pending = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerCancel);
  };

  function onPointerMove(e) {
    if (!pending || e.pointerId !== pending.pointerId) return;

    if (!drag) {
      const moved = Math.abs(e.clientX - pending.x) + Math.abs(e.clientY - pending.y);
      if (moved < DRAG_THRESHOLD) return;
      startDrag();
    }

    e.preventDefault();
    updateDrag(e.clientX, e.clientY);
  }

  function onPointerUp(e) {
    if (!pending || e.pointerId !== pending.pointerId) return;

    endDrag(true);
    detach();
  }

  function onPointerCancel(e) {
    if (!pending || e.pointerId !== pending.pointerId) return;

    endDrag(false);
    detach();
  }

  // ============================================================ その他の操作

  el.mc_input.addEventListener("input", run);

  el.mc_view.addEventListener("change", function () {
    const stepMode = el.mc_view.value === "1";

    el.mc_main.classList.toggle("is-steps", stepMode);
    el.mc_steps_area.hidden = !stepMode;
    run();
  });

  let copyResetTimer = null;
  el.mc_copy.addEventListener("click", async function () {
    const text = el.mc_output.value;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      el.mc_output.select();
      document.execCommand("copy");
      el.mc_output.setSelectionRange(0, 0);
    }

    el.mc_copy.textContent = "コピーしました";
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(() => { el.mc_copy.textContent = "コピー"; }, 1500);
  });

  renderList();
  renderDock();
  run();
});

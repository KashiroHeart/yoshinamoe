import { list1, list2, list3, list4 } from "./codes.js";

init(function () {
  let EX = false;

  const tablesEl = document.getElementById("ct_tables");
  const sortbox1 = document.getElementById("nsort1");
  const sortbox2 = document.getElementById("nsort2");
  const thead = document.querySelector("#nlist thead");
  const tbody = document.querySelector("#nlist tbody");
  const form = document.getElementById("nshowing");

  let currentKey = null;
  const tableButtons = {};

  const activeParam = (key) => EX ? Object.assign({}, list4[key].param, list4[key].exparam || {}) : list4[key].param;

  const listheadupdate = function (key) {
    thead.replaceChildren();

    const header = document.createElement("tr");
    const noTh = document.createElement("th");
    noTh.textContent = "No.";
    header.append(noTh);

    const param = activeParam(key);
    for (const i in param) {
      const th = document.createElement("th");
      th.className = "c-" + i;
      th.textContent = param[i];
      header.append(th);
    }
    thead.append(header);
  };

  const listbodyupdate = function (key) {
    tbody.replaceChildren();
    let L2 = [].concat(list2[key]);
    const L4 = list4[key];

    const rule = sortbox1.value.split("-");
    const order = sortbox2.value;

    const L1 = list1[rule[1]];
    if (L1) {
      L2 = L2.sort((a, b) => {
        let ind1 = L1.findIndex(x => x == a[rule[0]]);
        let ind2 = L1.findIndex(x => x == b[rule[0]]);
        if (Number(order)) {
          if (ind1 == -1) ind1 = -L2.length;
          if (ind2 == -1) ind2 = -L2.length;
          return ind2 - ind1;
        } else {
          if (ind1 == -1) ind1 = L2.length;
          if (ind2 == -1) ind2 = L2.length;
          return ind1 - ind2;
        }
      });
    } else if (Number(order)) {
      L2 = L2.sort((a, b) => L2.indexOf(b) - L2.indexOf(a));
    } else {
      L2 = L2.sort((a, b) => L2.indexOf(a) - L2.indexOf(b));
    }

    const param = activeParam(key);
    const rows = [];
    for (const i in L2) {
      const row = document.createElement("tr");
      const numCell = document.createElement("td");
      numCell.textContent = Number(i) + 1;
      row.append(numCell);

      for (const j in param) {
        const cell = document.createElement("td");
        cell.className = "c-" + j;
        cell.textContent = L2[i][j];
        row.append(cell);
      }
      rows.push(row);
    }
    tbody.append(...rows);
  };

  const filtering = function () {
    const checkboxes = form.querySelectorAll("input[type='checkbox']");

    document.querySelectorAll("#nlist th, #nlist td").forEach(el => { el.style.display = ""; });

    const unshow = [];
    for (const box of checkboxes) {
      if (box.checked) continue;
      unshow.push(".c-" + box.name);
    }
    if (unshow.length) {
      document.querySelectorAll(unshow.join(", ")).forEach(el => { el.style.display = "none"; });
    }
  };

  const setActiveTableButton = function (key) {
    for (const k in tableButtons) {
      tableButtons[k].classList.toggle("is-active", k === key);
    }
  };

  const listupdate = function (t) {
    const key = currentKey;
    if (!list4[key]) return;

    setActiveTableButton(key);

    sortbox1.replaceChildren();
    form.replaceChildren();

    const def = document.createElement("option");
    def.value = "-";
    def.textContent = "デフォルト";
    sortbox1.append(def);

    for (const i of list4[key].sort) {
      const opt = document.createElement("option");
      opt.value = i.rule.join("-");
      opt.textContent = i.name;
      sortbox1.append(opt);
    }

    const param = activeParam(key);
    for (const i in param) {
      const label = document.createElement("label");
      label.className = "checkbox-row";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox-native";
      checkbox.name = i;
      checkbox.id = "col_" + i;
      checkbox.checked = true;
      checkbox.addEventListener("change", filtering);

      const box = document.createElement("span");
      box.className = "checkbox-row__box";
      box.innerHTML = '<span class="check">✓</span>';

      const text = document.createElement("span");
      text.textContent = param[i];

      label.append(checkbox, box, text);
      form.append(label);
    }

    if (typeof t === "object") {
      for (const i in t) {
        const target = document.getElementById(i);
        if (target) target.value = t[i];
      }
    }

    listheadupdate(key);
    listbodyupdate(key);
  };

  const pickTable = function (key) {
    currentKey = key;
    listupdate();
  };

  sortbox1.addEventListener("change", function () {
    listbodyupdate(currentKey);
    filtering();
  });
  sortbox2.addEventListener("change", function () {
    listbodyupdate(currentKey);
    filtering();
  });

  // create table select buttons
  for (const i in list4) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = list3[i];
    btn.addEventListener("click", () => pickTable(i));
    tablesEl.append(btn);
    tableButtons[i] = btn;
  }

  // focus to exist option
  if (location.search.startsWith("?")) {
    const keys = location.search.slice(1).split("&");
    const opt = {};
    let initialKey = "morse";
    for (const req of keys) {
      const key = req.split("=");
      if (!key[1]) continue;

      switch (key[0]) {
        case "table":
          if (list4[key[1]]) initialKey = key[1];
          break;
        case "sort":
          opt.nsort1 = key[1];
          break;
        case "order":
          opt.nsort2 = key[1];
          break;
        case "ex":
        case "exparam":
          if (key[1] == "true") EX = true;
          break;
      }
    }
    currentKey = initialKey;
    listupdate(opt);
  } else {
    currentKey = "morse";
    listupdate();
  }

  filtering();
});

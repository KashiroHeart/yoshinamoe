/*
 * カラーパレット機能。
 * 5 プリセットから主色・副色・強調の 3 色を選び、CSS カスタムプロパティとして
 * <html> に適用する。背景の無彩色ランプ（--bg / --s1 / --s2 / --s3 / --s3h / --s4 /
 * --rowalt / --line）は主色の色相へわずかに寄せて（明度は共通、彩度は主色の
 * 彩度に応じて弱める）生成するため、パレット切り替えで画面全体の色調が連動する。
 *
 * 選択はブラウザの localStorage にのみ保存する（アカウント機能は無いため）。
 * このスクリプトは <head> 内で同期実行し、初回ペイント前に色を確定させる。
 */
(function () {
  "use strict";

  var STORAGE_KEY = "ym-palette";

  var PALETTES = [
    { name: "宵闇", roman: "YOIYAMI", c: ["#9184d9", "#6b8fd9", "#d9a05c"] },
    { name: "若草", roman: "WAKAKUSA", c: ["#b0f04a", "#4ad9a0", "#e8d44a"] },
    { name: "珊瑚", roman: "SANGO", c: ["#ff8172", "#ffb26b", "#5ed3d3"] },
    { name: "藍鉄", roman: "AITETSU", c: ["#5aa9e6", "#93aec8", "#e6a15a"] },
    { name: "墨", roman: "SUMI", c: ["#c9c9d4", "#9a9aa8", "#e4e4ee"] },
  ];

  // [明度, 彩度] — 明度は現行相当、彩度は主色の彩度に応じて 0 に近づける
  var RAMP = {
    "--bg": [0.222, 0.020], "--s1": [0.263, 0.022], "--s2": [0.166, 0.019],
    "--s3": [0.291, 0.025], "--s3h": [0.305, 0.032], "--s4": [0.135, 0.017],
    "--rowalt": [0.238, 0.018], "--line": [0.398, 0.024],
  };

  function oklab(hex) {
    var h = hex.replace("#", "");
    function f(i) {
      var v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    var r = f(0), g = f(2), b = f(4);
    var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    var m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    var s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return {
      A: 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      B: 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
    };
  }

  function neutrals(primaryHex) {
    var ab = oklab(primaryHex);
    var hue = Math.atan2(ab.B, ab.A) * 180 / Math.PI;
    if (hue < 0) hue += 360;
    var chroma = Math.sqrt(ab.A * ab.A + ab.B * ab.B);
    var f = Math.max(0.22, Math.min(1, chroma / 0.13));
    var out = {};
    Object.keys(RAMP).forEach(function (k) {
      out[k] = "oklch(" + RAMP[k][0] + " " + (RAMP[k][1] * f).toFixed(4) + " " + hue.toFixed(1) + ")";
    });
    return out;
  }

  function clampIndex(i) {
    i = parseInt(i, 10);
    if (isNaN(i) || i < 0 || i >= PALETTES.length) return 0;
    return i;
  }

  function loadIndex() {
    try {
      return clampIndex(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return 0;
    }
  }

  function saveIndex(i) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(i));
    } catch (e) {
      /* localStorage が使えない環境では次回起動時も既定パレットになる */
    }
  }

  var current = loadIndex();

  function apply(index) {
    current = clampIndex(index);
    var pal = PALETTES[current];
    var root = document.documentElement.style;

    root.setProperty("--p1", pal.c[0]);
    root.setProperty("--p2", pal.c[1]);
    root.setProperty("--p3", pal.c[2]);

    var n = neutrals(pal.c[0]);
    Object.keys(n).forEach(function (k) {
      root.setProperty(k, n[k]);
    });

    var nameEls = document.querySelectorAll(".palette-chip__name");
    for (var i = 0; i < nameEls.length; i++) nameEls[i].textContent = pal.name;
  }

  apply(current);

  function wireChips() {
    var chips = document.querySelectorAll(".palette-chip");
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", function () {
        saveIndex((current + 1) % PALETTES.length);
        apply(current);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireChips);
  } else {
    wireChips();
  }

  window.YMPalette = { PALETTES: PALETTES, apply: apply, current: function () { return current; } };
})();

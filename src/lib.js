/* ぽかぽか音頭 feat. 557_sincerely */

/**
 *
 */
function init(eventHandler){
  document.addEventListener("DOMContentLoaded", eventHandler);
}

/* SP 版の設定ドロワー開閉（幅 640px 以下でのみ CSS 側が有効化される） */
init(function () {
  document.querySelectorAll("[data-drawer-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var drawer = btn.closest(".tool-drawer");
      if (drawer) drawer.classList.toggle("is-open");
    });
  });
});
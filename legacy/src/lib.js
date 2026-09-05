/* ぽかぽか音頭 feat. 557_sincerely */

/**
 * DOM 構築後にハンドラを実行する。
 * 既に構築が終わっている場合（module スクリプトなどからの遅い呼び出し）は即時実行する。
 */
function init(eventHandler){
  if( document.readyState === "loading" ){
    document.addEventListener("DOMContentLoaded", eventHandler);
  }else{
    eventHandler();
  }
}

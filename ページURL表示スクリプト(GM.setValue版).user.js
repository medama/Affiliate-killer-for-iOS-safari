// ==UserScript==
// @name           ページURL表示スクリプト（GM.setValue/GM.getValue版）
// @namespace      Violentmonkey Scripts
// @version        1.0
// @description    GM.setValueとGM.getValueを使用してページURLを表示するスクリプト
// @match          *://*/*
// @grant          GM.setValue
// @grant          GM.getValue
// ==/UserScript==

(async () => {
  // 現在のページのURLを取得
  const currentUrl = window.location.href;

  // URLを保存
  await GM.setValue('pageUrl', currentUrl);

  // URLを取得して表示
  const displayElement = document.createElement('div');
  displayElement.style.position = 'fixed';
  displayElement.style.bottom = '10px';
  displayElement.style.left = '10px';
  displayElement.style.background = 'white';
  displayElement.style.padding = '10px';
  displayElement.style.border = '1px solid black';
  displayElement.textContent = '現在のページURL: ' + await GM.getValue('pageUrl');
  document.body.appendChild(displayElement);
})();

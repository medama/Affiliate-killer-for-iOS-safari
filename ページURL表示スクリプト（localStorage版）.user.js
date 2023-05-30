// ==UserScript==
// @name           ページURL表示スクリプト（localStorage版）
// @namespace      Violentmonkey Scripts
// @version        1.0
// @description    localStorageを使用してページURLを表示するスクリプト
// @match          *://*/*
// ==/UserScript==

// 現在のページのURLを取得
const currentUrl = window.location.href;

// URLをlocalStorageに保存
localStorage.setItem('pageUrl', currentUrl);

// ページ下部に表示する要素を作成
const displayElement = document.createElement('div');
displayElement.style.position = 'fixed';
displayElement.style.bottom = '10px';
displayElement.style.left = '10px';
displayElement.style.background = 'white';
displayElement.style.padding = '10px';
displayElement.style.border = '1px solid black';
displayElement.textContent = '現在のページURL: ' + localStorage.getItem('pageUrl');

// ページに要素を追加
document.body.appendChild(displayElement);

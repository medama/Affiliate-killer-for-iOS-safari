// ==UserScript==
// @name         エラー有実験短縮URL展開スクリプト
// @namespace    violentmonkey-shorturl-expander
// @version      1.0
// @description  短縮URLを展開して置き換えるスクリプトです。
// @author       Your Name
// @match        *://*/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';

    // 置き換える関数
    function replaceShortURLs() {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = link.getAttribute('href');
            if (href && isShortURL(href)) {
                expandShortURL(href, function(expandedURL) {
                    if (expandedURL) {
                        link.setAttribute('href', expandedURL);
                        link.textContent = expandedURL;
                        displayURLs(href, expandedURL); // 展開前のURLと展開後のURLを表示
                    }
                });
            }
        }
    }

// 短縮URLかどうかを判定する関数
function isShortURL(url) {
    // bitlyのドメインと一致するかどうかを判定
    return url.startsWith('http://bit.ly/') || url.startsWith('https://bit.ly/');
}

// 短縮URLを展開する関数
function expandShortURL(shortURL, callback) {
    // bitlyの展開リクエストを送信する
    GM.xmlHttpRequest({
        method: 'HEAD', // HEADリクエストを使用してリダイレクト先のURLを取得
        url: shortURL,
        onload: function(response) {
            var expandedURL = response.finalUrl;
            callback(expandedURL);
        }
    });
}


    // ページの読み込み完了後に短縮URLを展開する関数を呼び出す
    window.addEventListener('load', replaceShortURLs);

    // ページが動的に変更された場合も短縮URLを展開する関数を呼び出す
    var observer = new MutationObserver(replaceShortURLs);
    observer.observe(document.body, { subtree: true, childList: true });

    // デバッグ用のログ出力関数
    function log(message) {
        GM_log('[ShortURL Expander] ' + message);
    }

    // 展開前のURLと展開後のURLを表示する関数
    function displayURLs(originalURL, expandedURL) {
        var container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.bottom = '10px';
        container.style.left = '10px';
        container.style.background = '#fff';
        container.style.border = '1px solid #ddd';
        container.style.padding = '10px';

        var originalLabel = document.createElement('span');
        originalLabel.textContent = '展開前のURL: ';
        container.appendChild(originalLabel);

        var originalLink = document.createElement('a');
        originalLink.href = originalURL;
        originalLink.textContent = originalURL;
        container.appendChild(originalLink);

        var br = document.createElement('br');
        container.appendChild(br);

        var expandedLabel = document.createElement('span');
        expandedLabel.textContent = '展開後のURL: ';
        container.appendChild(expandedLabel);

        var expandedLink = document.createElement('a');
        expandedLink.href = expandedURL;
        expandedLink.textContent = expandedURL;
        container.appendChild(expandedLink);

        document.body.appendChild(container);
    }
})();

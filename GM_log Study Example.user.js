// ==UserScript==
// @name         GM_log Study Example
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  Study example using GM_log, GM_setValue, and GM_getValue
// @match        http://*/*
// @match        https://*/*
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    // ログメッセージの表示
    function displayLogMessage() {
        var logMessage = GM_getValue("logMessage", "No message");
        var logContainer = document.createElement("div");
        logContainer.textContent = "GM_log Message: " + logMessage;
        logContainer.style.background = "yellow";
        logContainer.style.padding = "10px";
        logContainer.style.position = "fixed";
        logContainer.style.top = "0";
        logContainer.style.left = "0";
        document.body.prepend(logContainer);
    }

    // ユーザースクリプトの実行
    function runScript() {
        GM_log("ユーザースクリプトが実行されました");
        // 他の処理を追加することもできます
        // 例えば、特定の要素を取得してログに表示する場合は以下のようになります
        var element = document.getElementById("example-element");
        if (element) {
            GM_log("要素が見つかりました：" + element.innerText);
        } else {
            GM_log("要素が見つかりませんでした");
        }
        GM_setValue("logMessage", "Hello, GM_log!");
        displayLogMessage();
    }

    runScript();
})();

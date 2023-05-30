// ==UserScript==
// @name         console.log Study Example
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  Study example using console.log, GM.setValue, and GM.getValue
// @match        http://*/*
// @match        https://*/*
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

(async function() {
    // ログメッセージの表示
    async function displayLogMessage() {
        var logMessage = await GM.getValue("logMessage", "No message");
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
    async function runScript() {
        console.log("ユーザースクリプトが実行されました");
        // 他の処理を追加することもできます
        // 例えば、特定の要素を取得してログに表示する場合は以下のようになります
        var element = document.getElementById("example-element");
        if (element) {
            console.log("要素が見つかりました：" + element.innerText);
        } else {
            console.log("要素が見つかりませんでした");
        }
        await GM.setValue("logMessage", "Hello, console.log!");
        await displayLogMessage();
    }

    await runScript();
})();

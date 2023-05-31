// ==UserScript==
// @name         実験Bitly URL Expander
// @namespace    violentmonley-expander
// @version      1.0
// @description  Expand bitly short URLs and display the original and expanded URLs at the bottom of the page.
// @author       Your Name
// @match        *://*/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Create a container element to hold the URL information
    var container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.background = '#fff';
    container.style.padding = '10px';
    container.style.borderTop = '1px solid #ccc';
    container.style.fontSize = '12px';
    container.style.zIndex = '9999';
    container.innerHTML = 'Original URL: <span id="original-url"></span><br>Expanded URL: <span id="expanded-url"></span>';

    document.body.appendChild(container);

    // Check if the current page contains any bitly short URLs
    var bitlyLinks = document.querySelectorAll('a[href^="http://bit.ly/"], a[href^="https://bit.ly/"]');
    if (bitlyLinks.length > 0) {
        // Iterate over each bitly short URL and expand it
        for (var i = 0; i < bitlyLinks.length; i++) {
            expandURL(bitlyLinks[i], i);
        }
    }

    // Function to expand a bitly short URL
    function expandURL(link, index) {
        GM.xmlHttpRequest({
            method: 'HEAD',
            url: link.href,
            onload: function(response) {
                var originalURL = link.href;
                var expandedURL = responseURL;

                // Update the URL information in the container element
                var originalURLSpan = document.getElementById('original-url');
                originalURLSpan.innerHTML += '<a href="' + originalURL + '">' + originalURL + '</a><br>';

                var expandedURLSpan = document.getElementById('expanded-url');
                expandedURLSpan.innerHTML += '<a href="' + expandedURL + '">' + expandedURL + '</a><br>';
            }
        });
    }
})();

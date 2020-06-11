"use strict";

// fetch text from an html file located at 'url'
async function fetchHtmlAsText(url) {
    let response = await fetch(url);
    return await response.text();
}

// load html file content into div mentioned by id
async function load_html(id, html) {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = await fetchHtmlAsText(html);
}

// load navigation menu to select cluster
load_html("navHPC", "../stdHTML/navHPC.html");

// load nav menu for bwGRiD cluster
//load_html("navCluster", "../stdHTML/navGRiD.html");

// load nav menu for bwGRiD cluster
load_html("navCluster", "../stdHTML/navUni.html");

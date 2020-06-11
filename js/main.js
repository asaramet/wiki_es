"use strict";

const mainFolder = "../";
const stdFolder = mainFolder + "stdHTML/";

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

// load header
load_html("header", stdFolder + "header.html");

// load navigation menu to select cluster
load_html("navHPC", stdFolder + "navHPC.html");

// load nav menu for bwGRiD cluster
//load_html("navCluster", stdFolder + "navGRiD.html");

// load nav menu for bwUniCluster
load_html("navCluster", stdFolder + "navUni.html");

// get the navbarHPC
let navbarHPC = document.getElementById("navHPC");

// get all choises in navbarHPC
let hpcBtns = navbarHPC.getElementsByClassName("nav-item");

// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < hpcBtns.length; i++) {
  hpcBtns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += "active";
  });
}

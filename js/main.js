"use strict";

/* Env consts */
const mainFolder = "../";
const stdFolder = mainFolder + "stdHTML/";

// get page pathname
let currentLocation = window.location.pathname;

/* Load a html file in a div defined by a certain id */
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

/* Load html files */
// load header
load_html("header", stdFolder + "header.html");

// load navigation menu to select cluster
load_html("navHPC", stdFolder + "navHPC.html");

/* Load cluster specfic nav menu*/
if (currentLocation.includes("/bwGRiD")) {
  // load nav menu for bwGRiD cluster
  load_html("navCluster", stdFolder + "navGRiD.html");
} else if (currentLocation.includes("/bwUniCluster")) {
  // load nav menu for bwUniCluster
  load_html("navCluster", stdFolder + "navUni.html");
}

/* Hide cluster specific nav menu on Home page */
// get the navCluster menu bar
let navCluster = document.getElementById("navCluster");

// hide it on Home page
if (currentLocation === "/index.html") {
  navCluster.style.visibility = "hidden";
} else {
  navCluster.style.visibility = "visible";
}

/* Update active class in navbar */
// get the navbarHPC
let navbarHPC = document.getElementById("navHPC");

// get all choises in navbarHPC
let hpcBtns = navbarHPC.getElementsByClassName("nav-item");
console.log(hpcBtns);

// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < hpcBtns.length; i++) {
  console.log(hpcBtns[i]);
  hpcBtns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += "active";
  });
}

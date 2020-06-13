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
async function loadHtml(id, html) {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = await fetchHtmlAsText(html);
}

/* Clear active class from a navbar menu*/
function clearActive(navbar) {
  // reset active link to null
  let active = navbar.getElementsByClassName("active");
  active[0].className = active[0].className.replace("active", "");
}

/* Add 'active' to a navbar link */
function setActive(elementID) {
  document.getElementById(elementID).className += " active";
}

// load navigation menu to select cluster
function loadNavHpc(clusterID) {
  loadHtml("navHPC", stdFolder + "navHPC.html").then(function () {
    let navbar = document.getElementById("navbarHPC");
    clearActive(navbar);
    setActive(clusterID);
  });
}

// load header
loadHtml("header", stdFolder + "header.html");

/* Load cluster specfic nav menu*/
if (currentLocation.includes("/bwGRiD")) {
  // load nav menu with bwGRiD active
  loadNavHpc("bwGRiD");
} else if (currentLocation.includes("/bwUniCluster")) {
  // load nav menu with bwUniCluster active
  loadNavHpc("bwUni");
}
else {
  loadNavHpc("home");
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

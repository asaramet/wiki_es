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

// atach footer to body
async function addFooter() {
  let footer = document.getElementById("footer");
  footer.style.margin = "4vh auto auto";
  footer.innerHTML = await fetchHtmlAsText(stdFolder + "footer.html");
}

function main() {
  // load header
  loadHtml("header", stdFolder + "header.html");

  addFooter();

  // get title component
  let titleCmp = document.getElementById("title");

  /* Load cluster specfic nav menu and add title string*/
  if (currentLocation.includes("/bwGRiD")) {
    // load nav menu with bwGRiD active
    loadNavHpc("bwGRiD");
    titleCmp.innerHTML = "bwGRiD for HE Users";
  } else if (currentLocation.includes("/bwUniCluster")) {
    // load nav menu with bwUniCluster active
    loadNavHpc("bwUni");
    titleCmp.innerHTML = "bwUniCluster for HE Users";
  } else if (currentLocation.includes("/tutorials")) {
    // load nav menu with bwUniCluster active
    loadNavHpc("tutorials");
    titleCmp.innerHTML = "Tutorials";
  }
  else {
    loadNavHpc("home");
    titleCmp.innerHTML = "High Performance Computing for HE Users";
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
}

main();

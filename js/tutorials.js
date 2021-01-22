'use strict';

// load bwGRiD specfic navbar
// loadHtml function is defined in main.js and loaded in the html file
loadHtml("navCluster", stdFolder + "navTutorials.html").then(function () {
  let navbar = document.getElementById("navbarClusterInfo");
  clearActive(navbar);

  if (currentLocation.includes("/tutorials/index.html")) {
    setActive("start");
  }
});

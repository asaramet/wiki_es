'use strict';

// load bwGRiD specfic navbar
// loadHtml function is defined in main.js and loaded in the html file
loadHtml("navCluster", stdFolder + "navGRiD.html").then(function () {
  let navbar = document.getElementById("navbarClusterInfo");
  clearActive(navbar);

  if (currentLocation.includes("/bwGRiD/index.html")) {
    setActive("start");
  } else if (currentLocation.includes("ansys")) {
    setActive("ansys");
  } else if (currentLocation.includes("foam")) {
    setActive("foam");
  } else if (currentLocation.includes("star")) {
    setActive("star");
  }
});

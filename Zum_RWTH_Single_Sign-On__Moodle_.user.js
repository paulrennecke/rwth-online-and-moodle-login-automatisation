// ==UserScript==
// @name       Zum RWTH Single Sign-On (Moodle)
// @version    0.1
// @description Automatische Weiterleitung zum RWTH Single Sign-On
// @match   moodle.rwth-aachen.de/*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

window.addEventListener('load', function() {
    var TargetLink = $('a:contains("Login via RWTH Single Sign-on")');
    var TargetLink2 = $('a:contains("Login")');
    if (TargetLink.length){
        window.location.href = TargetLink[0].href
    }
    if (TargetLink2.length){
        window.location.href = TargetLink2[0].href
    }
   }, false);
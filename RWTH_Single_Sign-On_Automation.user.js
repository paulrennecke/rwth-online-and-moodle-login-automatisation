// ==UserScript==
// @name       RWTH Single Sign-On Automation
// @version    0.1
// @description RWTH-Single-SignOn Automation
// @match      https://sso.rwth-aachen.de/*
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://crypto.stanford.edu/sjcl/sjcl.js
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_registerMenuCommand
// ==/UserScript==

var encKey  = GM_getValue ("encKey",  "");
var usr     = GM_getValue ("lognUsr", "");
var pword   = GM_getValue ("lognPwd", "");

if ( ! encKey) {
    encKey  = prompt (
        'Script key not set for ' + location.hostname + '. Please enter a random string:',
        ''
    );
    GM_setValue ("encKey", encKey);

    usr     = pword = "";   // New key makes prev stored values (if any) unable to decode.
}
usr         = decodeOrPrompt (usr,   "U-name", "lognUsr");
pword       = decodeOrPrompt (pword, "P-word", "lognPwd");


function decodeOrPrompt (targVar, userPrompt, setValVarName) {
    if (targVar) {
        targVar     = unStoreAndDecrypt (targVar);
    }
    else {
        targVar     = prompt (
            userPrompt + ' not set for ' + location.hostname + '. Please enter it now:',
            ''
        );
        GM_setValue (setValVarName, encryptAndStore (targVar) );
    }
    return targVar;
}

function encryptAndStore (clearText) {
    return  JSON.stringify (sjcl.encrypt (encKey, clearText) );
}

function unStoreAndDecrypt (jsonObj) {
    return  sjcl.decrypt (encKey, JSON.parse (jsonObj) );
}

//-- Add menu commands that will allow U and P to be changed.
GM_registerMenuCommand ("Change Username", changeUsername);
GM_registerMenuCommand ("Change Password", changePassword);

function changeUsername () {
    promptAndChangeStoredValue (usr,   "U-name", "lognUsr");
}

function changePassword () {
    promptAndChangeStoredValue (pword, "P-word", "lognPwd");
}

function promptAndChangeStoredValue (targVar, userPrompt, setValVarName) {
    targVar     = prompt (
        'Change ' + userPrompt + ' for ' + location.hostname + ':',
        targVar
    );
    GM_setValue (setValVarName, encryptAndStore (targVar) );
}

// ADD YOUR CODE TO SET THE USERNAME AND PASSWORD ON THE LOGIN PAGE, HERE.

$('#username').attr('value', usr);
$('#password').attr('value', pword);
$('#login').click();
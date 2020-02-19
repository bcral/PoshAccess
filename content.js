//constant for values to write to buttons after they're deactivated
const originalText = {shareEl: "SHARE", followButtonEl: "FOLLOW", unfollowButtonEl: "UNFOLLOW", sAndSButtonEl: "SELECT ITEMS"};
//declare variable for storing values in global scope
var inputValues = {};
var data;

// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// kkkkkkkkkkkkkkkkkkkk Parent element for all HTML kkkkkkkkkkkkkkkkkkkk

function includeWrap() {

    var bodyWrapEl = document.createElement("div");
    bodyWrapEl.id = "bodyWrapEl";
    
    //adding the main wrapper element to the DOM - this contains all following
    //HTML elements that are created
    document.body.appendChild(bodyWrapEl);

    //main wrapper element that is included to the site's DOM
    var warningWrapEl = document.createElement("div");
    warningWrapEl.id = "warningWrapEl";
    
    //adding the main wrapper element to the DOM - this contains all following
    //HTML elements that are created
    document.getElementById('bodyWrapEl').appendChild(warningWrapEl);

    //main wrapper element that is included to the site's DOM
    var wrapDiv = document.createElement("div");
    wrapDiv.id = "wrapDiv";
    
    //adding the main wrapper element to the DOM - this contains all following
    //HTML elements that are created
    document.getElementById('bodyWrapEl').appendChild(wrapDiv);
    
}
    
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// kkkkkkkkkkkkkkkkkkkkkkkkkkkk STYLESHEETS kkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
function includeStyles() {
        
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("styles.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    //including the stylesheet link AFTER the bootstrap link
    document.body.appendChild(link);
}

// Start code for creating and inserting warning elements
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

function includeWarning() {

    //div element for warning header
    var warningEl = document.createElement("div");
    warningEl.id = "warningEl";
    warningEl.className = "warning-color";
    warningEl.innerHTML = "Sorry!  There doesn\'t seem to be a party now! :(";
    warningEl.style.display = "none";

    //parent element that this element will be inserted into
    document.getElementById("warningWrapEl").appendChild(warningEl);
}
    
// Start code for creating and inserting header elements
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
function includeHeader() {
    
    //div element for page header
    var backgroundEl = document.createElement("div");
    backgroundEl.id = "backgroundEl";
    
    //parent element that this element will be inserted into
    document.getElementById("wrapDiv").appendChild(backgroundEl);
    
    //nav element for page header
    var headerEl = document.createElement("nav");
    headerEl.className = "navbar primary-color";
    headerEl.id = "headerElement";
    
    //parent element that this element will be inserted into
    document.getElementById("backgroundEl").appendChild(headerEl);
    
    //h2 element for containing "poshaccess" text
    var headTagEl = document.createElement("h2");
    headTagEl.setAttribute("class", "primary-color");
    headTagEl.id = "headTagElement";
    headTagEl.innerHTML = "PoshAccess";
    
    //parent element that this element will be inserted into
    document.getElementById("headerElement").appendChild(headTagEl);

    //a link element for "log out" in the top corner of element
    var buttonCont = document.createElement("div");
    buttonCont.id = "buttonCont";
    
    //parent element that this element will be inserted into
    document.getElementById("headerElement").appendChild(buttonCont);

    //a link element for "log out" in the top corner of element
    var logOutEl = document.createElement("a");
    logOutEl.id = "logout";
    logOutEl.addEventListener("click", hideApp);
    logOutEl.className = "navButton";
    logOutEl.innerHTML = "&times;";
    
    //parent element that this element will be inserted into
    document.getElementById("buttonCont").appendChild(logOutEl);

    //a link element for "log out" in the top corner of element
    var popout = document.createElement("a");
    popout.id = "popout";
    popout.addEventListener("click", togglePopout);
    popout.className = "navButton";
    popout.innerHTML = ">";
    
    //parent element that this element will be inserted into
    document.getElementById("buttonCont").appendChild(popout);
}
    
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    // End of code for creating and inserting header elements
    
function includeForm() {
    
    // Start code for creating and inserting form elements
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
    //element for containing form elements for user interaction
    var formDivEl = document.createElement("div");
    formDivEl.setAttribute("class", "main-content");
    formDivEl.id = "formDivEl";
    
    //parent element that this element will be inserted into
    document.getElementById("backgroundEl").appendChild(formDivEl);
    
    //element for the main form on the page - contains all form elements
    var mainFormEl = document.createElement("form");
    mainFormEl.id = "mainFormEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formDivEl").appendChild(mainFormEl);
    
    //element for the form container div
    var formContainerEl = document.createElement("div");
    formContainerEl.id = "formContainerEl";
    
    //parent element that this element will be inserted into
    document.getElementById("mainFormEl").appendChild(formContainerEl);
    
    // Start code for "share speed" form elements
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

    //element for the row for the "share" form elements
    var formSpeedRowEl = document.createElement("div");
    formSpeedRowEl.id = "formSpeedRowEl";
    formSpeedRowEl.className = "borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("formContainerEl").appendChild(formSpeedRowEl);
    
    //element containing the column and form-group for the "share to" elements
    var formSpeedContainerEl = document.createElement("div");
    formSpeedContainerEl.setAttribute("class", "list-el");
    formSpeedContainerEl.id = "formSpeedContainerEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formSpeedRowEl").appendChild(formSpeedContainerEl);
    
    //h5 element containing the header text for "share with"
    var speedTitleEl = document.createElement("h5");
    speedTitleEl.className = "list-el";
    speedTitleEl.innerHTML = "Function Speed:";
    speedTitleEl.id = "speedTitleEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formSpeedContainerEl").appendChild(speedTitleEl);
    
    //element for input of the "share with" radio button for followers
    var speedInputEl = document.createElement("input");
    speedInputEl.id = "speed";
    speedInputEl.setAttribute("name", "speed");
    speedInputEl.setAttribute("type", "range");
    speedInputEl.setAttribute("min", 1000);
    speedInputEl.setAttribute("max", 10000);
    speedInputEl.setAttribute("step", 1000);   
    speedInputEl.addEventListener('change', writeSpeed);

    //parent element that this element will be inserted into
    document.getElementById("formSpeedContainerEl").appendChild(speedInputEl);

    //line break element for layout purposes
    var speedValueBreakEl = document.createElement("br");
    document.getElementById("formSpeedContainerEl").appendChild(speedValueBreakEl);

    //element for label of the speed range input/slider
    var speedValueEl = document.createElement("label");
    speedValueEl.id = "speedValueEl";
    speedValueEl.setAttribute("for", "speed")
    speedValueEl.setAttribute("maxlength", 10);
    speedValueEl.className = "center";

    //parent element that this element will be inserted into
    document.getElementById("formSpeedContainerEl").appendChild(speedValueEl);

    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    // End of code for creating and inserting "share speed" elements

    // Start code for "share with" form elements
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
    //element for the row for the "share" form elements
    var formShareRowEl = document.createElement("div");
    formShareRowEl.id = "formShareRowEl";
    formShareRowEl.className = "borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("formContainerEl").appendChild(formShareRowEl);
    
    //element containing the column and form-group for the "share to" elements
    var formShareToContainerEl = document.createElement("div");
    formShareToContainerEl.setAttribute("class", "list-el");
    formShareToContainerEl.id = "formShareToContainerEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formShareRowEl").appendChild(formShareToContainerEl);
    
    //h5 element containing the header text for "share with"
    var shareWithTitleEl = document.createElement("h5");
    shareWithTitleEl.className = "list-el";
    shareWithTitleEl.innerHTML = "Share With:";
    
    //parent element that this element will be inserted into
    document.getElementById("formShareToContainerEl").appendChild(shareWithTitleEl);
    
    //element for label(and parent) of the "share to - followers" input radio button
    var shareWithLabelEl = document.createElement("label");
    shareWithLabelEl.setAttribute("for", "followers");
    shareWithLabelEl.id = "shareWithLabelEl";
    shareWithLabelEl.className = "radioBtn";
    shareWithLabelEl.innerHTML = "Followers";
    
    //parent element that this element will be inserted into
    document.getElementById("formShareToContainerEl").appendChild(shareWithLabelEl);
    
    //element for input of the "share with" radio button for followers
    var shareFollowersInputEl = document.createElement("input");
    shareFollowersInputEl.id = "followers";
    shareFollowersInputEl.setAttribute("name", "location");
    shareFollowersInputEl.setAttribute("type", "radio");
    shareFollowersInputEl.setAttribute("value", "followers");
    shareFollowersInputEl.checked = true;
    
    //parent element that this element will be inserted into
    document.getElementById("shareWithLabelEl").appendChild(shareFollowersInputEl);
    
    //element for label(and parent) of the "share to - party" input radio button
    var shareWithPartyLabelEl = document.createElement("label");
    shareWithPartyLabelEl.setAttribute("for", "party");
    shareWithPartyLabelEl.id = "shareWithPartyLabelEl";
    shareWithPartyLabelEl.className = "radioBtn";
    shareWithPartyLabelEl.innerHTML = "Party";
    
    //parent element that this element will be inserted into
    document.getElementById("formShareToContainerEl").appendChild(shareWithPartyLabelEl);
    
    //element for input of the "share with" radio button for party
    var sharePartyInputEl = document.createElement("input");
    sharePartyInputEl.id = "party";
    sharePartyInputEl.setAttribute("name", "location");
    sharePartyInputEl.setAttribute("type", "radio");
    sharePartyInputEl.setAttribute("value", "party");
    
    //parent element that this element will be inserted into
    document.getElementById("shareWithPartyLabelEl").appendChild(sharePartyInputEl);
    
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    // End of code for creating and inserting "share with" elements
    
    // Start code for creating and inserting "continuous" elements
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
    //element for the row for the "continuous" form elements
    var formContRowEl = document.createElement("div");
    formContRowEl.id = "formContRowEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formContainerEl").appendChild(formContRowEl);
    
    //element containing the column and form-group for the "continuous" elements
    var formContContainerEl = document.createElement("div");
    formContContainerEl.setAttribute("class", "list-el");
    formContContainerEl.id = "formContContainerEl";
    
    //parent element that this element will be inserted into
    document.getElementById("formContRowEl").appendChild(formContContainerEl);
    
    //element for label(and parent) of the "one time" input radio button
    var onceLabelEl = document.createElement("label");
    onceLabelEl.setAttribute("for", "continuous");
    onceLabelEl.id = "onceLabelEl";
    onceLabelEl.className = "radioBtn";
    onceLabelEl.innerHTML = "One Time";
    
    //parent element that this element will be inserted into
    document.getElementById("formContContainerEl").appendChild(onceLabelEl);
    
    //element for input of the "one time" radio button for followers
    var onceInputEl = document.createElement("input");
    onceInputEl.id = "onceInputEl";
    onceInputEl.setAttribute("name", "continuous");
    onceInputEl.setAttribute("type", "radio");
    onceInputEl.setAttribute("value", "once");
    onceInputEl.checked = true;
    
    //parent element that this element will be inserted into
    document.getElementById("onceLabelEl").appendChild(onceInputEl);
    
    //element for label(and parent) of the "continuous" input radio button
    var contLabelEl = document.createElement("label");
    contLabelEl.setAttribute("for", "continuous");
    contLabelEl.id = "contLabelEl";
    contLabelEl.className = "radioBtn";
    contLabelEl.innerHTML = "Continuous";
    
    //parent element that this element will be inserted into
    document.getElementById("formContContainerEl").appendChild(contLabelEl);
    
    //element for input of the "continuous" radio button for followers
    var contInputEl = document.createElement("input");
    contInputEl.id = "contInputEl";
    contInputEl.setAttribute("name", "continuous");
    contInputEl.setAttribute("type", "radio");
    contInputEl.setAttribute("value", "continuous");

    
    //parent element that this element will be inserted into
    document.getElementById("contLabelEl").appendChild(contInputEl);
}
    
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// End of code for creating and inserting "continuous" elements  

// Start code for creating and inserting "popout" button elements
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

function includePopout() {
    //div element for popout container
    var popoutEl = document.createElement("div");
    popoutEl.id = "popoutEl";
    
    //parent element that this element will be inserted into
    document.getElementById("wrapDiv").appendChild(popoutEl);

    //nav element for page header
    var toolbarHeaderEl = document.createElement("nav");
    toolbarHeaderEl.className = "navbar primary-color";
    toolbarHeaderEl.id = "toolbarHeaderEl";

    //parent element that this element will be inserted into
    document.getElementById("popoutEl").appendChild(toolbarHeaderEl);

    //h2 element for containing "poshaccess" text
    var toolbarHeadTagEl = document.createElement("h2");
    toolbarHeadTagEl.setAttribute("class", "primary-color");
    toolbarHeadTagEl.id = "headTagElement";
    toolbarHeadTagEl.innerHTML = "Pro Toolbar";
    
    //parent element that this element will be inserted into
    document.getElementById("toolbarHeaderEl").appendChild(toolbarHeadTagEl);

    //div element for button wrapper
    var buttonWrapEl = document.createElement("div");
    buttonWrapEl.id = "buttonWrapEl";
    buttonWrapEl.className = "center list-el borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("popoutEl").appendChild(buttonWrapEl);

    //button element for follow button
    var followButtonEl = document.createElement("button");
    followButtonEl.id = "followButtonEl";
    followButtonEl.innerHTML = "FOLLOW";
    followButtonEl.className = "primary-color followBtn";
    followButtonEl.addEventListener("click", followLoop(followButtonEl));

    //parent element that this element will be inserted into
    document.getElementById("buttonWrapEl").appendChild(followButtonEl);

    //button element for unfollow button
    var unfollowButtonEl = document.createElement("button");
    unfollowButtonEl.id = "unfollowButtonEl";
    unfollowButtonEl.innerHTML = "UNFOLLOW";
    unfollowButtonEl.className = "primary-color followBtn";
    unfollowButtonEl.addEventListener("click", followLoop(unfollowButtonEl));

    //parent element that this element will be inserted into
    document.getElementById("buttonWrapEl").appendChild(unfollowButtonEl);

    //div element for CAPTCHA alert wrapper
    var captchaWrapEl = document.createElement("div");
    captchaWrapEl.id = "captchaWrapEl";
    captchaWrapEl.className = "center list-el borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("popoutEl").appendChild(captchaWrapEl);

    //element for input of the "CAPTCHA Alert" checkbox
    var captchaInputEl = document.createElement("input");
    captchaInputEl.id = "captchaInputEl";
    captchaInputEl.setAttribute("name", "captcha");
    captchaInputEl.setAttribute("type", "checkbox");
    captchaInputEl.className = "checkbox";

    //parent element that this element will be inserted into
    document.getElementById("captchaWrapEl").appendChild(captchaInputEl);

    //element for input of the "CAPTCHA alert" checkbox
    var captchaTextEl = document.createElement("label");
    captchaTextEl.id = "captchaTextEl";
    captchaTextEl.innerHTML = "CAPTCHA Alert";
    captchaTextEl.setAttribute("for", "captcha");

    //parent element that this element will be inserted into
    document.getElementById("captchaWrapEl").appendChild(captchaTextEl);

    //div element for Rapid Share wrapper
    var rsWrapEl = document.createElement("div");
    rsWrapEl.id = "rsWrapEl";
    rsWrapEl.className = "center list-el borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("popoutEl").appendChild(rsWrapEl);

    //element for input of the "Rapid Share" checkbox
    var rsInputEl = document.createElement("input");
    rsInputEl.id = "rsInputEl";
    rsInputEl.setAttribute("name", "rapidShare");
    rsInputEl.setAttribute("type", "checkbox");
    rsInputEl.className = "checkbox";
    rsInputEl.addEventListener("click", rapidShare);

    //parent element that this element will be inserted into
    document.getElementById("rsWrapEl").appendChild(rsInputEl);

    //element for text label of the "Rapid Share" checkbox
    var rsTextEl = document.createElement("label");
    rsTextEl.id = "rsTextEl";
    rsTextEl.innerHTML = "Rapid Share";
    rsTextEl.setAttribute("for", "rapidShare");

    //parent element that this element will be inserted into
    document.getElementById("rsWrapEl").appendChild(rsTextEl);

    //div element for Rapid Share wrapper
    var exceptWrapEl = document.createElement("div");
    exceptWrapEl.id = "exceptWrapEl";
    exceptWrapEl.className = "center list-el borderBottom";
    
    //parent element that this element will be inserted into
    document.getElementById("popoutEl").appendChild(exceptWrapEl);

    //h5 element containing the header text for "Share Exceptions"
    var exceptHeaderEl = document.createElement("h5");
    exceptHeaderEl.className = "list-el";
    exceptHeaderEl.innerHTML = "Share Exceptions:";
    
    //parent element that this element will be inserted into
    document.getElementById("exceptWrapEl").appendChild(exceptHeaderEl);

    //element for text label of the "Rapid Share" checkbox
    var nfsTextEl = document.createElement("label");
    nfsTextEl.id = "nfsTextEl";
    nfsTextEl.className = "block";
    nfsTextEl.innerHTML = "Not For Sale";
    nfsTextEl.setAttribute("for", "notForSale");

    //parent element that this element will be inserted into
    document.getElementById("exceptWrapEl").appendChild(nfsTextEl);

    //element for input of the "Rapid Share" checkbox
    var nfsInputEl = document.createElement("input");
    nfsInputEl.id = "nfsInputEl";
    nfsInputEl.setAttribute("name", "notForSale");
    nfsInputEl.setAttribute("type", "checkbox");
    nfsInputEl.className = "checkbox";
    nfsInputEl.checked = true;

    //parent element that this element will be inserted into
    document.getElementById("nfsTextEl").appendChild(nfsInputEl);

    //element for text label of the "Rapid Share" checkbox
    var soldTextEl = document.createElement("label");
    soldTextEl.id = "soldTextEl";
    soldTextEl.className = "block";
    soldTextEl.innerHTML = "Sold";
    soldTextEl.setAttribute("for", "sold");

    //parent element that this element will be inserted into
    document.getElementById("exceptWrapEl").appendChild(soldTextEl);

    //element for input of the "Rapid Share" checkbox
    var soldInputEl = document.createElement("input");
    soldInputEl.id = "soldInputEl";
    soldInputEl.setAttribute("name", "sold");
    soldInputEl.setAttribute("type", "checkbox");
    soldInputEl.className = "checkbox";
    soldInputEl.checked = true;

    //parent element that this element will be inserted into
    document.getElementById("soldTextEl").appendChild(soldInputEl);

}
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// End of code for creating and inserting "popout" elements  

// Start code for creating and inserting "share" button elements
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    
function includeShare() {
    
    //element for containing "share" button
    var shareBtnContainerEl = document.createElement("div");
    shareBtnContainerEl.id = "shareBtnContainerEl";
    shareBtnContainerEl.classList = "primary-color main-nav";
    
    //parent element that this element will be inserted into
    document.getElementById("backgroundEl").appendChild(shareBtnContainerEl);
    
    //other element for containing "share" button
    var shareBtnWrapEl = document.createElement("div");
    shareBtnWrapEl.id = "shareBtnWrapEl";
    shareBtnWrapEl.classList = "main-btn primary-color";
    
    //parent element that this element will be inserted into
    document.getElementById("shareBtnContainerEl").appendChild(shareBtnWrapEl);
    
    //button element for executing "share" code
    var shareEl = document.createElement("button");
    shareEl.id = "shareEl";
    shareEl.className = "primary-color btn";
    shareEl.addEventListener("click", functionSorter(shareEl));
    shareEl.innerHTML = originalText.shareEl;

    //parent element that this element will be inserted into
    document.getElementById("shareBtnWrapEl").appendChild(shareEl);
    
}
    
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    // kkkkkkkkkkkkkkkkkkkkkkkkkkkk Build the UI kkkkkkkkkkkkkkkkkkkkkkkkkkk
    
async function buildApp() {
        await includeWrap();
        await includeStyles();
        await includeWarning();
        await includeHeader();
        await includeForm();
        await includePopout();
        await includeShare();
    }

onload = buildApp();

var appWrapper = document.getElementById("wrapDiv");
    
var displayed = true;
var toggle = false;
var running = false;
var loopStat = false;

function hideApp() {
    appWrapper.style.display = "none";
    displayed = !displayed;
}

function showApp() {
    appWrapper.style.display = "block";
    displayed = !displayed;
}

function togglePopout() {
    toggle = !toggle;
    if ( toggle ) {
        popoutEl.style.display = "block";
        popout.innerHTML = "<";
    } else {
        popoutEl.style.display = "none";
        popout.innerHTML = ">";
    }
}

//message from background page that icon was clicked
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (!displayed) {
        showApp();
    } else if (displayed) {
        hideApp();
    }

    if (request.icon == "click") {
        sendResponse = 'recieved'; 
    }
});

//function for setting the value in the label for the speed slider
function writeSpeed() {
    document.getElementById('speedValueEl').innerHTML = parseInt(
        (document.getElementById('speed').value) / 1000) + " seconds";
}

// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// kkkkkkkkkkkkkkkkkkkkkkkkk Share button code kkkkkkkkkkkkkkkkkkkkkkkkk
    
function btnDisplay(c, d) {
    let key = c.id;
    if (d === true) {
        c.classList.remove("primary-color");
        c.classList.add("warning-color");
        c.innerHTML = "STOP";
    } else {
        c.classList.remove("warning-color");
        c.classList.add("primary-color");
        c.innerHTML = originalText[key];
    }
}

function shareFunc(b) {
    if (isLooping === false) {
        running = true;
        changeStuff(running);
        btnDisplay(b, running);
    } else {
        stopFunc(b);
    }
}
function stopFunc(b) {
    running = false;
    changeStuff(running);
    btnDisplay(b, running);
}

function functionSorter(a) {
    return function () {
        if (running === false) {
            shareFunc(a);
        } else {
            stopFunc(a);
        }
    }
}

//function for getting and setting value of slider for sharing speed
function setSpeed() {
    speed = document.getElementById('speed').value;
}

//function for calling the rapid share functionality from share-content
const rapidShare = () => {
    if (!isLooping) {
        //make function fire on share
        var shareElements = document.getElementsByClassName('share');
        for (var i = 0; i < shareElements.length; i++) {
            shareElements[i].addEventListener("click", rapidShareFunc);
        }
    }
}

//function called when "follow" or "unfollow" are clicked
const followLoop = (item) => {
    return function() {
        loopStat = !loopStat;

        btnDisplay(item, loopStat);

        followFunc(item);
    }
}

//function for saving settings as presets
//send message to background page to store the events to be recalled on load
window.onunload = function() {

    setSpeed();

    data = {
        'spd': speed,
        'shrFlw': document.getElementById('followers').checked,
        'shrPrty': document.getElementById('party').checked,
        'contF': document.getElementById('onceInputEl').checked,
        'contT': document.getElementById('contInputEl').checked,
        'captcha': document.getElementById('captchaInputEl').checked,
        'rs': document.getElementById('rsInputEl').checked,
        'nfs': document.getElementById('nfsInputEl').checked,
        'sld': document.getElementById('soldInputEl').checked
    }

    chrome.storage.sync.set({'key': data}, function() {
        console.log('success!');
    });

}

window.onload = function() {

    chrome.storage.sync.get('key', function(data) {
        if (data) {
            document.getElementById('speed').value = data.key.spd;
            writeSpeed();

            document.getElementById('followers').checked = data.key.shrFlw;
            document.getElementById('party').checked = data.key.shrPrty;
            document.getElementById('onceInputEl').checked = data.key.contF;
            document.getElementById('contInputEl').checked = data.key.contT;
            document.getElementById('captchaInputEl').checked = data.key.captcha; 
            document.getElementById('rsInputEl').checked = data.key.rs; 
            document.getElementById('nfsInputEl').checked = data.key.nfs; 
            document.getElementById('soldInputEl').checked = data.key.sld;  

        } else {
            console.log('nothing is saved yet');
        }
    });

}


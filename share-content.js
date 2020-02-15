//var speedInput = document.getElementById('speed');
var speed;
var selectedStyle = "0px 0px 5px 5px #ad03fc";
var shareWIth = '';
var continuous = false;
var active = false;
var isLooping = false;
//total number of listings in closet - for stopping share loop at the end
//of the closet, if selected
var totalListings = document.querySelector('.count').textContent;
totalListings = totalListings.replace(/\,/g,'');
totalListings = parseInt(totalListings,10);
//CAPTCHA alarm settings
var alarm = new Audio();
alarm.src = chrome.runtime.getURL("img/CAPTCHA_chime.mp3");
//variables for the follow/unfollow functions
var selectItem = document.getElementsByClassName('auth-required');
let followLooping = false;
var condition = false;
let j = 0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setInterval(resolve, milliseconds))
  }

//object for storing values of checkbox inputs from form - share to, speed
let shareValues = {shareWith: "", continuous: false, y: false};

//sets values based on what the user selects in the UI
function writeValues() {
    if (document.getElementById("followers").checked === true) {
        shareWith = 'followers';
    } else {
        shareWith = 'party';
    } 

    if (document.getElementById("contInputEl").checked === true) {
        continuous = true;
    } else {
        continuous = false;
    }
}

// function setting values, and for checking if share loop is currently 
//running or not
function changeStuff(a) {
    active = a;
    writeValues();
    shareLoop();
}

async function displayWarn() {
    document.getElementById("warningEl").style.display = "block";
    setTimeout(function() {
        document.getElementById("warningEl").style.display = "none";
    }, 7000);
}    

//function to ensure that the number stored in "totalListings" is indeed
//the number of items in the closet
function listingsConfirm() {
    if (document.querySelector('.count').classList.contains('has-likes')
    || document.querySelector('.count').parentNode.classList.contains('refresh-text')) {
        totalListings = 20000;
    }

}

//function for the captcha alarm
async function captchaAlarm() {
    alarm.play();
    await sleep(3000);
}

//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkk SHARE LOOP CODE kkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


//loop for sharing through items in closet
//values are passed from the HTML file through the valuePairs object
async function shareLoop () {

    isLooping = true;

    let i = 0;

    var currentEl = document.getElementsByClassName('tile');

    var endCycle = false;

    //share loop that continues firing until "active" returns false
    async function doSomething() {
        while (active === true) {

            //stop share loop if captcha appears
            if (document.getElementById("captcha-form")) {
                endCycle = true;

                //check UI input to see if user selected CAPTCHA alarm
                if (captchaInputEl.checked) {
                    //play audio file
                    while (document.getElementById("captcha-form")) captchaAlarm();
                }
                break;
            }

            var totalEls = currentEl.length;

            listingsConfirm();
        
            //funtion that is called after the "share" button is clicked, which
            //reads the value of the user's input for where to share the items,
            //and chooses the correct link in the popup window.  Also checks to
            //see if party is currently happening or not
            function sharePopupFunction() {
                //checks to see which link to hit in popup after firing 'share' link
                //if 'shareWith = followers', share to 'followers'
                if (shareWith == 'followers') {
                    document.getElementsByClassName('share-wrapper-con')[0].click();
                //if 'shareWith = party', share to 'party'
                } else if (shareWith == 'party') {

                    //check if a party is happening
                    if (document.getElementsByClassName('share-wrapper-con')[1]) {
                        //if so, click link to share there
                        document.getElementsByClassName('share-wrapper-con')[1].click();
                    //if not, show warning to tell user there isn't a party happening,
                    //end cycle, and exit loop
                    } else {
                        endCycle = true;
                        displayWarn();
                        document.getElementsByClassName('close')[2].click();
                    }
                }
            }

            async function statusChecker() {

                //sets delay speed to input
                setSpeed();

                //just for kicks, and to make it obvious which one is selected
                if (currentEl[i]) {
                    currentEl[i].style.boxShadow = selectedStyle;
                } else {
                    endCycle = true;
                    isLooping = false;
                    active = false;
                    btnDisplay(shareEl, active);
                    return false; 
                }

                //put this somewhere that will trigger or not trigger the loop
                //depending on which condition is selected by the user in the UI
                let thisItem = currentEl[i].querySelector('i');

                if (thisItem.classList.contains('sold-tag') == false &&
                thisItem.classList.contains('not-for-sale-tag') == false) {
                    document.getElementsByClassName('share')[i].click();
                    //delay for slowing down the process until a promise can be
                    //implimented to confirm the 'share' element was clicked
                    //after waiting, fire sharePopupFunction() to select where to share
                    await sleep(800).then(sharePopupFunction());
                } else {
                    //slows delay speed to skip through faster
                    speed = 300;
                }
            }

            //selects share link based on which itteration of the loop(i) is
            //currently selected.  Forces popup window with option to share to
            //followers or party
            if (i < totalListings && i < totalEls && endCycle === false) {
                statusChecker();
            } else if ((i <= totalListings || i <= totalEls) && continuous === true && endCycle === false) {
                i = 0;
                statusChecker();      
            } else {
                endCycle = true;
                --i;
            }

            i++;
            await sleep(speed);
            
            if (endCycle === false) {
                currentEl[i - 1].style.boxShadow = "none";
            } else if (endCycle === true && active === true) {
                currentEl[i - 1].style.boxShadow = "none";
                active = false;
                running = false;
                btnDisplay(shareEl, active)
            }

        //indicator that the loop is no longer running, and it's safe to 
        //start a new iteration    
        isLooping = false;
        }
    //^this marks the end of the "while" loop
    }
  //initiates share loop
  doSomething();
}

//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkk SELECT AND SHARE kkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkk FOLLOW & UNFOLLOW kkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
var clickedButton;
const followFunc = async (item) => {

    if (clickedButton === null || clickedButton !== item) {
        clickedButton = item;
        //reset counter for different function
        j = 0;
    }

    //variables for follow loop - both must return true
    //condition for detecting if link is "follow" or "unfollow", since
    //both exist on page
    var followCondition;
    //condition for determining if item is hidden or not - if it is, skip it
    var excludeCondition;
    //While loop for following/unfollowing
    while (loopStat === true && j <= selectItem.length) {

        followLooping = true;
        if (selectItem[j]) {
            if (item.id == "followButtonEl") {
                followCondition = selectItem[j].classList.contains('blue');
            } else if (item.id == "unfollowButtonEl") {
                followCondition = (selectItem[j].classList.contains("t-btn") || selectItem[j].classList.contains("white"));
            }

            if (selectItem[j].classList.contains("f-hide")) {
                excludeCondition = true;
            } else {
                excludeCondition = false;
            }

            //ensure that the follow condition returns TRUE, and the exclude
            //condition returns FALSE
            if (followCondition && !excludeCondition) {
                selectItem[j].click();
                j += 2;
                setSpeed();
                await sleep(speed);
            } else {
                j++;
            }
        } else {
            loopStat = false;
            btnDisplay(item, loopStat);
        }
        followLooping = false;
    }
}

//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkk RAPID SHARE kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

const rapidShareFunc = () => {
    writeValues();
    //checks to see which link to hit in popup after firing 'share' link
    //if 'shareWith = followers', share to 'followers'
    if (shareWith == 'followers') {
        document.getElementsByClassName('share-wrapper-con')[0].click();
    //if 'shareWith = party', share to 'party'
    } else if (shareWith == 'party') {

        //check if a party is happening
        if (document.getElementsByClassName('share-wrapper-con')[1]) {
            //if so, click link to share there
            document.getElementsByClassName('share-wrapper-con')[1].click();
        //if not, show warning to tell user there isn't a party happening,
        //end cycle, and exit loop
        } else {
            displayWarn();
        }
    }
}
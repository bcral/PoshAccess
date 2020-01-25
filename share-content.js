var speed;
var selectedStyle = "solid 3px #6f9ead";
//total number of listings in closet - for stopping share loop at the end
//of the closet, if selected
var shareWIth = '';
var continuous = false;
var active = false;
var totalListings = document.querySelector('.count').textContent;
totalListings=totalListings.replace(/\,/g,'');
totalListings=parseInt(totalListings,10);

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

//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkk SHARE LOOP CODE kkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


//loop for sharing through items in closet
//values are passed from the HTML file through the valuePairs object
async function shareLoop () {

    const sleep = (milliseconds) => {
      return new Promise(resolve => setInterval(resolve, milliseconds))
    }

    var i = 0;

    var currentEl = document.getElementsByClassName('tile');

    var endCycle = false;

    //share loop that continues firing until "active" returns false
    async function doSomething() {
        while (active === true) {

            if (document.getElementById("captcha-form")) {
                endCycle = true;
            }

            var totalEls = currentEl.length;
        
            //funtion that is called after the "share" button is clicked, which
            //reads the value of the user's input for where to share the items,
            //and chooses the correct link in the popup window.  Also checks to
            //see if party is currently happening or not
            async function sharePopupFunction() {
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
                
                //throw error to console if neither link is selected
                }

            }

            async function statusChecker() {

                //sets delay speed to normal
                speed = 5000;

                //just for kicks, and to make it obvious which one is selected
                if (currentEl[i]) {
                    currentEl[i].style.border = selectedStyle
                } else {
                    endCycle = true;
                    active = false;
                    clickFunc();
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
                    await sleep(800);
                    sharePopupFunction();
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
            if (endCycle !== true) {
                currentEl[i - 1].style.border = "none";
            } else if (endCycle === true && active !== false) {
                currentEl[i - 1].style.border = "none";
                active = false;
                clickFunc();
            }
        }
    //^this marks the end of the "while" loop
    }

  //initiates share loop
  doSomething();
}

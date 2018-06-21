const imgList = [
  '<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/fama_card.png" alt="Eugene Fama">',
  '<img src="img/fama_card.png" alt="Eugene Fama">',
  '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/hayek_card.png" alt="Friedrich Hayek">',
  '<img src="img/hayek_card.png" alt="Friedrich Hayek">',
  '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/menger_card.png" alt="Carl Menger">',
  '<img src="img/menger_card.png" alt="Carl Menger">',
  '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">'
];

const cardDeck = document.querySelector('.deck');
const counter = document.querySelector('.moves');
const starRating = document.querySelector('.stars');
const myStopWatch = document.getElementById('stopWatch');

const cardArray = [];
const flippedCards = [];
const matchedCards = [];
const startTrigger = [];
let totalClicks = 0;
let totalMatched = 0;
let timeElapsed = 0;
let seconds = 0;
let minutes = 0;


function createCards() {
  //Loops over imgList Array - Constructs Cards - Pushes to Card Array
  for (let i = 0; i < imgList.length; i++) {
    const cards = document.createElement('div');
    cards.classList.add('card');
    cards.innerHTML = `<div class='back'>${imgList[i]}</div>
    <div class='front'><i class="fa fa-line-chart" style="font-size:2em;color:#ffffff;"></i></div>`
    cardArray.push(cards);
  }
  //Loops and Shuffles Card Array 
  for (let i = cardArray.length - 1; i >= 0; i--) {

    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = cardArray[randomIndex];

    cardArray[randomIndex] = cardArray[i];
    cardArray[i] = itemAtIndex;
    //Insert Default Star Rating at Start of Game
    rating();
    //Adds Event Listener to Cards - Assigns Flipped Class to Flipped Cards 
    cardArray[i].addEventListener('click', function () {
      //Push Clicked Cards Into flippedCards Array
      flippedCards.push(this);
      //Push Clicked Cards Into startTrigger Array
      startTrigger.push(this);
      //Track totalClicks
      totalClicks++
      //limit the number of flipped cards to two
      if (flippedCards.length < 3) {
        this.classList.add('flipped');
        //Update Counter 
        counter.innerHTML++; //Need to do something here to stop mutiple clicks on the same card. 
      }
      //Trip Date.now startTime 
      if (startTrigger.length === 1) {
        time();
      }
      //Call notMatched function 
      notMatched();
      //Call matchedPair function
      matchedPair();
      //Test Rating With Every Click
      rating();
    });
    //Append Shuffled Cards to HTML Document 
    cardDeck.appendChild(cardArray[i]);
  }
}

createCards();

//This function removes flipped class if selected cards do not match
function notMatched() {
  if (flippedCards.length === 2 && flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
    setTimeout(function () {
      for (let i = 0; i < flippedCards.length; i++) {
        flippedCards[i].classList.remove('flipped');
      }
      //Clear flippedCards Array
      flippedCards.splice(0, 16);
    }, 2000);
  }
}

//This function adds matched class to selected cards that match
function matchedPair() {
  if (flippedCards.length === 2 && flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
    for (let i = 0; i < flippedCards.length; i++) {
      flippedCards[i].classList.add('flipped', 'matched');
      matchedCards.push(this);
      totalMatched++;
    }
    //Clear flippedCards Array
    flippedCards.splice(0, 16);
    //Call matchedGame function
    matchedGame();
  }
}

//This function constructs modal at game end
function matchedGame() {
  if (totalMatched === 16) {
    stop();
    setTimeout(function () {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `<div class='modal-content'>
      <h1>Congratulations!</h1>
      <p>Thank's for playing the Brilliant Economists Memory Game.</p>
      <p>You completed the game in <span>${totalClicks}</span> clicks with a time of <span>${myStopWatch.textContent}</span> minutes</p><br>
      <div id='modal-stars'>Your Star Rating is: <ul>${starRating.innerHTML}</ul> 
      </div><br>
      <p>If you would like to play again click the button below.</p>
      <button id='modal-reset' type ="button" onclick="reload()">Play Again</button>
      </div>`;
      document.body.appendChild(modal);
    }, 2000)

  }

}


//This function assigns player star rating based on number of clicks to complete the game
function rating() {
  if (totalClicks <= 29) {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  } else if (30 <= totalClicks && totalClicks <= 39) {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  } else if (totalClicks >= 40) {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>`
  } else {
    starRating.innerHTML = `
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  }
}

//This function reloads/restarts the game
function reload() {
  myStopWatch.textContent = '00:00';
  location.reload();
}

//Create a Stop Watch
function time() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (seconds > 9) {
    mySeconds = seconds;
  } else if (seconds <= 9) {
    mySeconds = '0' + seconds;
  } else {
    mySeconds = '00';
  }

  if (minutes > 9) {
    myMinutes = minutes;
  } else if (minutes <= 9) {
    myMinutes = '0' + minutes;
  } else {
    myMinutes = '00';
  }
  myStopWatch.textContent = (myMinutes + ":" + mySeconds);

  timer();
}
//This Function Starts the Stop Watch After 1 Second Delay
function timer() {
  t = setTimeout(time, 1000);
}

//This funtion Stops the Stop Watch and calls clearTimeout Function
function stop() {
  clearTimeout(t);
}
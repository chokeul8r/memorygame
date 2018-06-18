const imgList = ['<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/fama_card.png" alt="Eugene Fama">', '<img src="img/fama_card.png" alt="Eugene Fama">', '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/hayek_card.png" alt="Friedrich Hayek">', '<img src="img/hayek_card.png" alt="Friedrich Hayek">', '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/menger_card.png" alt="Carl Menger">', '<img src="img/menger_card.png" alt="Carl Menger">', '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">', ];

const cardDeck = document.querySelector('.deck');
const cardArray = [];
const counter = document.querySelector('.moves');
const starRating = document.querySelector('.stars');
const flippedCards = [];
const matchedCards = [];
const startTrigger = [];
let startTime = 0;
let finishTime = 0;
let totalMatched = 0;
let timeElapsed = finishTime - startTime;
let minutes = Math.floor(timeElapsed / 60000);
let secRemaining = Math.round((timeElapsed / 1000) - (minutes * 60));


function createCards() {
  //Loops over imgList Array - Constructs Cards - Pushes to Card Array
  for (let i = 0; i < imgList.length; i++) {
    const cards = document.createElement('div');
    cards.classList.add('card');
    cards.innerHTML = `<div class='back'>${imgList[i]}</div>
    <div class='front'><i class="fa fa-line-chart" style="font-size:60px;color:#ffffff;"></i></div>`
    cardArray.push(cards);
  }
  //Loops and Shuffles Card Array 
  for (let i = cardArray.length - 1; i >= 0; i--) {

    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = cardArray[randomIndex];

    cardArray[randomIndex] = cardArray[i];
    cardArray[i] = itemAtIndex;
    //Adds Event Listener to Cards - Assigns Flipped Class to Flipped Cards - Pushes Flipped Cards to Flipped Cards Array
    cardArray[i].addEventListener('click', function () {
      //Push Clicked Cards Into flippedCards Array
      flippedCards.push(this);
      //Push Clicked Cards Into startTrigger Array
      startTrigger.push(this);
      //limit the number of flipped cards to two
      if (flippedCards.length < 3) {
        this.classList.add('flipped');
      }
      //Trip Date.now startTime 
      if (startTrigger.length = 1) {
        startTime = Date.now();
      }
      //Call notMatched function 
      notMatched();
      //Call matchedPair function
      matchedPair();
    });
    //Append Shuffled Cards to HTML Document 
    cardDeck.appendChild(cardArray[i]);
  }
}

createCards();

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

function matchedGame() {
  if (totalMatched === 16) {
    setTimeout(function () {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `<div class='modal-content'>
      <h1>Congratulations</h1>
      <p>This is a paragraph</p>
      <p>Another paragraph with 2 spans<span>1</span><span>2</span>
      <button id='modal-reset' type ="button" onclick="reload()">Reset Button</button>
      </div>`;
      document.body.appendChild(modal);
    }, 2000)
  }
}
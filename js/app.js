const imgList = ['<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/bastiat_card.png" alt="Frédéric Bastiat">', '<img src="img/fama_card.png" alt="Eugene Fama">', '<img src="img/fama_card.png" alt="Eugene Fama">', '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/friedman_card.png" alt="Milton Friedman">', '<img src="img/hayek_card.png" alt="Friedrich Hayek">', '<img src="img/hayek_card.png" alt="Friedrich Hayek">', '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/keynes_card.png" alt="John Maynard Keynes">', '<img src="img/menger_card.png" alt="Carl Menger">', '<img src="img/menger_card.png" alt="Carl Menger">', '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/mises_card.png" alt="Ludwig von Mises">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">', '<img src="img/rothbard_card.png" alt="Murray Rothbard">', ];

const cardDeck = document.querySelector('.deck');
const cardArray = [];


function createCards() {
  for (let i = 0; i < imgList.length; i++) {
    const cards = document.createElement('div');
    cards.classList.add('card');
    cards.innerHTML = `<div class='back'>${imgList[i]}</div>
    <div class='front'><i class="fa fa-line-chart" style="font-size:60px;color:#ffffff;"></i></div>`
    cardArray.push(cards);
  }

}


createCards();
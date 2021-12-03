var myCards = document.getElementById('container');
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var appendMinutes = document.getElementById("minutes");
var play = document.getElementById("play");
var cardsOpen = document.getElementById("open");
var remaining = document.getElementById("remaining");
var text = document.getElementById('text');
var winText = document.getElementById('win');

let help = document.getElementById("help")
let popup = document.getElementById('cd-popup')

var resultsArray = [];
var counter = 0;
var cpt = 00; // nombre de fois joué
var nbOpen = 00; // nombre de cartes ouvertes
var nbRemaining = 52; //nombre de cartes restantes
var minutes = 00;
var seconds = 00; 
var tens = 00; 
var Interval ;
var deckId = null;
var deck = [];
var cards = [] // merge to arrays 


var setClassName = (className) => { // permet de retourner les cartes avec les class CSS
  var x = document.getElementsByClassName("flipped");
  setTimeout(() => {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }
     
  },800);
   
}

var win =  () => { // test la fin du jeux 

  if(nbRemaining === 00) {
    clearInterval(Interval);
    winText.innerHTML = ` 🎊 You  win  💪🏿  After 0${minutes} : 0${seconds} : ${tens}`;
    pop.className = 'pop-up'
  } 
  
}
     
startTimer = () => {
  tens++; 
    
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }
    
  if (tens > 9){
    appendTens.innerHTML = tens;
      
  } 
    
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
    
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

  if (seconds > 59) {
    minutes++;
    appendMinutes.innerHTML = "0" + minutes;
    seconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }
  
}


// get decks

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`, requestOptions)
  .then(response => response.json())
  .then((result) => {
    cards = result;
    console.log(cards);
    result.cards.forEach(el => {
      var card = document.createElement('div');
      card.dataset.item = el.code;
      card.dataset.view = "card";
      card.className = "card";
      myCards.appendChild(card);
        
      card.onclick = function () {
      
        if (this.className != 'flipped' && this.className != 'correct'){
          this.className = 'flipped';
          this.innerHTML += ` <img src="${el.image}" id=${el.code} class = "flipped" "> `
            var result = el
            resultsArray.push(result);
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
        }
      
        if (resultsArray.length == 2) {

          if (resultsArray[0].value === resultsArray[1].value) {
            setClassName("correct");
            play.innerHTML = cpt += 2 ;
            cardsOpen.innerHTML = nbOpen += 2;
            remaining.innerHTML = nbRemaining -= 2;
            counter ++;
            win();
            resultsArray = [];
          } else {
            setClassName("reverse");
            play.innerHTML = ++cpt;
            resultsArray = [];
          }
          
        }
        
      }
    });
    
  })
  .catch(error => console.log('error', error));



/* ---------------------------------------------
                         POP UP 
   ---------------------------------------------*/


help.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.add("is-visible");
});


popup.addEventListener('click', (event) => {
    event.preventDefault();
    popup.classList.remove("is-visible");
});

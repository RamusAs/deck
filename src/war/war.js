let deckId
let remCards = document.getElementById("rem-nbr")
let imgHolder = document.getElementById("cards")
let countBtn = document.getElementById("counter")
let countBtn1 = document.getElementById("counter1")
let winner = document.getElementById("winner-container")
let drawBtn = document.getElementById("draw-card")
let shuffBtn = document.getElementById("shuffle-btn")
let Card1
let Card2

let cardValues = { //  Permet de definir la valeur de chaque carte 
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    JACK:11,
    QUEEN:12,
    KING:13,
    ACE:14
}

let player1Score = 0
let player2Score = 0
let remBtnNum = 0
drawBtn.disabled = true

function shuffleCard () { // piocher un deck de 52 cartes
    fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=52")
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        remBtnNum=data.remaining
        deckId = data.deck_id
    })
    .then(res => {
        console.log(res)
        remCards.textContent =`46` 
        createStack()
        imgHolder.children[0].innerHTML = ` <div id ="img1"class="img-holder1"></div> ` 
        imgHolder.children[1].innerHTML = ` <div id ="img1"class="img-holder1"></div> `
        countBtn.textContent = "Computer Score:" + player1Score
        countBtn1.textContent = "My Score:" + player2Score
    })
    drawBtn.disabled = false
}

function createStack () { // on defini deux piles. Une pour le joueur et une pour l'ordi a la suite.
    
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/joueur1/add/?cards=AS,2S,3S,4S,5S,6S,8S,9S,0S,JS,QS,KS,AC,2C,3C,4C,5C,6C,8C,9C,0C,JC,QC,KC`)
    .then(
        createStack2() // on crée la pile du second joueur)
    )
}


function createStack2 () {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/joueur2/add/?cards=AD,2D,3D,4D,5D,6D,8D,9D,0D,JD,QD,KD,AH,2H,3H,4H,5H,6H,8H,9H,0H,JH,QH,KH`)
}

function drawCard () { // on pioche une carte pour l'ordi de façon random
    fetch( `https://deckofcardsapi.com/api/deck/${deckId}/pile/joueur1/draw/random/?count=1`)
    .then(res=>res.json())
    .then(data => {
        imgHolder.children[0].innerHTML=`<img src=${data.cards[0].image} class="cardClass"/>`
        Card1 = data.cards[0].value // cards[0] corresponds a la première pile
        drawCard2 () // puis on pioche une carte pour le joueur random dans la pile
    })
}

function drawCard2 () { // pioche de la carte du joueur.
    fetch( `https://deckofcardsapi.com/api/deck/${deckId}/pile/joueur2/draw/random/?count=1`)
    .then(res=>res.json())
    .then(data=>{ 
        shuffBtn.disabled=true
        remBtnNum = 2*(data.piles.joueur2.remaining)
        remCards.textContent =`${remBtnNum}`
        imgHolder.children[1].innerHTML=`<img src=${data.cards[0].image} class="cardClass"/>`
        Card2 = data.cards[0].value
        decideWinner () // on test qui est le gagnant de la main
        if (remBtnNum===0){ // on test si le jeu est fini et qui le remporte.
            shuffBtn.disabled=false
            drawBtn.disabled= true
            if(player1Score>player2Score){
                winner.textContent = `Game Over 🎊 The Computer wins with ${player1Score}`
                endGame()
            }else if(player2Score>player1Score){
                winner.textContent = `Game Over 💪🏿 I win with ${player2Score}`
                endGame()
            }
            else {
                winner.textContent="Nobody win !! You want to try again ? "
            }
            
        }
                
    })
}


endGame = () => {
    player1Score = 0
    player2Score = 0
    remBtnNum = 0
    drawBtn.disabled = true
    shuffBtn.disabled = false
}

function decideWinner () { //on test qui gagne une main 
    
    if(cardValues[Card1] > cardValues[Card2]){
        player1Score++ // on incrémente les points du joueur 1
        countBtn.textContent = "Computer Score:" + player1Score
        winner.textContent=`Computer Wins Hand !`
    }else if(cardValues[Card1]===cardValues[Card2]){
        winner.textContent=`TIE`
    }else{
        player2Score++
        countBtn1.textContent = "My Score:" + player2Score
        winner.textContent=`I Win Hand!`
    }

}


shuffBtn.addEventListener('click',shuffleCard) // shuffle card on click 

drawBtn.addEventListener('click',drawCard) // draw card on click

      
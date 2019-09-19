// BlackJack game for biginners

let suits = ["Hearts", "Clubs", "Dimonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", 
             "Seven", "Six", "Five", "Four", "Three", "Two"];

// accessing the DOM of the html page
let textArea = document.getElementById("text-area"),
    newGameButton = document.getElementById("new-game-button"),
    hitButton = document.getElementById("hit-button"),
    stayButton = document.getElementById("stay-button");

// game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//hide the hit and stay buttons at the biginning of the game
hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

// strat a new game
newGameButton.addEventListener("click", function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    suffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
});

// function for hit and stay button
hitButton.addEventListener("click", function(){
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener("click", function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

// function to creat array deck of 52 card objects
function createDeck(){
    let deck = [];

    for(let suitIdx = 0; suitIdx < suits.length; suitIdx++){
        for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
            let card ={
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

// suffling function
function suffleDeck(deck){
    for(let i = 0; i < deck.length; i++){
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = temp;
    }
}

// fuction to convert card object in deck array to string 
function getCardString(card){
    return card.value + " of " + card.suit;
}

// function to get next card object from deck array
function getNextCard(){
    return deck.shift();
}

// get the value of a card
function getCardNumericValue(card){
    switch(card.value){
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }   
}

// get the score from array of cards
function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < cardArray.length; i++){
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if(card.value === "Ace"){
            hasAce = true;
        }
    }
    if(hasAce && score + 10 <= 21){
        return score + 10;
    }
    return score;
}

// update the scores of players
function updateScore(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

// check for the end of game
function checkForEndOfGame(){
    updateScore();

    if(gameOver){
        // let dealer take the cards
        while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
            dealerCards.push(getNextCard());
            updateScore();
        }
    }

    if(playerScore > 21){
        playerWon = false;
        gameOver = true;
    } else if(dealerScore > 21){
        playerWon = true;
        gameOver = true;
    } else if(gameOver){
        if(playerScore > dealerScore){
            playerWon = true;
        } else{
            playerWon = false;
        }
    }
    
}

function showStatus(){
    if(!gameStarted){
        textArea.innerText = "Welcome to BlackJack\n\n";
        return;
    }
    
    // getting the cards in form of string
    let dealerCardString = "";
    for(let i = 0; i < dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + "\n";
    }

    let playerCardString = "";
    for(let i = 0; i < playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]) + "\n";
    }

    // update the score of players 
    updateScore();

    // printing out the information in string
    textArea.innerText = 
        "Dealer has:\n" +
        dealerCardString +
        "(score: " + dealerScore + ")\n\n" +

        "Player has:\n" +
        playerCardString +
        "(score: " + playerScore + ")\n\n";

    if(gameOver){
        if(playerWon){
            textArea.innerText += "YOU WIN!";
        } else{
            textArea.innerText += "DEALER WINS";
        }

        // if game is over show newgame button and hide other buttons
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

// let deck = createDeck();
// let playerCards = [getNextCard(), getNextCard()];

// console.log(playerCards);
// console.log(getCardString(playerCards[0]));
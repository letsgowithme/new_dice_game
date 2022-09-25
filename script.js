const buttonNewGame = document.getElementById("buttonNewGame");
const buttonRollDice = document.getElementById("buttonRollDice");
const buttonHold = document.getElementById("buttonHold");
const message = document.getElementById("message");
const titlePlayer1 = document.getElementById("titlePlayer1");
const titlePlayer2 = document.getElementById("titlePlayer2");
const statementPlayer1 = document.getElementById("statementPlayer1");
const statementPlayer2 = document.getElementById("statementPlayer2");
const dice = document.getElementById("dice");
const globalPlayer1 = document.getElementById("globalPlayer1");
const globalPlayer2 = document.getElementById("globalPlayer2");
const roundPlayer1 = document.getElementById("roundPlayer1");
const roundPlayer2 = document.getElementById("roundPlayer2");
const bgActivePlayer1 = document.getElementById("bgZone1");
const bgActivePlayer2 = document.getElementById("bgZone2");

let player1 = {
    name: "Player 1",
    round: 0,
    global: 0

};

let player2 = {
    name: "Player 2",
    round: 0,
    global: 0
};

let currentPlayer = player1;
let start = false;


function newGame() {
    start = true;
    message.innerText = "First player's turn!";
    buttonNewGame.style.background = "green";
    buttonNewGame.style.color = "white";

    roundPlayer1.innerText = "0";
    globalPlayer1.innerText = "0";
    roundPlayer2.innerText = "0";
    globalPlayer2.innerText = "0";

    player1.global = 0;
    player2.global = 0;
    player1.round = 0;
    player2.round = 0;

    firstPlayerTurn();
  
}


function rollDice() {
    if ( start === true && (player1.global < 100 || player2.global < 100 )) {
        let result = Math.floor(Math.random() * 6) + 1;

        dice.animate([ { transform: "rotateZ(360deg)" } ], { duration: 1000, iterations: 2 });
        setTimeout(function () {
            document.querySelector(".img").setAttribute("src","./images/Dice" + result + ".png");

            if ( currentPlayer === player1 ) {
                if ( result === 1 ) {
                    player1.round = 0;
                    roundPlayer1.innerText = "0";
                    secondPlayerTurn();
                }
                else {
                    player1.round += result;
                    roundPlayer1.innerText = player1.round.toString();
                }
            }
            else {
                if ( result === 1 ) {
                    player2.round = 0;
                    roundPlayer2.innerText = "0";
                    firstPlayerTurn();
                }
                else {
                    player2.round += result;
                    roundPlayer2.innerText = player2.round.toString();
                }
            }
        }, 2000);
    } else {
        message.innerText = "START THE GAME \u261d  !";
    }
}


function holdScore() {
    if (  start === true && (player1.global < 100 || player2.global < 100 )) {
        if ( currentPlayer === player1 ) {
            player1.global += player1.round;
            player1.round = 0;
            roundPlayer1.innerText = "0";
            globalPlayer1.innerText = player1.global.toString();

            if ( player1.global >= 100 ) {
                message.innerText = "First player wins! The game is over!";
                start = false;
            }
            else {
                secondPlayerTurn();
            }
        }
        else {
            player2.global += player2.round;
            player2.round = 0;
            roundPlayer2.innerText = "0";
            globalPlayer2.innerText = player2.global.toString();

            if ( player2.global >= 100 ) {
                message.innerText = "Second player wins! The game is over!";
                start = false;
            }
            else {
                firstPlayerTurn();
            }
        }
    } else {
        message.innerText = "START THE GAME \u261d  !";
    }
}


function firstPlayerTurn() {
    currentPlayer = player1;         // On passe au joueur 1
    message.innerText = "First player's turn!";
    statementPlayer1.style.opacity = "1";
    statementPlayer2.style.opacity = "0";
    titlePlayer1.style.color = "blue";
    titlePlayer2.style.color = "gray";
    bgActivePlayer1.style.display="block";
    bgActivePlayer2.style.display="none";
    
}


function secondPlayerTurn() {
    currentPlayer = player2;             // On passe au joueur 2
    message.innerText = "Second player's turn!";
    statementPlayer1.style.opacity = "0";
    statementPlayer2.style.opacity = "1";
    titlePlayer1.style.color = "gray";
    titlePlayer2.style.color = "blue";
    bgActivePlayer2.style.display="block";
    bgActivePlayer1.style.display="none";
}


buttonNewGame.addEventListener("click", newGame);
buttonRollDice.addEventListener("click", rollDice);
buttonHold.addEventListener("click", holdScore);

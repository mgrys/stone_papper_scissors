//initial a new game
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);
//choose gamer
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
    playerPick('rock');
});
pickPaper.addEventListener('click', function () {
    playerPick('paper');
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors');
});
//game state inicialization
var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    modalElem = document.getElementById('js-myModal');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
            player.score =0;
            computer.score =0;
            setGamePoints();
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerPointsElem.style.backgroundColor ='none'; //color reset
        computerPointsElem.style.backgroundColor = 'none'; //color reset
        playerNameElem.innerHTML = player.name;
    }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
        playerPointsElem.style.backgroundColor ='yellow';
        computerPointsElem.style.backgroundColor = 'yellow';
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        playerPointsElem.style.backgroundColor ='red';
        computerPointsElem.style.backgroundColor = 'blue';
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computerPointsElem.style.backgroundColor = 'red';
        playerPointsElem.style.backgroundColor ='blue';
        computer.score++;
    }
    setGamePoints();
    endGame();
}

function setGamePoints() {
    computerPointsElem.innerHTML = computer.score;
    playerPointsElem.innerHTML = player.score;
}

function endGame() {
    if (player.score >= 10) {
        gameState = 'ended';
        alert('The Winner is ' + player.name);
        setGameElements();
    } else if (computer.score >= 10) {
        gameState = 'ended';
        alert('The Winner is Computer');
        setGameElements();
    }
}

import {transpose} from "./node_modules/ramda/es/index.js";

//region Data
const choices = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors'
}
const gameOutcome = {
    win: 1,
    loose: -1,
    draw: 0
}
const matchOutcome = {
    win: 1,
    loose: -1,
    none: 0
}
const gameOutcomePoints = {
    win: 1,
    loose: 0,
    draw: 0
}
const outcomeToScoreUpdate = {
    [gameOutcome.win]: [1, 0],
    [gameOutcome.loose]: [0, 1],
    [gameOutcome.draw]: [0, 0],
}
const gameOutcomeToMessage = {
    [gameOutcome.win]: 'Win',
    [gameOutcome.draw]: 'Draw',
    [gameOutcome.loose]: 'Loose',
}
const rules = {
    [choices.rock]: {
        [choices.rock]: gameOutcome.draw,
        [choices.paper]: gameOutcome.loose,
        [choices.scissors]: gameOutcome.win
    },
    [choices.paper]: {
        [choices.rock]: gameOutcome.win,
        [choices.paper]: gameOutcome.draw,
        [choices.scissors]: gameOutcome.loose
    },
    [choices.scissors]: {
        [choices.rock]: gameOutcome.loose,
        [choices.paper]: gameOutcome.win,
        [choices.scissors]: gameOutcome.draw
    },
}

const predAndMessage = [[(score) => score > 0, 'You win!'], [(score) => score < 0, 'You loose!'], [(score) => score === 0, 'Draw!']];

const outcomeToScoreUpdateOld = {
    [gameOutcome.win]: () => score.player++,
    [gameOutcome.loose]: () => score.computer++,
    [gameOutcome.draw]: () => {
    },
}

const indexWinThresholdToMatchStatus = {
    "-1": matchOutcome.none,
    0: matchOutcome.win,
    1: matchOutcome.loose
}

const winThreshold = 5;

const score = {
    player: 0,
    computer: 0
}

const winnerToMessage = {
    player: 'Congrats! You win!',
    computer: 'Sorry..., you lost!'
}

const matchOutcomeToMessage = {
    [matchOutcome.win]: 'Congrats! You win!',
    [matchOutcome.loose]: 'Sorry..., you lost!'
}

const choicesToGameOutcome = (a, b) => rules[a][b];

const gameState = []; //gameState = [[1,0],[0,1]]  //outcomeToScoreUpdate
//endregion

const gameLoop = (oldGameState, selection) => {
    return [...oldGameState, selection];
}

const gameToScore = ([playerSel, computerSel]) => {
    console.log(playerSel);
    console.log(computerSel);
    return outcomeToScoreUpdate[rules[playerSel][computerSel]];
}

const gameStateToScore = (gameState) => {
    const scores = gameState.map(gameToScore);
    return transpose(scores).map(sum);
}

const gameScoreToMatchStatus = (gameScore) => indexWinThresholdToMatchStatus[gameScore.indexOf(winThreshold)];

const isEndMatch = (gameState) => gameScoreToMatchStatus(gameStateToScore(gameState)) !== matchOutcome.none;

//const test = () => {console.log('Test btn onclick');}

function test() {
    console.log('test');
}

window.test = test;
const render = (gameState) => {
    console.log('gameState render', gameState);
    document.querySelector('#app').innerHTML = getHTML(gameState);

    const btns = document.querySelectorAll('.play_btn');
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            playRound2(btn.id, getComputerChoice());
        });
    });
    const resetBtn = document.querySelector('#reset_btn');
    resetBtn.addEventListener('click', () => {
        gameState = [];
        console.log('test');
        render(gameState);
    });
}


//region HTML components
const headline = () => `<h1>Play Rock, Paper, Scissors!</h1>
    <p>Who will get 5 points first?</p>`;

//onclick="playRound2(this.id)"
const choiceBtns = () => `<div class="button_container">
            <button class="dark_green_box play_btn" id="Rock">Rock</button> 
            <button class="dark_green_box play_btn" id="Paper">Paper</button>
            <button class="dark_green_box play_btn" id="Scissors">Scissors</button>
        </div>`;

const resultCont = (gameOutcome) => `<h2>Result</h2>
        <div class="current_result_container">
            <div class="current_result blue_box">${gameOutcome ? gameOutcomeToMessage[gameOutcome] : '---'}</div>
        </div>`;

const gameBtnAndResultCont = (gameState) => {
    const game = gameState.at(-1);
    const gameOutcome = game && choicesToGameOutcome(...game);
    const isEndMatchC = isEndMatch(gameState);
    return isEndMatchC ? '' : `<div class="game_container">
        ${choiceBtns()}
        ${resultCont(gameOutcome)}
        </div>`
}

const matchResultCont = (gameState) => isEndMatch(gameState) ? `<div class="match_result_container">
                                <div class="match_result blue_box">${matchOutcomeToMessage[gameScoreToMatchStatus(gameStateToScore(gameState))]}</div>
                               </div>` : '';

const scoreOverviewCont = (gameState) => `<div class="score_container">
        <h2>Score</h2>
        <div class="score_overview">   
            <div class="score_player_container">
                <div>Player</div>
                <div id="player_points">${gameStateToScore(gameState)[0] ?? 0}</div>
            </div>
            <div class="score_computer_container">
                <div>Computer</div>
                <div id="computer_points">${gameStateToScore(gameState)[1] ?? 0}</div>
            </div>
        </div>
    </div>`

const resetBtnCont = () => `<div class="button_container">
        <button class="red_box" id="reset_btn">Reset Game</button>
    </div>`;
//endregion

const getHTML = (gameState) => {
    console.log('gameState getHTML', gameState);
    console.log(matchResultCont(gameState));
    return `<div>
    ${headline()}
    ${gameBtnAndResultCont(gameState)}
    ${matchResultCont(gameState)}
    ${scoreOverviewCont(gameState)}
    ${resetBtnCont()}
    </div>`;
}

render(gameState);

// const resetBtn = document.querySelector('#reset_btn');
//
// resetBtn.addEventListener('click', () => {
//     console.log('test');
//     playerScoreDiv.textContent = '0';
//     computerScoreDiv.textContent = '0';
//     score.player = score.computer = 0;
//     gameContainerDiv.setAttribute('style', 'display: block');
//     resultDiv.setAttribute('style', 'display: none');
// });

const playerScoreDiv = document.querySelector('#player_points');
const computerScoreDiv = document.querySelector('#computer_points');
const currResultDiv = document.querySelector('.current_result');
const gameContainerDiv = document.querySelector('.result_container');
const resultDiv = document.querySelector('.match_result_container');
const gameResultDiv = document.querySelector('.match_result');

function getComputerChoice() {
    return Object.values(choices)[getRandomInteger(3)];
}

function game() {
    const scores = range(0, 5).map(() => playRound(getComputerChoice()));
    return predAndMessage.find(([pred]) => pred(sum(scores)))[1];

}

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

function playRound2(playerSelection, computerSelection) {
    console.log('gameState before', gameState);
    console.log(computerSelection);
    console.log(playerSelection);
    //const outcome = choicesToGameOutcome(playerSelection, computerSelection);
    //console.log(outcome);
    //gameState.push(outcomeToScoreUpdate[outcome]);
    gameState.push([playerSelection, computerSelection]);
    console.log('gameState after', gameState);
    render(gameState);
}

function playRound(playerSelection, computerSelection) {
    const outcome = choicesToGameOutcome(playerSelection, computerSelection);
    currResultDiv.textContent = gameOutcomeToMessage[outcome];
    outcomeToScoreUpdate[outcome]();
    playerScoreDiv.textContent = score.player;
    computerScoreDiv.textContent = score.computer;
    if (score.player === 5 || score.computer === 5) {
        //render(gameState);
        //     gameContainerDiv.setAttribute('style', 'display: none');
        //     resultDiv.setAttribute('style', 'display: flex');
        //     const winner = getKeyByValue(score, 5);
        //     gameResultDiv.textContent = winnerToMessage[winner];
    }
}

// const btns = document.querySelectorAll('.play_btn');
// btns.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         playRound2(btn.id, getComputerChoice());
//     });
// });

//region Generic Functions
const getRandomInteger = (max) => Math.floor(Math.random() * max)

function range(min, max) {
    const arr = [];
    for (let i = min; i < max; i++) {
        arr.push(i);
    }
    return arr;
}

function sum(list) {
    return list.reduce(add);
}

function add(a, b) {
    return a + b;
}

//endregion

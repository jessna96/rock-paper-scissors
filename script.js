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
const gameOutcomePoints = {
    win: 1,
    loose: 0,
    draw: 0
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

const outcomeToScoreUpdate = {
    [gameOutcome.win]: () => score.player++,
    [gameOutcome.loose]: () => score.computer++,
    [gameOutcome.draw]: () => {},
}

const score = {
    player: 0,
    computer: 0
}

const winnerToMessage = {
    player: 'Congrats! You win!',
    computer: 'Sorry..., you lost!'
}

const resetBtn = document.querySelector('#reset_btn');
resetBtn.addEventListener('click', () => {
    playerScoreDiv.textContent = '0';
    computerScoreDiv.textContent = '0';
    score.player = score.computer = 0;
    gameContainerDiv.setAttribute('style', 'display: block');
    resultDiv.setAttribute('style', 'display: none');
});

const playerScoreDiv = document.querySelector('#player_points');
const computerScoreDiv = document.querySelector('#computer_points');
const currResultDiv = document.querySelector('.current_result');
const gameContainerDiv = document.querySelector('.game_container');
const resultDiv = document.querySelector('.game_result_container');
const gameResultDiv = document.querySelector('.game_result');

const choicesToGameOutcome = (a, b) => rules[a][b];

const getRandomInteger = (max) => Math.floor(Math.random() * max)

function getComputerChoice() {
    return Object.values(choices)[getRandomInteger(3)];
}

const range = (min, max) => {
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

function game() {
    const scores = range(0, 5).map(() => playRound(getComputerChoice()));
    return predAndMessage.find(([pred]) => pred(sum(scores)))[1];

}

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

//console.log(game());

function playRound(playerSelection, computerSelection) {
    const outcome = choicesToGameOutcome(playerSelection, computerSelection);
    currResultDiv.textContent = gameOutcomeToMessage[outcome];
    outcomeToScoreUpdate[outcome]();
    playerScoreDiv.textContent = score.player;
    computerScoreDiv.textContent = score.computer;
    if (score.player === 5 || score.computer === 5) {
        gameContainerDiv.setAttribute('style', 'display: none');
        resultDiv.setAttribute('style', 'display: flex');
        const winner = getKeyByValue(score, 5);
        gameResultDiv.textContent = winnerToMessage[winner];
    }
}

const btns = document.querySelectorAll('.play_btn');
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        playRound(btn.id, getComputerChoice());
    });
});

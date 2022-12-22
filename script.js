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
const gameOutcomeToMessage = {
    [gameOutcome.win]: 'win',
    [gameOutcome.draw]: 'draw',
    [gameOutcome.loose]: 'loose',
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

//TESTCOMMENT
const predAndMessage = [[(score) => score > 0, 'You win!'], [(score) => score < 0, 'You loose!'], [(score) => score === 0, 'Draw!']];

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

console.log(game());

function playRound(computerSelection) {
    const playerSelection = capitalize(prompt('Rock, Paper or Scissors?'));
    const outcome = choicesToGameOutcome(playerSelection, computerSelection);
    console.log(gameOutcomeToMessage[outcome]);
    return outcome;
}

function capitalize(string) {
    const lowerCaseStr = string.toLowerCase();
    return lowerCaseStr.replace(lowerCaseStr[0], lowerCaseStr[0].toUpperCase());
}
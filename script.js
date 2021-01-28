'use strict';

const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');
const currentElement0 = document.getElementById('current--0');
const currentElement1 = document.getElementById('current--1');

let activePlayer, scores, currentScore, playing;

const reset = () => {
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');
  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--active');
  diceElement.classList.add('hidden'); //Hide the dice

  currentElement0.textContent = 0;
  currentElement1.textContent = 0;
  activePlayer = 0; //0:player0 | 1:player1
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
};

//Initialise all items when the game starts.
reset();

const changePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

//Button Roll Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice_${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

//Button Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 150) {
      playing = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      changePlayer();
    }
  }
});

//Button New Game functionality
btnNew.addEventListener('click', reset);

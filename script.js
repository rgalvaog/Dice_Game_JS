// Script.js
// PIG GAME
// Rafael G. Guerra, 2022

'use strict';

// ELEMENTS

const player0_element = document.querySelector('.player--0');
const player1_element = document.querySelector('.player--1');
const score0_element = document.querySelector('#score--0');
const score1_element = document.querySelector('#score--1');
const current0_element = document.querySelector('#current--0');
const current1_element = document.querySelector('#current--1');
const dice_element = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// VARIABLES

let scores, currentScore, activePlayer, playing;

// FUNCTIONS

// Set initial conditions

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0_element.textContent = 0;
  score1_element.textContent = 0;
  current0_element.textContent = 0;
  current1_element.textContent = 0;

  dice_element.classList.add('hidden');
  player0_element.classList.remove('player--winner');
  player1_element.classList.remove('player--winner');
  player0_element.classList.add('player--active');
  player1_element.classList.remove('player--active');
};

// Switch Player

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0_element.classList.toggle('player--active');
  player1_element.classList.toggle('player--active');
};

// INITIALIZE

init();

// ROLL DICE

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice_element.classList.remove('hidden');
    dice_element.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD SCORE

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      dice_element.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

// RESETS SCORE

btnNew.addEventListener('click', init);

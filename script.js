'use strict';
// sellecting ellements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let currentScore = 0;
// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// rolling dice functionallity
btnRoll.addEventListener('click', function () {
  // 1- generate arandom dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2- display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3- check for rolled 1 ; if true,switch to next player
  if (dice !== 1 && player0El.classList.contains('player--active')) {
    // add dice to current score
    currentScore += dice;
    score0El.textContent = currentScore; //change later
  } else if (dice === 1 && player0El.classList.contains('player--active')) {
    // switch to nnext palyer
    currentScore = 0;
    score0El.textContent = currentScore;
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
  } else if (dice !== 1 && player1El.classList.contains('player--active')) {
    currentScore += dice;
    score1El.textContent = currentScore;
  } else if (dice === 1 && player1El.classList.contains('player--active')) {
    currentScore = 0;
    score1El.textContent = currentScore;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
});
// 12
btnHold.addEventListener('click', function () {
  if (player0El.classList.contains('player--active')) {
    current0El.textContent =
      Number(score0El.textContent) + Number(current0El.textContent);
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
    currentScore = 0;
    score0El.textContent = currentScore;
    if (Number(current0El.textContent) >= 100) {
      player0El.classList.add('player--winner');
      player1El.style.opacity = 0.3;
      diceEl.classList.add('hidden');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    }
  } else if (player1El.classList.contains('player--active')) {
    current1El.textContent =
      Number(score1El.textContent) + Number(current1El.textContent);
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    currentScore = 0;
    score1El.textContent = currentScore;
    if (Number(current1El.textContent) >= 100) {
      player1El.classList.add('player--winner');
      player0El.style.opacity = 0.3;
      diceEl.classList.add('hidden');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    }
  }
});
// the winnig condition

// the new game btn
btnNew.addEventListener('click', function () {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  player0El.style.opacity = 1;
  player1El.style.opacity = 1;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});

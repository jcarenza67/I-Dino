import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Dino from './js/Dino.js';

let remainingGuesses;
let incorrectGuesses;
let currentDino;

function initializaGame() {
  remainingGuesses = 7;
  incorrectGuesses = [];
  currentDino = '';
  getDino();
  document.getElementById('remaining-guesses').textContent = `Remaining Guesses: ${remainingGuesses}`;
  document.getElementById('incorrect-guesses').textContent = '';
}
function getDino() {
  Dino.getDino()
    .then(function(dinoName) {
      currentDino = dinoName;
    })
    .catch(function(error) {
      alert("Error: " + error);
    });
}

function handleGuess(){
  const userInput = document.getElementById('user-input');
  const guess = userInput.value.toLowerCase().trim();
  const gameResult = document.getElementById('game-result');
  userInput.value = '';

  if(!currentDino || !guess) return;

  if(guess === currentDino.toLowerCase()) {
    alert('You win!');
    initializaGame();
  } else {
    remainingGuesses--;
    incorrectGuesses.push(guess);
    document.getElementById('remaining-guesses').textContent = `Remaining Guesses: ${remainingGuesses}`;
    document.getElementById('incorrect-guesses').textContent = `Incorrect Guesses: ${incorrectGuesses.join(', ')}`;

    if(remainingGuesses === 0) {
      gameResult.textContent = `You lose! The correct answer was ${currentDino}`;
      initializaGame();
      return;
    }
  }
}

document.getElementById('hint').addEventListener('click', () => {
  const hintMessageElement = document.getElementById('hint-message');
  hintMessageElement.textContent = 'The first letter of the dinosaur name is: ' + currentDino.charAt(0);
});

document.getElementById('submit-guess').addEventListener('click', handleGuess);
document.getElementById('reset').addEventListener('click', () => {
  location.reload();
});

initializaGame();

window.addEventListener('load', function() {
  event.preventDefault();
});
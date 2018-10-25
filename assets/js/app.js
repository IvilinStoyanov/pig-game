/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
ECMA5
*/

var scores, roundScore, activePlayer, gamePlaying, scoreToWin;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    // Check if the game is playing
    if(gamePlaying) {
          // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result 
   var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/img/' + 'dice-' + dice + '.png';
    // 3. Update the round score IF the rolled number was NOT a 1   
    if(dice !== 1) {
        // Add score 
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        // Next Player
        document.querySelector('.wrapper').classList.add('wrong');
        setTimeout(function() {
            document.querySelector('.wrapper').classList.remove('wrong');
        } , 100)        
        nextPlayer();
        
        }
    }
});

document.querySelector('.btn-score').addEventListener('click', function() {
    // Get global score
    scoreToWin = document.querySelector('.final-score').value;
        // Set global score to scoreToWin variable
    document.getElementById("global-score").textContent = 'GLOBAL SCORE: ' + scoreToWin;
        //Enter global score to win
    document.querySelector('.final-score').disabled = true;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Check if the game is playing
    if(gamePlaying) {
            // Add current score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if(scoreToWin) {
           scoreToWin = scoreToWin; 
        }
    // Check if player won the game
    if(scores[activePlayer] >= scoreToWin) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        gamePlaying = false;
    } else {
        // Next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';     
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {    
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
scoreToWin = 100;
    
gamePlaying = true;
    
document.querySelector('.dice').style.display = 'none';
    
document.querySelector('.final-score').disabled = false;
document.querySelector('.final-score').value = '';
document.getElementById("global-score").textContent = 'GLOBAL SCORE: 100';

// Seting values to zero
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
    
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

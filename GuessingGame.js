function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
    let rem = arr.length, temp, i;
    while (rem) {
        i = Math.floor(Math.random() * rem--);
        // temp = arr[rem];
        // arr[rem] = arr[i];
        // arr[i] = temp;
        [arr[rem], arr[i]] = [arr[i], arr[rem]];
    }
    return arr;
}

// class Game {
//     constructor() {
//         this.playersGuess = null;
//         this.pastGuesses = [];
//         this.winningNumber = generateWinningNumber();
//         this.provideHint = function() {
//             const hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
//             return shuffle(hints);
//         }
//     }
//     difference() {
//         return Math.abs(this.winningNumber - this.playersGuess)
//     }
//     isLower() {
//         return this.playersGuess < this.winningNumber;
//     }
//     playersGuessSubmission(n) {
//         if (typeof n !== 'number' || n < 1 || n > 100) throw 'That is an invalid guess.'; 
//         else this.playersGuess = n;
//         return this.checkGuess();
//     }
//     checkGuess() {
//         while (this.pastGuesses.length < 4) {

//             if (this.playersGuess === this.winningNumber) return 'You Win!';
//             else if (this.pastGuesses.includes(this.playersGuess)) return 'You have already guessed that number.';
//             else this.pastGuesses.push(this.playersGuess);

//             if (this.difference() < 10) return 'You\'re burning up!';
//             else if (this.difference() < 25) return 'You\'re lukewarm.';
//             else if (this.difference() < 50) return 'You\'re a bit chilly.';
//             else if (this.difference() < 100) return 'You\'re ice cold!';
//         }
//         return 'You Lose.';
//     }
// }
// function newGame() {
//     return new Game();
// }



// switch (this.difference) {
    //     case this.difference<10: 
    //         return 'You\'re burning up!';
    //         break;
    //     case this.difference<25:
    //         return 'You\'re lukewarm.';
    //         break;
    //     case this.difference<50:
    //         return 'You\'re a bit chilly.';
    //         break;
    //     case this.difference<100:
    //         return 'You\'re ice cold!';
    //         break;
    // }

function Game() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.provideHint = function() {
            const hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
            return shuffle(hints);
        }
}

Game.prototype.difference = function () {
    return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(n) {
    if (typeof n !== 'number' || n < 1 || n > 100) throw 'That is an invalid guess.'; 
    else this.playersGuess = n;
    return this.checkGuess();
}

let complete = false;
Game.prototype.checkGuess = function() {
    if (!complete) {
        if (this.playersGuess === this.winningNumber) {
            complete = true;
            return 'You Win!';
        }
        else if (this.pastGuesses.includes(this.playersGuess)) return 'Duplicate Guess.';
        else this.pastGuesses.push(this.playersGuess);

        if(this.pastGuesses.length === 5) {
            complete = true;
            return 'You Lose.';
        }
        else if (this.difference() < 10) return 'You\'re burning up!';
        else if (this.difference() < 25) return 'You\'re lukewarm.';
        else if (this.difference() < 50) return 'You\'re a bit chilly.';
        else if (this.difference() < 100) return 'You\'re ice cold!';
    }
}

function newGame() {
    return new Game();
}

Game.prototype.provideHint = function() {
    let hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hints);
}

function subInp(game) {
    creepy.play();
    let currGuess = +$('#player-input').val();
    let output = game.playersGuessSubmission(currGuess);
    let attempt = game.pastGuesses.length;
    console.log(game.pastGuesses, 'complete:', complete, 'attempt:', attempt);
    $('#title').text(output);
    game.isLower() ? $('#subtitle').text("Guess Higher!") : $('#subtitle').text("Guess Lower!");
    $('#g'+attempt).text(game.pastGuesses[attempt-1]);
    if (complete) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text('Click Reset!');
    }
}

$(document).ready(function() {
    let game = newGame();
    $('#submit').click(function() {
        subInp(game);
     })
    $('#player-input').keypress(function(e) {
        if (e.which == 13) {
            subInp(game);
            $('#player-input').val('');
        }
    });
    $('#hint').click(function() {
        let cheats = game.provideHint()
        $('#title').text(`Choose wisely: ${cheats[0]}, ${cheats[1]}, ${cheats[2]}...`);
        $('#hint').prop('disabled', true);
    });
});
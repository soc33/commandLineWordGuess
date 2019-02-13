var Letter = require("./letter");

var Word = function () {
    this.letterArr = [];
    this.toString = function (choice, haspicked) {
        var wordToDisplay = "";
        if (!haspicked) {
            for (x in choice) {
                if (choice.charAt(x) !== ' ') {
                    var letterToDisplay = "";
                    var l = choice.charAt(x);
                    var display = new Letter(l, false);
                    this.letterArr.push(display);
                    letterToDisplay = this.letterArr[x].returnLetter(this.letterArr[x].letter);
                    wordToDisplay += letterToDisplay + " ";
                } else {
                    var letterToDisplay = "";
                    var l = choice.charAt(x);
                    var display = new Letter(l, true);
                    this.letterArr.push(display);
                    letterToDisplay = this.letterArr[x].returnLetter(this.letterArr[x].letter);
                    wordToDisplay += letterToDisplay + " ";
                    wordToDisplay += "  ";
                }
            }
        } else {
            for (x in choice) {
                var letterToDisplay = "";
                letterToDisplay = this.letterArr[x].returnLetter(this.letterArr[x].letter);
                wordToDisplay += letterToDisplay + " ";
            }
        }
        return wordToDisplay;

    }
    this.checkLetters = function (userGuess) {
        for (r = 0; r < this.letterArr.length; r++) {
            this.letterArr[r].checkIfGuessed(this.letterArr[r].letter, userGuess);
        }
    }
    this.checkWins = function () {
        var winning = true;
        for (e = 0; e < this.letterArr.length; e++) {
            if (!this.letterArr[e].guessed) {
                winning = false;
            }
        }
        return winning;
    }
}

module.exports = Word;
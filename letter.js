var Letter = function (letter, guessed) {
    this.letter = letter;
    this.guessed = guessed;
    this.returnLetter = function (x) {
        if (this.guessed) { return x; } else { return "_"; }
    };
    this.checkIfGuessed = function (a, b) {
        if (a === b) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;
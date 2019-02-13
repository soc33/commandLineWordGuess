var Word = require("./word");
var inquirer = require("inquirer");
var chalk = require("chalk");
var horror = ["horror", "bride of chucky", "nightmare on elm street", "jason vs freddie"];
var comedy = ["comedy", "anchorman", "animal house", "honey I shrunk the kids"];

var arrToPickFrom = [];
beginGame = function () {
    inquirer.prompt({
        type: "list",
        choices: ["horror", "comedy"],
        name: "genre",
        message: "What genre would you like to play?"
    }).then(function (response) {
        switch (response.genre) {
            case "horror":
                pickGame(horror);
                setupGame();
                break;
            case "comedy":
                pickGame(comedy);
                setupGame();
                break;
        }
    })
}
beginGame();
pickGame = function (choice) {
    console.log("You chose to play the " + choice[0] + " game! Good luck!");
    for (var i = 1; i < choice.length; i++) {
        arrToPickFrom.push(choice[i]);
    }
}

var count = 0;
var count2 = 0;
var y = 0;
var wordObject;
var wordToGuess;
setupGame = function () {
    if (count < 3) {
        console.log(chalk.green("\n\n\n****************************************\n"));
        console.log("Heres a new word: \n");
        count2 = 0;
        wordObject = new Word();
        wordToGuess = wordObject.toString(arrToPickFrom[y], false);
        console.log(chalk.cyan(wordToGuess + "\n\n"));
        playGame();
    } else {
        console.log("You beat the game! ");
        inquirer.prompt({
            name: "playagain",
            type: "confirm",
            message: "Would you like to play again?"
        }).then(function (answer) {
            if (answer.playagain) {
                arrToPickFrom = [];
                y = 0;
                count = 0;
                beginGame();
            } else {
                console.log("Come back soon and play another genre!");
            }
        })
    }
}
var alreadyGuessed = [];
playGame = function () {
    if (count2 < 15) {
        console.log("You have already guessed: " + alreadyGuessed.join(", ") + " \n\n")
        console.log(chalk.green("****************************************"));
        inquirer.prompt({
            name: "guess",
            message: "Pick a letter to guess "
        }).then(function (response2) {
            alreadyGuessed.push(response2.guess);
            wordObject.checkLetters(response2.guess);
            wordToGuess = wordObject.toString(arrToPickFrom[y], true);
            console.log(chalk.cyan("\n\n"+ wordToGuess + "\n\n"));
            count2++;
            checkForWin();
        })
    } else {
        console.log("You ran out of guesses! Try again next time!");
    }
}
checkForWin = function () {
    if (wordObject.checkWins()) {
        console.log(chalk.blue("You correctly guessed the word! Congrats!"));
        count++;
        y++;
        alreadyGuessed = [];
        setupGame();
    } else {
        playGame();
    }
}

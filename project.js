// 1. Deposit some
// 2. Determine number of lines to bet on
// 3. Collect a bet amount 
// 4. Spin the slot machine
// 5. Check if the user won 
// 6. Give the user their winnings
// 7. Play again

//function deposit() {
//return 1

//}
const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, please try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, please try again.");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter a bet amount per line: ");
        const betAmount = parseFloat(bet);
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid bet amount, please try again.");
        } else {
            return betAmount;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, betAmount, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += SYMBOL_VALUES[symbols[0]] * betAmount;
        }
    }

    return winnings; // Added return statement
};
const game = () => {
    let balance = deposit();

    while (true) {

        const numberOfLines = getNumberOfLines();
        const betAmount = getBet(balance, numberOfLines);
        balance -= betAmount * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, betAmount, numberOfLines);
        balance += winnings;
        console.log(`You won ${winnings}!`);
        console.log(`Your balance is now ${balance}`);
        if (balance <= 0) {
            console.log("You have run out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (yes/no): ");
        if (playAgain.toLowerCase() !== "yes") {
            break;
        }
    }
};

game();
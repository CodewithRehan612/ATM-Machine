#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 1000000;
let myPin = 4283;
// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<======================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.bold.hex('#9999FF')('Welcome To \'Coding With Rehan \' -- ATM Machine')}  <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<======================================>>>\n`));
// Prompt the user to enter their PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.hex('#99CCFF')("Enter your pin code: ")
    }
]);
// Check if the entered PIN is correct
if (pinAnswer.pin === myPin) {
    console.log(chalk.bold.greenBright("\n Pin is Correct ! Login Successful\n"));
    // Prompt the user to select (withdraw or check balance)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.hex('#99CCFF')("Select your operation: "),
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ]);
    // If the user selects "Withdraw"
    if (operationAns.operation === "Withdraw Ammount") {
        // Prompt the user to select ("Fast Cash" or "Enter Amount")
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.hex('#99CCFF')("Choose withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        // If the user selects "Fast Cash"
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.hex('#CCFFFF')("Select Amount:"),
                    choices: [110000, 200000, 600000, 800000, 900000, 500000]
                }
            ]);
            // Check if the user have sufficient balance
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected fast cash amount from the user's balance
                myBalance -= fastCashAns.fastCash;
                console.log(`\n${chalk.green("$", fastCashAns.fastCash)} Withdraw Successfully !`);
                console.log(`Your Remaining Balance is ${chalk.greenBright("$", myBalance)}`);
            }
        }
        // If the user selects "Enter Amount"
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.hex('#CCFFFF')("Enter amount to withdraw: ")
                }
            ]);
            // Check if the user have sufficient balance
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected amount from the user's balance
                myBalance -= amountAns.amount;
                console.log(`\n${chalk.greenBright("$", amountAns.amount)} Withdraw Successfully !`);
                console.log(`Your Remaining Balance is ${chalk.greenBright("$", myBalance)}`);
            }
        }
    }
    // If the user selects "Check Balance"
    else if (operationAns.operation === "Check Balance") {
        console.log(`\nYour Balance is ${chalk.greenBright("$", myBalance)}`);
    }
} // If the entered PIN is incorrect
else {
    console.log(chalk.red("\nPin is Incorrect, Try Again!"));
}

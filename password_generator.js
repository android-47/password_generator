// author: Javier Garcia Ramirez
// create date: Thursday, December 24, 2020
// last modified: Friday, December 25, 2020
// filename: password-generator.js
// description: 
// runtime: 
// creation time: N/A


const prompt = require('prompt-sync')({sigint: true});



function promptUser() {
    const promptsList = ["Enter password length: ", "Enter how many upper case: ", 
    "Enter how many lower case: ", "Enter how many numbers: ", "Enter how many special characters: "];

    const testList = [];
    let sum = 0;
    for (x = 1; x < testList.length; x++) { // x = 1 so the length isnt added
        sum += testList[x]; 
    }

    let userInput = " ";
    for (i in promptsList){
        let error = true;
        while (error == true) {
            userInput = Number(prompt(promptsList[i]));
            error = checkInput(userInput, i);  // i = 0 - 4
            if (i != 0 && testList[0] < sum + userInput){
                console.log ("amount of upper, lower, numbers, special character ammount must not be grater to password length");
                error = true;
            } else if (i != 0 && testList[0] < userInput){
                console.log ("input cannot be more than password length");
                error = true;
            }
        }
        testList.push(userInput); // check if first
    }
    return testList;
}


function checkInput(userInput, scenerio, testList) { // notify error or explain error
    const TWOList = ["password length must greater than 0", 
    "cannot be a negative number.", "must enter a whole number"];
    let error = true;
    switch (error) {
        case Number.isInteger(userInput) == false || userInput == " ":
            console.log("Error:", TWOList[2]);
            break;
        case userInput < 1 && scenerio == 0:
            console.log("Error:", TWOList[0]);
            break;
        case userInput < 0 && scenerio != 0:
            console.log("Error:", TWOList[1]);
            break;
        default:
            error = false; // error becomes false if no errors from above
    }
    return error;
}



function createPassword(length, upper, lower, number, special) {
    const password = [];
    const typeList = [["Upper cases: "],["Lower cases: "],["Numbers: "],["Special characters: "]];
    const requirments = [upper, lower, number, special];
    for (i = 0; i <= length-1; i++) { // include length or length-1?
        random_number = selectType(requirments, length);
        askii_code = getChar(random_number);
        password_char = String.fromCharCode(askii_code); // convert to askii value
        password.push(password_char);
        typeList[random_number].push(password_char);
    }
    for (i = 0; i <= 3; i++){ // 3 represents length of typeList
        console.log(typeList[i][0], typeList[i].slice(1));
    } 
    return password;
}

function selectType(list_of_req, length) {
    validType = false;
    let type = 0;
    while (validType == false) {
        type = Math.floor((Math.random() * 4) + 0); // randomize a number; 4 possibilities, 0 is the min
        if (0 < list_of_req[type]){ // check to see if already met type requirements
            list_of_req[type] = list_of_req[type] - 1;
            break;
        }
    }
    
    return type;
}
function getChar(num){
    var range = [];
    switch (num) {
        case 0: range.push(90, 65);
        case 1: range.push(122, 97);// ascii for lowercase 
        case 2: range.push(57, 48);
        default:
        range = test2(range);
    }
    max = range[0];
    min = range[1];
    random = Math.floor((Math.random() * (max - min) + 1) + min);
    return random;
}


function test2(range){
    x = Math.floor((Math.random() * 4) + 1);
    switch(x) {
        case 1: range.push(47, 33);
        case 2: range.push(64, 58);
        case 3: range.push(96, 91);
        default: range.push(126, 123);
    }
    return range;
}


function main() {
    let password_requirements = promptUser();
    console.log (password_requirements);
    p_length = Number(password_requirements[0]);
    p_upper = Number(password_requirements[1]);
    p_lower = Number(password_requirements[2]);
    p_number = Number(password_requirements[3]);
    p_special = Number(password_requirements[4]);
    password = createPassword(p_length, p_upper, p_lower, p_number, p_special);
    console.log ("\nPASSWORD:", password.join(""), "\n");
}

main()
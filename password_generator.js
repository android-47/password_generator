// author: Javier Garcia Ramirez
// create date: R. Dec 24, 2020
// last modified: W. Mar 24, 2021
// filename: password-generator.js
// description: 
// runtime: 


const prompt = require('prompt-sync')({sigint: true});

/*
*/

function promptUnsignedInt(prompt_mssg, error_mssg, min_val, max_val) { // can't handle empty
    let test_int = -2;
    let test_str = "";
    do {
        test_int == -2 ? test_str = prompt(prompt_mssg) : test_str = prompt(error_mssg + prompt_mssg);
        if (test_str.length == 0)
            test_str = "-1";
        for (let i = 0; i < test_str.length; i++) {
            if (!('0' <= test_str[i] && test_str[i] <= '9'))
                test_str = "-1"; // display error
        }
        test_int = Number(test_str);
    } while (test_int < min_val || max_val < test_int);

    return test_int;
}
/*

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

*/


function createPassword(length, upper, lower, number, special) {
    const password = [];
    const typeList = [["\nUpper: "],["Lower: "],["Number: "],["Special: "]];
    const requirments = [upper, lower, number, special];



    for (i = 0; i <= length-1; i++) { // include length or length-1?
        random_number = selectType(requirments, length);



        askii_code = getChar(random_number);
        password_char = String.fromCharCode(askii_code); // convert to askii value
        password.push(password_char);
        typeList[random_number].push(password_char);
    }


    for (i = 0; i < 4; i++){ //  printa typelist
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

function getChar(num){ // depending on the type/case, finds the askii range and returns a random number between that range
    var range = [];
    switch (num) { // bigger num on left side
        case 0: range.push(90, 65);  // ascii range for upper case letters
        case 1: range.push(122, 97); // ascii for lowercase letters
        case 2: range.push(57, 48); // ascii range for numbers 0-9
        default: // for special characters
        range = test2(range); // this should be pushing two things too, passing in entire array an updating it in that function
    }
    max = range[0];
    min = range[1];
    random = Math.floor((Math.random() * (max - min) + 1) + min);
    return random;
}


function test2(range){
    x = Math.floor((Math.random() * 4) + 1);
    switch(x) {
        case 1: range.push(47, 33);    // special chars set 1
        case 2: range.push(64, 58);    // special chars set 2
        case 3: range.push(96, 91);    // special chars set 3
        default: range.push(126, 123); // special chars set 4
    }
    return range;
}

function main() {
    const promptsList = [
    "Enter password length: ", 
    "Enter how many upper case letters: ", 
    "Enter how many lower case letters: ", 
    "Enter how many numbers: ", 
    "Enter how many special characters: "];
    const requirements = [0, 0, 0, 0, 0];
    requirements[0] = promptUnsignedInt(promptsList[0], "ERROR! ", 0, 100);
    let copy_length = requirements[0];

    for (let i = 1; i < 5; i++) { // special chars should be calculated by itself // 5 is promptsList length, i = 1 so length is not changed
        // if i == 4
        if (copy_length != 0) {
            requirements[i] = promptUnsignedInt(promptsList[i], "ERROR! ", 0, copy_length);
            copy_length -= requirements[i];
        } else {
            requirements[i] = 0; 
        }
    }
    let length = requirements[0];
    let upper = requirements[1];
    let lower = requirements[2];
    let number = requirements[3];
    let special = requirements[4];
    // would you like to choose char to include/? how many? prompt that many times
    let password = createPassword(length, upper, lower, number, special);
    console.log ("\nPASSWORD:", password.join(""), "\n");
}

main()
// author: Javier Garcia Ramirez
// create date: Thur. Dec 24, 2020
// last modified: Tue. Sep 14, 2021
// filename: password_generator.js
// description: generates a random password
// runtime: n/a

const { generate } = require('rxjs');


/* Upcoming features: 

  * in error message, tell user the exact issue and how to solve
  * in custom mode, ask user if they want to inculde a specific character
  * in custom mode, ask user if they want to allow repeated characters
  * ask user how many passwords to generate in the beginning (1-10)
  * in the end ask the user if the want to generate more password(s) or quit
  * add runtime

*/


const prompt = require('prompt-sync')({sigint: true}); // needed to prompt the user

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
function createPasswordAskii(length, upper, lower, number, special) {
    const password = [];
    const requirments = [upper, lower, number, special];

    for (let i = 0; i < length; i++) {
        random_number = selectCharType(requirments, length); // type could be upper, lower, number, special
        askii_val = getChar(random_number); // gets askii vale between the range of the ...
        password.push(askii_val);
    }
    return password; // return askii values of password
} 
*/

function createPasswordAskii(length, upper, lower, number, special) {
    const password = [];
    const requirments = [upper, lower, number, special];

    for (let i = 0; i < upper; i++) {
        askii_val = generateRand(90, 95); // ascii range for upper case letters
        password.push(askii_val);
    }

    for (let i = 0; i < lower; i++) {
        askii_val = generateRand(122, 97); // ascii for lowercase letters
        password.push(askii_val);
    }

    for (let i = 0; i < number; i++) {
        askii_val = generateRand(57, 48); // ascii range for numbers 0-9
        password.push(askii_val);
    }

    for (let i = 0; i < special; i++) {
        askii_val = generateRand(90, 95, true); // it is a special char = true
        password.push(askii_val);
    }


	// shuffle password
    return password; // return askii values of password
} 


function generateRand(min, max, special = false){
	/*
	if (special){

	}
	*/
    random = Math.floor((Math.random() * (max - min) + 1) + min);
    return random;
}


function selectCharType(list_of_req, length) {
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


// depending on the type/case, finds the askii range and returns a random number between that range
function getChar(num){ 
    var range = [];
    switch (num) { // bigger num on left side
        case 0: range.push(90, 65);  // ascii range for upper case letters
        case 1: range.push(122, 97); // ascii for lowercase letters
        case 2: range.push(57, 48); // ascii range for numbers 0-9
        default: // for special characters
        range = getSpecialChar(range); // this should be pushing two things too, passing in entire array an updating it in that function
    }
    max = range[0];
    min = range[1];
    random = Math.floor((Math.random() * (max - min) + 1) + min);
    return random;
}


function getSpecialChar(range){
    x = Math.floor((Math.random() * 4) + 1);
    switch(x) {
        case 1: range.push(47, 33);    // special chars set 1
        case 2: range.push(64, 58);    // special chars set 2
        case 3: range.push(96, 91);    // special chars set 3
        default: range.push(126, 123); // special chars set 4
    }
    return range;
}


function getRequirements() {
    let prompt = "Enter option number; quick password(1) custom password(2): ";
	
	// quick password is default; componenets are set to 4 
    const requirements = [16, 4, 4, 4, 4]; // length, upper case, lower case, numbers, special chars

    let password_option = promptUnsignedInt(prompt, "<ERROR> ", 1, 2);

    if (password_option == 2) { 
        getCustomReq(requirements);
	}

    return requirements;
}


function getCustomReq(customReq) {
    const prompts = [
	"Enter password length: ", 
    "Enter how many upper case letters: ", 
	"Enter how many lower case letters: ", 
    "Enter how many numbers: ", 
	"Enter how many special characters: "];

	let custom_length = promptUnsignedInt(prompts[0], "<ERROR> ", 1, 100); // prompt for password length (1-100)
    customReq[0] = custom_length;
	let remaining_length = custom_length;

	// i < 5 to traverse through all prompts[] elements, start at i = 1 so length is not changed
    for (let i = 1; i < 5; i++) {
		if (remaining_length != 0) {
            customReq[i] = promptUnsignedInt(prompts[i], "<ERROR> ", 0, remaining_length);
            remaining_length -= customReq[i];
		// so the user does not get prompted how many special characters, program has done the math to figure it out
		} else if (i == 4) {
            customReq[4] = remaining_length; 
		// executes if, for example, user selected, length 10, upper case 10, all other componenets are set to 0, user no longer is prompted
        } else {
            customReq[i] = 0;
		}
    }
    return customReq;
}


function print_password(passwordAskii) {
    const password = [];
    let typeList = { upper: [], lower: [], number: [], special: [] };
    
    // convert askii val to askii char
    for (val of passwordAskii) {
        char = String.fromCharCode(val); 
        insertToTypeList(char, typeList);
        password.push(char);
    }

    console.log("\nIndividual components", typeList);
    console.log ("\nPASSWORD:", password.join(""), "\n");
}


function insertToTypeList(askii_char, typeList) {
    // add char to a list of it's type
    if ('A' <= askii_char && askii_char <= 'Z')      // is askii upper
        typeList.upper.push(askii_char);
    else if ('a' <= askii_char && askii_char <= 'z') // is askii lower
        typeList.lower.push(askii_char);
    else if ('0' <= askii_char && askii_char <= '9') // is askii a num
        typeList.number.push(askii_char);
    else                                             // askii is special
        typeList.special.push(askii_char);
}




function main() {
    let req = getRequirements();
    let length = req[0];
    let upper = req[1];
    let lower = req[2];
    let number = req[3];
    let special = req[4];
    let passwordAskii = createPasswordAskii(length, upper, lower, number, special);
    print_password(passwordAskii);
}


main()
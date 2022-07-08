"use strict"

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 


// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = promptFor("Let's try searching by a trait.\nPress 'A' for a single trait search \nPress 'B' for a multiple trait search", autoValid);
      switch(searchResults){
        case "A":
        searchResults = searchListOfTraits(people);
        break;
        case "B":
        searchResults = multipleTraitSearch(people);
        break;
        default:
        alert("Invalid entry. Reverting back to inital prompt.")  
        app(people); // restart app
        break;
  }
  }  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){
/* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that person.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayPersonFamily(person);
    break;
    case "descendants":
    alert(`Descendants:\n\n${displayPeople(findPersonsDescendants(person))}`);
    mainMenu(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    throw new Error("Try Again Later"); // stop execution. Of note, the provided return (no value) was closing the program for most part except for a minor anomaly which throwing this error resolved.
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//Function given by the instructors that allows users to search by name. Of note, it included a minor bug (intentional) that was fixed.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true
    }
    else{
      return false;
    }
  })
  return foundPerson[0]; //this was a bug that was fixed by including "[0]"
}

//Function for single criteron trait search
function searchListOfTraits(people) {
  let traitSelection = promptFor("Please pick a letter for one of the following trait options:\n A: dob\n B: gender\n C: height\n D: weight\n E: eye color\n F: occupation", autoValid);
  let listofPeople = [];
  let confirmedPerson = [];
  switch(traitSelection) {
    case "A":
      listofPeople = searchByDOB(people);
      if(listofPeople.length == 0){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`The letter pick in your search returned a single person. If you want to keep going then push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for, push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
    break;
    case "B":
      listofPeople = searchByGender(people);
      if(listofPeople.length == "0"){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`There was only a single person that was found. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
    break;
    case "C":
      listofPeople = searchByHeight(people);
      if(listofPeople.length == "0"){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`There was only a single person that was found. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
    break;
    case "D":
      listofPeople = searchByWeight(people);
      if(listofPeople.length == "0"){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`There was only a single person that was found. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
    break;
    case "E":
      listofPeople = searchByEyeColor(people);
      if(listofPeople.length == "0"){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`There was only a single person that was found, and push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
       break;
    case "F":
      listofPeople = searchByOccupation(people);
      if(listofPeople.length == "0"){
      alert("Didn't find a person have that trait you put in. Let's do an other trait search again.");
      searchListOfTraits(people);
      }
      else if(listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      alert(`There was only a single person that was found, and push Ok to keep going.\n\n${displayPeople(listofPeople)}`);
      mainMenu(confirmedPerson, people);
      }
      else{
      alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(listofPeople)}`, autoValid);
      app(people);
      }
    break;
    default:
      alert("Invalid entry try again.");
      searchListOfTraits(people);
    break;
  }
 }

// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 

//Function for multiple trait search
let traitCount = 0;
function multipleTraitSearch(people) {
  let traitSelection = promptFor("Enter in a maximum of 5 traits. Select a letter for one of the following traits. Press 'X' when done with your traits search:\n A: dob\n B: gender\n C: height\n D: weight\n E: eye color\n F: occupation\n X: Done Searching", autoValid);
  let listofPeople = [];
  let confirmedPerson = [];
  switch(traitSelection) {
    case "A":
      traitCount += 1;
      
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByDOB(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "B":
      traitCount += 1;
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByGender(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "C":
      traitCount += 1;
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByHeight(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "D":
      traitCount += 1;
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByWeight(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "E":
      traitCount += 1;
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByEyeColor(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "F":
      traitCount += 1;
      if (traitCount == "6"){
        alert(`6 is an invalid pick.\n\n${displayPeople(people)}`);
        app(people);
      }
      else{
      listofPeople = searchByOccupation(people);
      multipleTraitSearch(listofPeople);
      }
    break;
    case "X":
      if (people.length == 1){
        confirmedPerson = people[0];
        alert(`There was only a single person that was found. Push Ok to keep going.\n\n${displayPeople(people)}`);
        mainMenu(confirmedPerson, people);
      }
      else if (people.length == 0){
        alert("Didn't find a person have that trait you put in. Let's do an other trait search again.")
        app(people);
      }
      else{
        alert(`The list of person(s) you search for. Push Ok to keep going.\n\n${displayPeople(people)}`, autoValid);
        app(people);
      }
    break;
    default:
    alert("Invalid entry.");
    multipleTraitSearch(people);
    break;
  }
 
}
//function to search by people's DOB
 function searchByDOB(people){
  let dobInput = promptFor("Enter in the date of birth in the following format 'MM/DD/YYYY' for double digit months (e.g. 12/18/1952) or 'M/DD/YYYY' for single digit months (e.g. 1/18/1949) or M/D/YYYY' for single digit day (e.g 2/2/1987)", autoValid);
  let confirmedDOB = people.filter(function(element) {
    if(element.dob == dobInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedDOB;
}

//function to search by people's gender
function searchByGender(people){
  let genderInput = promptFor("Enter in the gender, either 'female' or 'male'.", autoValid).toLowerCase();
  let confirmedGender = people.filter(function(element) {
    if(element.gender == genderInput) {
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedGender;
  }

//function to search by people's height
function searchByHeight(people){
  let heightInput = promptFor("Enter in the height in inches. For example, '65'.", autoValid);
  let confirmedHeight = people.filter(function(element) {
    if(element.height == heightInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedHeight;
}

//funciton to search by people's weight
 function searchByWeight(people) {
  let weightInput = promptFor("Enter in the weight in pounds. For example, '196'.", autoValid);
  let confirmedWeight = people.filter(function(element) {
    if(element.weight == weightInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedWeight;
}

//function to search people by their eye color
function searchByEyeColor(people){
  let eyeColorInput = promptFor("Enter in the eye color. For example, 'blue'.", autoValid).toLowerCase();
  let confirmedEyeColor = people.filter(function(element) {
    if(element.eyeColor == eyeColorInput) {
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedEyeColor;
}

//function to search people by their occupation
function searchByOccupation(people){
  let occupationInput = promptFor("Enter in the occupation. For example, 'programmer'.", autoValid).toLowerCase();
  let confirmedOccupation = people.filter(function(element) {
    if(element.occupation == occupationInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedOccupation;
}

//function to find person's descendants which calls the find children function (below)
function findPersonsDescendants(person){
  let personsChildren = findPersonsChildren(person); 
  let personsDescendants = [];
  for(let i = 0; i < personsChildren.length; i++){
    personsDescendants = personsChildren.concat(findPersonsDescendants(personsChildren[i])); //concat method joins the values from the two arrays (this function and the find children function)
  }
  return personsDescendants;
}


//function to find the person's children
function findPersonsChildren(person){
  let dataArray = data;
  let personsChildren = dataArray.filter(function(element) {
    for(let i = 0; i < dataArray.length; i++){
      if(element.parents[0] == person.id || element.parents[1] == person.id) {
        return true;
      }
      else{
        return false;
      }}
  })
  return personsChildren;
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  return people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
}


function displayPerson(person, people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
  return mainMenu(person,people);
}

//displays person's parents, spouse, and siblings (as applicable)
function displayPersonFamily(person, people){
  let personArray = person;
  let parentArray = []
  let spouseArray = []
  let siblingArray = []
  let newSibArray = []
  let dataArray = data
  parentArray += dataArray.filter(function(el){
    let personSlice = personArray.parents.slice()
    if(el.id === personSlice[0]){
      parentArray.push(`${el.firstName + ' ' + el.lastName} \n`);
    } else if(el.id === personSlice[1]){
      parentArray.push(`${el.firstName + ' ' + el.lastName} \n`);
    }
  });
  spouseArray += dataArray.filter(function(el){
    if(el.id === personArray.currentSpouse){
      spouseArray.push(`${el.firstName + ' ' + el.lastName} \n`)
    }
  }) 
  siblingArray += dataArray.filter(function(el){
    for (let i = 0; i < (el.parents).length; i++){
      if(person.parents.includes(el.parents[i]) && person.id != el.id){
        siblingArray.push(`${el.firstName + ' ' + el.lastName} \n`)
        newSibArray = [...new Set(siblingArray)];
    }}
  }) 
  alert(`Parents:\n${parentArray} \nSpouse: \n${spouseArray} \nSiblings: \n${newSibArray}`);
  return mainMenu(person,people);
}
  

//#endregion


 //Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}


//#endregion
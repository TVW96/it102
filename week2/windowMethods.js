// PROMPTING THE USER FOR INPUT

// prompt() is a method that will display a dialog box that prompts the visitor for input.

// The prompt() method takes two arguments:

// The text to display to the user.
// (Optional) A default value for the input field.
// The prompt() method returns the input value when the user clicks "OK". If the user clicks "Cancel", it returns null.

// Example
// let person = prompt("Please enter your name", "Harry Potter");
// alert(person);

let needAnAnswer = prompt(
  `Tomorrow\'s movie is "Wicked". \n Will you be going? `
);

if (needAnAnswer.toLowerCase() === "yes") {
  prompt("Great! See you there!");
} else {
  prompt('Would you rather see "The Brutalist"?');
}

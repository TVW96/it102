// simple arithmetic

let x = 20;
let y = 30;
z = x + y; // addition

let a = 10;
let b = 30;
c = a / b; // division

let d = 25;
let e = 40;
let f = 3;
total = d * (e + f); // order of operations

let g = 10;
let h = 3;
remainder = g % h; // modulus remainder

// string concatenation
let firstName = "Troy";
let lastName = "Washington";
let fullName = firstName + " " + lastName; // concatenation

// we are going to use a for loop
// the loop will display all the hours
for (let militaryTime = 0; militaryTime <= 24; militaryTime++) {
  normalTime = militaryTime % 12;
  console.log(
    militaryTime + " military  time equals to " + normalTime + "12 hour clock"
  );
}

// (Cel * 9/5) + 32 = farenheit
for (let celcius = 0; celcius <= 100; celcius++) {
  farenheit = (celcius * 9) / 5 + 32;
  console.log(
    celcius + " degrees celcius equals to " + farenheit + " degrees farenheit"
  );
}

// assignment operators
// price of item plus tax and total

let price = 100;
let tax = 0.1;
taxTotal = price * tax;
totalWithTax = taxTotal + price;

// assignment operators
let price2 = 100;
price2 *= 1.1;

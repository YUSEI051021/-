var kuji = ["大吉","吉","中吉","小吉","末吉","凶"];
var num1 = Math.random();
var num2 = num1 * 6;
var num = Math.floor(num2);
var message = kuji[num];

var object = document.getElementById("kuji");
object.innerText = message;
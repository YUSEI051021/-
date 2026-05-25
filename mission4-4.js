var k0=0;
var k1=0;
var k2=0;
var k3=0;
var k4=0;
var k5=0;
var k6=0;

function omikuji()
{
    var kuji = ["大吉","吉","中吉","小吉","末吉","凶"];
    var num1 = Math.random();
    var num2 = num1 * 6;
    var num = Math.floor(num2);
    var message = kuji[num];

    var object = document.getElementById("kuji");
    object.innerText = message;

    var button = document.getElementById("button");
    button.innerText = "もう一度おみくじを引く";

    k6=k6+1
    var ke = document.getElementById("kekka");
    kekka.innerText = k6;

    if(num == 0)
    {
        object.style.color='yellow';
        k0=k0+1;
        var o0 = document.getElementById("daikiti");
        daikiti.innerText = k0;
    }
    else if(num == 1)
    {
        object.style.color='black';
        k1=k1+1;
        var o1 = document.getElementById("kiti");
        kiti.innerText = k1;
    }
    else if(num == 2)
    {
        object.style.color='black';
        k2=k2+1;
        var o2 = document.getElementById("tyukiti");
        tyukiti.innerText = k2;
    }
     else if(num == 3)
    {
        object.style.color='black';
        k3=k3+1;
        var o3 = document.getElementById("syoukiti");
        syoukiti.innerText = k3;
    }
    else if(num == 4)
    {
        object.style.color='black';
        k4=k4+1;
        var o4 = document.getElementById("suekiti");
        suekiti.innerText = k4;
    }
    else if(num == 5)
    {
        object.style.color='red';
        k5=k5+1;
        var o5 = document.getElementById("kyou");
        kyou.innerText = k5;
    }
}
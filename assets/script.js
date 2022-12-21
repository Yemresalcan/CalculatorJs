"use strict";

var input = document.getElementById('input'), //İnput output buton
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false;  //Hangi çıktının görüntülendiğini bulmak için 

// Sayılara tıklama ekleme 
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {

        //Girilen sayıyı tutma sonradan kullanmak için 
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        //Eklemeye devam etme 
        if (resultDisplayed == false) {
            input.innerHTML += e.target.innerHTML;

        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;


        } else {
            //Sonuç görüntüleniyorsa ve kullanıcı devam ediyorsa 
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;

        }

    });
}

//Sayılara Tıklama yapma durumu 
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {

        //Son değişkeni saklama 
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];



        //Son girilen oparetör ise 
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
            //ilk operatöre basılmışsa 
        } else if (currentString.length == 0) {
            // basılmamışsa devam et
        } else {

            input.innerHTML += e.target.innerHTML;
        }

    });
}


//eşittir butonuna basma 
result.addEventListener("click",function() {

    var inputString = input.innerHTML;

    // ! girilen sayıları ilk olarak bir sayı dizisine dönüştürülür 

    var numbers = inputString.split(/\+|\-|\×|\÷/g);


    //! Girilen sayıları bosluklarından arındırıp bir diziye aktarma 
    var operators = inputString.replace(/[0-9]|\./g, "").split("");



//Operetorler fonksiyonları 

var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; 

  resultDisplayed = true; 
});

//temizleme fonjksiyonu 
clear.addEventListener("click", function() {
  input.innerHTML = "";
  
  
  
})
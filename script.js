//объявление всех необходимых переменных
var calc = document.getElementById("calc");
var result = document.getElementById("result");

let firstNumber = '';
let secondNumber = '';
let operation = '';
let lengthSecondNumber;


//навешивание клика на весь калькулятор
document.querySelectorAll('#calc .calc__btn').forEach(function (button) {
    button.addEventListener('click', onButtonClick);
});


//основная функция, обрабатывающая клики
function onButtonClick(infoClick) {

    //если нажата не кнопка
    if (!infoClick.target.classList.contains('calc__btn')) return;

    //очистка поля с результатом (нажата кнопка "С")
    if (infoClick.target.classList.contains("calc__btn--clean")) {
        result.innerText = '0';
        firstNumber = '';
        secondNumber = '';
        operation = '';
    };

    //удаление одного символа
    if (infoClick.target.classList.contains("calc__btn--minus-one")) {
        //минус один символ в первом числе
        if (operation === '' && secondNumber === '') {
            firstNumber = String(firstNumber);
            if (firstNumber.length <= 1) {
                firstNumber = '';
                result.innerText = '0';
            } else {
                firstNumber = firstNumber.slice(0, (firstNumber.length - 1));
                result.innerText = firstNumber;
            };
        }
        //очистка знака операции
        else if (firstNumber != '' && operation != '' && secondNumber === '') {
            operation = '';
            result.innerText = operation;
        }
        //минус один символ во втором числе
        else if (firstNumber != '' && operation != '' && secondNumber != '') {
            if (secondNumber.length <= 1) {
                secondNumber = '';
                result.innerText = '0';
            } else {
                secondNumber = secondNumber.slice(0, (secondNumber.length - 1));
                result.innerText = secondNumber;
            };
        };
    };

    //нажата кнопка знака операции при отсутствии чисел
    if (result.innerText === '0' && infoClick.target.classList.contains("calc__btn--operation")) {
        result.innerText = '0';
    };

    //несколько раз нажата кнопка "0", когда в строке ввода и так 0
    if (result.innerText === '0' && infoClick.target.innerText === '0') {
        result.innerText = '0';
    };

    //ввод первого числа
    if (infoClick.target.classList.contains("calc__btn--number") && operation === '' && firstNumber.length < 10) {
        firstNumber += infoClick.target.innerText;
        result.innerText = firstNumber;
    };

    //ввод знака операции
    if (infoClick.target.classList.contains("calc__btn--operation") && firstNumber != '' && secondNumber === '') {
        operation = infoClick.target.innerText;
        result.innerText = operation;
    };

    //ввод второго числа
    if (infoClick.target.classList.contains("calc__btn--number") && operation != '' && secondNumber.length < 10) {
        secondNumber += infoClick.target.innerText;
        result.innerText = secondNumber;
    };

    //знак числа (нажата кнопка "+/-")
    if (infoClick.target.classList.contains("calc__btn--sign")) {
        if (firstNumber != '' && secondNumber === '') {
            firstNumber = -firstNumber;
            result.innerText = firstNumber;
        } else if (firstNumber != '' && secondNumber != '') {
            secondNumber = -secondNumber;
            result.innerText = secondNumber;
        };
    };

    //дробные числа (ввод точки)
    if (infoClick.target.classList.contains("calc__btn--point")) {
        //для первого числа
        if (secondNumber === '') {
            firstNumber = String(firstNumber);
            if (firstNumber != '' && !firstNumber.includes('.')) {
                firstNumber += '.';
                result.innerText = firstNumber;
            } else if (firstNumber === '' && !firstNumber.includes('.')) {
                firstNumber = '0.';
                result.innerText = firstNumber;
            } else if (firstNumber != '' && firstNumber.includes('.')) {
                result.innerText = firstNumber;
            };
        }
        //для второго числа
        else {
            secondNumber = String(secondNumber);
            if (secondNumber != '' && !secondNumber.includes('.')) {
                secondNumber += '.';
                result.innerText = secondNumber;
            } else if (secondNumber === '' && !secondNumber.includes('.')) {
                secondNumber = '0.';
                result.innerText = secondNumber;
            } else if (secondNumber != '' && secondNumber.includes('.')) {
                result.innerText = secondNumber;
            };
        };
    };

    //вычисление процента (нажата кнопка "%")
    if (infoClick.target.classList.contains("calc__btn--percent") && operation != '' && firstNumber != '' && secondNumber != '') {
        secondNumber = (firstNumber / 100) * secondNumber;
        if (String(secondNumber).includes('.')) {
            secondNumber = Number(secondNumber).toFixed(14) * 10;
            lengthSecondNumber = String(secondNumber).length;
            secondNumber = String(secondNumber / 10).slice(0, lengthSecondNumber + 1);
        };
        result.innerText = secondNumber;
    };

    //вычисление результата (нажата кнопка "=")
    if (infoClick.target.classList.contains("calc__btn--equally")) {

        console.log(firstNumber, operation, secondNumber);

        //вычисление корня
        if (operation === '√') {
            //квадратный корень
            if (secondNumber === '') {
                firstNumber = Math.sqrt(firstNumber);
            }
            //корень указанной степени
            else if (secondNumber != '') {
                firstNumber = Number(firstNumber) ** (1 / Number(secondNumber));
            };
        };

        //возведение в степень
        if (operation === '^') {
            //возведение в квадрат
            if (secondNumber === '') {
                firstNumber = firstNumber ** 2;
            }
            //возведение в указанную степень
            else if (secondNumber != '') {
                firstNumber = firstNumber ** secondNumber;
            };
        };

        //если второе число не введено, то при нажатии на кнопку "=", 
        //оно автоматически приравнивается к первому числу
        if (secondNumber === '') {
            secondNumber = firstNumber;
        };

        //вычисление простых операций
        switch (operation) {
            case "+":
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case "-":
                firstNumber = firstNumber - secondNumber;
                break;
            case "X":
                firstNumber = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber === '0') {
                    result.innerText = 'ошибка';
                    firstNumber = '';
                    secondNumber = '';
                    operation = '';
                    return;
                } else {
                    firstNumber = firstNumber / secondNumber;
                }
                break;
        };

        //вывод результата с округлением
        if (String(firstNumber).includes('.')) {
            firstNumber = Number(firstNumber).toFixed(14) * 10;
            firstNumber = firstNumber / 10;
            result.innerText = firstNumber;
        } else {
            result.innerText = firstNumber;
        }
        console.log('= ', result.innerHTML);

        //обнуление переменных
        secondNumber = '';
        operation = '';

    };

};


//открытие и закрытие инструкции
var manualBtn = document.getElementById("manual__btn");
let numberOfClicks = 1;

manualBtn.onclick = function () {
    numberOfClicks += 1;
    if ((numberOfClicks % 2) === 0) {
        manualBtn.textContent = 'Закрыть инструкцию';
        $('#manual__wrapper').fadeIn("1000");
    } else {
        manualBtn.textContent = 'Открыть инструкцию';
        $('#manual__wrapper').fadeOut("1000");
    }
}

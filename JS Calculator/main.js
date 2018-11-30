let display = document.querySelector("#display");
let calculator = document.querySelector("#calculator");
let operatorArr = ["+", "/", "*", "-", "."];

//performing the calculations
function calculate(arr) {
  arr = arr.replace(/([/*+-])/g, " $1 ").split(" ");
  while (arr.includes("*") || arr.includes("/")) {
    for (let i of arr) {
      if (i == "*") {
        arr.splice(
          arr.indexOf(i) - 1,
          3,
          parseFloat(arr[arr.indexOf(i) - 1]) *
            parseFloat(arr[arr.indexOf(i) + 1])
        );
      } else if (i == "/") {
        arr.splice(
          arr.indexOf(i) - 1,
          3,
          (
            parseFloat(arr[arr.indexOf(i) - 1]) /
            parseFloat(arr[arr.indexOf(i) + 1])
          ).toFixed(4)
        );
      }
    }
  }

  while (arr.includes("+") || arr.includes("-")) {
    for (let i of arr) {
      if (i == "+") {
        arr.splice(
          arr.indexOf(i) - 1,
          3,
          parseFloat(arr[arr.indexOf(i) - 1]) +
            parseFloat(arr[arr.indexOf(i) + 1])
        );
      } else if (i == "-") {
        arr.splice(
          arr.indexOf(i) - 1,
          3,
          (
            parseFloat(arr[arr.indexOf(i) - 1]) -
            parseFloat(arr[arr.indexOf(i) + 1])
          ).toFixed(4)
        );
      }
    }
  }
  return arr;
}

//returns the last element of an array
function lastEl(arr) {
  return arr.slice(-1)[0];
}
//event delegation
calculator.addEventListener("click", displayText);
function displayText(e) {
  //conditions
  let textArr = Array.from(display.textContent);
  if (operatorArr.includes(e.target.textContent) && display.textContent == "") {
    display.textContent += "";
  }
  //clears the display
  else if (e.target.textContent == "CE") {
    display.textContent = "";
  }
  //calculates
  else if (e.target.textContent == "=") {
    display.textContent = calculate(display.textContent);
  }
  //does not allow two decimal points in a row nor a decimal point after an operator
  else if (
    e.target.textContent == "." &&
    operatorArr.includes(lastEl(textArr))
  ) {
    display.textContent += "";
  } else if (e.target.textContent == "." && textArr.includes(".")) {
    let re = /(\d+\.\d+)$/gi;
    if (re.test(display.textContent)) {
      display.textContent += "";
    }
  }
  //does not allow two operators in a row nor an operator after a decimal point
  else if (
    operatorArr.includes(e.target.textContent) &&
    operatorArr.includes(lastEl(textArr))
  ) {
    display.textContent += "";
  }
  //does not allow two leading zeroes
  else if (
    e.target.textContent == "0" &&
    /0$/g.test(display.textContent) &&
    !/\d0+/.test(display.textContent || /\D0$/.test(display.textContent))
  ) {
    display.textContent += "";
    //if all conditions pass:
  } else {
    display.textContent += e.target.textContent;
  }
}

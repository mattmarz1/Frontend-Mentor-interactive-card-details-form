const inputFieldsNotYearInput = document.querySelectorAll(
  "input:not(.year-input)"
);
const allInputFields = document.querySelectorAll("input");
const inputTextErrors = document.querySelectorAll(".input-text-error");
const cardDetails = document.querySelectorAll(".card-details p");
const expInputs = document.querySelectorAll(".exp-input");

// The main, form and button elements
const mainEl = document.querySelector("main");
const formEl = document.querySelector("form");
const buttonEl = document.querySelector("button");

// Individual inputs
const cardHolderInput = document.querySelector(".card-holder-input");
const cardNumberInput = document.querySelector(".card-number-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const cvcInput = document.querySelector(".cvc-input");

// Individual HTML error elements
const cardHolderError = document.querySelector(".error-message1");
const cardNumberError = document.querySelector(".error-message2");
const expDateError = document.querySelector(".error-message3");
const cvcError = document.querySelector(".error-message4");

// Misc
const inputErrorColor = "hsl(0, 100%, 66%)";
const normalBorderColor = "hsl(270, 3%, 87%)";
const blankErrorString = "Can't be blank";

formEl.reset();

const completeMessageHTML = `
        <div class="complete-container">
        <img src="images/icon-complete.svg" alt="">
        <p>Thank you!</p>
        <p>We've added your card details</p>
        <button>Continue</button>
      </div>`;

const inputTextErrorsArray = Array.from(inputTextErrors);

buttonEl.addEventListener("click", function () {
  // Checking if ANY input fields are empty
  for (i = 0; i < inputFieldsNotYearInput.length; i++) {
    if (inputFieldsNotYearInput[i].value == "") {
      setElDisplayToBlock(inputTextErrorsArray[i]);
      alterHTML(inputTextErrorsArray[i], `${blankErrorString}`);
      setInputErrorColor(inputFieldsNotYearInput[i]);
    } else {
      setElDisplayToNone(inputTextErrorsArray[i]);
      revertInputColor(inputFieldsNotYearInput[i]);
    }
  }

  if (yearInput.value == "") {
    setElDisplayToBlock(expDateError);
    alterHTML(expDateError, `${blankErrorString}`);
    setInputErrorColor(yearInput);
  } else if (yearInput.value !== "") {
    revertInputColor(yearInput);
  }

  if (!containsLetters(cardHolderInput.value) && cardHolderInput.value !== "") {
    setElDisplayToBlock(cardHolderError);
    alterHTML(cardHolderError, "Wrong format, letters only");
  }

  if (isNaN(cardNumberInput.value) && testString(cardNumberInput.value)) {
    containsNonNumericalData(cardNumberError, cardNumberInput);
  }

  for (i = 0; i < expInputs.length; i++) {
    if (isNaN(expInputs[i].value)) {
      containsNonNumericalData(expDateError, expInputs[i]);
    }
  }

  if (isNaN(cvcInput.value)) {
    containsNonNumericalData(cvcError, cvcInput);
  }

  if (
    cardNumberInput.value.length < 16 &&
    cardNumberInput.value !== "" &&
    containsLetters(cardNumberInput.value) == false
  ) {
    setElDisplayToBlock(cardNumberError);
    alterHTML(cardNumberError, "Card number must have 16 numbers");
    setInputErrorColor(cardNumberInput);
  }

  for (i = 0; i < expInputs.length; i++) {
    if (expInputs[i].value.length < 2 && expInputs[i].value !== "") {
      setElDisplayToBlock(expDateError);
      alterHTML(
        expDateError,
        "Month and year input fields must have 2 numbers"
      );
      setInputErrorColor(expInputs[i]);
    }
  }

  if (
    cvcInput.value.length < 3 &&
    cvcInput.value !== "" &&
    containsLetters(cvcInput.value) == false
  ) {
    setElDisplayToBlock(cvcError);
    alterHTML(cvcError, "CVC must have 3 numbers");
  }

  const checkDisplayValue = inputTextErrorsArray.every(checkIfElDisplayNone);

  if (checkDisplayValue == true) {
    setElDisplayToNone(formEl);
    mainEl.insertAdjacentHTML("beforeend", completeMessageHTML);
  }

  // Can't figure out how to do this with for loop since the input order is different than the order of the info on the card

  if (checkIfElDisplayNone(cardHolderError)) {
    retrieveCardDetails(cardDetails[1], inputFieldsNotYearInput[0].value);
  }
  if (checkIfElDisplayNone(cardNumberError)) {
    retrieveCardDetails(
      cardDetails[0],
      inputFieldsNotYearInput[1].value.match(/.{1,4}/g).join(" ")
    );
  }
  if (checkIfElDisplayNone(expDateError)) {
    retrieveCardDetails(cardDetails[2], inputFieldsNotYearInput[2].value);
  }

  if (checkIfElDisplayNone(expDateError)) {
    retrieveCardDetails(cardDetails[3], allInputFields[3].value);
  }
});

// Function to check if white space exists
function testString(value) {
  return value.indexOf("") >= 0;
}

// Function to check if letters exists
function containsLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function containsNonNumericalData(error, input) {
  error.style.display = "block";
  error.innerHTML = "Wrong format, numbers only";
  input.style.borderColor = `${inputErrorColor}`;
}

function retrieveCardDetails(cardDetail, input) {
  cardDetail.innerHTML = input;
}

function checkIfElDisplayNone(el) {
  return el.style.display == "none";
}

function setElDisplayToNone(el) {
  el.style.display = "none";
}

function setElDisplayToBlock(el) {
  el.style.display = "block";
}

function setInputErrorColor(el) {
  el.style.borderColor = `${inputErrorColor}`;
}

function revertInputColor(el) {
  el.style.borderColor = `${normalBorderColor}`;
}

function alterHTML(el, string) {
  el.innerHTML = string;
}

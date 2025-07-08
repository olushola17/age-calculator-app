const calculatorForm = document.getElementById("calculator-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculatorBtn = document.getElementById("calculator-btn");
const yearResult = document.getElementById("year-result");
const monthResult = document.getElementById("month-result");
const dayResult = document.getElementById("day-result");

// calculatorForm.addEventListener("submit", e => {
//   e.preventDefault();

//   dateCalculation();
//   validateInputs();
//   validateDate();
// });

calculatorForm.addEventListener("submit", e => {
  e.preventDefault();

  validateInputs();

  if (validateDate()) {
    dateCalculation();
  }
});


const dateCalculation = () => {
  const dayInputValue = parseInt(dayInput.value.trim());
  const monthInputValue = parseInt(monthInput.value.trim());
  const yearInputValue = parseInt(yearInput.value.trim());
  const today = new Date();
  const userDate = new Date(yearInputValue, monthInputValue - 1, dayInputValue);

  let year = today.getFullYear() - userDate.getFullYear();
  let month = today.getMonth() - userDate.getMonth();
  let day = today.getDate() - userDate.getDate();

  if (day < 0) {
    month -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    day += previousMonth.getDate();
  }

  if (month < 0) {
    year -= 1;
    month += 12;
  }

  if (yearInputValue > today.getFullYear()) {
    
    console.log("boy")
  }

  yearResult.innerText = year;
  monthResult.innerText = month;
  dayResult.innerText = day;
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector(".error-msg");
  const label = inputControl.querySelector("label");

  errorMsg.innerText = message;
  inputControl.classList.add("error");
  label.style.color = "hsl(0, 100%, 67%)";
}

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector(".error-msg");
  const label = inputControl.querySelector("label");

  errorMsg.innerText = "";
  inputControl.classList.add("success")
  inputControl.classList.remove("error");
  label.style.color = "rgb(0, 162, 68)"
}

const validateInputs = () => {
  const dayInputValue = dayInput.value.trim();
  const monthInputValue = monthInput.value.trim();
  const yearInputValue = yearInput.value.trim();

  if (dayInputValue === "") {
    setError(dayInput, "This field is required");
  } else {
    setSuccess(dayInput);
  }

  if (monthInputValue === "") {
    setError(monthInput, "This field is required");
  } else {
    setSuccess(monthInput);
  }

  if (yearInputValue === "") {
    setError(yearInput, "This field is required")
  } else {
    setSuccess(yearInput)
  }
};

const dateError = (element, message) => {
  const inputControl = element.parentElement;
  const errorMsg = inputControl.querySelector(".error-msg");
  const label = inputControl.querySelector("label");

  errorMsg.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  label.style.color = "hsl(0, 100%, 67%)";
  yearResult.innerText = "--";
  monthResult.innerText = "--";
  dayResult.innerText = "--";
}

// const validateDate = () => {
//   const dayInputValue = dayInput.value.trim();
//   const monthInputValue = monthInput.value.trim();
//   const yearInputValue = yearInput.value.trim();
//   const today = new Date();

//   if (dayInputValue > 31 || dayInputValue < 0) {
//     dateError(dayInput, "Must be a valid date");
//   }

//   if (dayInputValue > today.getDate() && monthInputValue === today.getMonth()) {
//     dateError(dayInput, "Must be in the past");
//   }

//   if (monthInputValue > 12 || dayInputValue < 0) {
//     dateError(monthInput, "Must be a valid month");
//   }

//   if (monthInputValue > today.getMonth()) {
//     dateError(monthInput, "Must be in the past")
//   }

//   if (yearInputValue > today.getFullYear()) {
//     dateError(yearInput, "Must be in the past");
//   }
// }

const validateDate = () => {
  const day = parseInt(dayInput.value.trim());
  const month = parseInt(monthInput.value.trim());
  const year = parseInt(yearInput.value.trim());
  const today = new Date();

  const isValidDate = (d, m, y) => {
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
};


  let hasError = false;

  if (!isValidDate(day, month, year)) {
    dateError(dayInput, "Must be a valid date");
    hasError = true;
  } else {
    setSuccess(dayInput);
  }

  if (month < 1 || month > 12) {
    dateError(monthInput, "Must be a valid month");
    hasError = true;
  } else {
    setSuccess(monthInput);
  }

  if (year > today.getFullYear()) {
    dateError(yearInput, "Must be in the past");
    hasError = true;
  } else {
    setSuccess(yearInput);
  }

  const inputDate = new Date(year, month - 1, day);
  if (inputDate > today) {
    dateError(yearInput, "Date must be in the past");
    dateError(monthInput, "Date must be in the past");
    dateError(dayInput, "Date must be in the past");
    hasError = true;
  }

  return !hasError;
};
const numberInCard = document.querySelector('.number_in_card');
const nameInCard = document.querySelector('.name_in_card');
const monthInCard = document.querySelector('.month_in_card');
const yearInCard = document.querySelector('.year_in_card');
const cvcInCard = document.querySelector('.cvc_in_card');
const form = document.querySelector('form');
const cardHolder = document.getElementById('cardholder');
const cardNumber = document.getElementById('card_number');
const numberError = document.querySelector('.number_error');
const month = document.getElementById('month');
const year = document.getElementById('year');
const cvc = document.getElementById('cvc');
const cvcError = document.querySelector('.cvc_error');
const dataError = document.querySelector('.date_error');
const confirmBtn = document.getElementById('confirm_btn');
const continueBtn = document.getElementById('continue_btn');
const container = document.querySelector('.container');
const containerComplete = document.querySelector('.container_complete');

// The data supplied by the user must appear on the card
cardHolder.addEventListener('input', updateNameValue);
cardNumber.addEventListener('input', updateNumberValue);
month.addEventListener('input', updateMonthValue);
year.addEventListener('input', updateYearValue);
cvc.addEventListener('input', updateCvcValue);

function updateNameValue(e) {
  nameInCard.textContent = e.srcElement.value;
}
function updateNumberValue(e) {
  numberInCard.textContent = e.srcElement.value;
}
function updateMonthValue(e) {
  monthInCard.textContent = e.srcElement.value;
}
function updateYearValue(e) {
  yearInCard.textContent = e.srcElement.value;
}
function updateCvcValue(e) {
  cvcInCard.textContent = e.srcElement.value;
}
// Error's message if CARD NUMBER, DATE, CVC are wrong
const validate = (e) => {
  e.preventDefault();

  const cardNumberValue = Number(cardNumber.value);
  const monthValue = month.value;
  const yearValue = Number(year.value);
  const cvcValue = Number(cvc.value);

  if(!isMasterCard(cardNumberValue)) {
    numberError.style.display = 'block';
    cardNumber.classList.add('error');
  } else {
    numberError.style.display = 'none';
    cardNumber.classList.remove('error');
  }

  if (!isMonth(monthValue) || !isYear(yearValue)) {
    dataError.style.display = 'block';
    
    if (!isMonth(monthValue)) {
      month.classList.add('error');
    } else {
      year.classList.add('error');
    }

  } else {
    dataError.style.display = 'none';
    month.classList.remove('error');
    year.classList.remove('error');
  }

  if (!isCvc(cvcValue)) {
    cvcError.style.display = 'block';
    cvc.classList.add('error');
  } else {
    cvcError.style.display = 'none';
    cvc.classList.remove('error');
  }

  if (isCvc(cvcValue) && isMonth(monthValue) 
    && isYear(yearValue) && isMasterCard(cardNumberValue)) {
    
    container.style.display = 'none';
    containerComplete.style.display = 'flex';
  }
};

function newStart() {
  container.style.display = 'flex';
  containerComplete.style.display = 'none';
  cardHolder.value = '';
  cardNumber.value = '';
  month.value = '';
  year.value = '';
  cvc.value = '';
  numberInCard.textContent = '0000 0000 0000 0000';
  nameInCard.textContent = 'Jane Appleseed';
  monthInCard.textContent = '00';
  yearInCard.textContent = '00';
  cvcInCard.textContent = '000';
};
// MaterCard valid number
// (16 digits, begining for 51 - 55 )
const isMasterCard = (input) => {
  return /5[1-5][0-9]{14}$/.test(input)
};
//Month (Format MM)
const isMonth = (input) => {
  return /^0[1-9]|1[0-2]$/.test(input)
}
//año (format YY)
const isYear = (input) => {
  return /^[2-9][0-9]$/.test(input)
}
// cvc (format 3 numbers)
const isCvc = (input) => {
  return /^[0-9]{3}$/.test(input)
}
// Event Listener
form.addEventListener('submit', validate);
confirmBtn.addEventListener('click', validate);
continueBtn.addEventListener('click', newStart);
/* Palindrome Checker */

console.log('Palindrome Checker');

const textInput = document.getElementById('text-input');
const result = document.getElementById('result');
const checkBtn = document.getElementById('check-btn');
let str = textInput.value;

const cleanInput = () => {
  let lowerStr = str.toLowerCase();
  let cleanStr = lowerStr.replace(/[^a-zA-Z0-9]/g, '');
  return cleanStr;
};

const reverseString = () => {
  str = textInput.value;
  let cleanStr = cleanInput();
  let revStr = cleanStr.split('').reverse().join('');
  console.log(`"${str}"`, cleanStr, revStr);
  return revStr;
};

const wordChecker = () => {
  let cleanStr = cleanInput();
  let revStr = reverseString();
  return cleanStr === revStr ? true : false;
};

const getInput = () => {
  str = textInput.value;
  let cleanStr = cleanInput();

  if (cleanStr.length == 0) {
    alert('Please input a value');
  } else if (wordChecker() === true) {
    result.innerHTML = `${str} is a Palindrome`;
  } else if (wordChecker() === false) {
    result.innerHTML = `${str} is not a Palindrome`;
  }
};

checkBtn.addEventListener('click', getInput);

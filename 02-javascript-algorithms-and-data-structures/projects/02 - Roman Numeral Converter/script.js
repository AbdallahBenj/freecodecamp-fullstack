/* Roman Numeral Converter */

console.log('Roman Numeral Converter');

const title = document.getElementById('title');
const number = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

title.innerHTML = title.innerHTML.toUpperCase();

//
let array1 = ['', 'a', 'aa', 'aaa', 'ab', 'b', 'ba', 'baa', 'baaa', 'ac', 'c'];
let array = [];

const myFunction = (num) => {
  while (num > 0) {
    let result = '';
    const i = Number(1 + '0'.repeat(num.toString().length - 1));
    i === 1000
      ? (result = array1[Math.floor(num / i)].replaceAll('a', 'M'))
      : false;
    i === 100
      ? (result = array1[Math.floor(num / i)]
          .replaceAll('a', 'C')
          .replaceAll('b', 'D')
          .replaceAll('c', 'M'))
      : false;
    i === 10
      ? (result = array1[Math.floor(num / i)]
          .replaceAll('a', 'X')
          .replaceAll('b', 'L')
          .replaceAll('c', 'C'))
      : false;
    i === 1
      ? (result = array1[Math.floor(num / i)]
          .replaceAll('a', 'I')
          .replaceAll('b', 'V')
          .replaceAll('c', 'X'))
      : false;

    num = num % i;

    array.push(result);
    return myFunction(num);
  }

  return array.join('').toString();
};
//

const numberOutput = () => {
  const inputInt = parseInt(number.value);
  if (!number.value || isNaN(inputInt) || inputInt <= 0 || inputInt >= 4000) {
    !number.value || isNaN(inputInt)
      ? (output.innerHTML = 'Please enter a valid number')
      : false;
    inputInt <= 0
      ? (output.innerHTML = 'Please enter a number greater than or equal to 1')
      : false;
    inputInt >= 4000
      ? (output.innerHTML = 'Please enter a number less than or equal to 3999')
      : false;
    output.style.display = 'block';
    output.style.color = 'red';
    output.style.border = '3px solid red';
    number.value = '';
  } else {
    array = [];
    output.innerHTML = myFunction(inputInt);
    output.style.display = 'block';
    output.style.color = '#fff';
    output.style.border = '3px solid #fff';
    console.log(number.value);
    console.log(inputInt);
    number.value = '';
  }
};

convertBtn.addEventListener('click', numberOutput);

number.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    numberOutput();
    e.preventDefault();
  }
});

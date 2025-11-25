console.log('Regex Sandbox');

const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');
const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

function getFlags() {
  const iFlag = caseInsensitiveFlag.checked ? 'i' : '';
  const gFlag = globalFlag.checked ? 'g' : '';
  return `${gFlag}${iFlag}`;
}

function getResult() {
  const flag = getFlags();
  const pattern = regexPattern.value;
  const regex = new RegExp(pattern, flag);

  const string = stringToTest.textContent;
  const matches = string.match(regex);

  const result = matches
    ? string.replace(regex, (match) => {
        return `<span class='highlight'>${match}</span>`;
      })
    : string;

  stringToTest.innerHTML = `${result}`;
  testResult.textContent = matches
    ? `${matches}`.split(',').join(', ')
    : 'no match';

  testResult.textContent = pattern
    ? matches
      ? `${matches}`.split(',').join(', ')
      : 'no match'
    : 'Please enter your regex pattern';
}

testButton.addEventListener('click', getResult);

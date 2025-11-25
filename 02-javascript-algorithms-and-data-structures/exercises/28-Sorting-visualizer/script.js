console.log('Sorting Visualizer');

const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');
const startingArray = document.getElementById('starting-array');
const arrayContainer = document.getElementById('array-container');

// Generate number between 1 to 100
const generateElement = () => Math.floor(Math.random() * 100) + 1;

// Generate Array of 5 random numbers
function generateArray() {
  let arrayNumbers = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = generateElement();
    arrayNumbers.push(randomNumber);
  }
  return arrayNumbers;
}

// Create div container for each step
function generateContainer() {
  const divElement = document.createElement('div');
  arrayContainer.appendChild(divElement);
  return divElement;
}

// Create span elements for each number in the array
function fillArrContainer(element, array) {
  for (let i = 0; i < array.length; i++) {
    const spanElement = document.createElement('span');
    element.appendChild(spanElement);
    spanElement.textContent = array[i];
    spanElement.setAttribute('id', `num-${array[i]}`);
  }
}

// Check if two numbers are in order
function isOrdered(firstNum, secondNum) {
  return firstNum <= secondNum;
}

// Swap two elements in the array
function swapElements(array, i) {
  if (!isOrdered(array[i], array[i + 1])) {
    let temp = array[i];
    array[i] = array[i + 1];
    array[i + 1] = temp;
  }

  return array;
}

// Sort the array and visualize each step
function sortElements(array) {
  for (let j = 0; j < array.length - 1; j++) {
    const copyArray = [...array];
    const start = JSON.stringify([...copyArray]);

    // Simulate full cycle --- 4 div
    for (let i = 0; i < copyArray.length - 1; i++) {
      swapElements(copyArray, i);
    }
    const end = JSON.stringify([...copyArray]);
    const change = start !== end;

    // Render the cycle if the array changed
    for (let i = 0; i < array.length - 1; i++) {
      if (change || j === array.length - 2) {
        swapElements(array, i);

        let div = generateContainer();
        fillArrContainer(div, [...array]);

        highlightCurrentEls(
          arrayContainer.lastElementChild.previousElementSibling,
          i,
        );
      }
    }
  }

  if (arrayContainer.lastChild) {
    arrayContainer.lastChild.style.border = '3px solid green';
  }
}

// Highlight the two elements being compared
function highlightCurrentEls(element, index) {
  if (element?.children[index]) {
    element.children[index].style.border = '2px dashed red';
  }
  if (element?.children[index + 1]) {
    element.children[index + 1].style.border = '2px dashed red';
  }
}

// Store the generated array
let generatedArray;

// When user clicks "Generate Array" => generate and display array
generateBtn.addEventListener('click', () => {
  console.log('Generate Btn Clicked');
  generatedArray = generateArray();
  console.log('generatedArray:', generatedArray);

  startingArray.textContent = '';
  while (arrayContainer.children.length > 1) {
    arrayContainer.lastChild.remove();
  }

  fillArrContainer(startingArray, generatedArray);

  sortBtn.style.display = 'block';
  // generateBtn.style.display = 'none';
});

// When user clicks "Sort Array" => sort and visualize the array
sortBtn.addEventListener('click', () => {
  console.log('Sort Btn Clicked');
  if (!generatedArray) {
    alert('Please generate the array first!');
    return;
  }

  sortElements(generatedArray);

  generateBtn.style.display = 'block';
  sortBtn.style.display = 'none';
});

console.log('Music Instruments product page');

const instrumentsArr = [
  { category: 'woodwinds', instrument: 'Flute', price: 500 },
  { category: 'woodwinds', instrument: 'Clarinet', price: 200 },
  { category: 'woodwinds', instrument: 'Oboe', price: 4000 },
  { category: 'brass', instrument: 'Trumpet', price: 200 },
  { category: 'brass', instrument: 'Trombone', price: 300 },
  { category: 'brass', instrument: 'French Horn', price: 4300 },
  { category: 'percussion', instrument: 'Drum Set', price: 500 },
  { category: 'percussion', instrument: 'Xylophone', price: 3000 },
  { category: 'percussion', instrument: 'Cymbals', price: 200 },
  { category: 'percussion', instrument: 'Marimba', price: 3000 },
];

const selectContainer = document.querySelector('.select-container');
const productsContainer = document.querySelector('.products-container');

function instrumentCards(instrumentCategory) {
  let structuredArr = [];
  if (instrumentCategory === 'all') {
    structuredArr = instrumentsArr;
  } else {
    structuredArr = instrumentsArr.filter(
      (obj) => obj.category === instrumentCategory,
    );
  }
  return structuredArr
    .map(
      (obj) =>
        `<div class="card"><h2>${obj.instrument}</h2><p>$${obj.price}</p></div>`,
    )
    .join('');
}

selectContainer.addEventListener('change', () => {
  productsContainer.innerHTML = instrumentCards(selectContainer.value);
});

console.log('Real Time Counter');

const textArea = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
charCount.classList.add('result');
charCount.textContent = `Character Count: 0/50`;

textArea.addEventListener('input', (e) => {
  if (e.target.value.length > 50) {
    e.target.value = e.target.value.slice(0, 50);
  }
  const length = e.target.value.length;
  charCount.textContent = `Character Count: ${length}/50`;

  const isLimitReach = length === 50;
  const color = isLimitReach ? 'red' : 'revert-layer';

  charCount.style.color = color;
});

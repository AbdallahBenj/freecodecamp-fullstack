console.log('Note taking app');

const noteEl = document.getElementById('note');
const statusEl = document.getElementById('status');

let currentContent = '';

noteEl.addEventListener('focus', () => (statusEl.textContent = ''));

noteEl.addEventListener('blur', () => {
  const newContent = noteEl.innerHTML;

  if (currentContent === newContent) return;
  currentContent = newContent;
  statusEl.textContent = 'Note saved successfully!';
});

window.addEventListener('DOMContentLoaded', () => {
  currentContent = noteEl.textContent;
});

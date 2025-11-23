console.log('Favorite Icon Toggler');

const buttons = document.getElementsByClassName('favorite-icon');

for (let button of buttons) {
  button.addEventListener('click', () => {
    button.classList.toggle('filled');
    button.innerHTML = button.classList.contains('filled')
      ? '&#10084;'
      : '&#9825;';
  });
}

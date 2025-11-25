console.log('Emoji Reactor');

const htmlBtn = [
  {
    id: 'loving-btn',
    ariaLabel: 'Loving face emoji',
    face: '😍',
    count: 0,
  },
  {
    id: 'happy-btn',
    ariaLabel: 'happy-face-emoji',
    face: '😊',
    count: 0,
  },
  {
    id: 'okay-btn',
    ariaLabel: 'Okay-face-emoji',
    face: '😐',
    count: 0,
  },
  {
    id: 'confused-btn',
    ariaLabel: 'Confused face emoji',
    face: '😕',
    count: 0,
  },
  {
    id: 'sad-btn',
    ariaLabel: 'Angry face emoji',
    face: '😡',
    count: 0,
  },
];

const btnContainer = document.querySelector('.btn-container');

document.addEventListener('DOMContentLoaded', () => {
  btnContainer.innerHTML = '';

  // 1* Create HTML buttons
  btnContainer.innerHTML = htmlBtn
    .map(
      (el) =>
        `<button id='${el.id}' class='emoji-btn' aria-label='${el.ariaLabel}'>
        <span role='img' aria-hidden='true'>${el.face}</span>
        <span class='count'>${el.count}/10</span>
        </button>`,
    )
    .join('');

  // 2* Get Object for button by id
  const getElement = (id) => htmlBtn.find((el) => el.id === id);

  // 3* Update Buttons Count
  btnContainer.addEventListener('click', (e) => {
    let btn = e.target.closest('button');
    if (!btn) return;
    let obj = getElement(btn.id);
    if (obj.count < 10) obj.count++;
    btn.querySelector('.count').textContent = `${obj.count}/10`;
  });
});

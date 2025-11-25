console.log('Theme Switcher');

const themeSwitcher = document.getElementById('theme-switcher-button');
const themeDropdown = document.getElementById('theme-dropdown');
const messageEl = document.getElementById('status');

const body = document.querySelector('body');

const themes = [
  { name: 'dark', message: 'The night is yours — Dark theme is on!' },
  { name: 'light', message: 'Hello sunshine — Light theme is on!' },
  { name: 'ocean', message: 'Blue skies and high tides — Ocean theme is on!' },
];

themeSwitcher.addEventListener('click', () => {
  let isExpanded = themeSwitcher.ariaExpanded === 'true';
  console.log(!isExpanded);
  themeSwitcher.ariaExpanded = !isExpanded;
  themeDropdown.hidden = isExpanded;
});

const itemEl = document.querySelectorAll('[role="menuitem"]');

itemEl.forEach((el, i) => {
  el.addEventListener('click', () => {
    body.setAttribute('class', '');
    body.classList.add(`theme-${themes[i].name}`);
    themeSwitcher.setAttribute('class', '');
    themeSwitcher.classList.add(`button-${themes[i].name}`);
    messageEl.textContent = '';
    messageEl.textContent = themes[i].message;
    themeDropdown.hidden = true;
    themeSwitcher.setAttribute('aria-expanded', 'false');
  });
});

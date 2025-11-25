console.log('Drum Machine');

const buttons = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');
const volume = document.getElementById('volume');

const power = document.getElementById('power');
const bank = document.getElementById('bank');

const sounds = [
  {
    id: 'Q',
    name: 'Heater 1',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3',
  },
  {
    id: 'W',
    name: 'Heater 2',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3',
  },
  {
    id: 'E',
    name: 'Heater 3',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3',
  },
  {
    id: 'A',
    name: 'Heater 4',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3',
  },
  {
    id: 'S',
    name: 'Clap',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3',
  },
  {
    id: 'D',
    name: 'Open-HH',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3',
  },
  {
    id: 'Z',
    name: "Kick-n'-Hat",
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3',
  },
  {
    id: 'X',
    name: 'Kick',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3',
  },
  {
    id: 'C',
    name: 'Closed-HH',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3',
  },
];

const chords = [
  {
    id: 'Q',
    name: 'Chord 1',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_1.mp3',
  },
  {
    id: 'W',
    name: 'Chord 2',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_2.mp3',
  },
  {
    id: 'E',
    name: 'Chord 3',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Chord_3.mp3',
  },
  {
    id: 'A',
    name: 'Shaker',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Give_us_a_light.mp3',
  },
  {
    id: 'S',
    name: 'Open HH',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Dry_Ohh.mp3',
  },
  {
    id: 'D',
    name: 'Closed HH',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Bld_H1.mp3',
  },
  {
    id: 'Z',
    name: 'Punchy Kick',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/punchy_kick_1.mp3',
  },
  {
    id: 'X',
    name: 'Side Stick',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/side_stick_1.mp3',
  },
  {
    id: 'C',
    name: 'Snare',
    src: 'https://cdn.freecodecamp.org/curriculum/drum/Brk_Snr.mp3',
  },
];

let isPower = true;
let volumeLevel = 0.5;
let playlist = sounds;

// play html element audio
for (const button of buttons) {
  button.addEventListener('click', () => {
    let audioEl = button.querySelector('[id]');
    if (audioEl && isPower) {
      playSound(audioEl.id);
      setDisplay(audioEl.id);
    }
  });
}

document.addEventListener('keydown', (e) => {
  const keyId = e.key.toUpperCase();
  if (!/^[QWEASDZXC]$/.test(keyId)) return;
  let audioEl = document.querySelector(`#${keyId}`);
  if (audioEl && isPower) {
    playSound(audioEl.id);
    setButtonStyle(audioEl);
    setDisplay(audioEl.id);
  }
});

power.checked = true;

power.addEventListener('change', (e) => {
  isPower = e.target.checked;
  const audio = new Audio(playlist[3].src);
  if (!isPower) {
    buttons.forEach((button) => button.classList.add('disabled'));
    volume.style.display = 'none';
    display.style.display = 'none';
    display.textContent = '';
  } else {
    buttons.forEach((button) => button.classList.remove('disabled'));
    audio.src = playlist[0].src;
  }
  console.log('isPower: ', isPower);
  audio.volume = volumeLevel;
  audio.play();
});

volume.addEventListener('change', (e) => {
  volumeLevel = e.target.value / 100;
  console.log(volumeLevel);
});

bank.addEventListener('change', (e) => {
  const isBank = e.target.checked;
  playlist = isBank ? chords : sounds;
  console.log('playlist: ', playlist);
});

function playSound(soundId) {
  const sound = playlist.find((sound) => sound.id === soundId);
  const audio = new Audio(sound.src);
  audio.volume = volumeLevel;
  audio.load();
  audio.play();
}

function setButtonStyle(audioEl) {
  const buttonActive = audioEl.parentElement;
  buttonActive.classList.add('hover');
  setTimeout(() => buttonActive.classList.remove('hover'), 300);
}

function setDisplay(id) {
  const sound = playlist.find((sound) => sound?.id === id);
  if (sound && isPower) {
    volume.style.display = 'inline-block';
    display.style.display = 'block';
    display.textContent = sound.name;
  }
}

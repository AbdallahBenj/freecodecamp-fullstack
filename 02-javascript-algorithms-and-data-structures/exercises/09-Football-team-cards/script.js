console.log('Football Team Cards');

const footballTeam = {
  team: 'Argentina',
  year: 1986,
  headCoach: 'Carlos Bilardo',
  players: [
    {
      name: 'Sergio Almirón',
      position: 'forward',
      isCaptain: false,
    },
    {
      name: 'Sergio Batista',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Ricardo Bochini',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Claudio Borghi',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'José Luis Brown',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Daniel Passarella',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Jorge Burruchaga',
      position: 'forward',
      isCaptain: false,
    },
    {
      name: 'plaNéstor Clausen',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'José Luis Cuciuffo',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Diego Maradona',
      position: 'midfielder',
      isCaptain: true,
    },
    {
      name: 'Jorge Valdano',
      position: 'forward',
      isCaptain: false,
    },
    {
      name: 'Héctor Enrique',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Oscar Garré',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Ricardo Giusti',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Luis Islas',
      position: 'goalkeeper',
      isCaptain: false,
    },
    {
      name: 'Julio Olarticoechea',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Pedro Pasculli',
      position: 'forward',
      isCaptain: false,
    },
    {
      name: 'Nery Pumpido',
      position: 'goalkeeper',
      isCaptain: false,
    },
    {
      name: 'plOscar Ruggeri',
      position: 'defender',
      isCaptain: false,
    },
    {
      name: 'Carlos Tapia',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Marcelo Trobbiani',
      position: 'midfielder',
      isCaptain: false,
    },
    {
      name: 'Héctor Zelada',
      position: 'goalkeeper',
      isCaptain: false,
    },
  ],
};

const coach = document.getElementById('head-coach');
const team = document.getElementById('team');
const year = document.getElementById('year');

coach.textContent = footballTeam.headCoach;
team.textContent = footballTeam.team;
year.textContent = footballTeam.year;

// Display players card

const playerCards = document.getElementById('player-cards');

function getPlayersCards(arr) {
  playerCards.textContent = '';
  for (let element of arr) {
    let { name, position, isCaptain } = element;

    const player = document.createElement('div');
    const playerName = document.createElement('h2');
    const playerPosition = document.createElement('p');

    playerCards.appendChild(player);
    player.appendChild(playerName);
    player.appendChild(playerPosition);
    player.classList.add('player-card');

    playerName.textContent = `${isCaptain ? '(Captain)' : ''} ${name}`;
    playerPosition.textContent = `Position: ${position}`;
  }
}

getPlayersCards(footballTeam.players);

// Filter Selected Players card

const playersSelection = document.getElementById('players');

playersSelection.addEventListener('change', function (event) {
  console.log(event.target.value);
  const playersArr = footballTeam.players;

  const playersObj = {
    all: playersArr,
    forward: playersArr.filter((player) => player.position === 'forward'),
    midfielder: playersArr.filter((player) => player.position === 'midfielder'),
    defender: playersArr.filter((player) => player.position === 'defender'),
    goalkeeper: playersArr.filter((player) => player.position === 'goalkeeper'),
  };

  const selected = event.target.value;

  getPlayersCards(playersObj[selected]);
  console.log(playersObj[selected].length);
});

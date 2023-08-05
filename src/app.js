import 'normalize.css';
import './style.css';
import shuffle from './utils/utils';
import ancientsData from './data/ancients';
import difficulties from './data/difficulties';
import cardsData from './data/mythic-cards';
import {
  ancientList,
  cardsContainer,
  deckContainer,
  rectangles,
  stateContainer,
  greenStateCards,
  yellowStateCards,
  blueStateCards,
  difficultiesContainer,
  logo,
  ancientsBackgrounds,
} from './constants/constants';
import mythicCardBackground from './assets/images/mythic-cards/MythicCardBackground.jpg';
import homeBackground from './assets/images/backgrounds/Home.webp';
import logoImage from './assets/images/logo.webp';

let deck;
let miniDecks;
let currentAncient;
let currentAncientId;
let currentDifficulty;
let stage = 0;

const filterCardsByDifficulty = (difficulty, cards) => {
  let filteredCards;
  switch (difficulty) {
    case 'superEasy':
      filteredCards = cards
        .filter((card) => card.difficulty !== 'hard')
        .sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
      break;
    case 'superHard':
      filteredCards = cards
        .filter((card) => card.difficulty !== 'easy')
        .sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
      break;
    case 'easy':
      filteredCards = cards.filter((card) => card.difficulty !== 'hard');
      break;
    case 'hard':
      filteredCards = cards.filter((card) => card.difficulty !== 'easy');
      break;
    default:
      filteredCards = cards;
      break;
  }
  return filteredCards;
};

const filterCards = (difficulty, cards) => {
  const filteredCardsByColor = Object.keys(cards).map((color) => {
    const shuffleCards = shuffle(cards[color]);
    const filteredCardsByDifficulty = filterCardsByDifficulty(difficulty, shuffleCards);
    return { [color]: filteredCardsByDifficulty };
  });
  return Object.assign({}, ...filteredCardsByColor);
};

const getSumOfCardsForStagesByColors = (id) => {
  const { cardsCount } = ancientsData[id];
  const sumOfCards = cardsCount.reduce(
    (acc, current) => {
      return {
        green: acc.green + current.green,
        yellow: acc.yellow + current.yellow,
        blue: acc.blue + current.blue,
      };
    },
    { green: 0, yellow: 0, blue: 0 },
  );
  return sumOfCards;
};

const sliceCardSet = (cards) => {
  const stagesColorsSum = getSumOfCardsForStagesByColors(currentAncientId);
  Object.keys(cards).forEach((color) => {
    cards[color].splice(stagesColorsSum[color]);
    shuffle(cards[color]);
  });
  return cards;
};

const createMiniDeck = (number, cards) => {
  const miniDeck = [];
  const cardSet = sliceCardSet(cards);
  Object.keys(cardSet).forEach((color) => {
    cardSet[color].slice(0, number[color]).forEach((card) => miniDeck.push(card));
  });
  Object.keys(cardSet).forEach((color) => cardSet[color].splice(0, number[color]));
  return shuffle(miniDeck);
};

const constructDeck = (id, difficulty) => {
  const newCards = JSON.parse(JSON.stringify(cardsData));
  const filteredCards = filterCards(difficulty, newCards);
  const fullDeck = [];
  for (let i = 0; i < 3; i += 1) {
    const numberOfCardsForStage = ancientsData[id].cardsCount[i];
    fullDeck.push(createMiniDeck(numberOfCardsForStage, filteredCards));
  }
  return fullDeck;
};

logo.src = logoImage;
const setBg = (ancient) => {
  const img = new Image();

  if (ancient) {
    img.src = ancientsBackgrounds[ancient];
  } else {
    img.src = homeBackground;
  }

  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
};

const addAncients = () => {
  ancientsData.forEach((ancient, index) => {
    const img = new Image();
    const li = document.createElement('li');

    li.classList.add('ancient-card');
    ancientList.appendChild(li);
    img.src = ancient.cardFace;
    img.onload = () => {
      li.style.backgroundImage = `url(${img.src})`;
    };
    li.setAttribute('data-id', `${index}`);
  });
};

setBg();
addAncients();

const changeState = (currentCard) => {
  if (
    greenStateCards[stage].textContent === '0' &&
    blueStateCards[stage].textContent === '0' &&
    yellowStateCards[stage].textContent === '0'
  ) {
    stage += 1;
  }

  switch (currentCard.color) {
    case 'green':
      greenStateCards[stage].textContent -= 1;
      break;
    case 'blue':
      blueStateCards[stage].textContent -= 1;
      break;
    default:
      yellowStateCards[stage].textContent -= 1;
      break;
  }
};

const removeCardsBackground = () => {
  deckContainer.style.backgroundImage = '';
  deckContainer.classList.remove('active');
};

const displayDeck = (currentDeck) => {
  if (currentDeck.length) {
    const img = new Image();
    const div = document.createElement('div');
    div.classList.add('card');
    cardsContainer.appendChild(div);
    const currentCard = currentDeck.pop();

    img.src = currentCard.cardFace;
    img.onload = () => {
      div.style.backgroundImage = `url(${img.src})`;
    };

    console.log(currentCard);
    changeState(currentCard);
  }

  if (currentDeck.length === 0) {
    removeCardsBackground();
  }
};

const setTracker = (id) => {
  if (id) {
    const { cardsCount } = ancientsData[id];
    const states = [];

    Object.keys(cardsCount).forEach((state) => {
      states.push(Object.values(cardsCount[state]));
    });

    rectangles.forEach((state, num) => {
      const currentState = state;
      currentState.textContent = states.flat()[num];
    });
  } else {
    rectangles.forEach((state) => {
      const currentState = state;
      currentState.textContent = '';
    });
  }
};

ancientList.addEventListener('click', (e) => {
  ancientList.childNodes.forEach((ancient) => {
    ancient.classList.remove('active');
  });

  e.target.classList.add('active');
  currentAncientId = e.target.dataset.id;

  stage = 0;

  if (e.target.dataset.id) {
    currentAncient = ancientsData[e.target.dataset.id].id;
  }

  if (e.target.classList.contains('ancient-card')) {
    setBg(currentAncient);
  } else {
    setBg();
  }

  setTracker(currentAncientId);

  cardsContainer.innerHTML = '';
  deckContainer.classList.remove('active');
  stateContainer.classList.remove('active');
});

document.querySelector('.shuffle').addEventListener('click', () => {
  if (currentAncientId && currentDifficulty) {
    deckContainer.src = mythicCardBackground;
    deckContainer.classList.add('active');
    stateContainer.classList.add('active');

    miniDecks = constructDeck(currentAncientId, currentDifficulty);
    deck = miniDecks.flat().reverse();
    console.log(deck);
  }

  stage = 0;

  setTracker(currentAncientId);
  cardsContainer.innerHTML = '';
});

deckContainer.addEventListener('click', () => {
  displayDeck(deck);
});

difficultiesContainer.addEventListener('click', (e) => {
  [...difficultiesContainer.children].forEach((button) => {
    button.classList.remove('active');
  });

  difficulties.forEach((difficulty) => {
    if (e.target.textContent === difficulty.name) {
      currentDifficulty = difficulty.id;
      e.target.classList.add('active');
    }
  });
});

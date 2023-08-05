import 'normalize.css';
import './style.css';
import ancientsData from './data/ancients';
import cardsData from './data/mythic-cards';
import difficulties from './data/difficulties';
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

setBg();

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

addAncients();

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

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
    return filteredCardsByDifficulty;
  });
  return filteredCardsByColor;
};

const getSumColorsStageCards = (id) => {
  const { firstStage, secondStage, thirdStage } = ancientsData[id];
  const stages = [firstStage, secondStage, thirdStage];
  const sumGreenCards = stages.reduce((acc, currentStage) => {
    return acc + currentStage.greenCards;
  }, 0);
  const sumYellowCards = stages.reduce((acc, currentStage) => {
    return acc + currentStage.yellowCards;
  }, 0);
  const sumBlueCards = stages.reduce((acc, currentStage) => {
    return acc + currentStage.blueCards;
  }, 0);
  return [sumGreenCards, sumYellowCards, sumBlueCards];
};

const sliceCardSet = (filteredCards) => {
  const stagesColorsSum = getSumColorsStageCards(currentAncientId);
  filteredCards.forEach((cards, i) => {
    cards.splice(stagesColorsSum[i]);
    shuffle(cards);
  });
  return filteredCards;
};

const createMiniDeck = (currentStage, filteredCards) => {
  const miniDeck = [];
  const cardSet = sliceCardSet(filteredCards);

  cardSet.forEach((cards, i) => {
    cards.slice(0, Object.values(currentStage)[i]).forEach((card) => {
      miniDeck.push(card);
    });
  });
  cardSet.forEach((cards, i) => {
    cards.splice(0, Object.values(currentStage)[i]);
  });

  return shuffle(miniDeck);
};

const constructDeck = (id, difficulty) => {
  const newCards = JSON.parse(JSON.stringify(cardsData));
  const filteredCards = filterCards(difficulty, newCards);
  console.log(JSON.parse(JSON.stringify(filteredCards)));
  const firstStage = createMiniDeck(ancientsData[id].firstStage, filteredCards);
  const secondStage = createMiniDeck(ancientsData[id].secondStage, filteredCards);
  const thirdStage = createMiniDeck(ancientsData[id].thirdStage, filteredCards);

  return [thirdStage, secondStage, firstStage];
};

const changeState = (currentCard) => {
  if (
    greenStateCards[stage].textContent === '0' &&
    blueStateCards[stage].textContent === '0' &&
    yellowStateCards[stage].textContent === '0'
  ) {
    stage += 1;
  }

  if (currentCard.color === 'green') {
    greenStateCards[stage].textContent -= 1;
  } else if (currentCard.color === 'blue') {
    blueStateCards[stage].textContent -= 1;
  } else {
    yellowStateCards[stage].textContent -= 1;
  }
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
    deckContainer.style.backgroundImage = '';
    deckContainer.classList.remove('active');
  }
};

const setDefaultState = (id) => {
  if (id) {
    const { firstStage, secondStage, thirdStage } = ancientsData[id];
    const stages = [firstStage, secondStage, thirdStage];
    const states = [];

    Object.keys(stages).forEach((state) => {
      states.push(Object.values(stages[state]));
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

  setDefaultState(currentAncientId);

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
    deck = miniDecks.flat();
    console.log(deck);
  }

  stage = 0;

  setDefaultState(currentAncientId);
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

import ancientsData from '../data/ancients.js';
import cards from '../data/mythicCards/index.js';
import difficulties from '../data/difficulties.js';
import { ancientList, cardsContainer, deckContainer, rectangles, stateContainer, greenStateCards, yellowStateCards, blueStateCards, difficultiesContainer } from './constants.js'

let deck,
    miniDecks,
    currentAncient,
    currentAncientId,
    currentDifficulty;

let stage = 0;

const setBg = (ancient) => {
    const img = new Image();

    if (ancient) {
        img.src = `./assets/bg/${ancient}.webp`;
    } else {
        img.src = './assets/bg/home.webp';
    }

    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    };
}

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
    })
}

addAncients();

const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
}

const filterCards = (difficulty, cards) => {
    const filteredCards = [];

    for (let color in cards) {
        const shuffleCards = shuffle(cards[color]);

        if (difficulty === 'easy') {
            filteredCards.push(shuffleCards.filter(card => card.difficulty !== 'hard'));
        } else if (difficulty === 'hard') {
            filteredCards.push(shuffleCards.filter(card => card.difficulty !== 'easy'));
        } else if (difficulty === 'normal') {
            filteredCards.push(shuffleCards);
        } else if (difficulty === 'superEasy') {
            filteredCards.push(shuffleCards
                .filter(card => card.difficulty !== 'hard')
                .sort((a, b) => a.difficulty > b.difficulty ? 1 : -1));
        } else if (difficulty === 'superHard') {
            filteredCards.push(shuffleCards
                .filter(card => card.difficulty !== 'easy')
                .sort((a, b) => a.difficulty > b.difficulty ? 1 : -1));
        }
    }

    return filteredCards;
}

const createMiniDeck = (stage, filteredCards) => {
    const miniDeck = [];

    filteredCards.map((cards, i) => {
        cards.slice(0, Object.values(stage)[i]).map(card => {
            miniDeck.push(card);
        });
    })

    filteredCards.map((cards, i) => {
        cards.splice(0, Object.values(stage)[i]);
    })

    return shuffle(miniDeck);
}

const collectDeck = (id, difficulty) => {
    const newCards = JSON.parse(JSON.stringify(cards)),
        filteredCards = filterCards(difficulty, newCards);

    const firstStage = createMiniDeck(ancientsData[id].firstStage, filteredCards),
        secondStage = createMiniDeck(ancientsData[id].secondStage, filteredCards),
        thirdStage = createMiniDeck(ancientsData[id].thirdStage, filteredCards);
    return [thirdStage, secondStage, firstStage];
}

const displayDeck = deck => {
    if (deck.length) {
        const img = new Image();

        const div = document.createElement('div');
        div.classList.add('card');
        cardsContainer.appendChild(div);

        const currentCard = deck.pop();

        img.src = currentCard.cardFace;

        img.onload = () => {
            div.style.backgroundImage = `url(${img.src})`;
        };

        console.log(currentCard);

        changeState(currentCard);
    }

    if (deck.length === 0) {
        deckContainer.style.backgroundImage = '';
        deckContainer.classList.remove('active');
    }
}

const setDefaultState = (currentAncientId) => {
    if (currentAncientId) {
        const firstStage = ancientsData[currentAncientId].firstStage,
            secondStage = ancientsData[currentAncientId].secondStage,
            thirdStage = ancientsData[currentAncientId].thirdStage,
            stages = [firstStage, secondStage, thirdStage];

        const states = [];

        for (let state in stages) {
            states.push(Object.values(stages[state]));
        }

        rectangles.forEach((state, num) => {
            state.textContent = states.flat()[num];
        })
    } else {
        rectangles.forEach(state => {
            state.textContent = '';
        })
    }
}

const changeState = (currentCard) => {
    if (greenStateCards[stage].textContent === '0' && blueStateCards[stage].textContent === '0' && yellowStateCards[stage].textContent === '0') {
        stage++;
    }

    if (currentCard.color === 'green') {
        greenStateCards[stage].textContent--;
    } else if (currentCard.color === 'blue') {
        blueStateCards[stage].textContent--;
    } else {
        yellowStateCards[stage].textContent--;
    }
}

ancientList.addEventListener('click', e => {
    ancientList.childNodes.forEach(ancient => {
        ancient.classList.remove('active');
    })

    e.target.classList.add('active');
    currentAncientId = e.target.dataset.id;

    stage = 0;

    if (e.target.dataset.id) {
        currentAncient = ancientsData[e.target.dataset.id].id;
    }

    setBg(currentAncient);
    setDefaultState(currentAncientId);

    cardsContainer.innerHTML = '';
    deckContainer.classList.remove('active');
    stateContainer.classList.remove('active');
})

document.querySelector('.shuffle').addEventListener('click', () => {
    if (currentAncientId && currentDifficulty) {
        deckContainer.style.backgroundImage = 'url(./assets/mythicCardBackground.jpg)';
        deckContainer.classList.add('active');
        stateContainer.classList.add('active');

        miniDecks = collectDeck(currentAncientId, currentDifficulty);
        deck = miniDecks.flat();
        console.log(deck);
    }

    stage = 0;

    setDefaultState(currentAncientId);
    cardsContainer.innerHTML = '';
})

deckContainer.addEventListener('click', () => {
    displayDeck(deck);
})

difficultiesContainer.addEventListener('click', e => {
    [...difficultiesContainer.children].forEach(button => {
        button.classList.remove('active');
    })

    difficulties.forEach(difficulty => {
        if (e.target.textContent === difficulty.name) {
            currentDifficulty = difficulty.id;
            e.target.classList.add('active');
        }
    })
})
import ancientsData from './data/ancients.js';
import cards from './data/mythicCards/index.js'

const ancientList = document.querySelector('.ancients-list'),
    cardsContainer = document.querySelector('.cards-container'),
    deckContainer = document.querySelector('.deck'),
    rectangles = document.querySelectorAll('.rectangle'),
    stateContainer = document.querySelector('.current-state'),
    greenStateCards = document.querySelectorAll('.rectangle.green'),
    yellowStateCards = document.querySelectorAll('.rectangle.yellow'),
    blueStateCards = document.querySelectorAll('.rectangle.blue');

let deck,
    miniDecks,
    currentAncient,
    currentAncientId;


let stage = 0;

const setBg = (ancient) => {
    const img = new Image();

    if (ancient) {
        img.src = `./assets/bg/${ancient}.webp`;
    } else {
        img.src = `./assets/bg/home.webp`;
    }

    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    };
}

const addAncients = () => {
    ancientsData.forEach((ancient, index) => {
        let li = document.createElement('li');
        li.classList.add('ancient-card');
        ancientList.appendChild(li);

        li.style.backgroundImage = `url(${ancient.cardFace})`;
        li.setAttribute('data-id', `${index}`)
    })
}

addAncients();

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

setBg();

const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
}

const createMiniDeck = (stage) => {
    let miniDeck = [],
        newCards = JSON.parse(JSON.stringify(cards));

    for (let color in newCards) {
        let shuffleCards = shuffle(newCards[color]);

        shuffleCards.slice(0, stage[color]).map(card => {
            miniDeck.push(card);
        })

        shuffleCards.splice(0, stage[color]);
    }

    return shuffle(miniDeck);
}

const collectDeck = (id) => {
    const firstStage = createMiniDeck(ancientsData[id].firstStage),
        secondStage = createMiniDeck(ancientsData[id].secondStage),
        thirdStage = createMiniDeck(ancientsData[id].thirdStage);
    return [thirdStage, secondStage, firstStage];
}

document.querySelector('.shuffle').addEventListener('click', () => {
    if (currentAncientId) {
        deckContainer.style.backgroundImage = 'url(./assets/mythicCardBackground.png)';
        deckContainer.classList.add('active');
        stateContainer.classList.add('active');

        miniDecks = collectDeck(currentAncientId);
        deck = miniDecks.flat();

        console.log(deck);
    }

    cardsContainer.innerHTML = '';
})

const displayDeck = deck => {
    if (deck.length) {
        let div = document.createElement('div');
        div.classList.add('card');
        cardsContainer.appendChild(div);

        let currentCard = deck.pop();
        div.style.backgroundImage = `url(${currentCard.cardFace})`;
        console.log(currentCard);

        changeState(currentCard)
    } else {
        deckContainer.style.backgroundImage = '';
        deckContainer.classList.remove('active');
    }
}

deckContainer.addEventListener('click', () => {
    displayDeck(deck);
})

const setDefaultState = (currentAncientId) => {
    if (currentAncientId) {
        const firstStage = ancientsData[currentAncientId].firstStage,
            secondStage = ancientsData[currentAncientId].secondStage,
            thirdStage = ancientsData[currentAncientId].thirdStage,
            stages = [firstStage, secondStage, thirdStage];

        let states = [];

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
        console.log(stage)
    }

    if (currentCard.color === 'green') {
        greenStateCards[stage].textContent--;
    } else if (currentCard.color === 'blue') {
        blueStateCards[stage].textContent--;
    } else {
        yellowStateCards[stage].textContent--;
    }
}
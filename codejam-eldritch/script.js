import ancientsData from './data/ancients.js';
import cards from './data/mythicCards/index.js'

const ancientList = document.querySelector('.ancients-list'),
    cardsContainer = document.querySelector('.cards-container'),
    deckContainer = document.querySelector('.deck');

let deck;

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

    let currentAncient;

    if (e.target.dataset.id) {
        currentAncient = ancientsData[e.target.dataset.id].id;
    }

    setBg(currentAncient);

    cardsContainer.innerHTML = '';
    deckContainer.classList.remove('active');
})

setBg();

const findCurrentAncient = () => {
    for (let i = 0; i < ancientList.childNodes.length; i++) {
        if (ancientList.childNodes[i].classList.contains('active')) {
            return ancientList.childNodes[i].dataset.id;
        }
    }
}

const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
}

const createMiniDeck = (stage) => {
    let miniDeck = [];
    let newCards = JSON.parse(JSON.stringify(cards));

    for (let color in newCards) {
        let shuffleCards = shuffle(newCards[color]);

        shuffleCards.slice(0, stage[color]).map(card => {
            miniDeck.push(card);
        })

        shuffleCards.splice(0, stage[color]);
    }

    return shuffle(miniDeck);
}

const collectDeck = (currentAncient) => {
    const firstStage = createMiniDeck(ancientsData[currentAncient].firstStage),
        secondStage = createMiniDeck(ancientsData[currentAncient].secondStage),
        thirdStage = createMiniDeck(ancientsData[currentAncient].thirdStage);
    return [thirdStage, secondStage, firstStage].flat();
}

document.querySelector('.shuffle').addEventListener('click', () => {
    const currentAncient = findCurrentAncient();

    if (currentAncient) {
        deckContainer.style.backgroundImage = 'url(./assets/mythicCardBackground.png)';
        deckContainer.classList.add('active');

        deck = collectDeck(currentAncient);
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
    } else {
        deckContainer.style.backgroundImage = '';
        deckContainer.classList.remove('active');
    }
}

deckContainer.addEventListener('click', () => {
    displayDeck(deck);
})
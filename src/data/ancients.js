import ancientsCardsImages from '../constants/ancients-cards-images';

const ancientsData = [
  {
    id: 'cthulhu',
    name: 'Ктулху',
    cardFace: ancientsCardsImages.cthulhu,
    cardsCount: [
      {
        green: 0,
        yellow: 2,
        blue: 2,
      },
      {
        green: 1,
        yellow: 3,
        blue: 0,
      },
      {
        green: 3,
        yellow: 4,
        blue: 0,
      },
    ],
  },
  {
    id: 'shubNiggurath',
    name: 'Шуб-Ниггурат',
    cardFace: ancientsCardsImages.shubNiggurath,
    cardsCount: [
      {
        green: 1,
        yellow: 2,
        blue: 1,
      },
      {
        green: 3,
        yellow: 2,
        blue: 1,
      },
      {
        green: 2,
        yellow: 4,
        blue: 0,
      },
    ],
  },
  {
    id: 'iogSothoth',
    name: 'Йог-Сотот',
    cardFace: ancientsCardsImages.iogSothoth,
    cardsCount: [
      {
        green: 0,
        yellow: 2,
        blue: 1,
      },
      {
        green: 2,
        yellow: 3,
        blue: 1,
      },
      {
        green: 3,
        yellow: 4,
        blue: 0,
      },
    ],
  },
  {
    id: 'azathoth',
    name: 'Азатот',
    cardFace: ancientsCardsImages.azathoth,
    cardsCount: [
      {
        green: 1,
        yellow: 2,
        blue: 1,
      },
      {
        green: 2,
        yellow: 3,
        blue: 1,
      },
      {
        green: 2,
        yellow: 4,
        blue: 0,
      },
    ],
  },
];

export default ancientsData;

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./utils/base-component.js
class BaseComponent {
  constructor(_ref) {
    let {
      tagName = 'div',
      className,
      content,
      attributes
    } = _ref;
    this.node = document.createElement(tagName);
    if (className) {
      this.node.className = className;
    }
    if (content) {
      this.node.textContent = content;
    }
    if (attributes) {
      Object.entries(attributes).forEach(_ref2 => {
        let [key, value] = _ref2;
        return this.node.setAttribute(key, value);
      });
    }
  }
  setAttribute(attribute, value) {
    this.node.setAttribute(attribute, value);
  }
  setContent(content) {
    this.node.textContent = content;
  }
  addClass(className) {
    this.node.classList.add(className);
  }
  appendToDom() {
    for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }
    elements.forEach(el => this.node.append(el));
  }
  destroyChildren() {
    this.node.replaceChildren();
  }
  destroy() {
    this.node.remove();
  }
}
/* harmony default export */ var base_component = (BaseComponent);
;// CONCATENATED MODULE: ./assets/images/logo.webp
var logo_namespaceObject = __webpack_require__.p + "assets/9933a075baf23f3cee0e.webp";
;// CONCATENATED MODULE: ./components/header/header.js



class Header extends base_component {
  constructor() {
    super({
      tagName: 'header',
      className: 'header'
    });
    this.wrapper = new base_component({
      className: 'wrapper header__wrapper'
    });
    this.logoContainer = new base_component({
      className: 'logo-container'
    });
    this.logo = new base_component({
      tagName: 'a',
      className: 'logo'
    });
    this.logoImage = new base_component({
      tagName: 'img',
      className: 'logo__image',
      attributes: {
        alt: 'Eldritch Horror',
        src: logo_namespaceObject
      }
    });
  }
  render() {
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(this.logoContainer.node);
    this.logoContainer.appendToDom(this.logo.node);
    this.logo.appendToDom(this.logoImage.node);
  }
}
/* harmony default export */ var header = (Header);
;// CONCATENATED MODULE: ./state.js
class State {
  constructor() {
    if (State.instance) {
      return;
    }
    this.state = {
      deck: null,
      ancient: null,
      difficulty: null,
      stage: 0
    };
    State.instance = this;
  }
  set setDeck(value) {
    this.state.deck = value;
  }
  set setAncient(value) {
    this.state.ancient = value;
  }
  set setDifficulty(value) {
    this.state.difficulty = value;
  }
  set setStage(value) {
    this.state.stage = value;
  }
  get currentDeck() {
    return this.state.deck;
  }
  get currentAncient() {
    return this.state.ancient;
  }
  get currentDifficulty() {
    return this.state.difficulty;
  }
  get currentStage() {
    return this.state.stage;
  }
}
const state = new State();
/* harmony default export */ var state_0 = (state);
;// CONCATENATED MODULE: ./components/ancient-card/ancient-card.js


class AncientCard extends base_component {
  constructor(ancient, index, onAncientChange) {
    super({
      tagName: 'li',
      className: 'ancient-card'
    });
    this.ancientImage = new base_component({
      tagName: 'img',
      className: 'ancient-card__image'
    });
    this.ancient = ancient;
    this.index = index;
    this.ancientImage.setAttribute('src', this.ancient.cardFace);
    this.ancientImage.setAttribute('alt', `${this.ancient.name}`);
    this.setAttribute('data-id', `${this.index}`);
    this.appendToDom(this.ancientImage.node);
    this.node.addEventListener('click', () => {
      onAncientChange(ancient);
      this.addClass('active');
    });
  }
}
/* harmony default export */ var ancient_card = (AncientCard);
;// CONCATENATED MODULE: ./assets/images/ancients/Azathoth.jpg
var Azathoth_namespaceObject = __webpack_require__.p + "assets/411c8b81645da4232f18.jpg";
;// CONCATENATED MODULE: ./assets/images/ancients/Cthulthu.jpg
var Cthulthu_namespaceObject = __webpack_require__.p + "assets/fa90fca402c4a76b974e.jpg";
;// CONCATENATED MODULE: ./assets/images/ancients/IogSothoth.jpg
var IogSothoth_namespaceObject = __webpack_require__.p + "assets/7605361b53e306ecb911.jpg";
;// CONCATENATED MODULE: ./assets/images/ancients/ShubNiggurath.jpg
var ShubNiggurath_namespaceObject = __webpack_require__.p + "assets/0b22ba0de991236aa3da.jpg";
;// CONCATENATED MODULE: ./constants/ancients-cards-images.js




const ancientsCardsImages = {
  azathoth: Azathoth_namespaceObject,
  cthulhu: Cthulthu_namespaceObject,
  iogSothoth: IogSothoth_namespaceObject,
  shubNiggurath: ShubNiggurath_namespaceObject
};
/* harmony default export */ var ancients_cards_images = (ancientsCardsImages);
;// CONCATENATED MODULE: ./data/ancients.js

const ancientsData = [{
  id: 'cthulhu',
  name: 'Ктулху',
  cardFace: ancients_cards_images.cthulhu,
  cardsCount: [{
    green: 0,
    yellow: 2,
    blue: 2
  }, {
    green: 1,
    yellow: 3,
    blue: 0
  }, {
    green: 3,
    yellow: 4,
    blue: 0
  }]
}, {
  id: 'shubNiggurath',
  name: 'Шуб-Ниггурат',
  cardFace: ancients_cards_images.shubNiggurath,
  cardsCount: [{
    green: 1,
    yellow: 2,
    blue: 1
  }, {
    green: 3,
    yellow: 2,
    blue: 1
  }, {
    green: 2,
    yellow: 4,
    blue: 0
  }]
}, {
  id: 'iogSothoth',
  name: 'Йог-Сотот',
  cardFace: ancients_cards_images.iogSothoth,
  cardsCount: [{
    green: 0,
    yellow: 2,
    blue: 1
  }, {
    green: 2,
    yellow: 3,
    blue: 1
  }, {
    green: 3,
    yellow: 4,
    blue: 0
  }]
}, {
  id: 'azathoth',
  name: 'Азатот',
  cardFace: ancients_cards_images.azathoth,
  cardsCount: [{
    green: 1,
    yellow: 2,
    blue: 1
  }, {
    green: 2,
    yellow: 3,
    blue: 1
  }, {
    green: 2,
    yellow: 4,
    blue: 0
  }]
}];
/* harmony default export */ var ancients = (ancientsData);
;// CONCATENATED MODULE: ./components/ancients-list/ancients-list.js





class AncientsList extends base_component {
  constructor(onBackgroundChange, onAncientChange) {
    super({
      tagName: 'ul',
      className: 'ancients__list'
    });
    this.state = state_0;
    this.activeCard = null;
    this.onBackgroundChange = onBackgroundChange;
    this.onAncientChange = onAncientChange;
  }
  render() {
    ancients.forEach((ancient, index) => {
      const ancientCard = new ancient_card(ancient, index, selectedAncient => {
        this.state.setAncient = selectedAncient;
        if (this.activeCard) {
          this.activeCard.classList.remove('active');
        }
        this.activeCard = ancientCard.node;
        this.onAncientChange(selectedAncient);
      });
      this.appendToDom(ancientCard.node);
      ancientCard.node.addEventListener('transitionend', () => {
        this.onBackgroundChange();
      });
    });
  }
}
/* harmony default export */ var ancients_list = (AncientsList);
;// CONCATENATED MODULE: ./data/difficulties.js
const difficulties = [{
  id: 'veryEasy',
  name: 'Очень легкий'
}, {
  id: 'easy',
  name: 'Легкий'
}, {
  id: 'normal',
  name: 'Нормальный'
}, {
  id: 'hard',
  name: 'Сложный'
}, {
  id: 'nightmare',
  name: 'Очень сложный'
}];
/* harmony default export */ var data_difficulties = (difficulties);
;// CONCATENATED MODULE: ./components/difficulty-levels/difficulty-levels.js




class DifficultyLevels extends base_component {
  constructor() {
    super({
      className: 'difficulties__levels'
    });
    this.activeDifficulty = null;
    this.state = state_0;
  }
  render() {
    Object.values(data_difficulties).forEach((difficulty, index) => {
      const buttonDifficulty = new base_component({
        tagName: 'button',
        className: 'button button_difficulty'
      });
      const setActiveDifficulty = () => {
        if (this.activeDifficulty) {
          this.activeDifficulty.classList.remove('active');
        }
        this.activeDifficulty = buttonDifficulty.node;
        buttonDifficulty.addClass('active');
        this.state.setDifficulty = data_difficulties[index];
      };
      buttonDifficulty.node.addEventListener('click', setActiveDifficulty);
      buttonDifficulty.setContent(`${difficulty.name}`);
      this.appendToDom(buttonDifficulty.node);
    });
  }
}
/* harmony default export */ var difficulty_levels = (DifficultyLevels);
;// CONCATENATED MODULE: ./components/settings/settings.js




class Settings extends base_component {
  constructor(onApplyClick, onBackgroundChange) {
    super({
      className: 'main__settings settings'
    });
    this.wrapper = new base_component({
      className: 'settings__wrapper'
    });
    this.ancients = new base_component({
      className: 'settings__content ancients'
    });
    this.ancientsContent = new base_component({
      className: 'ancients__content'
    });
    this.difficulties = new base_component({
      className: 'settings__content difficulties'
    });
    this.difficultiesContent = new base_component({
      className: 'difficulties__content'
    });
    this.buttonContainer = new base_component({
      className: 'settings__button'
    });
    this.button = new base_component({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Замешать'
    });
    this.selectedAncient = new base_component({
      tagName: 'span',
      className: 'ancients__text',
      content: 'Не выбран'
    });
    this.onApplyClick = onApplyClick;
    this.button.node.addEventListener('click', () => {
      this.onApplyClick();
    });
    this.ancientsList = new ancients_list(onBackgroundChange, this.setSelectedAncient.bind(this));
    this.difficultyLevels = new difficulty_levels();
  }
  render() {
    this.renderAncientsSettings();
    this.renderDifficultiesSettings();
  }
  renderAncientsSettings() {
    const title = new base_component({
      tagName: 'h3',
      className: 'title'
    });
    title.setContent('Древний');
    this.ancientsList.render();
    this.ancientsContent.appendToDom(this.selectedAncient.node, this.ancientsList.node);
    this.ancients.appendToDom(title.node, this.ancientsContent.node);
    this.wrapper.appendToDom(this.ancients.node);
    this.appendToDom(this.wrapper.node);
  }
  renderDifficultiesSettings() {
    const title = new base_component({
      tagName: 'h3',
      className: 'title'
    });
    title.setContent('Уровень сложности');
    this.difficultyLevels.render();
    this.buttonContainer.appendToDom(this.button.node);
    this.difficultiesContent.appendToDom(this.difficultyLevels.node, this.buttonContainer.node);
    this.difficulties.appendToDom(title.node, this.difficultiesContent.node);
    this.wrapper.appendToDom(this.difficulties.node);
    this.appendToDom(this.wrapper.node);
  }
  setSelectedAncient(selectedAncient) {
    this.selectedAncient.setContent(selectedAncient.name);
  }
}
/* harmony default export */ var settings_settings = (Settings);
;// CONCATENATED MODULE: ./constants/constants.js
const stagesNumbers = ['I', 'II', 'III'];

;// CONCATENATED MODULE: ./components/tracker/tracker.js



class Tracker extends base_component {
  constructor(state) {
    super({
      className: 'game__tracker tracker'
    });
    this.content = new base_component({
      className: 'tracker__content'
    });
    this.state = state;
    this.cardsColorsCounters = [];
  }
  render() {
    const ancient = this.state.currentAncient;
    const title = new base_component({
      tagName: 'h3',
      className: 'title',
      content: 'Трекер'
    });
    this.content.appendToDom(title.node);
    this.renderStages(ancient);
    this.appendToDom(this.content.node);
  }
  renderStages(currentAncient) {
    const stages = new base_component({
      className: 'tracker__stages'
    });
    for (let i = 0; i < 3; i += 1) {
      const stageContainter = new base_component({
        className: 'stage'
      });
      const stageTitle = new base_component({
        tagName: 'span',
        className: 'stage__title',
        content: `Этап ${stagesNumbers[i]}`
      });
      const cardsCounter = new base_component({
        className: 'stage__counter counter'
      });
      const greenCardsCounter = new base_component({
        className: 'counter__item counter__item_green',
        content: `${currentAncient.cardsCount[i].green}`
      });
      const yellowCardsCounter = new base_component({
        className: 'counter__item counter__item_yellow',
        content: `${currentAncient.cardsCount[i].yellow}`
      });
      const blueCardsCounter = new base_component({
        className: 'counter__item counter__item_blue',
        content: `${currentAncient.cardsCount[i].blue}`
      });
      stages.appendToDom(stageContainter.node);
      stageContainter.appendToDom(stageTitle.node, cardsCounter.node);
      cardsCounter.appendToDom(greenCardsCounter.node, yellowCardsCounter.node, blueCardsCounter.node);
      this.cardsColorsCounters.push({
        green: greenCardsCounter.node,
        yellow: yellowCardsCounter.node,
        blue: blueCardsCounter.node
      });
      this.content.appendToDom(stages.node);
    }
  }
  update(cardInfo) {
    let stage = this.state.currentStage;
    const greenCounters = this.cardsColorsCounters.map(counter => counter.green);
    const yellowCounters = this.cardsColorsCounters.map(counter => counter.yellow);
    const blueCounters = this.cardsColorsCounters.map(counter => counter.blue);
    if (greenCounters[stage].textContent === '0' && blueCounters[stage].textContent === '0' && yellowCounters[stage].textContent === '0') {
      stage += 1;
      this.state.setStage = stage;
    }
    switch (cardInfo.color) {
      case 'green':
        greenCounters[stage].textContent -= 1;
        break;
      case 'blue':
        blueCounters[stage].textContent -= 1;
        break;
      default:
        yellowCounters[stage].textContent -= 1;
        break;
    }
  }
}
/* harmony default export */ var tracker_tracker = (Tracker);
;// CONCATENATED MODULE: ./utils/shuffle.js
const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
};
/* harmony default export */ var utils_shuffle = (shuffle);
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue1.jpg
var blue1_namespaceObject = __webpack_require__.p + "assets/161a64468b57ad904595.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue2.jpg
var blue2_namespaceObject = __webpack_require__.p + "assets/5a9056b9afd8ba7a4ed5.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue3.jpg
var blue3_namespaceObject = __webpack_require__.p + "assets/78b35f1d0a32fc614c24.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue4.jpg
var blue4_namespaceObject = __webpack_require__.p + "assets/c81bf6db71e6eb2e4983.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue5.jpg
var blue5_namespaceObject = __webpack_require__.p + "assets/6cc37c3e3ba5efab2328.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue6.jpg
var blue6_namespaceObject = __webpack_require__.p + "assets/acce1db3e2c249c57b6d.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue7.jpg
var blue7_namespaceObject = __webpack_require__.p + "assets/cf03f3e92f55a616f750.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue8.jpg
var blue8_namespaceObject = __webpack_require__.p + "assets/3c6998ef8f819e14b541.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue9.jpg
var blue9_namespaceObject = __webpack_require__.p + "assets/ff1ce1d0b6fa5e6f3175.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue10.jpg
var blue10_namespaceObject = __webpack_require__.p + "assets/71b25e3168a9d2e3b2c3.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue11.jpg
var blue11_namespaceObject = __webpack_require__.p + "assets/e60302c9a031926bcb13.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/blue/blue12.jpg
var blue12_namespaceObject = __webpack_require__.p + "assets/986f0e2dbef4cebb368b.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green1.jpg
var green1_namespaceObject = __webpack_require__.p + "assets/e094a7b142da46e24526.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green2.jpg
var green2_namespaceObject = __webpack_require__.p + "assets/7cbd6ac749cbe0a799cd.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green3.jpg
var green3_namespaceObject = __webpack_require__.p + "assets/25264a4d5b4aa7916ede.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green4.jpg
var green4_namespaceObject = __webpack_require__.p + "assets/67867c14202cae51247a.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green5.jpg
var green5_namespaceObject = __webpack_require__.p + "assets/ff78666028c0fd8d2703.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green6.jpg
var green6_namespaceObject = __webpack_require__.p + "assets/1dbc0a58974d7ec25c9f.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green7.jpg
var green7_namespaceObject = __webpack_require__.p + "assets/8bb7ae258f5ce8625f02.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green8.jpg
var green8_namespaceObject = __webpack_require__.p + "assets/9a4751515f760dabba4c.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green9.jpg
var green9_namespaceObject = __webpack_require__.p + "assets/13d9ffd1c29c43cd8e8a.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green10.jpg
var green10_namespaceObject = __webpack_require__.p + "assets/d472f6d063cc29f091fb.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green11.jpg
var green11_namespaceObject = __webpack_require__.p + "assets/98515a95c2e58e4ee985.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green12.jpg
var green12_namespaceObject = __webpack_require__.p + "assets/5250eb08352a5a283ad7.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green13.jpg
var green13_namespaceObject = __webpack_require__.p + "assets/4f2fb592e9ee082f39e8.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green14.jpg
var green14_namespaceObject = __webpack_require__.p + "assets/86ae57fa8b5de97f34d8.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green15.jpg
var green15_namespaceObject = __webpack_require__.p + "assets/5483447f070618b6a121.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green16.jpg
var green16_namespaceObject = __webpack_require__.p + "assets/095b234e1dcd085379aa.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green17.jpg
var green17_namespaceObject = __webpack_require__.p + "assets/7bce2de5806b9fcda7df.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/green/green18.jpg
var green18_namespaceObject = __webpack_require__.p + "assets/7c60c732447540b7f86c.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow1.jpg
var yellow1_namespaceObject = __webpack_require__.p + "assets/e7a741254488a7c81c61.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow2.jpg
var yellow2_namespaceObject = __webpack_require__.p + "assets/8567dc0cab69dc5d1f7a.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow3.jpg
var yellow3_namespaceObject = __webpack_require__.p + "assets/a2025284532c106e9629.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow4.jpg
var yellow4_namespaceObject = __webpack_require__.p + "assets/72d1eab2e5bfe8e4c827.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow5.jpg
var yellow5_namespaceObject = __webpack_require__.p + "assets/346098fc9f6a264dd686.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow6.jpg
var yellow6_namespaceObject = __webpack_require__.p + "assets/c35980a712f29e3b8013.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow7.jpg
var yellow7_namespaceObject = __webpack_require__.p + "assets/997bd633a502fe8a66db.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow8.jpg
var yellow8_namespaceObject = __webpack_require__.p + "assets/a8c0db045f7d21088be5.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow9.jpg
var yellow9_namespaceObject = __webpack_require__.p + "assets/84ac27b8a25adb7891b9.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow10.jpg
var yellow10_namespaceObject = __webpack_require__.p + "assets/6a883e9ecdb320dc179a.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow11.jpg
var yellow11_namespaceObject = __webpack_require__.p + "assets/f88f79369177a652b0a7.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow12.jpg
var yellow12_namespaceObject = __webpack_require__.p + "assets/18f760e6f8007a3d8e21.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow13.jpg
var yellow13_namespaceObject = __webpack_require__.p + "assets/87f6013f80538c022bd6.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow14.jpg
var yellow14_namespaceObject = __webpack_require__.p + "assets/9622dbde5115898f871a.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow15.jpg
var yellow15_namespaceObject = __webpack_require__.p + "assets/dc4e1f78ffa74dda9fdc.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow16.jpg
var yellow16_namespaceObject = __webpack_require__.p + "assets/af34b4e3237653d3aeca.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow17.jpg
var yellow17_namespaceObject = __webpack_require__.p + "assets/3d5432a245301490661e.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow18.jpg
var yellow18_namespaceObject = __webpack_require__.p + "assets/26ee068544911ea977ff.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow19.jpg
var yellow19_namespaceObject = __webpack_require__.p + "assets/487d6a729f4b86a777c0.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow20.jpg
var yellow20_namespaceObject = __webpack_require__.p + "assets/6842fd93a4480f7aa61f.jpg";
;// CONCATENATED MODULE: ./assets/images/mythic-cards/yellow/yellow21.jpg
var yellow21_namespaceObject = __webpack_require__.p + "assets/cb57af0c125ac7ead83c.jpg";
;// CONCATENATED MODULE: ./constants/cards-assets.js



















































const cardsImages = {
  blue: {
    blue1: blue1_namespaceObject,
    blue2: blue2_namespaceObject,
    blue3: blue3_namespaceObject,
    blue4: blue4_namespaceObject,
    blue5: blue5_namespaceObject,
    blue6: blue6_namespaceObject,
    blue7: blue7_namespaceObject,
    blue8: blue8_namespaceObject,
    blue9: blue9_namespaceObject,
    blue10: blue10_namespaceObject,
    blue11: blue11_namespaceObject,
    blue12: blue12_namespaceObject
  },
  green: {
    green1: green1_namespaceObject,
    green2: green2_namespaceObject,
    green3: green3_namespaceObject,
    green4: green4_namespaceObject,
    green5: green5_namespaceObject,
    green6: green6_namespaceObject,
    green7: green7_namespaceObject,
    green8: green8_namespaceObject,
    green9: green9_namespaceObject,
    green10: green10_namespaceObject,
    green11: green11_namespaceObject,
    green12: green12_namespaceObject,
    green13: green13_namespaceObject,
    green14: green14_namespaceObject,
    green15: green15_namespaceObject,
    green16: green16_namespaceObject,
    green17: green17_namespaceObject,
    green18: green18_namespaceObject
  },
  yellow: {
    yellow1: yellow1_namespaceObject,
    yellow2: yellow2_namespaceObject,
    yellow3: yellow3_namespaceObject,
    yellow4: yellow4_namespaceObject,
    yellow5: yellow5_namespaceObject,
    yellow6: yellow6_namespaceObject,
    yellow7: yellow7_namespaceObject,
    yellow8: yellow8_namespaceObject,
    yellow9: yellow9_namespaceObject,
    yellow10: yellow10_namespaceObject,
    yellow11: yellow11_namespaceObject,
    yellow12: yellow12_namespaceObject,
    yellow13: yellow13_namespaceObject,
    yellow14: yellow14_namespaceObject,
    yellow15: yellow15_namespaceObject,
    yellow16: yellow16_namespaceObject,
    yellow17: yellow17_namespaceObject,
    yellow18: yellow18_namespaceObject,
    yellow19: yellow19_namespaceObject,
    yellow20: yellow20_namespaceObject,
    yellow21: yellow21_namespaceObject
  }
};
/* harmony default export */ var cards_assets = (cardsImages);
;// CONCATENATED MODULE: ./data/mythic-cards.js

const cardsData = {
  green: [{
    id: 'green1',
    cardFace: cards_assets.green.green1,
    difficulty: 'easy',
    color: 'green'
  }, {
    id: 'green2',
    cardFace: cards_assets.green.green2,
    difficulty: 'hard',
    color: 'green'
  }, {
    id: 'green3',
    cardFace: cards_assets.green.green3,
    difficulty: 'hard',
    color: 'green'
  }, {
    id: 'green4',
    cardFace: cards_assets.green.green4,
    difficulty: 'hard',
    color: 'green'
  }, {
    id: 'green5',
    cardFace: cards_assets.green.green5,
    difficulty: 'hard',
    color: 'green'
  }, {
    id: 'green6',
    cardFace: cards_assets.green.green6,
    difficulty: 'hard',
    color: 'green'
  }, {
    id: 'green7',
    cardFace: cards_assets.green.green7,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green8',
    cardFace: cards_assets.green.green8,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green9',
    cardFace: cards_assets.green.green9,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green10',
    cardFace: cards_assets.green.green10,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green11',
    cardFace: cards_assets.green.green11,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green12',
    cardFace: cards_assets.green.green12,
    difficulty: 'easy',
    color: 'green'
  }, {
    id: 'green13',
    cardFace: cards_assets.green.green13,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green14',
    cardFace: cards_assets.green.green14,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green15',
    cardFace: cards_assets.green.green15,
    difficulty: 'normal',
    color: 'green'
  }, {
    id: 'green16',
    cardFace: cards_assets.green.green16,
    difficulty: 'easy',
    color: 'green'
  }, {
    id: 'green17',
    cardFace: cards_assets.green.green17,
    difficulty: 'easy',
    color: 'green'
  }, {
    id: 'green18',
    cardFace: cards_assets.green.green18,
    difficulty: 'easy',
    color: 'green'
  }],
  yellow: [{
    id: 'yellow1',
    cardFace: cards_assets.yellow.yellow1,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow2',
    cardFace: cards_assets.yellow.yellow2,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow3',
    cardFace: cards_assets.yellow.yellow3,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow4',
    cardFace: cards_assets.yellow.yellow4,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow5',
    cardFace: cards_assets.yellow.yellow5,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow6',
    cardFace: cards_assets.yellow.yellow6,
    difficulty: 'hard',
    color: 'yellow'
  }, {
    id: 'yellow7',
    cardFace: cards_assets.yellow.yellow7,
    difficulty: 'hard',
    color: 'yellow'
  }, {
    id: 'yellow8',
    cardFace: cards_assets.yellow.yellow8,
    difficulty: 'hard',
    color: 'yellow'
  }, {
    id: 'yellow9',
    cardFace: cards_assets.yellow.yellow9,
    difficulty: 'hard',
    color: 'yellow'
  }, {
    id: 'yellow10',
    cardFace: cards_assets.yellow.yellow10,
    difficulty: 'hard',
    color: 'yellow'
  }, {
    id: 'yellow11',
    cardFace: cards_assets.yellow.yellow11,
    difficulty: 'easy',
    color: 'yellow'
  }, {
    id: 'yellow12',
    cardFace: cards_assets.yellow.yellow12,
    difficulty: 'easy',
    color: 'yellow'
  }, {
    id: 'yellow13',
    cardFace: cards_assets.yellow.yellow13,
    difficulty: 'easy',
    color: 'yellow'
  }, {
    id: 'yellow14',
    cardFace: cards_assets.yellow.yellow14,
    difficulty: 'easy',
    color: 'yellow'
  }, {
    id: 'yellow15',
    cardFace: cards_assets.yellow.yellow15,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow16',
    cardFace: cards_assets.yellow.yellow16,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow17',
    cardFace: cards_assets.yellow.yellow17,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow18',
    cardFace: cards_assets.yellow.yellow18,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow19',
    cardFace: cards_assets.yellow.yellow19,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow20',
    cardFace: cards_assets.yellow.yellow20,
    difficulty: 'normal',
    color: 'yellow'
  }, {
    id: 'yellow21',
    cardFace: cards_assets.yellow.yellow21,
    difficulty: 'easy',
    color: 'yellow'
  }],
  blue: [{
    id: 'blue1',
    cardFace: cards_assets.blue.blue1,
    difficulty: 'hard',
    color: 'blue'
  }, {
    id: 'blue2',
    cardFace: cards_assets.blue.blue2,
    difficulty: 'hard',
    color: 'blue'
  }, {
    id: 'blue3',
    cardFace: cards_assets.blue.blue3,
    difficulty: 'easy',
    color: 'blue'
  }, {
    id: 'blue4',
    cardFace: cards_assets.blue.blue4,
    difficulty: 'easy',
    color: 'blue'
  }, {
    id: 'blue5',
    cardFace: cards_assets.blue.blue5,
    difficulty: 'easy',
    color: 'blue'
  }, {
    id: 'blue6',
    cardFace: cards_assets.blue.blue6,
    difficulty: 'hard',
    color: 'blue'
  }, {
    id: 'blue7',
    cardFace: cards_assets.blue.blue7,
    difficulty: 'normal',
    color: 'blue'
  }, {
    id: 'blue8',
    cardFace: cards_assets.blue.blue8,
    difficulty: 'hard',
    color: 'blue'
  }, {
    id: 'blue9',
    cardFace: cards_assets.blue.blue9,
    difficulty: 'normal',
    color: 'blue'
  }, {
    id: 'blue10',
    cardFace: cards_assets.blue.blue10,
    difficulty: 'easy',
    color: 'blue'
  }, {
    id: 'blue11',
    cardFace: cards_assets.blue.blue11,
    difficulty: 'normal',
    color: 'blue'
  }, {
    id: 'blue12',
    cardFace: cards_assets.blue.blue12,
    difficulty: 'normal',
    color: 'blue'
  }]
};
/* harmony default export */ var mythic_cards = (cardsData);
;// CONCATENATED MODULE: ./assets/images/mythic-cards/back.jpg
var back_namespaceObject = __webpack_require__.p + "assets/0b98ceed3b4ad2faf399.jpg";
;// CONCATENATED MODULE: ./components/card/card.js



class Card extends base_component {
  static prevCard = null;
  constructor(cardInfo, onCardClick) {
    super({
      className: 'deck__card card'
    });
    this.cardFaceFront = new base_component({
      tagName: 'img',
      className: 'card__face card__face_front'
    });
    this.cardFaceBack = new base_component({
      tagName: 'img',
      className: 'card__face card__face_back'
    });
    this.cardInfo = cardInfo;
    this.onCardClick = onCardClick;
    this.cardFaceFront.node.src = back_namespaceObject;
    this.cardFaceBack.node.src = cardInfo.cardFace;
    this.isAnimating = false;
    this.addListener();
    Card.prevCard = null;
  }
  render() {
    this.appendToDom(this.cardFaceBack.node, this.cardFaceFront.node);
  }
  addListener() {
    this.clickHandler = () => {
      if (Card.prevCard && Card.prevCard.isAnimating) {
        return;
      }
      this.addClass('is-flipped');
      this.node.addEventListener('transitionend', this.handleTransitionEnd);
      Card.prevCard = this;
      this.isAnimating = true;
    };
    this.handleTransitionEnd = () => {
      this.onCardClick(this.cardInfo);
      this.node.removeEventListener('transitionend', this.handleTransitionEnd);
      this.node.removeEventListener('click', this.clickHandler);
      this.isAnimating = false;
    };
    this.node.addEventListener('click', this.clickHandler);
  }
}
/* harmony default export */ var card_card = (Card);
;// CONCATENATED MODULE: ./components/deck/deck.js






class Deck extends base_component {
  constructor(onCardClick) {
    super({
      className: 'game__deck deck'
    });
    this.state = state_0;
    this.onCardClick = onCardClick;
  }
  render() {
    const deck = this.state.currentDeck;
    for (let i = 0; i < deck.length; i += 1) {
      const card = new card_card(deck[i], this.onCardClick);
      card.setAttribute('data-id', i);
      card.render();
      this.appendToDom(card.node);
    }
  }
  filterCards(difficulty, cards) {
    const filteredCardsByColor = Object.keys(cards).map(color => {
      const shuffleCards = utils_shuffle(cards[color]);
      const filteredCardsByDifficulty = this.constructor.filterCardsByDifficulty(difficulty, shuffleCards);
      return {
        [color]: filteredCardsByDifficulty
      };
    });
    return Object.assign({}, ...filteredCardsByColor);
  }
  static filterCardsByDifficulty(difficulty, cards) {
    let filteredCards;
    switch (difficulty) {
      case 'veryEasy':
        filteredCards = cards.filter(card => card.difficulty !== 'hard').sort((a, b) => a.difficulty > b.difficulty ? 1 : -1);
        break;
      case 'nightmare':
        filteredCards = cards.filter(card => card.difficulty !== 'easy').sort((a, b) => a.difficulty > b.difficulty ? 1 : -1);
        break;
      case 'easy':
        filteredCards = cards.filter(card => card.difficulty !== 'hard');
        break;
      case 'hard':
        filteredCards = cards.filter(card => card.difficulty !== 'easy');
        break;
      default:
        filteredCards = cards;
        break;
    }
    return filteredCards;
  }
  static getSumOfCardsForStagesByColors(ancient) {
    const sumOfCards = ancient.cardsCount.reduce((acc, current) => {
      return {
        green: acc.green + current.green,
        yellow: acc.yellow + current.yellow,
        blue: acc.blue + current.blue
      };
    }, {
      green: 0,
      yellow: 0,
      blue: 0
    });
    return sumOfCards;
  }
  sliceCardSet(cards) {
    const ancient = this.state.currentAncient;
    const stagesColorsSum = this.constructor.getSumOfCardsForStagesByColors(ancient);
    Object.keys(cards).forEach(color => {
      cards[color].splice(stagesColorsSum[color]);
      utils_shuffle(cards[color]);
    });
    return cards;
  }
  createMiniDeck(number, cards) {
    const miniDeck = [];
    const cardSet = this.sliceCardSet(cards);
    Object.keys(cardSet).forEach(color => {
      cardSet[color].slice(0, number[color]).forEach(card => miniDeck.push(card));
    });
    Object.keys(cardSet).forEach(color => cardSet[color].splice(0, number[color]));
    return utils_shuffle(miniDeck);
  }
  constructDeck(ancient, difficulty) {
    const newCards = JSON.parse(JSON.stringify(mythic_cards));
    const filteredCards = this.filterCards(difficulty, newCards);
    const fullDeck = [];
    for (let i = 0; i < 3; i += 1) {
      const numberOfCardsForStage = ancient.cardsCount[i];
      fullDeck.push(this.createMiniDeck(numberOfCardsForStage, filteredCards));
    }
    return fullDeck;
  }
}
/* harmony default export */ var deck_deck = (Deck);
;// CONCATENATED MODULE: ./assets/images/backgrounds/Azathoth.webp
var backgrounds_Azathoth_namespaceObject = __webpack_require__.p + "assets/f8f90854343c6aa4d508.webp";
;// CONCATENATED MODULE: ./assets/images/backgrounds/Cthulhu.webp
var Cthulhu_namespaceObject = __webpack_require__.p + "assets/a0c63cd87e12c07e5fab.webp";
;// CONCATENATED MODULE: ./assets/images/backgrounds/IogSothoth.webp
var backgrounds_IogSothoth_namespaceObject = __webpack_require__.p + "assets/9b7acf8b8533f6bb0525.webp";
;// CONCATENATED MODULE: ./assets/images/backgrounds/ShubNiggurath.webp
var backgrounds_ShubNiggurath_namespaceObject = __webpack_require__.p + "assets/6031b506b5ad62edcac5.webp";
;// CONCATENATED MODULE: ./constants/backgrounds.js




const backgrounds = {
  azathoth: backgrounds_Azathoth_namespaceObject,
  cthulhu: Cthulhu_namespaceObject,
  iogSothoth: backgrounds_IogSothoth_namespaceObject,
  shubNiggurath: backgrounds_ShubNiggurath_namespaceObject
};
/* harmony default export */ var constants_backgrounds = (backgrounds);
;// CONCATENATED MODULE: ./assets/images/backgrounds/Home.webp
var Home_namespaceObject = __webpack_require__.p + "assets/46643eac22956748e147.webp";
;// CONCATENATED MODULE: ./components/main/main.js








class Main extends base_component {
  static state = state_0;
  constructor() {
    super({
      tagName: 'main',
      className: 'main'
    });
    this.wrapper = new base_component({
      className: 'wrapper main__wrapper'
    });
    this.game = new base_component({
      className: 'game'
    });
    this.buttonContainer = new base_component({
      className: 'current-settings__button'
    });
    this.gameContainer = new base_component({
      className: 'game__container'
    });
    this.button = new base_component({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Новая игра'
    });
    this.button.node.addEventListener('click', () => {
      this.wrapper.destroyChildren();
      this.game.destroyChildren();
      this.state.setAncient = null;
      this.state.setDifficulty = null;
      this.state.setDeck = null;
      this.state.setStage = 0;
      this.render();
    });
    this.state = state_0;
  }
  render() {
    const tracker = new tracker_tracker(this.state);
    const settings = new settings_settings(() => {
      const ancient = this.state.currentAncient;
      const difficulty = this.state.currentDifficulty;
      if (difficulty && ancient) {
        this.wrapper.destroyChildren();
        this.game.destroyChildren();
        this.gameContainer.destroyChildren();
        this.renderTracker(tracker);
        this.renderCurrentSettings();
        this.renderDeck(ancient, difficulty, tracker);
      }
    }, () => {
      this.constructor.setBackground();
    });
    settings.render();
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(settings.node);
    this.constructor.setBackground();
  }
  renderTracker(tracker) {
    tracker.render();
    this.gameContainer.appendToDom(tracker.node);
    this.game.appendToDom(this.gameContainer.node);
    this.wrapper.appendToDom(this.game.node);
  }
  renderDeck(currentAncient, currentDifficulty, tracker) {
    const deck = new deck_deck(card => {
      tracker.update(card);
    });
    const miniDecks = deck.constructDeck(currentAncient, currentDifficulty.id);
    const flatMiniDecks = miniDecks.flat().reverse();
    this.state.setDeck = flatMiniDecks;
    deck.render();
    this.game.appendToDom(deck.node);
  }
  renderCurrentSettings() {
    const currentSettings = new base_component({
      className: 'game__current-settings current-settings'
    });
    const currentSettingsWrapper = new base_component({
      className: 'current-settings__wrapper'
    });
    const currentAncient = new base_component({
      tagName: 'span',
      className: 'current-settings__ancient',
      content: `Древний: ${this.state.currentAncient.name}`
    });
    const currentDifficulty = new base_component({
      tagName: 'span',
      className: 'current-settings__difficulty',
      content: `Уровень сложности: ${this.state.currentDifficulty.name}`
    });
    const currentSettingsContent = new base_component({
      className: 'current-settings__content'
    });
    this.buttonContainer.appendToDom(this.button.node);
    currentSettingsContent.appendToDom(currentAncient.node, currentDifficulty.node);
    currentSettingsWrapper.appendToDom(currentSettingsContent.node, this.buttonContainer.node);
    currentSettings.appendToDom(currentSettingsWrapper.node);
    this.gameContainer.appendToDom(currentSettings.node);
  }
  static setBackground() {
    const ancient = this.state.currentAncient;
    if (ancient) {
      const img = new Image();
      img.src = constants_backgrounds[ancient.id];
      img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
      };
    } else {
      document.body.style.backgroundImage = `url(${Home_namespaceObject})`;
    }
  }
}
/* harmony default export */ var main = (Main);
;// CONCATENATED MODULE: ./components/footer/footer.js


class Footer extends base_component {
  constructor() {
    super({
      tagName: 'footer',
      className: 'footer'
    });
    this.wrapper = new base_component({
      className: 'wrapper footer__wrapper'
    });
    this.copyright = new base_component({
      className: 'footer__copyright copyright'
    });
    this.linkGithub = new base_component({
      tagName: 'a',
      className: 'link link_github',
      attributes: {
        target: '_blank',
        href: 'https://github.com/4k1r1n'
      }
    });
    this.year = new base_component({
      tagName: 'span',
      className: 'copyright__year',
      content: '2022'
    });
    this.linkRs = new base_component({
      tagName: 'a',
      className: 'link link_rs',
      attributes: {
        target: '_blank',
        href: 'https://rs.school/js/'
      }
    });
  }
  render() {
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(this.copyright.node);
    this.copyright.appendToDom(this.linkGithub.node, this.year.node, this.linkRs.node);
  }
}
/* harmony default export */ var footer = (Footer);
;// CONCATENATED MODULE: ./app.js







class App {
  constructor(root) {
    this.root = root;
    this.header = new header();
    this.footer = new footer();
    this.main = new main();
  }
  start() {
    this.header.render();
    this.main.render();
    this.footer.render();
    this.root.append(this.header.node, this.main.node, this.footer.node);
  }
}
const app = new App(document.body);
app.start();
/******/ })()
;
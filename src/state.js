class State {
  constructor() {
    if (State.instance) {
      return;
    }
    this.state = {
      deck: null,
      ancient: null,
      difficulty: null,
      stage: 0,
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

export default state;

class ModelLinguist {
  constructor(learning, settings, statistics, words) {  
    this.learning = learning;
    this.statistics = statistics;
    this.settings = settings;
    this.words = words;
    this.shuffleArray = [];
    this.repeatWords = [];
  }
}

export default ModelLinguist;

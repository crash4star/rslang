import Utils from './Utils';

class Words {
  constructor(words) {
    this.words = words;
    this.numOfPages = 30;
    this.wordsInRound = 10;
    this.exampleSentenceMaxLenght = 10;
    this.urls = {
      wordsApi: 'https://afternoon-falls-25894.herokuapp.com/words?',
    };
  }

  async getWordsSet(group, page) {
    let gameWords = [];
    for (let pageNum = 0; pageNum < this.numOfPages; pageNum += 1) {
      if (gameWords.length < 10) {
        const wordSet = await this.words.getWords(group, pageNum);
        wordSet.forEach((word) => {
          if (word.page === page && gameWords.length < this.wordsInRound
            && word.wordsPerExampleSentence <= this.exampleSentenceMaxLenght) {
            gameWords.push(word);
          }
        });
      } else {
        break;
      }
    }
    const preparedGameWords = Utils.prepareDataForGame(gameWords);
    return preparedGameWords;
  }

  async getUserWordSet() {
    const maxNumOfWords = 10;
    const userWords = await this.words.getUserWords();
    const sortedWords = Utils.sortArrayOfObjects(userWords);
    const setOfWords = [];
    sortedWords.forEach((element, index) => {
      if (setOfWords.length < maxNumOfWords || index < sortedWords.length) {
        if (element.optional.interval > 0) {
          setOfWords.push(element);
        }
      }
    });
    console.log(setOfWords);
    return setOfWords;
  }
}

export default Words;

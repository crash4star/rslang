import Api from './Api';
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
    console.log('GAMEWORDS', gameWords);
    const preparedGameWords = Utils.prepareDataForGame(gameWords);
    console.log('modifiedData: ', preparedGameWords);
    return preparedGameWords;
  }
}

export default Words;

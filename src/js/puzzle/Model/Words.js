import Api from './Api';
import Utils from './Utils';

class Words {
  constructor() {
    this.urls = {
      wordsApi: 'https://afternoon-falls-25894.herokuapp.com/words?',
    };
  }

  async getWordsSet(group, page) {
    const fromZerroCount = 1;
    const wordGroup = group - fromZerroCount;
    const wordPage = page - fromZerroCount;
    const wordsPerExample = 10;
    const wordsPerPage = 10;
    const data = await Api.getDataRequest(`${this.urls.wordsApi}group=${wordGroup}&page=${wordPage}&wordsPerExampleSentenceLTE=${wordsPerExample}&wordsPerPage=${wordsPerPage}`);
    const modifiedData = Utils.prepareDataForGame(data);
    console.log('modifiedData: ', modifiedData);
    return modifiedData;
  }
}

export default Words;

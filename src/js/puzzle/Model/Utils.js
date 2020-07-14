class Utils {
  static prepareDataForGame(data) {
    const result = data;
    if (Object.keys(data).length) {
      Object.keys(data).forEach((element) => {
        result[element].textExample = result[element].textExample.replace(/<\/b>|<b>|,|\./g, '');
        result[element].answerPhrase = result[element].textExample.split(' ');
        const phrase = Array.from(result[element].answerPhrase);
        result[element].gamePhrase = Utils.shuffleWordsInPhrase(phrase);
        console.log('result: ', result);
      });
      return result;
    }
    return 'error';
  }

  static shuffleWordsInPhrase(array) {
    const input = array;

    for (let i = input.length - 1; i >= 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
  }
}

export default Utils;

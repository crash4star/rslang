class Utils {
  static prepareDataForGame(data) {
    const result = data;
    if (Object.keys(data).length) {
      Object.keys(data).forEach((element) => {
        result[element].textExample = result[element].textExample.replace(/<\/b>|<b>|,|\./g, '');
        result[element].answerPhrase = result[element].textExample.split(' ');
      });
      return result;
    }
    return 'error';
  }
}

export default Utils;

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

  static sortArrayOfObjects(array) {
    array.sort((first, second) => {
      const firstRating = first.optional.interval;
      const secondRating = second.optional.interval;
      if (firstRating < secondRating) return -1;
      if (firstRating === secondRating) return 0;
      if (firstRating > secondRating) return 1;
    });
    return array;
  }
}

export default Utils;

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
      let result = 0;
      const firstRating = first.optional.interval;
      const secondRating = second.optional.interval;
      if (firstRating < secondRating) result = -1;
      if (firstRating === secondRating) result = 0;
      if (firstRating > secondRating) result = 1;
      return result;
    });
    return array;
  }
}

export default Utils;

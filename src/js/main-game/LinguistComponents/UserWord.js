class UserWord {
  constructor(wordObj, isStudy) {
    this.isStudy = isStudy;
    this.body = wordObj;
    this.id = this.getId(this.body);
    this.difficulty = this.getDifficulty(this.body);
    this.total = this.getTotal(this.body);
    this.error = this.getError(this.body);
    this.currentError = 0;
    this.deleted = this.getDeleted(this.body);
    this.isForgotten = this.getForgotten(this.body);
    this.isKnown = this.getKnown(this.body);
    this.important = this.getImportant(this.body);
    this.date = this.getDate(this.body);
    this.tries = this.getTries(this.body);
    this.special = this.getSpecial(this.body);
    this.isLearned = this.getLearned(this.body);
  }

  getUserWord() {
    const userWord = {
      "difficulty": this.difficulty,
      "optional": {}
    };
    if (this.isNew(this.body)) {
      userWord.optional = {...this.body};
      delete userWord.optional.id;
    } else {
      userWord.optional = Object.assign({}, this.body.optional);
    }
    userWord.optional.rating = this.setRating();
    userWord.optional.total = this.total;
    userWord.optional.error = this.error + this.currentError;
    userWord.optional.currentError = this.currentError;
    userWord.optional.deleted = this.deleted;
    userWord.optional.date = this.date;
    userWord.optional.tries = this.tries;
    userWord.optional.special = this.special;
    userWord.optional.isLearned = this.setLearned();
    userWord.optional.isKnown = this.isKnown;
    userWord.optional.important = this.important;
    userWord.optional.isForgotten = this.isForgotten;
    return userWord;
  }

  setLearned() {
    if ((this.currentError !== 0 || this.isKnown === false) && this.isLearned === true) {
      this.isForgotten = true;
      return false;
    }
    if ((this.currentError === 0 || this.isKnown === true) && this.isKnown !== false) {
      if (this.isForgotten === false && this.isLearned === true) {
        return 'again';
      } 
      if (this.isForgotten === false && this.isLearned === false) {
        return true;
      }
      return 'again';  
    }
    return false;
  }

  getForgotten(obj) {
    if (this.isNew(obj)) {
      return false;
    } 
    return obj.optional.isForgotten;
  }

  getLearned(obj) {
    if (this.isNew(obj)) {
      return false;
    } 
    return obj.optional.isLearned;
  }

  getLearnedAgain(obj) {
    if (this.isNew(obj)) {
      return false;
    } 
    return obj.optional.learnedAgain;
  }

  setRating() {
    if (this.setLearned() !== false) {
      return 5;
    } 
     const anki = this.ratingAnki(this.difficulty);
     const known = this.ratingKnown(this.isKnown);
     if (anki) {
       return anki;
     }
     if (known) {
      return known;
    }
    return this.ratingError(this.error, this.currentError, this.tries, this.total); 
  }

  ratingKnown(isKnown) {
    if (isKnown === false) {
      return 1;
    }
    if (isKnown === true) {
      return 5;
    }
    return null;
  }

  ratingAnki(difficulty) {
    switch (difficulty) {
      case 'easy': return 4; 
      case 'good' : return 3;
      case 'hard' : return 2; 
      case 'again' : return 1; 
      default: return null;
    }
  }

  ratingError(error, currentError, tries, total) {
    const errors = ((error + currentError) * 0.5 * tries) / total;
    switch (true) {
      case errors <= 1: return 4; 
      case errors > 1 && errors <= 2: return 3; 
      case errors > 2 && errors <= 4: return 2; 
      default: return 1;
    }
  }

  isNew(obj) {
    return !obj.hasOwnProperty('wordId');
  }

  getId(obj) {
    if (this.isNew(obj)) {
      return obj.id;
    } 
    return obj.wordId;
  }

  getTotal(obj) {
    if (this.isStudy) {
      if (this.isNew(obj)) {
        return 1;
      } 
      return obj.optional.total + 1;
    } else {
      if (this.isNew(obj)) {
        return 0;
      } 
      return obj.optional.total;
    }
  }

  getDifficulty(obj) {
    if (this.isStudy) {
      return 'none';
    } else {
      return obj.difficulty;
    }
  }

  increaseTries() {
    this.tries += 1;
  }

  getError(obj) {
    if (this.isNew(obj)) {
      return 0;
    } 
    return obj.optional.error;
  }

  getDeleted(obj) {
    if (this.isNew(obj)) {
      return false;
    } 
    return obj.optional.deleted;
  }

  getImportant(obj) {
    if (this.isStudy) {
      return false;
    } else {
      if (this.isNew(obj)) {
        return false;
      }
      return obj.optional.important;
    }
  }

  setIntervalValue(value) {
    this.difficulty = value; 
  }

  getDate(obj) {
    if (this.isStudy) { 
      return Date.now();
    } else {
      if (this.isNew(obj)) {
        return 0;
      } 
      return obj.optional.date;
    } 
  }

  getKnown(obj) {
    if (this.isStudy) {
      return 0; 
    }
    return obj.optional.isKnown;
  }

  getTries(obj) {
    if (this.isNew(obj)) {
      return 0;
    } 
    return obj.optional.tries;
  }

  getSpecial(obj) {
    if (this.isNew(obj)) {
      return 'none';
    } 
    return obj.optional.special;
  }
}

export default UserWord;
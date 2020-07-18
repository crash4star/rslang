class UserWord {
    constructor(wordObj, isStudy) {
        this.isStudy = isStudy;
        this.body = wordObj;
        this.build();
    }

    build() {
        this.id = this.getId(this.body);
        this.difficulty = this.getDifficulty(this.body);
        this.total = this.getTotal(this.body);
        this.error = this.getError(this.body);
        this.currentError = 0;
        this.deleted = this.getDeleted(this.body);
        this.isForgotten = this.getForgotten(this.body);
        this.isKnown = this.getKnown(this.body);
        this.important = this.getImportant(this.body);
        this.tries = this.getTries(this.body);
        this.special = this.getSpecial(this.body);
        this.isLearned = this.getLearned(this.body);
        this.props = this.getProps(this.body);
    }

    getUserWord() {
        const userWord = {
            "difficulty": this.difficulty,
            "optional": {}
        };
        if (UserWord.isNew(this.body)) {
            userWord.optional = { ...this.body };
            delete userWord.optional.id;
        } else {
            userWord.optional = { ...this.body.optional };
        }
        userWord.optional.rating = this.setRating(this.body);
        userWord.optional.total = this.total;
        userWord.optional.error = this.error + this.currentError;
        userWord.optional.currentError = this.currentError;
        userWord.optional.deleted = this.deleted;
        userWord.optional.date = this.getDate(this.body);
        userWord.optional.tries = this.tries;
        userWord.optional.special = this.special;
        userWord.optional.isLearned = this.setLearned(this.body);
        userWord.optional.isKnown = this.isKnown;
        userWord.optional.important = this.important;
        userWord.optional.isForgotten = this.isForgotten;
        userWord.optional.interval = this.setIntervalNumber(this.body);
        return userWord;
    }

    getProps(obj) {
        let props;
        if (UserWord.isNew(obj)) {
            props = obj;
            delete obj.id;
            return props;
        }
        return obj.optional;
    }

    getWord() {
        return this.props.word;
    }

    setLearned(obj) {
        if (this.isStudy) {
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
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.isLearned;
    }

    getForgotten(obj) {
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.isForgotten;
    }

    getLearned(obj) {
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.isLearned;
    }

    getLearnedAgain(obj) {
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.learnedAgain;
    }

    setIntervalNumber(obj) {
        if (this.deleted) {
            return 0;
        }
        if (this.isStudy) {
            const anki = UserWord.ratingAnki(this.difficulty);
            const known = UserWord.ratingKnown(this.isKnown);
            const error = UserWord.ratingError(this.error, this.currentError, this.tries, this.total);
            if (anki) {
                return anki;
            }
            if (known) {
                return known;
            }
            return error;
        }
        if (UserWord.isNew(obj)) {
            if (this.important === true) {
                return 1;
            }
            return 6;
        }
        if (this.important === true) {
            return 1;
        }
        return obj.optional.interval;
    }

    setRating(obj) {
        if (this.isStudy) {
            if (this.setLearned(obj) !== false) {
                return 5;
            }
            const known = UserWord.ratingKnown(this.isKnown);
            if (known) {
                return known;
            }
            return UserWord.ratingError(this.error, this.currentError, this.tries, this.total);
        }
        if (UserWord.isNew(obj)) {
            if (this.important === true) {
                return 1;
            }
            return 6;
        }
        if (this.important === true) {
            return 1;
        }
        return obj.optional.rating;

    }

    static ratingKnown(isKnown) {
        if (isKnown === false) {
            return 1;
        }
        if (isKnown === true) {
            return 5;
        }
        return null;
    }

    static ratingAnki(difficulty) {
        switch (difficulty) {
            case 'easy': return 4;
            case 'good': return 3;
            case 'hard': return 2;
            case 'again': return 1;
            default: return null;
        }
    }

    static ratingError(error, currentError, tries, total) {
        const errors = ((error + currentError) * 0.5 * tries) / total;
        switch (true) {
            case errors === 0: return 5;
            case errors <= 1: return 4;
            case errors > 1 && errors <= 2: return 3;
            case errors > 2 && errors <= 4: return 2;
            default: return 1;
        }
    }

    static isNew(obj) {
        return !Object.prototype.hasOwnProperty.call(obj, 'wordId');
    }

    getId(obj) {
        if (UserWord.isNew(obj)) {
            return obj.id;
        }
        return obj.wordId;
    }

    getTotal(obj) {
        if (this.isStudy) {
            if (UserWord.isNew(obj)) {
                return 1;
            }
            return obj.optional.total + 1;
        }
        if (UserWord.isNew(obj)) {
            return 0;
        }
        return obj.optional.total;

    }

    getDifficulty(obj) {
        if (this.isStudy) {
            return 'none';
        }
        return obj.difficulty;

    }

    increaseTries() {
        this.tries += 1;
    }

    getError(obj) {
        if (UserWord.isNew(obj)) {
            return 0;
        }
        return obj.optional.error;
    }

    getDeleted(obj) {
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.deleted;
    }

    getImportant(obj) {
        if (this.isStudy) {
            return false;
        }
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.important;
    }

    setIntervalValue(value) {
        this.difficulty = value;
    }

    getDate(obj) {
        if (this.isStudy) {
            return Date.now();
        }
        if (UserWord.isNew(obj)) {
            return 0;
        }
        return obj.optional.date;

    }

    getKnown(obj) {
        if (this.isStudy) {
            return 0;
        }
        if (UserWord.isNew(obj)) {
            return 0;
        }
        return obj.optional.isKnown;
    }

    getTries(obj) {
        if (UserWord.isNew(obj)) {
            return 0;
        }
        return obj.optional.tries;
    }

    getSpecial(obj) {
        if (UserWord.isNew(obj)) {
            return false;
        }
        return obj.optional.special;
    }

    setImportant() {
        this.important = true;
    }

}

export default UserWord;
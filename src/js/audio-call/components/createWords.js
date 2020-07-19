import getRandomInt from '../../utils/getRandomInt'
import shuffleArr from '../../utils/shuffleArr'



class CreateWords {
    constructor(words) {
        this.words = words
        this.int = getRandomInt(5)
    }

    getEnWord() {
        const enWord = this.words[this.int].word
        return enWord
    }

    getRuWords() {
        const arrOfRuWords = [];
        this.words.forEach(item => {
            arrOfRuWords.push(item.translate)
        })
        return shuffleArr(arrOfRuWords)
        
    }

    getAnswer() {
        const answer = this.words[this.int].translate
        return answer
    }
}

export default CreateWords
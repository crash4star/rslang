import GeneralContainerElement from '../UIComponents/GeneralContainerElement';
import InputFormElement from '../UIComponents/InputFormElement';

class LearningWord extends GeneralContainerElement {
    constructor(word) {
        super('span', '');
        this.word = word;  
        this.build();
    }

    build() {
        this.input = new InputFormElement('word-input', 'text');
        this.element.innerText = this.word;
        this.wordContainer = new GeneralContainerElement('span', '');
        this.addChildren(this.wordContainer, this.input);
        this.addStyles('word-wrapper');
        this.wordContainer.addStyles('word-container');
        this.input.addStyles('word-input');
        this.input.addAttribute('maxlength', this.word.length);
        this.input.addAttribute('autocomplete', 'off');
        this.wordContainer.getHTML().innerText = this.word;
    }

    checkWord() {
        const word = this.word.toLowerCase();
        const inputWord = this.input.getValue().toLowerCase(); 
        const array = word.split('');
        const result = [];
        array.forEach((item, index) => {
            if (item !== inputWord[index]) {
                result.push(index); 
            }   
        });
        return result;
    }

    showCheckedWord(result) {
        this.wordContainer.getHTML().addEventListener('click', () => {
          this.wordContainer.removeStyle('opacity');
          this.wordContainer.removeStyle('z-index10');
          this.input.getHTML().focus();
        });
        if (!result) {
           return false; 
        }
        if (result.length > 0) {
            this.wordContainer.getHTML().innerText = '';
            this.wordContainer.childrenList = [];
            this.word.split('').forEach((item) => {
                const char = new GeneralContainerElement('span', '');
                char.getHTML().style.color = 'green';
                char.getHTML().innerText = item;
                this.wordContainer.addChildren(char);
            });
            result.forEach((item, index) => { 
                if (index === 0) {
                    this.wordContainer.childrenList[item].getHTML().style.color = 'orange';
                } else {
                    this.wordContainer.childrenList[item].getHTML().style.color = 'red';
                }
            });
            this.input.setValue('');
            this.wordContainer.addStyles('z-index10');
        
            setTimeout( () => {
            this.wordContainer.addStyles('opacity');
            }, 500);

           return false;
        }
        return true;  
    }

    showWord() {
        this.input.getHTML().style.display = 'none';
        this.wordContainer.getHTML().style.display = 'none';
    } 
}

export default LearningWord;
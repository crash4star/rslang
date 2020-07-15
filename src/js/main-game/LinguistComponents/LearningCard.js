import GeneralContainerElement from '../UIComponents/GeneralContainerElement';
import LearningWord from './LearningWord';
import ButtonElement from '../UIComponents/ButtonElement';
import Audio from '../UIComponents/Audio';
import InputFormElement from '../UIComponents/InputFormElement';

class LearningCard extends GeneralContainerElement {
    constructor(wordObj, setObj) {
        super('div', '');        
        this.wordObject = wordObj;
        this.wordProp = this.wordObject.getUserWord().optional;
        this.setObject = setObj;
        this.word = this.wordProp.word;
        
        this.buildCard(this.setObject);
        this.fillInCard(this.wordProp); 
    }

    static buildSentence(sentence, word) {
        const pattern = new RegExp(word, 'i');
        const pattern2 = /<([^<>])+>/;
        const newWord = sentence.match(pattern);
        const array = sentence.split(newWord);
        const tag = sentence.match(pattern2);
        return {
            before: array[0],
            word: newWord[0],
            after: array[1],
            tag: tag[1],
        } 
    }

    buildCard(settings) {
        this.wordElement = new LearningWord(this.word);
        const faceSide = new GeneralContainerElement('div', '');
        faceSide.addStyles('faceSide');
        const backSide = new GeneralContainerElement('div', '');
        const ButtonContainer = new GeneralContainerElement('div', '');
        this.addChildren(faceSide, backSide, ButtonContainer);
        const imageContainer = new GeneralContainerElement('div', '');
        imageContainer.addStyles('image-container');
        const wordContainer = new GeneralContainerElement('div', '');
        wordContainer.addStyles('word-input-container');
        const BtnContainer = new GeneralContainerElement('div', '');
        const checkBtn = new ButtonElement('checkWordBtn', 'Check');
        checkBtn.addStyles('btn', 'btn-primary');
        const repeatAudio = new ButtonElement('repeatAudio', ' ');
        
        repeatAudio.addStyles('none', 'no-pointer', 'btn', 'speaker-btn'); 
        const audio = new Audio('learnAudio', '', repeatAudio, 'speaker-out-btn');
        faceSide.addChildren(imageContainer, wordContainer, BtnContainer);
        BtnContainer.addStyles('check-container');
        BtnContainer.addChildren(repeatAudio, audio);
        wordContainer.addChildren(this.wordElement);

        if (settings.addAudioWord === true || settings.addAudioExample === true || settings.addAudioExplanation === true) {
            repeatAudio.removeStyle('none');
            if (settings.addAudioWord === true) {
                const key = 'audio';
                audio.addKeys(key);
            }
            if (settings.addAudioExplanation === true) {
                const key = 'audioExample';
                audio.addKeys(key);
            }
            if (settings.addAudioExample === true) {
                const key = 'audioMeaning';
                audio.addKeys(key);
            }
        }  
      
        if (settings.showTranslateWord === true) {  
            const wordTranslationContainer = new GeneralContainerElement('span', '');
            wordTranslationContainer.addAttribute('data-container', 'wordTranslate');
            wordContainer.addChildren(wordTranslationContainer);   
            wordTranslationContainer.addStyles('block');
        }

      if (settings.showWordTranslationAfter === true && settings.showTranslateWord !== true) {
          const wordTranslationContainer = new GeneralContainerElement('span', '');
          wordTranslationContainer.addAttribute('data-container', 'wordTranslate');
          wordContainer.addChildren(wordTranslationContainer);
          wordTranslationContainer.addStyles('hidden');
      }

        if (settings.showExampleSentence === true) {  
            const exampleContainer = new GeneralContainerElement('p', '');
            exampleContainer.addAttribute('data-container', 'textExample');
            backSide.addChildren(exampleContainer);
              
            if (settings.showExampleTranslationAfter === true) {
                const exampleTransContainer = new GeneralContainerElement('p', '');
                exampleTransContainer.addAttribute('data-container', 'textExampleTranslate');
                exampleTransContainer.addStyles('hidden');
                backSide.addChildren(exampleTransContainer);   
            }
        }

        if (settings.showExplanationSentence === true) {  
            const meaningContainer = new GeneralContainerElement('p', '');
            meaningContainer.addAttribute('data-container', 'textMeaning');
            backSide.addChildren(meaningContainer);

            if (settings.showExplanationTranslationAfter === true) {  
                const meaningTransContainer = new GeneralContainerElement('p', '');
                meaningTransContainer.addAttribute('data-container', 'textMeaningTranslate');
                meaningTransContainer.addStyles('hidden');
                backSide.addChildren(meaningTransContainer);   
            }  
        }

        if (settings.showImage === true) {  
            const image = new GeneralContainerElement('img', ''); 
            image.addAttribute('data-container', 'image');
            imageContainer.addChildren(image);   
        }

        if (settings.showTranscription === true) {  
            const transcriptionContainer = new GeneralContainerElement('span', '');
            transcriptionContainer.addAttribute('data-container', 'transcription');
            transcriptionContainer.addStyles('block', 'transcription');
            wordContainer.addChildren(transcriptionContainer);   
        } 

        wordContainer.addChildren(checkBtn);  
        const wrapperAnswerBtns = new GeneralContainerElement('div', 'wrapperAnswerBtns');
        const knowBtn = new ButtonElement('knowBtn', 'I know');
        knowBtn.addStyles('btn', 'btn-primary')
        const noKnowBtn = new ButtonElement('noKnowBtn', `I don't know`);
        noKnowBtn.addStyles('btn', 'btn-secondary')
        wrapperAnswerBtns.addChildren(knowBtn, noKnowBtn);
        BtnContainer.addChildren(wrapperAnswerBtns);
        wrapperAnswerBtns.addStyles('none');

        if (settings.addAnswerBtns === true) {   
            wrapperAnswerBtns.removeStyle('none'); 
        }

        const wrapperIntervalBtns = new GeneralContainerElement('div', 'wrapperIntervalBtns');
        const againBtn = new ButtonElement('againBtn', 'Again', '', 'again');
        againBtn.addStyles('btn', 'btn-secondary');
        const hardBtn = new ButtonElement('hardBtn', `Hard`, '', 'hard');
        hardBtn.addStyles('btn', 'btn-secondary');
        const goodBtn = new ButtonElement('goodBtn', `Good`, '', 'good');
        goodBtn.addStyles('btn', 'btn-secondary');
        const easyBtn = new ButtonElement('easyBtn', `Easy`, '', 'easy');
        easyBtn.addStyles('btn', 'btn-secondary');
        wrapperIntervalBtns.addChildren(againBtn, hardBtn, goodBtn, easyBtn);
        ButtonContainer.addChildren(wrapperIntervalBtns);
        wrapperIntervalBtns.addStyles('none');

        if (settings.addIntervalBtns === true) {  
            wrapperIntervalBtns.removeStyle('none');
            wrapperIntervalBtns.addStyles('hidden');
        } 

        const deleteBtn = new ButtonElement('deleteBtn', 'Remove from study');
        ButtonContainer.addChildren(deleteBtn);
        deleteBtn.addStyles('none', 'btn', 'btn-secondary');
        
        if (settings.addDeleteBtn === true) {  
            deleteBtn.removeStyle('none');  
        }

        const specialBtn = new ButtonElement('specialBtn', 'Tick as "special"');
        const specialInput = new InputFormElement('specialInput', 'text');
        specialInput.addAttribute('autocomplete', 'off'); 
        specialBtn.addStyles('none', 'btn', 'btn-secondary');
        specialInput.addStyles('none');      
        ButtonContainer.addChildren(specialBtn, specialInput);
      
        if (settings.addSpecialBtn === true) {   
            specialBtn.removeStyle('none');
            specialBtn.addStyles('hidden');
            specialInput.removeStyle('none');
            specialInput.addStyles('hidden');
        }   
    }

    showAfterCheck() {
        this.getDescendantById('wrapperIntervalBtns').removeStyle('hidden');
        this.getDescendantById('specialBtn').removeStyle('hidden');
        
        this.getDescendantsByAttribute('data-container').forEach((item) => {
            const key = item.getAttributeValue('data-container');
            if (key === 'wordTranslate' || key === 'textExampleTranslate' || key === 'textMeaningTranslate') {
                item.removeStyle('hidden');
            }
        });
    }

    fillInCard(wordObj) {
        this.getDescendantById('learnAudio').addSrc(wordObj); 
        const array = this.getDescendantsByAttribute('data-container');
        array.forEach((element) => {
            const key = element.getAttributeValue('data-container');
            if (key === 'image') {
                element.addAttribute('src', `https://raw.githubusercontent.com/KateProtasevich/rslang-data/master/${wordObj.image}`);
            } else if (key === 'textMeaning' || key === 'textExample') {
                element.updateHTML(wordObj[key]);
                const sent = LearningCard.buildSentence(wordObj[key], this.word);
                const el = element.getHTML().querySelector(sent.tag);
                el.innerText = '[...]';
                const exampleBefore = new GeneralContainerElement('span', '');
                exampleBefore.updateHTML(sent.before);
                const exampleAfter = new GeneralContainerElement('span', '');
                exampleAfter.updateHTML(sent.after);
                if (key === 'textMeaning')  {
                    this.wordMeaningElement = sent;
                } else {
                    this.wordExampleElement = sent;
                } 
            } else {
                element.updateHTML(wordObj[key]);
            } 
        });   
    }

    showWordInSentence() { 
        const array = this.getDescendantsByAttribute('data-container');
        if (array.length > 0) {
            array.forEach((element) => {
                const key = element.getAttributeValue('data-container');
                if (key === 'textMeaning') {
                    const el = element.getHTML().querySelector(this.wordMeaningElement.tag);
                    el.innerText = this.wordMeaningElement.word;
                }
                if (key === 'textExample') {
                    const el = element.getHTML().querySelector(this.wordExampleElement.tag);
                    el.innerText = this.wordExampleElement.word; 
                }
            });
        }
    }  
}

export default LearningCard;
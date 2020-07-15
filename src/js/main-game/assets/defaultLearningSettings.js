const defaultLearningSettings = {
    "wordsPerDay": 20,
    "optional": {
        "settingsProfile": {
            "theme": 0,
            "difficult": 2
        },
        "linguist": {
            "learn": {
                "maxCardsPerDay": 20,
                "wordsComposition": "new",
                "hardInterval": 10,
                "goodInterval": 4,
                "easyInterval": 3,
                "learnedInterval": 7
            },
            "cards": {
                "showTranslateWord": true,
                "showExampleSentence": true,
                "showExplanationSentence": true,
                "showImage": true,
                "showTranscription": true,
                "addAudioWord": true,
                "addAudioExample": true,
                "addAudioExplanation": true,
                "showWordTranslationAfter": true,
                "showExampleTranslationAfter": true,
                "showExplanationTranslationAfter": true,
                "addAnswerBtns": true,
                "addIntervalBtns": true,
                "addDeleteBtn": true,
                "addSpecialBtn": true
            }
        }
    }
};

export default defaultLearningSettings;
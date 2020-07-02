class Model {
    constructor(api) {
        this.api = api;
    }

    get optionsVariables() {
        return {
            apiUrl: this.api.url,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        };
    }

    async getRequest(url) {
        const rawResponse = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsVariables.token}`,
                'Accept': 'application/json',
            }
        });

        const content = await rawResponse.json();
        return content;
    }

    async postRequest(url, body) {
        const rawResponse = await fetch(url, {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsVariables.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        return { status: true, info: content };
    }

    async putRequest(url, body) {
        const rawResponse = await fetch(url, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsVariables.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        return { status: true, info: content };
    }




    async getWords(difficult, page) {
        try {
            const response = await this.api.getRequest(`/words?page=${page}&group=${difficult}`);
            return response;
        } catch (e) {
            console.log(e);
        }

        return [];
    }

    async getWordsDetails(word) {
        try {
            const response = await this.api.getRequest(`/api/public/v1/words/search?search=${word}`);
            return response;
        } catch (e) {
            console.log(e);
        }

        return [];
    }

    getUserWords() {
        try {
            const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/words`;
            return this.getRequest(URL);
        } catch (e) {
            console.log(e);
        }

        return [];
    }

    getUserSettings() {
        try {
            const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/settings`;
            return this.getRequest(URL);
        } catch (e) {
            console.log(e);
        }

        return 'connection problem';
    }

    getUserStatistics() {
        try {
            const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/statistics`;
            return this.getRequest(URL);
        } catch (e) {
            console.log(e);
        }

        return 'connection problem';
    }
    



    setUserTheme(theme) {
        const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/settings`;
        
        this.getRequest(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsProfile.theme = theme;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
            this.putRequest(URL, update);
        });
    }

    setUserDifficult(difficult) {
        const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/settings`;
        
        this.getRequest(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsProfile.difficult = difficult;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
            this.putRequest(URL, update);
        });
    }

    setUserWordsSettings(object) {
        const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/settings`;
        
        this.getRequest(URL).then(data => {
            const currentSettings = data;
            currentSettings.optional.settingsWords = object;
            delete currentSettings.id;
            return currentSettings;
        }).then(update => {
            this.putRequest(URL, update);
        });
    }



    createUserWord(wordId, word) {
        try {
            const URL = `${this.api.url}/users/${this.optionsVariables.userId}/words/${wordId}`;
            const result = this.postRequest(URL, word);

            if (result.status === 417) {
                alert('Word already exists');
            } else {
                return result;
            }
        } catch (e) {
            console.log(e);
        }

        return [];
    }

    createUserStartObject() {
        this.getUserStatistics().then(data => {
            if (data.games === undefined) {
                this.resetStatistics();
                this.resetSettings();
            }
        });
    }



    resetStatistics() {
        const startObject = {
            optional: {
                games: {
                    sprint: {
                        settings: [],
                        logs: [
                            {
                                date: '',
                                total: '',
                                success: 10
                            }
                        ]
                    },
                    englishPuzzle: {
                        settings: [],
                        logs: [
                            {
                                date: '',
                                total: '',
                                success: 7
                            }
                        ]
                    },
                    audioCall: {
                        settings: [],
                        logs: []
                    },
                    linguist: {
                        settings: [],
                        logs: []
                    },
                    savannah: {
                        settings: [],
                        logs: []
                    },
                    speakIt: {
                        settings: [],
                        logs: []
                    }
                },
                createdWords: 0
            }
        };

        try {
            const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/statistics`;
            return this.putRequest(URL, startObject);

        } catch (e) {
            console.log(e);
        }

        return [];
    }

    resetSettings() {
        const startObject = {
            optional: {
                settingsProfile: {
                    theme: 0,
                    difficult: 0
                },
                settingsWords: 0
            }
        };

        try {
            const URL = `${this.optionsVariables.apiUrl}/users/${this.optionsVariables.userId}/settings`;
            return this.putRequest(URL, startObject);

        } catch (e) {
            console.log(e);
        }

        return [];
    }
}

export default Model;
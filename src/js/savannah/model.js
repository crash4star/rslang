class Model {
    constructor(api) {
        this.api = api;
    }

    getWords(difficult, page) {
        return this.api.getRequest(`/words?page=${page}&group=${difficult}`).then(data => data);
    }
}

export default Model;
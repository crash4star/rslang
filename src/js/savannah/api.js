class Api {
    constructor(url) {
        this.url = url;
    }

    getRequest(path) {
        return fetch(`${this.url}${path}`).then(response => response.json());
    }
}

export default Api;

import { showErrorMessage } from '../utils/message';

class Api {
    constructor(url) {
        this.url = url;
    }

    async getRequest(path) {
        try {
            const response = await fetch(`${this.url}${path}`);
            const data = response.json();
            return data;
        } catch (e) {
            return showErrorMessage('connection problem');
        }
    }
}

export default Api;
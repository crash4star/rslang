
class Api {
    constructor(url, errCatch) {
        this.url = url;
    }

    async getRequest(path) {
        try {
            const response = await fetch(`${this.url}${path}`);
            const data = response.json();
            return data;
        } catch (e) {
            console.log(e);
        }

        return 'connection problem';
    }
}

export default Api;
<<<<<<< HEAD
class Api {
    constructor(url, errCatch) {
=======
import { showErrorMessage } from '../utils/message';

class Api {
    constructor(url) {
>>>>>>> savannah
        this.url = url;
    }

    async getRequest(path) {
        try {
            const response = await fetch(`${this.url}${path}`);
            const data = response.json();
            return data;
        } catch (e) {
<<<<<<< HEAD
            console.log(e);
        }

        return 'connection problem';
=======
            console.error(e);
        }

        return showErrorMessage('connection problem');
>>>>>>> savannah
    }
}

export default Api;

class AuthRequest {
    constructor(api) {
        this.api = api;
    }

    get optionsData() {
        return {
            url: this.api.url,
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        }
    }

    async get(path) {
        const rawResponse = await fetch(`${this.optionsData.url}${path}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsData.token}`,
                'Accept': 'application/json',
            }
        });

        const content = await rawResponse.json();
        return content;
    }

    async post(path, body) {
        const rawResponse = await fetch(`${this.optionsData.url}${path}`, {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsData.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        return { status: true, info: content };
    }

    async put(path, body) {
        const rawResponse = await fetch(`${this.optionsData.url}${path}`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsData.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        return { status: true, info: content };
    }

    async getRawResponse(path) {
        const rawResponse = await fetch(`${this.optionsData.url}${path}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.optionsData.token}`,
                'Accept': 'application/json',
            }
        });
        return rawResponse;
    }
}

export default AuthRequest;
import '../css/style.scss';
<<<<<<< HEAD
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';
import { refreshToken} from './utils/authorization'

const updateTokenPeriod = 3 * 3600 * 1000;

export default async function renderPage() {
    if (!localStorage.getItem('userId')) {
        renderStartPage();
    } else {
        renderMainPage();
    }
}

setInterval(async () => {
    if (!await refreshToken()) {
        renderStartPage();
    }
}, updateTokenPeriod);

renderPage();
=======
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';
import { refreshToken} from './utils/authorization'

const updateTokenPeriod = 3 * 3600 * 1000;

export default async function renderPage() {
    if (!localStorage.getItem('userId')) {
        renderStartPage();
    } else {
        renderMainPage();
    }
}

setInterval(async () => {
    if (!await refreshToken()) {
        renderStartPage();
    }
}, updateTokenPeriod);

renderPage();
>>>>>>> ef8a14b7f401a0014f1d386fc43eea5afb2662d8

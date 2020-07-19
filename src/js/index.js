
import '../css/style.scss';
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';
import { refreshToken} from './utils/authorization';

const updateTokenPeriod = 3 * 3600 * 1000;

export default async function renderPage() {
    refreshToken();
    if (!localStorage.getItem('userId')) {
        renderStartPage();
    } else {
        renderMainPage();
    }
}

if (JSON.parse(localStorage.getItem('reload')) === null) {
    window.location.reload();
    JSON.stringify(localStorage.setItem('reload', false));
} else {
    localStorage.removeItem('reload');
}

setInterval(async () => {
    if (!await refreshToken()) {
        renderStartPage();
    }
}, updateTokenPeriod);


renderPage();

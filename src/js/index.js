
import '../css/style.scss';
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';
<<<<<<< HEAD
import { refreshToken } from './utils/authorization';
import addElement from './utils/utils';
=======
import { refreshToken} from './utils/authorization';
>>>>>>> 79542d2ae5673cbe93eab71e55a8d818afe7372f

const updateTokenPeriod = 3 * 3600 * 1000;

export default async function renderPage() {
    refreshToken();
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

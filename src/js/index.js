  
import '../css/style.scss';
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';
import { refreshToken} from './utils/authorization';
<<<<<<< HEAD
=======
import addElement from './utils/utils';
>>>>>>> a1bf988fe1ffadc4ddaad86017cdb7c339e8e9bf

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
import '../css/style.css';
import '../css/style.scss';
import '../css/startPage/startPage.scss';
import renderStartPage from './start page/startPage';
import renderMainPage from './main page/mainPage';

export default function renderPage() {
    if (!localStorage.getItem('token')) {
        renderStartPage();
    } else {
        renderMainPage();
    }
}

renderPage();
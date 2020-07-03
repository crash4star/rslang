import addElement from '../utils/utils'
import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import { refreshToken, signOut } from '../utils/authorization';
import renderStartPage from '../start page/startPage';

const body = document.querySelector('body');

export default function renderMainPage() {
    if (refreshToken()) {
        renderHeader();
        //renderMenu();
        renderFooter();

    } else {
        debugger;
        signOut();
    }
}

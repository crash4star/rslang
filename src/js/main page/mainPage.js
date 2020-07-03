import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import { refreshToken, signOut } from '../utils/authorization';
import renderMenu from './menu';
import renderSettings from './settings';

export default function renderMainPage() {
    if (refreshToken()) {
        renderHeader();
        renderMenu();
        renderFooter();
        renderSettings();
    } else {
        signOut();
    }
}

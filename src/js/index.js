import '../css/style.css';
import '../css/style.scss';
import '../css/startPage/startPage.scss';
import renderStartPage from './start page/startPage';


if (!localStorage.getItem('token')) {
    renderStartPage();
}

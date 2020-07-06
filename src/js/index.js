import '../css/style.css';
import '../css/style.scss';

import ControllerApp from './savannah/ControllerApp';
import Api from './models/Api';
import Words from './models/Words';
import View from './savannah/ViewSavannah';

const BASE_URL = `https://afternoon-falls-25894.herokuapp.com`;

const app = new ControllerApp(new Words(new Api(BASE_URL)), new View());
app.start();


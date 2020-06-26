import '../css/style.css';
import '../css/style.scss';

import Model from './savannah/model';
import View from './savannah/view';
import Api from './savannah/api';

const BASE_URL = `https://afternoon-falls-25894.herokuapp.com`;

// const mode = new Model(new Api(BASE_URL));

// mode.getWords(2, 1).then(data => console.log(data));


const viewTest = new View();
viewTest.render(['test', 'qwerty', 'asd', 'zzz']);
 


















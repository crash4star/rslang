import '../css/style.css';
import '../css/style.scss';

import View from './savannah/view';
import Api from './models/Api';

import ProfileOptions from './models/ProfileOptions';
import Settings from './models/Settings';

const BASE_URL = `https://afternoon-falls-25894.herokuapp.com`;

// const mode = new Model(new Api(BASE_URL));
// mode.getUserWords().then(data => console.log(data))


const stat = new Settings(new Api(BASE_URL));
stat.getUserSettings().then(data => console.log(data))









// const viewTest = new View();
// viewTest.render(['test', 'qwerty', 'asd', 'zzz']);
// { "email": "tester-crash@mail.com", "password": "3kDVsPXp333_"}




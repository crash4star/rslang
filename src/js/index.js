import '../css/style.css';
import '../css/style.scss';
import Model from './Model/Model';
import View from './View/View';
import Controller from './Controller/Controller';
import UserInterface from './View/UserInterface';

const app = new Controller(new Model(), new View(new UserInterface()));

console.log(app);
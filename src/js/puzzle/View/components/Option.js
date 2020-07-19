import UIComponent from './UIComponent';

class Option extends UIComponent {
  constructor(id, text) {
    super('option', id, text, {}, '');
  }
}

export default Option;

import UIComponent from './UIComponent';

class Svg extends UIComponent {
  constructor(id, attributes, styles) {
    super('object', id, '', attributes, styles);
  }
}

export default Svg;

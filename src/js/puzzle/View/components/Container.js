import UIComposite from './UIComposite';

class Container extends UIComposite {
  constructor(id, styles, attributes) {
    super('div', id, '', attributes, styles);
  }
}

export default Container;

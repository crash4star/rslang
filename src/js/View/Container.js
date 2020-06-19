import UIComposite from './UIComposite';

class Container extends UIComposite {
  constructor(id, styles) {
    super('div', id, '', '', styles);
  }
}

export default Container;

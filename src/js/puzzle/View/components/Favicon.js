import Link from './Link';

class Favicon extends Link {
  constructor() {
    super('favicon', {
      type: 'image/x-icon',
      rel: 'shortcut icon',
      href: './assets/favicon.ico',
    });
  }
}

export default Favicon;

import Paintings from './PaintingsData';

class Painting {
  constructor() {
    this.paintings = Paintings;
  }

  getPainting(group, page) {
    return this.paintings[group][page].imageSrc; // cut
  }

  getPaintingDescription(group, page) {
    const { name } = this.paintings[group][page];
    const { author } = this.paintings[group][page];
    const { year } = this.paintings[group][page];
    return `${name} - ${author}, ${year}`;
  }
}

export default Painting;

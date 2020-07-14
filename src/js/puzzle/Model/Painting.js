import Paintings from './PaintingsData';

class Painting {
  constructor() {
    this.paintings = Paintings;
  }

  getPainting(group, page) {
    const forCountingFromZero = 1;
    return this.paintings[group - forCountingFromZero][page - forCountingFromZero].imageSrc; // cut
  }

  getPaintingDescription(group, page) {
    const forCountingFromZero = 1;
    const { name } = this.paintings[group - forCountingFromZero][page - forCountingFromZero];
    const { author } = this.paintings[group - forCountingFromZero][page - forCountingFromZero];
    const { year } = this.paintings[group - forCountingFromZero][page - forCountingFromZero];
    return `${name} - ${author}, ${year}`;
  }
}

export default Painting;

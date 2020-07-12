import GeneralContainerElement from './GeneralContainerElement';
import GeneralElement from './GeneralElement';

class Progress extends GeneralContainerElement {
  constructor(id, min, max) {
    super('div', id);
    this.progress = new GeneralElement('progress', '');
    this.maxValue = 2;
    this.minValue = 10;
    this.min = new GeneralContainerElement('span', '');

    this.max = new GeneralContainerElement('span', '');
    this.setMin(this.minValue);
    this.setMax(this.maxValue);
    this.addChildren(this.min, this.progress, this.max);
  }
  setMin(value) {
    this.min.updateHTML(value);
    this.progress.addAttribute('value', value);
  }

  setMax(value) {
    this.max.updateHTML(value);
    this.progress.addAttribute('max', value);
  }
}

export default Progress;
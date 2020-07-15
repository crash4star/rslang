import GeneralContainerElement from './GeneralContainerElement';
import GeneralElement from './GeneralElement';

class Progress extends GeneralContainerElement {
    constructor(id, min, max) {
        super('div', id);
        this.progress = new GeneralElement('progress', '');
        this.progress.getHTML().style.width = 'calc(100% - 50px)';
        this.progress.getHTML().style.margin = '5px';
        this.maxValue = max;
        this.minValue = min;
        this.build();
    }

    build() {
        this.min = new GeneralContainerElement('span', '');
        this.max = new GeneralContainerElement('span', '');
        this.addChildren(this.min, this.progress, this.max);
        this.setMin(this.minValue);
        this.setMax(this.maxValue);
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
import Label from './Label';
import Range from './Range';
import Container from './Container';

class LabeledRange extends Container {
  constructor(id, stylesBlock, text, minimum, maximum,
    value, stylesRange, stylesLabel) {
    super(id, stylesBlock, {});
    this.range = new Range(`${id}-range`, stylesRange);
    this.range.getHtml().name = id;
    this.range.getHtml().min = minimum;
    this.range.getHtml().max = maximum;
    this.range.getHtml().value = value;
    this.range.getHtml().step = '1';
    this.label = new Label(`${id}-label`, text, {
      for: id,
    }, stylesLabel);
    this.add(this.label, this.range);
  }

  getRangeValue() {
    return this.range.getValue();
  }

  setRangeValue(value) {
    this.range.setValue(value);
  }

  getLabelValue() {
    return this.label.getValue();
  }

  setLabelValue(value) {
    this.label.setValue(value);
  }
}

export default LabeledRange;

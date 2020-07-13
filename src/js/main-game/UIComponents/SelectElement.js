import GeneralContainerElement from './GeneralContainerElement';

class SelectElement extends GeneralContainerElement {
    constructor(id) {
      super('select', id);
    }

    addOption(text, value) {
        const option = new GeneralContainerElement('option', '');
        option.getHTML().value = value;
        option.getHTML().innerText = text;
        this.childrenList.push(option);
        this.element.append(option.getHTML());
    }

    getValue() {
        if (this.childrenList.length > 0 ) {
            return this.childrenList.filter((item) => item.getHTML().selected)[0].getHTML().value;
        }
        return null;
    }

    setValue(value) {
        if (this.childrenList.length > 0 ) {
            this.childrenList.forEach((item) => {
                item.getHTML().selected = false;
                if (item.getHTML().value === value) {
                    item.getHTML().selected = true;
                }
            });
        }
    }
}

export default SelectElement;
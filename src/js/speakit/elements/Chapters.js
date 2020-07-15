import chaptersNumber from '../data/data';
import addElement from '../../utils/utils';

export default class Chapters {
    constructor(parent, activeChapter) {
        this.parent = parent;
        this.chaptersNumber = chaptersNumber;
        this.activeElement = activeChapter;
    }

    render() {
        this.node = addElement('ul', this.parent, 'speakit-chapters', 'speakit-chapters');
        for (let i = 0; i < chaptersNumber; i += 1) {
            const addClass = (i === 0) ? 'active' : null;
            addElement('li', this.node, addClass);
        }
    }

    setActiveElement(e) {
        const elements = this.node.querySelectorAll('li');
        elements[this.activeElement].classList.remove('active');
        elements.forEach((element, index) => {
            if (e === element) {
                this.activeElement = index;
            }
        });
        elements[this.activeElement].classList.add('active');
        return this.activeElement;
    }
}
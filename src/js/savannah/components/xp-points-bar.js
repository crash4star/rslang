import Element from './main-element';

class ExperiencePointsBar extends Element {
    constructor(options, steps) {
        super(options);
        this.amount = steps;
    }

    addXpPoints() {
        const wrapper = document.querySelector(`.${this.cssStyle}`);
        const xpIcon = new Element({ node: 'div', cssStyle: 'savannah__xp-icon' });
        const xpRange = new Element({node: 'div', cssStyle: 'savannah__xp-range'});
        const xpRangeThumb = new Element({node: 'div', cssStyle: 'savannah__xp-range-thumb'});

        wrapper.append(xpIcon.create());
        wrapper.append(xpRange.create());
        const xpRangeRenderBlock = document.querySelector(`.${xpRange.cssStyle}`);
        xpRangeRenderBlock.append(xpRangeThumb.create());
    }
}

export default ExperiencePointsBar;
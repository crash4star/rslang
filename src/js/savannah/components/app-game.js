import Element from './main-element';
import HealthPointBar from './health-points-bar';

// const test = new HealthPointBar({ node: 'div', cssStyle: 'savannah__hp' }, 5);


// const root = document.querySelector('#root');
// root.append(test.create());
// test.addHealthPoints();

class Savannah {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        const parentBlock = document.querySelector(this.parent);

        // Create parent block 
        const savannah = new Element({node: 'div', id: 'savannah', cssStyle: 'savannah'});
        parentBlock.append(savannah.create());
        const savannahRenderBlock = document.querySelector(`#${savannah.id}`);
        
        // Create wrapper
        const savannahWrapper = new Element({ node: 'div', cssStyle: 'container d-flex justify-content-between savannah__wrapper', id: 'savannah-wrapper'});
        savannahRenderBlock.append(savannahWrapper.create());
        const savannahWrapperRenderBlock = document.querySelector(`#${savannahWrapper.id}`);

        // Create game info block
        const savannahInfo = new Element({node: 'div', cssStyle: 'savannah__info'});
        savannahWrapperRenderBlock.append(savannahInfo.create());
        const savannahInfoRenderBlock = document.querySelector(`.${savannahInfo.cssStyle}`);

        // Game stats
        const savannahGameInfo = new Element({node: 'div', cssStyle: 'savannah__game-info'});
        savannahInfoRenderBlock.append(savannahGameInfo.create());
    }
}

export default Savannah;

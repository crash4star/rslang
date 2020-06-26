import Element from './components/main-element';
import HealthPointBar from './components/health-points-bar';
import ExperiencePointsBar from './components/xp-points-bar';
import AnswersBar from './components/answers-bar';
import GameViewPort from './components/game-viewport';
import getWord from './getWord';

class SavannahView {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        const parentBlock = document.querySelector(this.parent);

        // Create parent block 
        const savannah = new Element({ node: 'div', id: 'savannah', cssStyle: 'savannah' });
        parentBlock.append(savannah.create());
        const savannahRenderBlock = document.querySelector(`#${savannah.id}`);

        // Create wrapper
        const savannahWrapper = new Element({ node: 'div', cssStyle: 'container d-flex justify-content-between savannah__wrapper', id: 'savannah-wrapper' });
        savannahRenderBlock.append(savannahWrapper.create());
        const savannahWrapperRenderBlock = document.querySelector(`#${savannahWrapper.id}`);

        // Create game info block
        const savannahInfo = new Element({ node: 'div', cssStyle: 'savannah__info' });
        savannahWrapperRenderBlock.append(savannahInfo.create());
        const savannahInfoRenderBlock = document.querySelector(`.${savannahInfo.cssStyle}`);

        // Game info
        const savannahGameInfo = new Element({ node: 'div', cssStyle: 'savannah__game-info' });
        savannahInfoRenderBlock.append(savannahGameInfo.create());
        const savannahGameInfoRenderBlock = document.querySelector(`.${savannahGameInfo.cssStyle}`);

        // Back to profile btn
        const savannahBackToProfileBtn = new Element({ node: 'button', cssStyle: 'savannah__return-btn', id: 'return-to-profile' });
        savannahGameInfoRenderBlock.append(savannahBackToProfileBtn.create());

        // Game stats
        const savannahGameStats = new Element({ node: 'div', cssStyle: 'savannah__game-stats' });
        savannahGameInfoRenderBlock.append(savannahGameStats.create());
        const savannahGameStatsRenderBlock = document.querySelector(`.${savannahGameStats.cssStyle}`);

        // HP bar
        const savannahHpBar = new HealthPointBar({ node: 'div', cssStyle: 'savannah__hp', id: 'savannah-hp-bar'}, 5);
        savannahGameStatsRenderBlock.append(savannahHpBar.create());
        savannahHpBar.addHealthPoints();

        // XP bar
        const savannahXpBar = new ExperiencePointsBar({ node: 'div', cssStyle: 'savannah__xp', id: 'savannah-xp-bar'}, 20);
        savannahGameStatsRenderBlock.append(savannahXpBar.create());
        savannahXpBar.addXpPoints();

        // The hidden word
        const savannahHiddenWord = new Element({node: 'h2', cssStyle: 'savannah__word', id: 'savannah-hidden-word', textContent: 'Example'});
        savannahInfoRenderBlock.append(savannahHiddenWord.create());

        // Answers bar
        const savannahAnswersBar = new AnswersBar({ node: 'div', cssStyle: 'savannah__answer', id: 'savannah-answers-bar'}, ['', '', '', '']);
        savannahInfoRenderBlock.append(savannahAnswersBar.create());
        savannahAnswersBar.addAnswers();

        // Game viewport
        const savannahGameViewport = new GameViewPort({ node: 'div', cssStyle: 'savannah__viewport', id: 'savannah-game-viewport'}, true);
        savannahWrapperRenderBlock.append(savannahGameViewport.create());
        savannahGameViewport.addViewPort();

        getWord('https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0');
    }
}

export default SavannahView;

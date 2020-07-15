import Statistic from '../../utils/createStatistic'
import ViewMethods from '../../utils/view-methods'

let sec = 60;
function tick() {
  sec -= 1;
  document.querySelector('.timer').textContent = sec;

}

function checkEndGame(rightAnswers, wrongAnswers) {


const root = document.querySelector('#root')
const sprintWrapper = document.querySelector('.sprint-wrapper')
const timerId = setInterval(tick, 1000);
document.querySelector('.sprint-closeBtn').onclick = () => {
  clearInterval(timerId)
  root.removeChild(sprintWrapper);
  root.classList.remove('root-active');
}

setTimeout(() => { clearInterval(timerId); document.querySelector('.root').innerHTML = ''; new Statistic(new ViewMethods()).renderStat(rightAnswers, wrongAnswers); }, 60000);

}

export default checkEndGame;

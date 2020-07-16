import Statistic from '../../utils/createStatistic'
import ViewMethods from '../../utils/view-methods'

let sec;
function tick() {
  sec -= 1;
  document.querySelector('.timer').textContent = sec;

}

function checkEndGame(rightAnswers, wrongAnswers) {
sec = 60

const root = document.querySelector('#root')
const sprintWrapper = document.querySelector('.sprint-wrapper')
const timerId = setInterval(tick, 1000);
const timeOutId = setTimeout(() => { clearInterval(timerId); document.querySelector('.root').innerHTML = ''; new Statistic(new ViewMethods()).renderStat(rightAnswers, wrongAnswers); }, 5000);
document.querySelector('.sprint-closeBtn').onclick = () => {
  clearInterval(timerId)
  clearTimeout(timeOutId)
  root.removeChild(sprintWrapper);
  root.classList.remove('root-active');
}
}

export default checkEndGame;

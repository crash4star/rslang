import Statistic from '../../utils/createStatistic'
import ViewMethods from '../../utils/view-methods'

let sec = 60;
function tick() {
  sec -= 1;
  document.querySelector('.timer').textContent = sec;
}

function timer(rightAnswers, wrongAnswers) {
const timerId = setInterval(tick, 1000);
setTimeout(() => { clearInterval(timerId); document.querySelector('.root').innerHTML = ''; new Statistic(new ViewMethods()).renderStat(rightAnswers, wrongAnswers); }, 60000);

}

export default timer;

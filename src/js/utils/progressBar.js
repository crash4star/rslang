import ProgressBar from '../../../node_modules/progressbar.js/dist/progressbar';

function createProgressBar(container, rightAnswers, allRounds) {


  const circleBar = new ProgressBar.Circle(container, {
    color: 'white',
    strokeWidth: 1,
    trailWidth: 12,
    trailColor: 'black',
    easing: 'easeInOut',
    from: { color: '#FF9900', width: 1 },
    to: { color: '#fd823b', width: 12 },
    text: {

      className: 'progress-text',
      style: {
        color: 'black',
        position: 'absolute',
        top: '160%',
        left: '50%',
        padding: 0,
        margin: 0,
        transform: 'translate(-50%,-50%)',
      },
    },
    step: (state, shape) => {
      shape.path.setAttribute('stroke', state.color);
      shape.path.setAttribute('stroke-width', state.width);
      shape.setText(`${Math.round(shape.value() * 100)  } %`);
    },
  });
  const percent = Math.trunc(rightAnswers * 100 / allRounds) / 100
  circleBar.animate(percent, {
    duration: 1500,
  });
  return circleBar;
}
export default createProgressBar;

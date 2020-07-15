let sec = 60;
function tick() {
  sec -= 1;

  document.querySelector('.timer').textContent = sec;
}
function timer() {
  setInterval(tick, 1000);
}

export default timer;

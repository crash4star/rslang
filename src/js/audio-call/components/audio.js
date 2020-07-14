function notificationStart(word) {
    const toSpeak = new SpeechSynthesisUtterance(
      word
    );
    toSpeak.lang = 'en';
    speechSynthesis.speak(toSpeak);
    toSpeak.onend = () => {
      document.querySelector('.wave').classList.remove('sonar-wave')
    }
  }
  export default notificationStart
import GeneralContainerElement from './GeneralContainerElement';

class Audio extends GeneralContainerElement {
  constructor(id, src) {
    super('audio', id);
    this.element.src = src;
    this.keys = [];
    this.sourceList = [];
  }
  addKeys(...rest) {
    rest.forEach((item) => {
      this.keys.push(item);
    });
  }

  addSrc(object) {
    if (this.keys.length > 0) {
      this.keys.forEach((key) => {
        this.sourceList.push(object[key]);
      });
    }
  }

  playAll() {
    if (this.sourceList.length > 0) {
      let i = 0;
      console.log(this.sourceList);
      //this.element.src = `./img/sounds/${this.sourceList[i]}`;
      this.element.src = `https://raw.githubusercontent.com/KateProtasevich/rslang-data/master/${this.sourceList[i]}`;
      this.element.play();
      this.element.addEventListener('ended', () => {
        i += 1;
        if (i < this.sourceList.length) {
          this.element.src = `./img/sounds/${this.sourceList[i]}`;
          this.element.play();
        }
      });
    }
  }

  stop() {
    if (this.sourceList.length > 0) {
    this.element.pause();
    }
  }
}

export default Audio;
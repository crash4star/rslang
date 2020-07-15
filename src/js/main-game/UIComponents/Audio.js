import GeneralContainerElement from './GeneralContainerElement';

class Audio extends GeneralContainerElement {
    constructor(id, src, btn, offStyle) {
        
        super('audio', id);
        this.element.src = src;
        this.btn = btn;
        this.offStyle = offStyle;
        this.keys = [];
        this.sourceList = [];
        this.clickRepeat();
    }

    clickRepeat() {
        this.btn.getHTML().addEventListener('click', () => {
            if (this.btn.getHTML().classList.contains(this.offStyle)) {
                this.playAll();
            } else {
                this.stop();
            }
        });
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
            this.btn.removeStyle(this.offStyle);
            let i = 0;
            this.element.src = `https://raw.githubusercontent.com/KateProtasevich/rslang-data/master/${this.sourceList[i]}`;
            this.promise = this.element.play();
            this.element.addEventListener('ended', () => {
                
                i += 1;
                if (i === this.sourceList.length) {
                    this.btn.addStyles(this.offStyle);
                }
                if (i < this.sourceList.length) {
                    this.element.src = `https://raw.githubusercontent.com/KateProtasevich/rslang-data/master/${this.sourceList[i]}`;
                    this.promise = this.element.play();
                }
            });
        }
    }

    stop() {
        this.btn.addStyles(this.offStyle);
        if (this.sourceList.length > 0) {
            if (this.promise !== undefined) {
                this.promise.then (_ => {
                this.element.pause();
                })
            }
        }
    }

}

export default Audio;
class View {
  constructor(ui) {
    this.ui = ui;
    // this.appHead = document.head;
    // this.appHead.append(ui.favicon.getHtml());
    this.app = document.body;
    this.app.append(this.ui.mainPage.getHtml());
    // this.app.append(ui.forecastPanel.getHtml());
    this.addEvents();
  }

  addEvents() {
    this.ui.mainPage.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('start-button')) {
        this.ui.mainPage.getHtml().remove();
        this.app.append(this.ui.gamePage.getHtml());
      }
    });
    this.ui.gamePage.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('back-button')) {
        this.ui.gamePage.getHtml().remove();
        this.app.append(this.ui.mainPage.getHtml());
      }
    });
  }
}

export default View;

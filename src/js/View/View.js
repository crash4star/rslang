class View {
  constructor(ui) {
    this.ui = ui;
    // this.appHead = document.head;
    // this.appHead.append(ui.favicon.getHtml());
    this.app = document.body;
    this.app.append(ui.mainPage.getHtml());
    // this.app.append(ui.forecastPanel.getHtml());
  }
}

export default View;

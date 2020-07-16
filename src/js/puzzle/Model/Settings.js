class Settings {
  constructor(serverSettings) {
    this.serverSettings = serverSettings;
  }

  async getLevelSettings() {
    if (!localStorage.getItem('levelSettings')) {
      localStorage.setItem('levelSettings', JSON.stringify({ level: 1, page: 1 }));
    }
    this.levelSettings = localStorage.getItem('levelSettings');
    return JSON.parse(this.levelSettings);
  }

  setLevelSettings(group, page) {
    this.levelSettings = JSON.stringify({ level: group, page });
    localStorage.setItem('levelSettings', this.levelSettings);
  }

  async getGameSettings() {
    this.backendSettings = await this.serverSettings.getUserSettings();
    console.log('USER SETTINGS', this.backendSettings);
    // if (!this.backendSettings.optional.puzzle) {
    //   console.log('its ok');
    //   const settings = {
    //     puzzle: {
    //       autoListen: true,
    //       translation: true,
    //       listenSentence: true,
    //       puzzleImage: true,
    //     }
    //   }
    //   const backendSettings = {
    //     optional: settings
    //   };
    //   console.log('USER SETTINGS', this.backendSettings);
    //   await this.serverSettings.updateSettings(backendSettings);
    // }
    this.backendSettings = await this.serverSettings.getUserSettings();
    console.log('USER SETTINGS', this.backendSettings);
    if (!localStorage.getItem('gameSettings')) {
      localStorage.setItem('gameSettings', JSON.stringify({
        autoListen: true,
        translation: true,
        listenSentence: true,
        puzzleImage: true,
      }));
    }
    this.gameSettings = JSON.parse(localStorage.getItem('gameSettings'));
    return this.gameSettings;
  }

  setGameSettings(option, value) {
    this.gameSettings[option] = value;
    this.currentSettings = JSON.stringify(this.gameSettings);
    localStorage.setItem('gameSettings', this.currentSettings);
  }
}

export default Settings;

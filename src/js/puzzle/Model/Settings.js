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

  async getUserSettings() {
    this.backendSettings = await this.serverSettings.getUserSettings();
    if (!this.backendSettings.optional.puzzle) {
      this.backendSettings.optional.puzzle = {
        level: 0,
        page: 0,
        train: false,
      }
      const updatedSettings = {
        optional: this.backendSettings.optional
      }
      await this.serverSettings.updateSettings(updatedSettings);
    }
    this.backendSettings = await this.serverSettings.getUserSettings();
    return this.backendSettings.optional.puzzle;
  }

  async setUserSettings(option, value) {
    this.backendSettings.optional.puzzle[option] = value;
    const updatedSettings = {
      optional: this.backendSettings.optional
    }
    await this.serverSettings.updateSettings(updatedSettings);
    this.backendSettings = await this.serverSettings.getUserSettings();
    return this.backendSettings.optional.puzzle;
  }

  async getGameSettings() {
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

import Favicon from './Favicon';
import Container from './Container';
import Button from './Button';
import Image from './Image';
import InputField from './InputField';
import Paragraph from './Paragraph';

class UserInterface {
  constructor() {
    // this.renderFavicon();
    this.renderMainPage();
    // this.renderForecastPanel();
  }

  renderFavicon() {
    this.favicon = new Favicon('favicon', {
      type: 'image/x-icon',
      rel: 'shortcut icon',
      href: './assets/favicon.ico',
    });
  }

  renderMainPage() {
    this.mainPage = new Container('page', 'page');
    const heading = new Paragraph('heading', 'English Puzzle', 'heading');
    const gameInfo = new Paragraph('heading', 'lorum ipsum(how to play)', 'heading');
    const startButton = new Container('button-container', 'button-container');
    startButton.add(new Button('start-button', 'Start Game', {}, 'start-button'));
    this.mainPage.add(heading, gameInfo, startButton);
    // const controlKeys = new Container('buttons', 'controls-keys');
    // const imageKeys = new Container('buttons-image', 'controls-image');
    // imageKeys.add(new Image('image-change', {
    //   src: './assets/change.svg',
    // }, 'change-image'));
    // const languageKeys = new Container('buttons-language', 'controls-language');
    // languageKeys.add(new Button('en-lang', 'EN', {}, 'lang-button'),
    //   new Button('ru-lang', 'RU', {}, 'lang-button'),
    //   new Button('be-lang', 'BE', {}, 'lang-button'));
    // const degreesKeys = new Container('buttons-degrees', 'controls-degrees');
    // degreesKeys.add(new Button('ru-lang', '°C', {}, 'lang-button'),
    //   new Button('be-lang', '°F', {}, 'lang-button'));
    // controlKeys.add(imageKeys, languageKeys, degreesKeys);
    // const searchPanel = new Container('search', 'controls-search');
    // const searchInput = new Container('search', 'input-wrapper');
    // const searchButton = new Container('search', 'search-wrapper');
    // searchInput.add(new InputField('search-input', 'Search city', {}, 'input'));
    // searchButton.add(new Image('search', {
    //   src: './assets/search.svg',
    // }, 'search-button'));
    // searchPanel.add(searchInput, searchButton);
    // this.controlPanel.add(controlKeys, searchPanel);
  }

  renderForecastPanel() {
    this.forecastPanel = new Container('forecast', 'forecast-wrapper');
    this.weatherPanel = new Container('weather', 'weather-wrapper');
    this.locationInfo = new Container('location-info', 'location-info');
    this.currentForecast = new Container('current-forecast', 'current-forecast');
    const degrees = new Paragraph('current-degrees', '', 'current-degrees');
    const location = new Paragraph('location', '', 'location');
    const country = new Paragraph('country', '', 'country');
    const clock = new Paragraph('clock', '', 'clock');
    this.currentForecast.add(degrees);
    this.locationInfo.add(location, country, clock);
    this.weatherPanel.add(this.locationInfo, this.currentForecast, clock);
    this.mapPanel = new Container('map', 'map-wrapper');
    this.forecastPanel.add(this.weatherPanel, this.mapPanel);
  }
}

export default UserInterface;

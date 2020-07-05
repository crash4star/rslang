import { showErrorMessage} from '../utils/message';

const miniGames = [
    {
        'title': 'Speak It',
        'description': 'Train your speach',
        'img' : 'speakit.jpg',
        'callback': () => showErrorMessage('To start game \'Speak It add callback in /data/minigames.js'),
    },
    {
        'title': 'English Puzzle',
        'description': 'Description',
        'img' : 'minigame.png',
        'callback': () => showErrorMessage('To start game \'English Puzzle add callback in /data/minigames.js'),
    },
    {
        'title': 'Savannah',
        'description': 'Description',
        'img' : 'minigame.png',
        'callback': () => showErrorMessage('To start game \'Savannah add callback in /data/minigames.js'),
    },
    {
        'title': 'Audio Call',
        'description': 'Description',
        'img' : 'minigame.png',
        'callback': () => showErrorMessage('To start game \'Audio Call add callback in /data/minigames.js'),
    },
    {
        'title': 'Sprint',
        'description': 'Description',
        'img' : 'minigame.png',
        'callback': () => showErrorMessage('To start game \'Sprint add callback in /data/minigames.js'),
    },
    {
        'title': 'Own Game',
        'description': 'Description',
        'img' : 'minigame.png',
        'callback': () => showErrorMessage('to start game \'Own Game\' add callback in /data/minigames.js'),
    },
];

export default miniGames
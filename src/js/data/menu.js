import renderMiniGames from '../main page/miniGames';

const menu = [
    {
        'name': 'Main game',
        'callback': () => console.log(`add callback for main game`),
    },
    {
        'name': 'Mini games',
        'callback': () => {
            renderMiniGames();
        },
    },
    {
        'name': 'Statistics',
        'callback': () => console.log(`add callback for statistics`),
    },
    {
        'name': 'Dictionary',
        'callback': () => console.log(`add callback for dictionary`),
    },
    {
        'name': 'Promo',
        'callback': () => console.log(`add callback for promo`),
    },
    {
        'name': 'About us',
        'callback': () => console.log(`add callback for about us`),
    },
];

export { menu }
import aboutObj from '../../data/aboutUs';

function aboutUs() {
    const root = document.querySelector('#root');
    root.innerHTML = '';
    root.classList.add('about-root');

    aboutObj.forEach(item => {
        Object.keys(item).forEach(val => {
            const card = document.createElement('div');
            const title = document.createElement('h2');
            const text = document.createElement('p');
            Object.values(item[val]).forEach(result => {


                card.className = 'about-us-card';
                title.innerHTML = val;
                text.innerHTML += result;
                card.append(title);
                card.append(text);
                root.append(card);
            });

        });
    });
}

export default aboutUs;
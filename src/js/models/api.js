function test() {
    fetch('https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0')
        .then(response => response.json())
        .then(data => console.log(data));
}

export default test;


// class ModelA {
//     constructor(api, path) {
//         this.api = api
//         this.path = path
//     }

//     getMovies(search) {
//         this.api.sendGetRequest(`${this.path}?search=${search}&searchBy=title`)
//             .then(data => {
//                 this.onSearchMovieChanged(Utils.extractDataFields(data.data, 'title'))
//             })
//     }

//     bindMoviesSearchUpdate(callback) {
//         this.onSearchMovieChanged = callback
//     }
// }
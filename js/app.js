const ui = new UI()

const getCocktails = (e) => {
    e.preventDefault()
    let searchTerm = document.querySelector('#search').value;
    if(searchTerm === '') {
        ui.printMessage()
    } else {
        console.log('works')
    }
}

const eventListeners = () => {

    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }
}

eventListeners();
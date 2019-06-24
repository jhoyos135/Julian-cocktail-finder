const ui = new UI();
const cocktail = new CocktailAPI();

const getCocktails = (e) => {
    e.preventDefault()
    let searchTerm = document.querySelector('#search').value;
    if(searchTerm === '') {
        ui.printMessage('Please add a value', 'danger')
    } else {
        cocktail.getDrinksByName(searchTerm)
            .then(cocktails => {
                let cocktailNames = cocktails.cocktails.drinks;
                if(cocktailNames === null) {
                    ui.printMessage(`there are no results, try a different one`, 'danger')
                } else {
                    ui.displayDrinksWithIngredients(cocktailNames)
                }
            })
    }
}

const eventListeners = () => {

    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }
}

eventListeners();
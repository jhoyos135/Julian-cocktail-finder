const ui = new UI();
const cocktail = new CocktailAPI();

const getCocktails = (e) => {
    e.preventDefault()
    let searchTerm = document.querySelector('#search').value;
    if(searchTerm === '') {
        ui.printMessage('Please add a value', 'danger')
    } else {

        let serverResponse;
        const type = document.querySelector('#type').value;
        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm)
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm)
                break;
           
        }

        ui.clearResults()

        serverResponse.then(cocktails => {
                let cocktailNames = cocktails.cocktails.drinks;
                if(cocktailNames === null) {
                    ui.printMessage(`there are no results, try a different one`, 'danger')
                } else {
                   if(type === 'name') {
                        ui.displayDrinksWithIngredients(cocktailNames)
                   } else {
                        ui.displayDrinks(cocktailNames);
                   }
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
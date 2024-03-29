class UI {
    printMessage(message, className) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class='alert alert-dismissible alert-${className}'>
                <button type='button' class='close' data-dismiss='alert'>X</button>
                ${message}
            </div>
        `;
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    displayDrinksWithIngredients(drinks) {
        const resultsWrapper = document.querySelector('.results-wrapper')
        resultsWrapper.style.display = 'block';

        const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class='col-md-6'>
                    <div class='card my-3'>

                    <button type='button' data-id='${drink.idDrink}' class='favorite-btn btn btn-outline-info'> 
                        +
                    </button>

                        <img class='card-img-top' src='${drink.strDrinkThumb}' alt='${drink.strDrink}' />
                        <div class='card-body'> 
                            <h2 class='card-title text-center'> ${drink.strDrink} </h2>
                            <p class='card-text font-weight-bold'>Instructions</p>
                            <p class='card-text'>
                                ${drink.strInstructions}
                            </p>
                            <p class='card-text'>
                                <ul class='list-group'>
                                    <li class='list=group-item alert alert-danger'>Ingredients</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class='card-text font-weight-bold'>Info</p>
                            <p class='card-text'>
                                <span class='badge badge-pill badge-success'>
                                    ${drink.strAlcoholic}
                                </span>
                                <span class='badge badge-pill badge-warning'>
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        })
        ui.isFavorite()
    }

    displayIngredients(drink) {
       let ingredients = [];
       for(let i = 1; i < 16; i++) {
           const ingredientMeasure = {};
           if(drink[`strIngredient${i}`] !== '' && drink[`strIngredient${i}`] !== null) {
               ingredientMeasure.ingredient = drink[`strIngredient${i}`];
               ingredientMeasure.measure = drink[`strMeasure${i}`];
               ingredients.push(ingredientMeasure)
           }
       }
      
       let ingredientsTemp = '';
       ingredients.forEach(ingredient => {
           ingredientsTemp += `
                <li class='list-group-item'> ${ingredient.ingredient} - ${ingredient.measure} </li>
           `
       })
       return ingredientsTemp
    }

    displayDrinks(drinks) {
        const resultsWrapper = document.querySelector('.results-wrapper')
        resultsWrapper.style.display = 'block';
        
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => { 
            resultsDiv.innerHTML += `
                <div class='col-md-4'>
                    <div class='card my-3'>
                    <button type='button' data-id='${drink.idDrink}' class='favorite-btn btn btn-outline-info'> 
                    +
                    </button>
                    <img class='card-img-top' src='${drink.strDrinkThumb}' alt='${drink.strDrink}' />
                    <div class='card-body'>
                         <h2 class='card-title text-center'> ${drink.strDrink} </h2>
                         <a href='#' data-target='#recipe' data-toggle='modal' data-id='${drink.idDrink}' class='btn btn-success get-recipe'> 
                            Get Recipe
                         </a>
                    </div>
                    </div>
                </div>
            `;
        })
        ui.isFavorite()
    }
    displaySingleRecipe(recipe) {
      const modalTitle = document.querySelector('.modal-title');
      const modalDescription = document.querySelector('.modal-body .description-text');
      const modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');


      modalTitle.innerHTML = recipe.strDrink;
      modalDescription.innerHTML = recipe.strInstructions;

      modalIngredients.innerHTML = this.displayIngredients(recipe);
    }

    displayCategories() {
        const categoryList = cocktail.getCategories()
            .then(categories => {
                const catList = categories.categories.drinks;
                const firstOption = document.createElement('option');
                firstOption.textContent = 'Select';
                firstOption.value = '';
                document.querySelector('#search').appendChild(firstOption);

                catList.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('_');

                    document.querySelector('#search').appendChild(option);

                })
            })
            ui.isFavorite()
    }

    displayFavorites(favorites) {
        const favoritesTable = document.querySelector('#favorites tbody');
        favorites.forEach(drink => {
            const tr =document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img src='${drink.image}' alt='${drink.name}' width='100'  />
                </td>
                <td>
                    ${drink.name}
                </td>
                <td>
                    <a href='#' data-toggle='modal' data-target='#recipe' data-id='${drink.id}' class='btn btn-success get-recipe'>
                        view
                    </a>
                </td>
                <td>
                <a href='#' data-id='${drink.id}' class='btn btn-danger remove-recipe'>
                    Remove
                </a>
            </td>
            `;
            favoritesTable.appendChild(tr);
        })
    }
    removeFavorite(element) {
        element.remove()
    }

    isFavorite() {
        const drinks = cocktailDB.getFromDB();
        drinks.forEach(drink => {
            const {id} = drink;
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink) {
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-'
            }
        })
    }

    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = ''
    }
}
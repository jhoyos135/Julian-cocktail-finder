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
    }
    displaySingleRecipe(recipe) {
      const modalTitle = document.querySelector('.modal-title');
      const modalDescription = document.querySelector('.modal-body .description-text');
      const modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');


      modalTitle.innerHTML = recipe.strDrink;
      modalDescription.innerHTML = recipe.strInstructions;

      modalIngredients.innerHTML = this.displayIngredients(recipe);
    }

    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = ''
    }
}
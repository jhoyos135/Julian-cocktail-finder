class CocktailAPI {

    async getDrinksByName(name) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const cocktails = await apiResponse.json();
       return {
           cocktails
       }
    }
}
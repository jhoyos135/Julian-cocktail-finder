class CocktailDB {

    saveIntoDB(drink) {
        const drinks = this.getFromDB();
        drinks.push(drink);
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    getFromDB() {
        let drinks;
        if(localStorage.getItem('drinks') === null) {
            drinks = []
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'))
        }
        return drinks
    }

    removeFromDB(id) {
        const drinks = this.getFromDB();

        drinks.forEach((drink, i) => {
            if(id === drink.id) {
                drinks.splice(i, 1)
            }
        });
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
}
class RestaurantManagerView {
    constructor() {
        this.main = document.getElementsByTagName("main")[0];
    }
    showDishesInCentralZone(dishesInCategory) {
        const centralZone = document.getElementById('central-zone');

        // Iterar sobre los platos usando el iterador
        for (const dish of dishesInCategory) {
            const dishElement = document.createElement('div');
            const dishImage = document.createElement('img');
            const imagePath = "../img/" + dish.dish.image;
            dishImage.src = imagePath;
            dishImage.alt = dish.dish.getName();
            dishElement.appendChild(dishImage);
            dishElement.textContent = dish.dish.name;

            // Agregar evento de clic para mostrar los detalles del plato
            dishElement.addEventListener('click', () => this.showDishDetails(dish));

            centralZone.appendChild(dishElement);
        }
    }

    showAllergenInCentralZone(dishesWithAllergen){
        const centralZone = document.getElementById('central-zone');

        // Iterar sobre los platos usando el iterador
        for (const dish of dishesWithAllergen) {
            const dishElement = document.createElement('div');
            const dishImage = document.createElement('img');
            const imagePath = "../img/" + dish.dish.image;
            dishImage.src = imagePath;
            dishImage.alt = dish.dish.getName();
            dishElement.appendChild(dishImage);
            dishElement.textContent = dish.dish.name;

            // Agregar evento de clic para mostrar los detalles del plato
            dishElement.addEventListener('click', () => this.showDishDetails(dish));

            centralZone.appendChild(dishElement);
        }
    }

    showDishDetails(dish) {
        // Crear una caja para mostrar los detalles del plato
        console.log(dish);
        const detailsBox = document.createElement('div');
        detailsBox.classList.add('dish-details-box');

        const nameElement = document.createElement('h1');
        nameElement.textContent = dish.dish.name;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = 'Descripción: ' + dish.dish.description;

        const ingredientsElement = document.createElement('p');
        ingredientsElement.textContent = 'Ingredientes: ' + dish.dish.ingredients;
        const allergensElement = document.createElement('p');
        let allergensText = 'Alergenos: ';
        dish.allergens.forEach(allergen => {
            allergensText += allergen.getName() + ', ';
        });
        allergensText = allergensText.slice(0, -2); //Eliminar coma y espacio
        allergensElement.textContent = allergensText;

        const dishImage = document.createElement('img');
        const imagePath = "../img/" + dish.dish.image;
        dishImage.src = imagePath;
        dishImage.alt = dish.dish.getName();

        // Agregar los elementos a la caja
        detailsBox.appendChild(nameElement);
        detailsBox.appendChild(descriptionElement);
        detailsBox.appendChild(ingredientsElement);
        detailsBox.appendChild(dishImage);
        detailsBox.appendChild(allergensElement);

        const centralZone = document.getElementById('caja-plato');
        centralZone.innerHTML = '';
        centralZone.appendChild(detailsBox);
    }


    showRandomDishes(dishes) {
        const centralZone = document.getElementById('random-dish');
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * dishes.length);
            console.log(dishes[randomIndex]);
            console.log("numero random para el elemento " + i + ": " + randomIndex);

            const dishElement = document.createElement('img');
            const imagePath = "../img/" + dishes[randomIndex].dish.image;
            dishElement.src = imagePath;
            dishElement.alt = dishes[randomIndex].dish.getName();
            centralZone.appendChild(dishElement);
        }
    }



    showAllCategories(categories) {
        const centralZone = document.getElementById('central-zone');

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.textContent = category.getName();
            centralZone.appendChild(categoryElement);
        });
    }
    showRestaurantInfo(restaurant){
        const detailsBox = document.createElement('div');
        detailsBox.classList.add('dish-details-box');
        console.log(restaurant.name);
        const nameElement = document.createElement('h1');
        nameElement.textContent = restaurant.name;


        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = 'Nombre del restaurante: ' + restaurant.name;

        const ingredientsElement = document.createElement('p');
        ingredientsElement.textContent = 'Descripcion: ' + restaurant.description;
        const allergensElement = document.createElement('p');
        allergensElement.textContent = 'Localizacion: ' + restaurant.location;

        // Agregar los elementos a la caja
        detailsBox.appendChild(nameElement);
        detailsBox.appendChild(descriptionElement);
        detailsBox.appendChild(ingredientsElement);
        detailsBox.appendChild(allergensElement);

        const centralZone = document.getElementById('caja-plato');
        centralZone.innerHTML = '';
        centralZone.appendChild(detailsBox);
    }
    
    showDishesInMenu(menu) {
        const centralZone = document.getElementById('central-zone');
    
        // Iterar sobre los platos del menú y mostrarlos
        menu.dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            const dishImage = document.createElement('img');
            const imagePath = "../img/" + dish.image;
            dishImage.src = imagePath;
            dishImage.alt = dish.getName();
            dishElement.appendChild(dishImage);
            dishElement.textContent = dish.name;
    
            // Agregar evento de clic para mostrar los detalles del plato
            dishElement.addEventListener('click', () => this.showDishDetails(dish));
    
            centralZone.appendChild(dishElement);
        });
    }
    
    
    clearCentralZone() {
        const centralZone = document.getElementById('central-zone');
        centralZone.innerHTML = '';
    }
}
export default RestaurantManagerView;
import {
    RestaurantsManager
} from '../clases/resturantManager.js';
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from '../clases/clases.js';

const MODEL = Symbol('ShoppingCartModel');
const VIEW = Symbol('ShoppingCartView');

class RestaurantManagerController {
    constructor(model, view) {
        this[MODEL] = model;
        this[VIEW] = view;
        this.onLoad();
    }
    onLoad() {
        this.initApp();
    }

    initApp() {
        const manager = RestaurantsManager.getInstance();
        //12 PLATOS
        const dish1 = new Dish('Ensalada', 'Descripción ensalada', 'Ingredientes de ensalada', 'ensalada.jpg');
        const dish2 = new Dish('Pasta Carbonara', 'Descripción pasta carbonara', 'Ingredientes de pasta carbonara', 'carbonara.jpg');
        const dish3 = new Dish('Pizza Margarita', 'Descripción pizza margarita', 'Ingredientes de pizza margarita', 'margarita.jpg');
        const dish4 = new Dish('Hamburguesa', 'Descripción hamburguesa', 'Ingredientes de hamburguesa', 'hamburguesa.jpg');
        const dish5 = new Dish('Sushi', 'Descripción sushi', 'Ingredientes de sushi', 'sushi.jpg');
        const dish6 = new Dish('Tacos', 'Descripción tacos', 'Ingredientes de tacos', 'tacos.jpg');
        const dish7 = new Dish('Filete de Salmón', 'Descripción filete de salmón', 'Ingredientes de filete de salmón', 'salmon.jpg');
        const dish8 = new Dish('Paella', 'Descripción paella', 'Ingredientes de paella', 'paella.jpg');
        const dish9 = new Dish('Filete', 'Descripción filete', 'Ingredientes de filete', 'filete.jpg');
        const dish10 = new Dish('Curry de Pollo', 'Descripción curry de pollo', 'Ingredientes de curry de pollo', 'curry.jpg');
        const dish11 = new Dish('Lasagna', 'Descripción lasagna', 'Ingredientes de lasagna', 'lasagna.jpg');
        const dish12 = new Dish('Sopa', 'Descripción sopa', 'Ingredientes de sopa', 'sopa.jpg');
        manager.addDish(dish4,dish5,dish6,dish7,dish8,dish9,dish10,dish11,dish12);
        //3 CATEGORIAS
        const Ensaladas = new Category('Ensaladas', 'Variedad de ensaladas frescas');
        const Italiano = new Category('Platos Italianos', 'Deliciosos platos tradicionales italianos');
        const Asiatico = new Category('Comida Asiática', 'Sabores auténticos de Asia');


        manager.assignCategoryToDish(Ensaladas, dish1);
        manager.assignCategoryToDish(Italiano, dish2);
        manager.assignCategoryToDish(Asiatico, dish3);
        // //manager.assignCategoryToDish(category1, dish4);

        /*
        manager.assignCategoryToDish(category1, dish2);
        manager.assignCategoryToDish(category1, dish3);
        manager.assignCategoryToDish(category1, dish4);
        manager.assignCategoryToDish(category2, dish5);
        manager.assignCategoryToDish(category2, dish6);
        manager.assignCategoryToDish(category2, dish7);
        manager.assignCategoryToDish(category2, dish8);
        manager.assignCategoryToDish(category3, dish9);
        manager.assignCategoryToDish(category3, dish10);
        manager.assignCategoryToDish(category3, dish11);
        manager.assignCategoryToDish(category3, dish12);
*/

        //4 ALERGENOS
        const allergen1 = new Allergen('Gluten', 'Contiene gluten');
        const allergen2 = new Allergen('Lactosa', 'Contiene lactosa');
        const allergen3 = new Allergen('Nueces', 'Puede contener trazas de nueces');
        const allergen4 = new Allergen('Mariscos', 'Contiene mariscos');
        /*
                for (const category of manager.getAllergens()) {
                    console.log(category);
                }
        */
        //3 MENUS
        const menu1 = new Menu('Menú Degustación', 'platos destacados.');
        const menu2 = new Menu('Menú Infantil', 'para los más pequeños.');
        const menu3 = new Menu('Menú Vegetariano', 'Para aquellos que prefieren una opción sin carne.');

        //3 RESTAURANTES
        const restaurant1 = new Restaurant('Restaurante Italiano', 'Ofrecemos auténtica comida italiana en un ambiente acogedor.', new Coordinate(41.9028, 12.4964));
        const restaurant2 = new Restaurant('Restaurante Mexicano', 'Disfruta de la vibrante cocina mexicana con auténticos sabores y especias.', new Coordinate(23.6345, -102.5528));
        const restaurant3 = new Restaurant('Restaurante Asiático', 'Sumérgete en la exótica comida asiática con una amplia variedad de platos y sabores.', new Coordinate(35.6895, 139.6917));

        //Pasar las categorias a array
        let categories = [];
        for (const category of manager.getCategories()) {
            categories.push(category);
        }
        //Pasar los platos a array
        let dishes = [];
        for (const dish of manager.getDishes()) {
            dishes.push(dish);
        }
        console.log(dishes);

        console.log(categories);

        // Crear un menú de navegación con enlaces a las categorías
        const menu = document.createElement('ul');
        menu.classList.add('lista');

        // Crear y agregar enlaces para cada categoría al menú
        categories.forEach(category => {
            const menuItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = category.getName();
            link.addEventListener('click', () => this.handleCategoryClick(category));
            menuItem.appendChild(link);
            menu.appendChild(menuItem);
        });

        const menuContainer = document.getElementById('lista-container');
        menuContainer.appendChild(menu);

        //Mostrar categorias y platos aleatorios
        this.showAllCategories(categories);
        this.showRandomDishes(dishes);

    }//Fin InitApp

    handleCategoryClick(category) {
        const manager = RestaurantsManager.getInstance();
        const dishesInCategory = manager.getDishesInCategory(category);

        this.clearCentralZone();
        this.showDishesInCentralZone(dishesInCategory);
    }

    clearCentralZone() {
        const centralZone = document.getElementById('central-zone');
        centralZone.innerHTML = '';
    }

    showDishesInCentralZone(dishesInCategory) {
        const centralZone = document.getElementById('central-zone');
        for (const dish of dishesInCategory) {
            console.log(dish);
            const dishElement = document.createElement('div');
            dishElement.textContent = dish.name;
            centralZone.appendChild(dishElement);
        }
    }



    showRandomDishes(dishes) {
        const centralZone = document.getElementById('random-dish');
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * dishes.length);
            console.log("numero random para el elemto " + i + " " + randomIndex);
            const dishElement = document.createElement('img');
            console.log(dishes[randomIndex].name);
            const src = "../img/" + dishes[randomIndex].getImage();
            dishElement.src = src;
            dishElement.alt = dishes[randomIndex].getName();
            console.log(dishes[randomIndex].getName());
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

}

function test() {
    const rmc = new RestaurantManagerController();
}
test();
export default RestaurantManagerController;
// Importar las clases
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from './clases.js';

const RestaurantsManager = (function () {
  let instantiated;

  class RestaurantsManager {
    #categories = [];
    #menus = [];
    #allergens = [];
    #restaurants = [];
    #dishes = [];
    #systemName;

    //Constructor de RestaurantManager
    constructor(systemName) {
      this.#systemName = systemName;
    }

    //Getters
    getCategories() {
      return this.#categories[Symbol.iterator]();
    }

    getMenus() {
      return this.#menus[Symbol.iterator]();
    }

    getAllergens() {
      return this.#allergens[Symbol.iterator]();
    }

    getRestaurants() {
      return this.#restaurants[Symbol.iterator]();
    }

    getDishes() {
      return this.#dishes[Symbol.iterator]();
    }

    //Metodo addCategory
    addCategory(...newCategories) {
      newCategories.forEach((newCategory) => {
        if (!newCategory || !(newCategory instanceof Category)) {
          throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
        }

        const categoryName = newCategory.getName();
        if (this.#categories.some((category) => category.getName() === categoryName)) {
          throw new Error('La categoría ya existe en el sistema.');
        }

        this.#categories.push(newCategory);
      });

      return this;
    }

    //Metodo removeCategory
    removeCategory(...categoriesToRemove) {
      categoriesToRemove.forEach((categoryToRemove) => {
        if (!categoryToRemove || !(categoryToRemove instanceof Category) || !this.#categories.includes(categoryToRemove)) {
          throw new Error('La categoría no está registrada.');
        }

        // Desasignar platos de la categoría
        this.#dishes.forEach((dish) => {
          dish.setCategories(dish.getCategories().filter((cat) => cat !== categoryToRemove));
        });

        // Eliminar la categoría
        const index = this.#categories.indexOf(categoryToRemove);
        this.#categories.splice(index, 1);
      });

      return this;
    }

    //Metodo addMenu
    addMenu(...newMenus) {
      newMenus.forEach(function (newMenu) {
        if (!newMenu || !(newMenu instanceof Menu)) {
          throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
        }

        const menuName = newMenu.getName();
        if (this.#menus.some(function (menu) { return menu.getName() === menuName; })) {
          throw new Error('El menú ya existe en el sistema.');
        }

        this.#menus.push(newMenu);
      }, this);

      return this;
    }

    //Metodo removeMenu
    removeMenu(menu) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }

      // Verificar si el menú está registrado
      if (!this.#menus.includes(menu)) {
        throw new Error('El menú no está registrado.');
      }

      // Obtener los platos del menú
      const menuDishes = menu.getDishes();

      // Desasignar el menú de los platos
      menuDishes.forEach((dish) => {
        menu.setDishes(menu.getDishes().filter((d) => d !== menu));
      });

      // Eliminar el menú
      const index = this.#menus.indexOf(menu);
      if (index !== -1) {
        this.#menus.splice(index, 1);
      }

      return this;
    }

    //Metodo addAllergen
    addAllergen(...newAllergens) {
      newAllergens.forEach(function (newAllergen) {
        if (!newAllergen || !(newAllergen instanceof Allergen)) {
          throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
        }

        const allergenName = newAllergen.getName();
        if (this.#allergens.some(function (allergen) { return allergen.getName() === allergenName; })) {
          throw new Error('El alérgeno ya existe en el sistema.');
        }

        this.#allergens.push(newAllergen);
      }, this);

      return this;
    }

    //Metodo removeAllergen
    removeAllergen(...allergensToRemove) {
      allergensToRemove.forEach(function (allergenToRemove) {
        if (!allergenToRemove || !(allergenToRemove instanceof Allergen) || !this.#allergens.includes(allergenToRemove)) {
          throw new Error('El alérgeno no está registrado.');
        }

        // Desasignar platos del alérgeno
        this.#dishes.forEach(function (dish) {
          dish.setAllergens(dish.getAllergens().filter(function (a) {
            return a !== allergenToRemove;
          }));
        });

        // Eliminar el alérgeno
        const index = this.#allergens.indexOf(allergenToRemove);
        this.#allergens.splice(index, 1);
      }, this);

      return this;
    }

    //Metodo addDish
    addDish(...newDishes) {
      newDishes.forEach(function (newDish) {
        if (!newDish || !(newDish instanceof Dish)) {
          throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
        }

        const dishName = newDish.getName();
        if (this.#dishes.some(function (dish) { return dish.getName() === dishName; })) {
          throw new Error('El plato ya existe en el sistema.');
        }

        this.#dishes.push(newDish);
      }, this);

      return this;
    }

    //Metodo removeDish
    removeDish(...dishesToRemove) {
      dishesToRemove.forEach(function (dishToRemove) {
        if (!dishToRemove || !(dishToRemove instanceof Dish) || !this.#dishes.includes(dishToRemove)) {
          throw new Error('El plato no está registrado.');
        }

        // Desasignar platos de categorías, menús y alérgenos
        this.#categories.forEach(function (category) {
          category.setDishes(category.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        this.#menus.forEach(function (menu) {
          menu.setDishes(menu.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        this.#allergens.forEach(function (allergen) {
          allergen.setDishes(allergen.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        // Eliminar el plato
        const index = this.#dishes.indexOf(dishToRemove);
        this.#dishes.splice(index, 1);
      }, this);

      return this;
    }

    //Metodo addRestaurant
    addRestaurant(...newRestaurants) {
      newRestaurants.forEach(function (newRestaurant) {
        if (!newRestaurant || !(newRestaurant instanceof Restaurant)) {
          throw new Error('El restaurante debe ser un objeto Restaurant y no puede ser nulo.');
        }

        const restaurantName = newRestaurant.getName();
        if (this.#restaurants.some(function (restaurant) { return restaurant.getName() === restaurantName; })) {
          throw new Error('El restaurante ya existe en el sistema.');
        }

        this.#restaurants.push(newRestaurant);
      }, this);

      return this;
    }

    //Metodo removeRestaurant
    removeRestaurant(...restaurantsToRemove) {
      restaurantsToRemove.forEach(function (restaurantToRemove) {
        if (!restaurantToRemove || !(restaurantToRemove instanceof Restaurant) || !this.#restaurants.includes(restaurantToRemove)) {
          throw new Error('El restaurante no está registrado.');
        }

        // Eliminar el restaurante
        const index = this.#restaurants.indexOf(restaurantToRemove);
        this.#restaurants.splice(index, 1);
      }, this);

      return this;
    }

    //Metodo assignCategoryToDish
    assignCategoryToDish(category, dish) {
      // Verificar si category es nulo o no es una instancia de Category
      if (!category || !(category instanceof Category)) {
        throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
      }

      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Añadir la categoria
      if (!this.#categories.includes(category)) {
        this.#categories.push(category);
      }

      //<Añadir el plato
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }

      // Crear una relación entre la categoría y el plato
      const categoryDish = {
        dish: dish
      };

      // Agregar la relación al array de dishes en la categoría
      category.setDishes(...category.getDishes(), categoryDish);

      return this;
    }

    //Metodo deassignCategoryToDish
    deassignCategoryToDish(category, dish) {
      // Verificar si category es nulo o no está registrada
      if (!category || !(category instanceof Category) || !this.#categories.includes(category)) {
        throw new Error('La categoría no está registrada.');
      }

      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }

      // Obtener el array de platos de la categoría
      const categoryDishes = category.getDishes();

      // Encontrar y eliminar la relación con el plato
      for (let i = 0; i < categoryDishes.length; i++) {
        if (categoryDishes[i] === dish) {
          categoryDishes.splice(i, 1);
        }
      }

      return this;
    }

    //Metodo assignAllergenToDish
    assignAllergenToDish(allergen, dish) {
      // Verificar si allergen es nulo o no es una instancia de Allergen
      if (!allergen || !(allergen instanceof Allergen)) {
        throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
      }

      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Si el alérgeno no está,añadirlo
      if (!this.#allergens.includes(allergen)) {
        this.#allergens.push(allergen);
      }

      // Si el plato no está registrado,añadirlo
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }

      // Crear una relación entre el alérgeno y el plato
      const allergenDish = {
        dish: dish
      };

      // Agregar la relación al array de platos en el alérgeno
      allergen.setDishes(...allergen.getDishes(), allergenDish);

      return this;
    }

    //Metodo deassignAllergenToDish
    deassignAllergenToDish(allergen, dish) {
      // Verificar si allergen es nulo o no está registrado
      if (!allergen || !(allergen instanceof Allergen) || !this.#allergens.includes(allergen)) {
        throw new Error('El alérgeno no está registrado.');
      }

      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }

      // Desasignar el plato del alergeno
      const updatedDishes = allergen.getDishes().filter(function (d) {
        return d !== dish;
      });

      allergen.setDishes(updatedDishes);

      return this;
    }

    //Metodo assignDishToMenu
    assignDishToMenu(menu, dish) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }

      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Si el menú no está registrado, añadirlo al sistema
      if (!this.#menus.includes(menu)) {
        this.#menus.push(menu);
      }

      // Si el plato no está registrado, añadirlo al sistema
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }

      // Obtener los platos del menú como un array
      const menuDishesArray = [...menu.getDishes()];

      // Crear una relación entre el menú y el plato
      const menuDish = {
        dish: dish
      };

      // Agregar la relación al array de platos en el menú
      menuDishesArray.push(menuDish);

      // Establecer los platos actualizados en el menú
      menu.setDishes(menuDishesArray);

      return this;
    }

    //Metodo deassignDishToMenu
    deassignDishToMenu(menu, dish) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu) || !this.#menus.includes(menu)) {
        throw new Error('El menú no está registrado.');
      }

      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }

      // Obtener el array de platos del menú
      const updatedDishes = menu.getDishes().filter(function (d) {
        return d !== dish;
      });

      // Establecer el array de platos actualizado en el menú
      menu.setDishes(updatedDishes);

      return this;
    }

    //Metodo changeDishesPositionsInMenu
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }

      // Verificar si dish1 es nulo o no es una instancia de Dish
      if (!dish1 || !(dish1 instanceof Dish)) {
        throw new Error('El primer plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Verificar si dish2 es nulo o no es una instancia de Dish
      if (!dish2 || !(dish2 instanceof Dish)) {
        throw new Error('El segundo plato debe ser un objeto Dish y no puede ser nulo.');
      }


      // Obtener la posición de los platos en el array
      const index1 = menu.getDishes().indexOf(dish1);
      const index2 = menu.getDishes().indexOf(dish2);

      // Intercambiar las posiciones de los platos
      const updatedDishes = [...menu.getDishes()];
      const temp = updatedDishes[index1];
      updatedDishes[index1] = updatedDishes[index2];
      updatedDishes[index2] = temp;

      // Actualizar el array de platos en el menú
      menu.setDishes(updatedDishes);

      return this;
    }

    //Metodo getDishesInCategory
    getDishesInCategory(category) {
      if (!category || !(category instanceof Category) || !this.#categories.includes(category)) {
        throw new Error('La categoría no está registrada.');
      }

      const categoryDishes = Array.from(category.getDishes(), function (categoryDish) {
        return categoryDish.dish;
      });


      return {
        [Symbol.iterator]: function () {
          let index = 0;
          return {
            next: function () {
              if (index < categoryDishes.length) {
                return { value: categoryDishes[index++], done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
      };
    }

    //Metodo getDishesWithAllergen
    getDishesWithAllergen(allergen) {
      if (!allergen || !(allergen instanceof Allergen) || !this.#allergens.includes(allergen)) {
        throw new Error('El alérgeno no está registrado.');
      }

      const allergenDishes = this.#dishes.filter(function (dish) {
        return dish.getAllergens().includes(allergen);
      });

      return {
        [Symbol.iterator]: function () {
          let index = 0;
          return {
            next: function () {
              if (index < allergenDishes.length) {
                return { value: allergenDishes[index++], done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
      };
    }

    //Metodo findDishes
    findDishes(callback, sortFunction) {
      if (typeof callback !== 'function' || typeof sortFunction !== 'function') {
        throw new Error('Las funciones de callback y ordenación deben ser proporcionadas.');
      }

      // Filtrar los platos basados en la función de callback
      const filteredDishes = this.#dishes.filter(callback);

      // Ordenar los platos si se proporciona una función de ordenación
      if (sortFunction) {
        filteredDishes.sort(sortFunction);
      }

      return {
        [Symbol.iterator]: function* () {
          for (const dish of filteredDishes) {
            yield dish;
          }
        }
      };
    }

    // Método createDish
    createDish(name, description = '', ingredients = [], image = '') {
      const existDish = this.#dishes.find(function (dish) {
        return dish.getName() === name;
      });

      if (existDish) {
        return existDish;
      } else {
        let newDish = new Dish(name, description, ingredients, image);
        this.#dishes.push(newDish);
        return newDish;
      }
    }

    // Método createMenu
    createMenu(name, description = '') {
      const existMenu = this.#menus.find(function (menu) {
        return menu.getName() === name;
      });

      if (existMenu) {
        return existMenu;
      } else {
        let newMenu = new Menu(name, description);
        this.#menus.push(newMenu);
        return newMenu;
      }
    }

    // Método createAllergen
    createAllergen(name, description = '') {
      const existAllergen = this.#allergens.find(function (allergen) {
        return allergen.getName() === name;
      });

      if (existAllergen) {
        return existAllergen;
      } else {
        let newAllergen = new Allergen(name, description);
        this.#allergens.push(newAllergen);
        return newAllergen;
      }
    }

    // Método createCategory
    createCategory(name, description = '') {
      const existCategory = this.#categories.find(function (category) {
        return category.getName() === name;
      });

      if (existCategory) {
        return existCategory;
      } else {
        let newCategory = new Category(name, description);
        this.#categories.push(newCategory);
        return newCategory;
      }
    }

    // Método createRestaurant
    createRestaurant(name, description = '', location = null) {
      const existRestaurant = this.#restaurants.find(function (restaurant) {
        return restaurant.getName() === name;
      });

      if (existRestaurant) {
        return existRestaurant;
      } else {
        let newRestaurant = new Restaurant(name, description, location);
        this.#restaurants.push(newRestaurant);
        return newRestaurant;
      }
    }

  }

  function init() {
    return new RestaurantsManager();
  }

  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();
// function test() {
//   const rm = RestaurantsManager.getInstance();
//   const dish12 = new Dish('Sopa de Tomate', 'Descripción sopa de tomate', 'Ingredientes de sopa de tomate', 'sopa.jpg');
//   const dish1 = new Dish('Sopa', 'Descripción sopa de tomate', 'Ingredientes de sopa de tomate', 'sopa.jpg');

//   const category3 = new Category('Comida Asiática', 'Sabores auténticos de Asia');
//   rm.addDish(dish12);
//   rm.addCategory(category3);
//   rm.assignCategoryToDish(category3, dish12);
//   rm.assignCategoryToDish(category3, dish1);

//   rm.getCategories

// }
// test();

export { RestaurantsManager };
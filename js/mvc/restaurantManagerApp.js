import { RestaurantsManagerView } from "../mvc/restaurantManagerView.js";
import { RestaurantManagerController } from "../mvc/restaurantManagerController.js";
const restaurantManagerApp = new RestaurantManagerController("", new RestaurantsManagerView());
export default restaurantManagerApp;
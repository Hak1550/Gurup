import req, {request} from '../requester'

const permissionHandler = (response,dispatch) => {
    console.log("PERMISSION HANDLER", response);
    dispatch({type: "PLANS_MODAL_OPEN"});
};

export const getNutritionMenus = (params) => dispatch => new Promise(resolve => {
    dispatch({
        type: 'SET_STATUS',
        nutritionMenus: 'is_loading',
    });
    request(req.get('/nutrition', {params})).catch((response) => permissionHandler(response,dispatch))
        .then(data => {
            dispatch({
                type: "SET_NUTRITION_MENUS",
                nutritionMenus: data.menus || []
            });
            if (data.menuTags) {
                dispatch({
                    type: "SET_TAGS",
                    tags: data.menuTags
                });
            }
            resolve(data);
        })
        // .catch(err => console.log("CATCH getCourses ERROR ", err))
        .finally(() => {
            dispatch({
                type: 'SET_STATUS',
                nutritionMenus: 'is_ready',
            });
        })
})

export const getNutritionRecipes = (params) => dispatch => new Promise(resolve => {
    dispatch({
        type: 'SET_STATUS',
        nutritionRecipes: 'is_loading',
    });
    request(req.get('/nutrition/recipes', {params})).catch((response) => permissionHandler(response,dispatch))
        .then(data => {
            dispatch({
                type: "SET_NUTRITION_RECIPES",
                nutritionRecipes: data.recipes || []
            });
            resolve(data);
        })
        // .catch(err => console.log("CATCH getCourses ERROR ", err))
        .finally(() => {
            dispatch({
                type: 'SET_STATUS',
                nutritionRecipes: 'is_ready',
            });
        })
})

export const getNutritionMenu = (id) => dispatch => new Promise(resolve => {
    dispatch({
        type: 'SET_STATUS',
        nutritionMenu: 'is_loading',
    });
    request(req.get(`/nutrition/${id}`)).catch((response) => permissionHandler(response,dispatch))
        .then(data => {
            dispatch({
                type: "SET_NUTRITION_MENU",
                nutritionMenu: data.menu || {}
            });
            resolve(data);
        })
        // .catch(err => console.log("CATCH getCourses ERROR ", err))
        .finally(() => {
            dispatch({
                type: 'SET_STATUS',
                nutritionMenu: 'is_ready',
            });
        })
})

export const getNutritionRecipe = (id) => dispatch => new Promise(resolve => {
    dispatch({
        type: 'SET_STATUS',
        nutritionRecipe: 'is_loading',
    });
    request(req.get(`/nutrition/recipes/${id}`)).catch((response) => permissionHandler(response,dispatch))
        .then(data => {
            dispatch({
                type: "SET_NUTRITION_RECIPE",
                nutritionRecipe: data.recipe || {}
            });
            resolve(data);
        })
        // .catch(err => console.log("CATCH getCourses ERROR ", err))
        .finally(() => {
            dispatch({
                type: 'SET_STATUS',
                nutritionRecipe: 'is_ready',
            });
        })
})

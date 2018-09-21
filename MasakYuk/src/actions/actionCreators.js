import { FETCH_RECIPES, LOADING } from './types';

import { addError } from './errors';
import axios from 'axios'

function handleRequest(){
    console.log('actionCreators: hit handleRequest!')
    return{
        type: LOADING,
    }
}

function handleGetRecipes(data){
    console.log('actionCreators: hithandleGetRecipes! data =>', data)
    return{
        type: FETCH_RECIPES,
        payload: data
    }
}

// export function fetchRecipes(query){
//     return dispatch => {
//         dispatch(handleRequest())
//         axios.get(`https://api.edamam.com/search?q=${query}&app_id=7f184b7a&app_key=a66fc2e336697a82fe7c32f769dc3291`)
//             .then(({data}) => {
//                 let hits = data.hits
//                 let recipes = []
//                 let recipe = {}
               
//                 for(let hit of hits){
//                     recipe.uri = hit.recipe.uri,
//                     recipe.label = hit.recipe.label,
//                     recipe.image = hit.recipe.image,
//                     recipe.ingredientLines = hit.recipe.ingredientLines,
//                     recipe.calories = hit.recipe.calories,
//                     recipe.totalTime = hit.recipe.totalTime
//                     recipes.push(recipe)
//                     recipe = {}
//                 }
//                 dispatch(handleGetRecipes(recipes))
//             })
//             .catch(error => {
//                 console.log('fetchRecipes()==>',error.message)
//                 dispatch(addError(error.message))
//             })
//     }
// }

export function fetchRecipes(query){
    console.log('MASUK KE ACTION CREATORS ==> query ', query)
    return dispatch => {
        dispatch(handleRequest())
        axios.get(`https://server-kujumibbvi.now.sh/recipes?q=${query}`)
            .then(({data}) => {
                console.log('client: data===>', data)
                let recipes = data.recipes
                console.log('client: RECIPES===>', recipes)
                dispatch(handleGetRecipes(recipes))
            })
            .catch(error => {
                console.log('client ==>',error.message)
                dispatch(addError(error.message))
            })
    }
}

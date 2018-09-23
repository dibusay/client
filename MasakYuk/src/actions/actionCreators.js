import { FETCH_RECIPES, LOADING } from './types';

import { addError } from './errors';
import axios from 'axios'
// const apiURL = 'http://192.168.0.76:3000'
// const apiURL = 'https://server-kujumibbvi.now.sh'
const apiURL = 'https://server-vtgwyccyhc.now.sh'

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

export function fetchRecipes(query){
    console.log('MASUK KE ACTION CREATORS ==> query ', query)
    return dispatch => {
        dispatch(handleRequest())
        // axios.get(`https://server-kujumibbvi.now.sh/recipes?q=${query}`)
        axios.get(`${apiURL}/recipes?q=${query}`)
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

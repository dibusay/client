import {
    FETCH_RECIPES,
    LOADING,
    ADD_ERROR
} from '../actions/types';

const initialStateRecipes= {
    loading:false,
    error: null,
    data: [],
}

export default function (state = initialStateRecipes, action) {
    switch(action.type){
        case LOADING:
        console.log('Reducer: LOADING')
            return {...state, loading: true };
        case ADD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: []
            };
        case FETCH_RECIPES:
        console.log('Reducer: FETCH_RECIPES')
        console.log('action.payload =>', action.payload)
            return {
                ...state, 
                loading: false,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
}
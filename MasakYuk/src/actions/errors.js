import { ADD_ERROR, REMOVE_ERROR } from './types';

export function addError (error){
    console.log('addError is hit! error =>', error)
    return{
        type: ADD_ERROR,
        error
    }
}

export const removeError = () => ({
    type: REMOVE_ERROR,
})
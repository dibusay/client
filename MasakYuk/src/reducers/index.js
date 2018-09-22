import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  recipes: recipesReducer,
  users: usersReducer
});

export default rootReducer;

import { combineReducers } from 'redux'
import recipeReducer from './recipeReducer'
import pageReducer from './pageReducer'

//combines all the reducers if we would have more
const rootReducer = combineReducers({
  recipesReducer: recipeReducer,
  pageReducer: pageReducer,
})

export default rootReducer; 
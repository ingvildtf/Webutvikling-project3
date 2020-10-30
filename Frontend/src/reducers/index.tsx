import { combineReducers } from 'redux'
import recipeReducer from './recipeReducer'
import pageReducer from './pageReducer'
import reviewReducer from './reviewReducer';

//combines all the reducers if we would have more
const rootReducer = combineReducers({
  recipesReducer: recipeReducer,
  pageReducer: pageReducer,
  reviewReducer: reviewReducer
})

export default rootReducer; 
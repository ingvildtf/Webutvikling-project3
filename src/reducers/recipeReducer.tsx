import { FETCH_RECIPES, FILTER_RECIPES } from '../actions/types'

const initialState = { recipes: [], filteredRecipes: [], dish: '', sort: '' }

export default function (state = initialState, action: any) {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        items: action.payload,
        filteredRecipes: action.payload,
      }
    case FILTER_RECIPES:
      return {
        ...state,
        filteredITems: action.payload.recipes,
        dish: action.payload.sort,
      }
    default:
      return state
  }
}

import {
  FETCH_ALL_RECIPES,
  FETCH_DINNER_RECIPES,
  FETCH_BREAKFAST_RECIPES,
  FETCH_DESSERT_RECIPES,
  FILTER_RECIPES,
} from '../actions/types'
import {
  GET_RECIPE_QUERY,
  GET_DINNER_RECIPES,
  GET_BREAKFAST_RECIPES,
  GET_DESSERT_RECIPES,
  SEARCH_RECIPES,
} from '../queries'

const initialState = {
  query: GET_RECIPE_QUERY,
  search: '',
  sortDecending: true,
  activeRecipe: '',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case FETCH_ALL_RECIPES:
      return {
        ...state,
        query: GET_RECIPE_QUERY,
      }
    case FETCH_DINNER_RECIPES:
      return {
        ...state,
        query: GET_DINNER_RECIPES,
      }
    case FETCH_BREAKFAST_RECIPES:
      return {
        ...state,
        query: GET_BREAKFAST_RECIPES,
      }
    case FETCH_DESSERT_RECIPES:
      return {
        ...state,
        query: GET_DESSERT_RECIPES,
      }
    case FILTER_RECIPES:
      return {
        ...state,
        query: SEARCH_RECIPES,
        search: action.payload,
      }
    default:
      return state
  }
}

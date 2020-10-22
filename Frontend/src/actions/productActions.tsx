import { FETCH_RECIPES, FILTER_RECIPES } from './types'

export const fetchRecipes = () => (dispatch: any) => {
  fetch('MongoDB')
    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_RECIPES, payload: data })
    })
}

export const filterRecipes = (dish: string) => (dispatch: any) => {
  dispatch({
    type: FILTER_RECIPES,
    payload: dish,
  })
}

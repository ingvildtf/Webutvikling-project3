
//import { FETCH_ALL_RECIPES, FILTER_RECIPES } from './types'

//ACTION - describes what you want to do - function that creates a object'
/*
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
*/
export const fetchAllRecipes = () => {
  return {
    type: 'FETCH_ALL_RECIPES'
  }
}

export const fetchDinnerRecipes = () => {
  return {
    type: 'FETCH_DINNER_RECIPES'
  }
}

export const fetchBreakfastRecipes = () => {
  return {
    type: 'FETCH_BREAKFAST_RECIPES'
  }
}
export const fetchDessertRecipes = () => {
  return {
    type: 'FETCH_DESSERT_RECIPES'
  }
}

export const filterRecipes = (dish: string)  => {
  return {
    type: 'FILTER_RECIPES',
    payload: dish,
  }
}

export const sortDecending = (input: boolean)  => {
  return {
    type: 'SORT_DECENDING',
    payload: input
  }
}
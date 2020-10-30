import { ADD_REVIEW } from '../actions/types'

const initialState = {recipeID: '', reviews: []}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case ADD_REVIEW:
      return{
        ...state,
        recipeID: action.payload,
      }
    default:
      return state
  }
}

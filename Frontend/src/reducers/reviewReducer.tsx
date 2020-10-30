import { ADD_REVIEW } from '../queries'

export default function (state = '', action: any) {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        state: action.payload,
      }
    default:
      return state
  }
}

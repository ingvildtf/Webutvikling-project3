import { INCREMENT_PAGE, RESET_PAGE } from '../actions/types'

const initialState = {pageOffset: 0, pageNumber: 1, pageSize: 15}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_PAGE:
          return {
            ...state,
            pageOffset: state.pageOffset + state.pageSize,
            pageNumber: state.pageNumber + 1

          }
        case RESET_PAGE:
            return {
                ...state,
                pageOffset: 0,
                pageNumber: 1,
              }
        default:
          return state
      }
    
  }
  
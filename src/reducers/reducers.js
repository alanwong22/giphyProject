export const SEARCH_REQUESTED = 'searchBar/SEARCH_REQUESTED'
export const SEARCH = 'searchBar/SEARCH'
export const DECREMENT_REQUESTED = 'searchBar/DECREMENT_REQUESTED'
export const DECREMENT = 'searchBar/DECREMENT'

const initialState = {
  count: 0,
  isSearching: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        isSearching: true,
        searchTerm: action.searchTerm
      }
     default:
     	return state
  }
}

export const search = (str) => {
  return dispatch => {
    dispatch({
      type: SEARCH_REQUESTED,
      searchTerm: str
    })

    // dispatch({
    //   type: SEARCH
    // })
  }
}
import * as SearchActions from './../constants/search'

const initialState = {
	search: {},
	collections: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SearchActions.SEARCH_REQUESTED:
      return {
        ...state,
        search: Object.assign({}, state.search,{
        	isSearching: true,
        	lastSearchTerm: action.searchTerm
        })
      }
     case SearchActions.SEARCH_RESPONSE:
     	const {data, pagination} = action.data;
     	const collectionUpdate = makeDataCollection(action.searchTerm, pagination, data);
     	return {
     		...state,
     		search: Object.assign({}, state.search,{
     			isSearching: false,
     			lastSearchResult: action.data
     		}),
     		collections: Object.assign({}, state.collections, collectionUpdate)
     	}
     default:
     	return state
  }
}

// CONVERT SEARCH RESULTS INTO A COLLECTION
function makeDataCollection(term, pagination, data) {
	let updatedCollection = {};
	updatedCollection[term] = {};
	data.map((item,index) => {
		updatedCollection[term][pagination.offset+index] = item;
	})
	return updatedCollection;
}

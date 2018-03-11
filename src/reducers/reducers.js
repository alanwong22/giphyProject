import * as SearchActions from './../constants/search'

const initialState = {
	search: {
		terms: [],
		history: []
	},
	collections: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SearchActions.SEARCH_REQUESTED:
			let history = state.search.history.slice();
			if(action.searchTerm !== history[0]) {
				history.unshift(action.searchTerm);
			}
      return {
        ...state,
        search: Object.assign({}, state.search,{
        	isSearching: true,
        	lastSearchTerm: action.searchTerm,
        	history: history
        })
      }
    case SearchActions.SEARCH_RESPONSE:
     	const {data, pagination} = action.data;
     	const collectionUpdate = makeDataCollection(action.searchTerm, pagination, data, state.collections);
     	// console.log("SEARCH_RESPONSE", state.collections, "////", collectionUpdate);
     	// const newCollection[action.searchTerm] = {...state.collections[action.searchTerm], ...collectionUpdate}
     	const obj1 = {test: {1: "a"}, meh: "woot"};
			const obj2 = {test: {2: "b"}, grr: "meep"}
			// console.log("TEST",  {...obj1, ...obj2});
			// console.log("newCollection", newCollection);
     	return {
     		...state,
     		search: Object.assign({}, state.search,{
     			isSearching: false,
     			pagination
     		}),
     		collections: collectionUpdate
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
		return null
	})
	console.log("makeDataCollection", updatedCollection);
	return updatedCollection;
}

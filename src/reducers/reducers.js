import * as SearchActions from './../constants/search';

const initialState = {
	search: {
		terms: [],
		history: [],
		pagination: {}
	},
	collections: {}
};

// CONVERT SEARCH RESULTS INTO A COLLECTION
function makeDataCollection(term, pagination, data, stateCollection) {
	let updatedCollection = {};
	updatedCollection[term] = stateCollection[term] || {};
	// updatedCollection[term] = {};
	data.map((item,index) => {
		updatedCollection[term][pagination.offset+index] = item;
		return null;
	});
	return updatedCollection;
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case SearchActions.SEARCH_REQUESTED: {
			let history = state.search.history.slice();
			if(action.searchTerm !== history[0] && action.searchTerm !== "Trending") {
				history.unshift(action.searchTerm);
			}
      return {
        ...state,
        search: Object.assign({}, state.search,{
					isSearching: true,
					lastSearchTerm: action.searchTerm,
					history: history
        })
      };
    }
    case SearchActions.SEARCH_RESPONSE: {
			const {data, pagination} = action.data;
			const collectionUpdate = makeDataCollection(action.searchTerm,
																									pagination, data, 
																									state.collections);

			return {
				...state,
				search: Object.assign({}, state.search,{
					isSearching: false,
					pagination
				}),
				collections: Object.assign(state.collections, collectionUpdate)
			};
		}
   default:
		return state;
  }
};


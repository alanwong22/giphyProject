import * as SearchActions from './../constants/search';
import * as PaginationActions from './../constants/paginate';

const initialState = {
	search: {
		terms: [],
		history: [],
		pagination: {}
	},
	collections: {},
	trending: {},
	hasPagination: true
};

// UPDATE A COLLECTION
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
			// DON'T INCLUDE T
			if(action.searchTerm !== history[0] && action.searchTerm) {
				history.unshift(action.searchTerm);
			}
      return {
        ...state,
        search: Object.assign({}, state.search,{
					isSearching: true,
					lastSearchTerm: action.searchTerm,
					onTrending: action.onTrending,
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
		case SearchActions.TRENDING_RESPONSE: {
			const {data, pagination} = action.data;
			const collectionUpdate = makeDataCollection("trending",
																									pagination, data, 
																									state.collections);
			return {
				...state,
				search: Object.assign({}, state.search,{
					isSearching: false,
					pagination
				}),
				trending: Object.assign(state.trending, collectionUpdate.trending)
			};
		}
		case PaginationActions.SHOWALL_REQUEST: {
			return {
				...state,
				hasPagination: action.paginate
			};
		}
   default:
		return state;
  }
};


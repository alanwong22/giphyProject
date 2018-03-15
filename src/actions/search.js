import axios from 'axios';
import * as SearchActions from './../constants/search';

export const search = (str, offset = 0, rating = 'G') => {
  return dispatch => {
    dispatch({
      type: SearchActions.SEARCH_REQUESTED,
      searchTerm: str || '',
      onTrending: !str
    });
    
    // SWITCHES BETWEEN TRENDING OR SEARCH CALLS
		let _getURL = `https://api.giphy.com/v1/gifs/`;
		_getURL += (!str) ? 'trending' : 'search';
		_getURL += `?api_key=${process.env.REACT_APP_KEY}
								&limit=25
								&offset=${offset}
								&rating=${rating}
								&lang=en`;
		if(str) _getURL += `&q=${str}`;

		axios.get(_getURL)
    .then(res => {
      if(str) {
        dispatch({
          type: SearchActions.SEARCH_RESPONSE,
          data: res.data,
          searchTerm: str
        });
      }else{
        dispatch({
          type: SearchActions.TRENDING_RESPONSE,
          data: res.data
        });
      }
    })
    .catch(function (error) {
      dispatch({
        type: SearchActions.SEARCH_ERROR
      });
    });

  };
};

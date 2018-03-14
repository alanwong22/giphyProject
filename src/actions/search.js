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
		_getURL += `?api_key=Uyc7IBfB4ZBg13fkIN1YyzBKn23h53nU
								&limit=25
								&offset=${offset}
								&rating=${rating}
								&lang=en`;
		if(str) _getURL += `&q=${str}`;

		console.log("_getURL", _getURL);

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
    });

  };
};

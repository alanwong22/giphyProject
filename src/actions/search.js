import axios from 'axios';
import * as SearchActions from './../constants/search';

export const search = (str, offset = 0) => {
  return dispatch => {
    dispatch({
      type: SearchActions.SEARCH_REQUESTED,
      searchTerm: str
    });

		const _getURL = `https://api.giphy.com/v1/gifs/search
											?api_key=Uyc7IBfB4ZBg13fkIN1YyzBKn23h53nU
											&limit=25
											&offset=${offset}
											&rating=G
											&lang=en
											&q=${str}`;
		axios.get(_getURL)
    .then(res => {
      dispatch({
        type: SearchActions.SEARCH_RESPONSE,
        data: res.data,
        searchTerm: str
      });
    });
    
  };
};

export const getTrending = () => {
	return dispatch => {
		dispatch({
      type: SearchActions.SEARCH_REQUESTED,
      searchTerm: "Trending"
    });
		axios.get('https://api.giphy.com/v1/gifs/trending?api_key=Uyc7IBfB4ZBg13fkIN1YyzBKn23h53nU&limit=25&rating=G')
		.then(res => {
			dispatch({
				type: SearchActions.SEARCH_RESPONSE,
				data: res.data,
				searchTerm: "Trending"
			});
		});
	};
};
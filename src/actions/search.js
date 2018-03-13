import axios from 'axios';
import * as SearchActions from './../constants/search';

export const getTrending = (str, offset = 0) => {
  return dispatch => {
    dispatch({
      type: SearchActions.SEARCH_REQUESTED,
      searchTerm: "Trending"
    });
    const _trendingURL = `https://api.giphy.com/v1/gifs/trending
													?api_key=Uyc7IBfB4ZBg13fkIN1YyzBKn23h53nU
													&offset=${offset}
													&limit=25
													&rating=G`;
    axios.get(_trendingURL)
    .then(res => {
      dispatch({
        type: SearchActions.SEARCH_RESPONSE,
        data: res.data,
        searchTerm: "Trending"
      });
    });
  };
};

export const search = (str, offset = 0, rating = 'G') => {
  return dispatch => {
    dispatch({
      type: SearchActions.SEARCH_REQUESTED,
      searchTerm: str
    });
		const _getURL = `https://api.giphy.com/v1/gifs/search
											?api_key=Uyc7IBfB4ZBg13fkIN1YyzBKn23h53nU
											&limit=25
											&offset=${offset}
											&rating=${rating}
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

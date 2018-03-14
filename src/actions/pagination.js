import * as PaginationActions from './../constants/paginate';

export const showAll = (paginate = true) => {
  return dispatch => {
    dispatch({
      type: PaginationActions.SHOWALL_REQUEST,
      paginate
    });
  };
};
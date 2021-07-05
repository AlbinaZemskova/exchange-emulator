import Exchange from '../Exchange';

/**
 * Load history of deal from server
 */
export const loadHistoryOfDeal = () => dispatch => {
  let history = Exchange.getHistory();

  dispatch({
    type: 'LOAD_HISTORY_OF_DEAL',
    history,
  });
};

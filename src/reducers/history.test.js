import reducer from './history';


describe('reducer', () => {
  let mockState;
  beforeEach(() => {
    mockState = {
      history: [],
    };
  });

  it('should handle ADD_HISTORY(LOAD_HISTORY_OF_DEAL)', () => {
    const action = {
      type: 'ADD_HISTORY',
      history: [
        {
          price: 1000,
          count: 200,
        },
        {
          price: 2000,
          count: 150,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      history: action.history,
    });
  });

  it('should handle LOAD_HISTORY_OF_DEAL', () => {
    const action = {
      type: 'LOAD_HISTORY_OF_DEAL',
      history: [
        {
          price: 1000,
          count: 200,
        },
      ],
    };

    expect(reducer(mockState, action)).toEqual({
      ...mockState,
      history: action.history,
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(mockState);
  });
});

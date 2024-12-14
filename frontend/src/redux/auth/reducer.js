import * as actionTypes from './types';

const INITIAL_STATE = {
  current: null,
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FAILED_REQUEST:
      return INITIAL_STATE;

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        current: action.payload,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        current: null,
      };

    default:
      return state;
  }
};

export default authReducer;

import { SET_SELECTED_USER_DATA, SET_USER_LIST } from "../actions";

const getInitialState = () => ({
  userList: {},
  selectedUserData: {},
  adData: {},
});

export const appReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        userList: action.userList,
        adData: action.adData,
      };

    case SET_SELECTED_USER_DATA:
      return {
        ...state,
        selectedUserData: action.selectedUserData,
      };

    default:
      return state;
  }
};

export default appReducer;

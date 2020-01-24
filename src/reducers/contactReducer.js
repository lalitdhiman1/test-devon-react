import * as actionTypes from '../actions/index';
 

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      case actionTypes.EDIT_CONTACT:
          var foundIndex = state.findIndex(x => x.count == action.id);
          state[foundIndex] = action.contact
          
           return [
            ...state
          ];
     
      case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);
      default:
            return state;
    }
  };
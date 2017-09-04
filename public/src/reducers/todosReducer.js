import * as types from '../actions/types';

const defaults = {
  items: [],
  item: {},
  didCreate: false,
  didEdit: false,
  didDelete: false
};

export default function(state = defaults, action) {
  switch(action.type) {
    case types.GET_TODOS:
      return { state, items: [ ...action.payload ], didCreate: false, didEdit: false, didDelete: false };
    case types.GET_TODO:
      return { state, item: action.payload, didCreate: false };
    case types.CREATE_TODO:
      console.log('hitting reducer');
      return { state, didCreate: action.payload };
    case types.EDIT_TODO:
      return { state, didEdit: action.payload };
    case types.DELETE_TODO:
      return { state, didDelete: action.payload };
  }
  return state;
}
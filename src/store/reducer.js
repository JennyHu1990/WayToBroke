import { fromJS } from "immutable";
import * as actionTypes from "./actionTypes";

const defaultState = fromJS({
  eventList: [],
  character: {},
  money: "",
  package: [],
  flag: true
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LIST:
      return state.set("eventList", action.data);
    case actionTypes.DISABLE_EVENT_CLICK:
      return state.set("flag", false);
    case actionTypes.INIT_CHARACTER:
      return state.merge({
        character: action.character,
        money: action.money,
        package: action.package
      });
    case actionTypes.ADD_EVENT:
      const newState = JSON.parse(JSON.stringify(state));
      newState.package.push(action.newEvent);
      return state.set("package", newState.package);
    case actionTypes.CALCULATE_MONEY:
      const newBalance = action.newEvent.balance
        ? state.get("money") + action.newEvent.money
        : state.get("money") - action.newEvent.money;
      return state.set("money", newBalance);
    default:
      return state;
  }
};

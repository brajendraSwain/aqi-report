import { combineReducers } from "redux";
import aqiReducer from "./aqi/aqi.reducer";

export default combineReducers({
  aqi: aqiReducer,
});

import {createLogger} from "redux-logger";
import {thunk} from "redux-thunk";
import {createStore,applyMiddleware} from "redux";
import { commonReducer } from "./components/redux/CommonReducer"

const logger = createLogger();
const store = createStore(commonReducer,applyMiddleware(thunk,logger));
export default store;
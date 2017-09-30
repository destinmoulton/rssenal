import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';

//import errorReducer from './reducers/error.reducer';

const store = createStore(
  combineReducers({
    //error: errorReducer,
    
  }),
  applyMiddleware(
    thunk
  )
);

export default store;

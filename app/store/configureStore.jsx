import * as redux from 'redux';
import thunk from 'redux-thunk';

import { searchTextReducer, showCompletedReducer, todosReducer } from 'reducers';

// initialState為初始之state
export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    // 引入thunk這個middleware
    // thunk用來使用async code
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};

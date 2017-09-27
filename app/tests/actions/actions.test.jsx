var expect = require('expect');
import configureMocksStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var actions = require('actions');

// 另外開store for test，使用thunk為中介軟體
const createMockStore = configureMocksStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'Anything we like',
        completed: false,
        createdAt: 0,
      }
    };
    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should generate add todos action object', () => {
    var todos = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  // 有async test時，要用done讓mocha知道要等這個執行完
  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My todo item';

    store.dispatch(actions.startAddTodo(todoText))
    .then(() => {
      // getActions是store的method，為redux的api
      const actions = store.getActions();
      
      expect(actions[0]).toInclude({
        type: 'ADD_TODO',
      });

      expect(actions[0].todo).toInclude({
        text: todoText,
      });
      // 這邊的done是告訴karma不用等啦，已經可以了
      done();
    })
    .catch(done);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: '123'
    };
    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });
});

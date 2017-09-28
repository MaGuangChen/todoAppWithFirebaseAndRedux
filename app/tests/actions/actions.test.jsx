var expect = require('expect');
import configureMocksStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase, { firebaseRef } from 'app/firebase';

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

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });


  describe('Tests with firebase todos', () =>{
    let testTodoRef;
    // beforeEach是mocha的api，可以讓我們在每一個
    // 測試開始前先run此function
    beforeEach((done) => {
      const todosRef = firebaseRef.child('todos');
      // 先清空todos再建立
      todosRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push();
        return testTodoRef.set({
          text: 'Something to do',
          completed: false,
          createdAt: 23453453,
        })
      })
      .then(() => done())
      .catch(done);     
    });
    // afterEach是mocha的api，可以讓我們在每一個
    // 測試開始完成後run此function
    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action)
      .then(() => {
        // 取得store內的全部actions
        const mockActions = store.getActions();
        
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key,
        });
        expect(mockActions[0].updates).toInclude({
          completed: true,
        });
        expect(mockActions[0].updates.completedAt).toExist();
        
        done();
      }, done);
    });
    
    it('should populate todos and dispatch todo', (done) => {
      const store = createMockStore({});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() =>{
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos.text).toEqual('Something to do');
        // 這邊叫完done後才去跑afterEach喔
        done();
      }, done)
    });

  });

});

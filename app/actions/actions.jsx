import firebase, { firebaseRef } from 'app/firebase/';
import moment from 'moment';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export const startAddTodos = () => {
  // 返回一個thunk function
  return (dispatch, getState) => {
    const todoRef = firebaseRef.child('todos');

    return todoRef.once('value').then((snapshot) => {
      const todos = snapshot.val() || {};
      // redux所期待的是todo array，所以我們要轉換
      // 因為我們在firebase內的todo長這樣
      // todos: {
      //   '123ddd' : {
      //     text: 'some text',
      //   }
      // }
      let parsedTodos = [];
      
      // 這個api可將上面的object資料型態轉為陣列
      // 以屬性名為單位也就是我們帶入的todoId
      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId],
        })
      });
      
      dispatch(addTodos(parsedTodos));
    });
  }
};

export const startAddTodo = (text) => {
  return (dispatch, getState) => {
    const todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    const todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });

  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export const startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    const todoRef = firebaseRef.child(`todos/${id}`);
    const updates = {
      completed,
      completedAt: completed ? moment().unix() : null,
    };

    return todoRef.update(updates).then(() => {
       dispatch(updateTodo(id, updates));
    });
  };
};
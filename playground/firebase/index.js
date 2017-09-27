import firebase from 'firebase';

// 將no sql的firebase加入web app時所要求的輸入
var config = {
    apiKey: "AIzaSyCc8lY4O6IwsPWfzqe7LGp9qfAQ6WKMOLY",
    authDomain: "paul-todo-app.firebaseapp.com",
    databaseURL: "https://paul-todo-app.firebaseio.com",
    projectId: "paul-todo-app",
    storageBucket: "paul-todo-app.appspot.com",
    messagingSenderId: "170792355674"
};
firebase.initializeApp(config);

// 利用firebase自帶的method來將資料儲存在firebase
// 的database之根reference
const firebaseRef = firebase.database().ref();
// 這代表著initial data
// firebase的set method有包含promise了，所以可用.then
firebaseRef.set({
	app: {
        name: 'Todo App',
        version: '1.0.0',
	},
	isRuning: true,
	user: {
		name: 'Paul',
		age: 26,
	}
});

const todoRef = firebaseRef.child('todos');

todoRef.on('child_added', (snapshot) => {
	console.log('New todo aded', snapshot.key, snapshot.val());
});

todoRef.push({
	text: 'Todo 1'
});

todoRef.push({
	text: 'Todo 2'
});

// firebase中的array範例
// const noteRef = firebaseRef.child('notes');
// noteRef.on('child_added', (snapshot) => {
// 	console.log('child added', snapshot.key, snapshot.val());
// })

// noteRef.on('child_removed', (snapshot) => {
// 	console.log('child removed', snapshot.key, snapshot.val());
// })

// noteRef.on('child_changed', (snapshot) => {
// 	console.log('child has been changed', snapshot.key, snapshot.val());
// });

// const newNoteRef = noteRef.push({
// 	text: 'Walk the dog!'
// });
// console.log('todo id is: ', newNoteRef.key);


// const newNoteRef = noteRef.push();

// newNoteRef.set({
// 	text: 'Walk the dog'
// })



// .on method實際應用範例
// 將會將特定的屬性update
// firebaseRef.child('user').on('value', (snapshot) => {
//   const name = snapshot.val().name;
//   if(name === 'Paul'){
//   	console.log('User ref is', snapshot.val());
//   } else {
//   	console.log('User ref is been changed to', snapshot.val());
//   }  
// });

// firebaseRef.child('user').update({name: '小馬'});

// firebaseRef.child('app').update({name: 'something else'});


// firebaseRef.update({
// 	'app/name': 'Todo application',
// 	'user/name': 'Paul',
// })

// firebaseRef.child('user').update({
//    'age': 'almost 27',
// }).then(() => {
//    console.log('firebase update worked');
// }, (e) => {
//    console.log('firebase update failed');
// });


// firebaseRef.update({
// 	'isRuning': null,
// });

// firebaseRef.child('app/version').update({
//   'version-number': '1.0.0',
//   'version-record': 'the first one'
// });

// firebaseRef.child('app/version/version-record').remove();

// ---實驗練習區
// .once是firebase的method
// 是進行一次fetch，其中帶入的參數'value'
// 是告訴firebase我們要進行取值
// snapshot是firebase自帶的property
// 可以取得key或value
// firebaseRef.once('value').then((snapshot) => {
//   console.log('取得整個database的data', snapshot.val());
//   if(snapshot.val().user.age === 'almost 27'){
//   	console.log(snapshot.val().user.age);
//   }
// }, (e) => {
//     console.log('unabled to fetch value', e);
// });
// firebaseRef.child('app').once('value').then((snapshot) => {
//     console.log('firebase 的database內的app object', snapshot.val());
// }, (e) => {
//    console.log('failed to fetch data', e);
// });

// 每當資料發生改變時會被呼叫
// firebaseRef.on('value', (snapshot) => {
//   console.log('got value when ever the data been  change',
//   	snapshot.val());
// });
// // 將會叫停firebase的on event
// firebaseRef.off();
// // 如果沒有off()可以發現到有改變值並且被console
// firebaseRef.update({
// 	isRuning: false
// });

// const logData = (snapshot) => {
// 	console.log('got value when ever the data been  change', snapshot.val());
// }
// // const logDataTwo = (snapshot) => {
// // 	console.log('the second one console', snapshot.val());
// // };
// firebaseRef.on('value', logData);
// firebaseRef.off(logData);
// firebaseRef.update({
// 	isRuning: false,
// });
// 會整個清空我們的firebase database
// firebaseRef.remove();
// 會清空特定的屬性
// firebaseRef.child('app/version').remove();
// 如果要清空也可以直接將值設為null就好
// firebaseRef.child('app').update({
// 	'name': 'test firebase todo app',
// 	'version': null,
// })


// firebaseRef.update({
//   isRuning: false,
//   // 這樣會更新整個app property
//   // app: {
//   // 	name: 'Paul Todo App',
//   // },
//   // 這樣則只會更新app裡面的property
//   'app/version': '2.0.0'
// });

// firebaseRef.child('user').update({
//   'name' : '馬廣辰'
// }).then(() => {
// 	console.log('update worked');
//    firebaseRef.child('user').update({
//    	'age': 'almost 27'
//    });
// }, (e) => {
// 	console.log('update not work');
// });

// 之後如果要更新database不能用下面這樣方式更新
// 會直接取代掉原本所有的資料變成只有appName: 'Paul Todo App'
// firebase.database().ref().set({
//   appName: 'Paul Todo App',
// });

// firebaseRef.child('user').set({
// 	name: '馬廣辰',
// 	age: 'almost 27',
// });

// firebaseRef.child('isRuning').set(false);
// firebaseRef.child('app').set({name: 'Todo App'});
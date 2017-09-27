import firebase from 'firebase';

try {
 var config = {
    apiKey: "AIzaSyCc8lY4O6IwsPWfzqe7LGp9qfAQ6WKMOLY",
    authDomain: "paul-todo-app.firebaseapp.com",
    databaseURL: "https://paul-todo-app.firebaseio.com",
    projectId: "paul-todo-app",
    storageBucket: "paul-todo-app.appspot.com",
    messagingSenderId: "170792355674"
};

 firebase.initializeApp(config);
} catch(e) {

}


export const firebaseRef = firebase.database().ref();
export default firebase;


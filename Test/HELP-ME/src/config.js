import Firebase from 'firebase/app';
import  'firebase/database';
import  'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyALFJLvLjx_vCa1oIwfeTW0TwRycidB0B4",
    authDomain: "nodemcu1-26fc3.firebaseapp.com",
    databaseURL: "https://nodemcu1-26fc3.firebaseio.com",
    projectId: "nodemcu1-26fc3",
    storageBucket: "nodemcu1-26fc3.appspot.com",
    messagingSenderId: "606994986556",
    appId: "1:606994986556:web:43a2afc6a32fdef8"
};

export const App = Firebase.initializeApp(firebaseConfig);
export const Db = Firebase.database();
export const Firestore = Firebase.firestore();


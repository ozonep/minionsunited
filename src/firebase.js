import firebase from 'firebase';
import 'firebase/firestore';
import {initFirestorter, Collection, Document} from 'firestorter';

const firebaseConfig = {
    apiKey: "XXXXXXX",
    authDomain: "minionnetwork-ddfa0.firebaseapp.com",
    databaseURL: "https://minionnetwork-ddfa0.firebaseio.com",
    projectId: "minionnetwork-ddfa0",
    storageBucket: "XXXXXXX",
    messagingSenderId: "XXXXXXX"
};
firebase.initializeApp(firebaseConfig);
initFirestorter({firebase: firebase});


export const users = new Collection('users');
export const posts = new Collection('posts');
export const messages = new Collection('messages');
export const db = firebase.firestore();
export const doc = new Document(db.doc('users/1245'));
// export const minionDoc = new Document(db.doc('messages/translate'), 'on');



export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const messaging = firebase.messaging();
export const storage = firebase.storage();

export const login = (email, pw) => {
    return auth.signInWithEmailAndPassword(email, pw);
};
export const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
};
export const saveUser = (user) => {
    return db.collection(`users`).add({
            email: user.email,
            uid: user.uid
        })
        .then(docRef => docRef)
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
};
export const regUser = (email, pw) => {
    return auth.createUserWithEmailAndPassword(email, pw);
};

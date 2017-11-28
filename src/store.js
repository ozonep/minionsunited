// import firebase from 'firebase';
// import 'firebase/firestore';
// import {initFirestorter, Collection, Document} from 'firestorter';
//
// // const firebaseConfig = {
// //     apiKey: "AIzaSyDSm8ZDKIQDuYgOJRCYOIIS1Ygsn5zTTIw",
// //     authDomain: "minionnetwork-ddfa0.firebaseapp.com",
// //     databaseURL: "https://minionnetwork-ddfa0.firebaseio.com",
// //     projectId: "minionnetwork-ddfa0",
// //     storageBucket: "minionnetwork-ddfa0.appspot.com",
// //     messagingSenderId: "710740150286"
// // };
// // firebase.initializeApp(firebaseConfig);
// initFirestorter({firebase: firebase});
// //
//
// const store = {
//     settings: new Collection('settings', 'on'), // set real-time updating always on
//     users: new Collection('users'),	// by default, realtimeUpdating is set to `auto`
//     tasks: new Collection('tasks'),           // uninitialized collection, use path to its location
//     currentUser: new Document()
// };
//
// export default store;
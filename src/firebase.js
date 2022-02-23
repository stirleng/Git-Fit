import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey:            "AIzaSyC6FPv049UYKEjiTvEM2yxQaFKVyqgMNdA",
    authDomain:        "git-fit-26023.firebaseapp.com",
    projectId:         "git-fit-26023",
    storageBucket:     "git-fit-26023.appspot.com",
    messagingSenderId: "778817305393",
    appId:             "1:778817305393:web:70156ce96b0be98996ce10",
    measurementId:     "G-42JLXMNTKW"
});

const db   = app.firestore();
const auth = firebase.auth();

export { db, auth };
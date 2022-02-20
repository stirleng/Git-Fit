import firebase from "firebase"
import auth, { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC6FPv049UYKEjiTvEM2yxQaFKVyqgMNdA",
    authDomain: "git-fit-26023.firebaseapp.com",
    projectId: "git-fit-26023",
    storageBucket: "git-fit-26023.appspot.com",
    messagingSenderId: "778817305393",
    appId: "1:778817305393:web:70156ce96b0be98996ce10",
    measurementId: "G-42JLXMNTKW"
};


export const addUser = function(email, password){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(() => {
            //const errorCode = error.code;
            //const errorMessage = error.message;
        });
}

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
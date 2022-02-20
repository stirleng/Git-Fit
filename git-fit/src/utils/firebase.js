import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyC6FPv049UYKEjiTvEM2yxQaFKVyqgMNdA",
    authDomain: "git-fit-26023.firebaseapp.com",
    projectId: "git-fit-26023",
    storageBucket: "git-fit-26023.appspot.com",
    messagingSenderId: "778817305393",
    appId: "1:778817305393:web:70156ce96b0be98996ce10",
    measurementId: "G-42JLXMNTKW"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
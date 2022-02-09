import { initializeApp } from 'firebase/app';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6FPv049UYKEjiTvEM2yxQaFKVyqgMNdA",
    authDomain: "git-fit-26023.firebaseapp.com",
    projectId: "git-fit-26023",
    storageBucket: "git-fit-26023.appspot.com",
    messagingSenderId: "778817305393",
    appId: "1:778817305393:web:70156ce96b0be98996ce10",
    measurementId: "G-42JLXMNTKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

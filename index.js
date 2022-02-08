 // Import the functions you need from the SDKs you need
      
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
      
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Your web app's Firebase configuration
      
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
      
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

  const analytics = getAnalytics(app);

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });
  
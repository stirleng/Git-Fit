import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();

    // const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .catch(err => {
                // Handle Errors here.
                const errorCode = err.code;
                const errorMessage = err.message;
                if (errorCode === 'auth/wrong-password')
                    alert('Wrong password.');
                else
                    alert(errorMessage);
                console.log(err);
            });
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            // setLoading(false)
        });
    }, []);

    const value = {
        currentUser,
        signUp,
        signIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

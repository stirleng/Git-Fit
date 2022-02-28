import React from 'react'
import {useAuth} from '../../contexts/AuthContext'

export default function Home() {
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
        <div>Hodawdawdwadme</div>
    )
}
import React, { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                })
            } else {
                console.error('Login failed');
                // Optionally handle the error response, e.g., display a message to the user
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    }

    // Handle redirect after successful login
    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
}

import {useState} from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //register: es una funcion asincrona que se encarga de enviar los datos al servidor
    //una funcion asincrona: es una funcion que se ejecuta en segundo plano para no bloquear el hilo principal

    async function register(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registered successfully:', result);
                // You could redirect the user or clear the input fields here
            } else {
                console.error('Registration failed');
                // Optionally handle the error response, e.g., display a message to the user
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    }


    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />

            <button type="submit">Register</button>
        </form>
    );

}

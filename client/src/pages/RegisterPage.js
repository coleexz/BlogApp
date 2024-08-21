import {useState} from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //register: es una funcion asincrona que se encarga de enviar los datos al servidor
    //una funcion asincrona: es una funcion que se ejecuta en segundo plano para no bloquear el hilo principal
    
    async function register(ev){
        //preventDefault es para que no se recargue la pagina
        ev.preventDefault();
        fetch('http://localhost:4000',{
            method:"POST",
            body: JSON.stringify({username,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
    }

    return(
        <form className = "register" onSubmit={register}>
            <h1>Register</h1>
            <input type = "text" placeholder="username"
            value={username}
            onChange ={ev => setUsername(ev.target.value)}/>

            <input type = "password" placeholder="password"value={password}
            onChange ={ev => setPassword(ev.target.value)}/>

            <button>Login</button>
        </form>
    )
}

export default function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(ev){
        ev.preventDefault();
        try{
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const result = await response.json();
                console.log('User logged in successfully:', result);
                // You could redirect the user or clear the input fields here
            } else {
                console.error('Login failed');
                // Optionally handle the error response, e.g., display a message to the user
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    }
    return(
            <form className = "login">
                <h1>Login</h1>

                <input type = "text"
                placeholder="username"
                value={username}
                onChange= {ev => setUsername(ev.target.value)} />

                <input type = "password"
                placeholder="password"
                value={password}
                onChange= {ev => setPassword(ev.target.value)}/>
                <button>Login</button>
            </form>
    )
}

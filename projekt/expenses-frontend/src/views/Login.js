import "../styles/Login.css"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../providers/UserProvider";

const Login = () => {
    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAuthentication = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/auth/authenticate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                }
            );

            const data = await response.json();
            console.log(data);
            if (data !== null) {
                setToken(data.token);
                console.log(token);
                sessionStorage.setItem('token', token);
            }
        } catch (error) {
            setError("Błędny login lub hasło. Spróbuj ponownie.");
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        await handleAuthentication();
        try {
            const response = await fetch(
                "http://localhost:8080/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            if (data !== null) {
                console.log("Login successful");
                setUser(data);
                navigate("/expenses");
            }
        } catch (error) {
            setError("Błędny login lub hasło. Spróbuj ponownie.");
        }
    }

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8080/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "guest",
                        password: "guest"
                    }),
                }
            );

            const data = await response.json();
            if (data !== null) {
                console.log("Login successful");
                setUser(data);
                navigate("/expenses");
            }
        } catch (error) {
            setError("Błędny login lub hasło. Spróbuj ponownie.");
        }
    };

    return (
        <div className="login">
            <h1>Logowanie:</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input type="text" name="username" placeholder="Nazwa użytkownika" required value={username}
                           onChange={(e) => setUsername(e.target.value)}/><br/>
                    <input type="password" name="password" placeholder="Hasło" required value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Zaloguj się</button>
                <br/>
                <button type="submit" onClick={handleGuestLogin}>Zaloguj się jako gość</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Nie masz jeszcze konta?</p>
            <Link to="/register">
                <button className="register">Zarejestruj się</button>
            </Link>
        </div>);
};

export default Login;
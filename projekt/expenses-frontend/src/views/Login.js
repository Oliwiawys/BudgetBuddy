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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const authResponse = await fetch(
                "http://localhost:8080/auth/authenticate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username, password})
                }
            );

            if (!authResponse.ok) {
                throw new Error("Autoryzacja nie powiodła się");
            }

            const authData = await authResponse.json();
            if (!authData || !authData.token) {
                throw new Error("Autoryzacja nie powiodła się");
            }

            const token = authData.token;
            sessionStorage.setItem('token', token);

            const loginResponse = await fetch(
                "http://localhost:8080/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({username, password})
                }
            );

            const loginData = await loginResponse.json();
            if (loginData) {
                console.log("Login successful");
                setUser(loginData);
                navigate("/expenses");
            }
        } catch (error) {
            setError("Błędny login lub hasło. Spróbuj ponownie.");
        }
    }

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        try {
            const authResponse = await fetch(
                "http://localhost:8080/auth/authenticate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "guest",
                        password: "guest"})
                }
            );

            if (!authResponse.ok) {
                throw new Error("Autoryzacja nie powiodła się");
            }

            const authData = await authResponse.json();
            if (!authData || !authData.token) {
                throw new Error("Autoryzacja nie powiodła się");
            }

            const token = authData.token;
            sessionStorage.setItem('token', token);

            const response = await fetch(
                "http://localhost:8080/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: "guest",
                        password: "guest"
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            if (data) {
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
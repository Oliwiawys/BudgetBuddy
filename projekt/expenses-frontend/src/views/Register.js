import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [email, setEmail] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();

        const handleRegister = async (e) => {
            e.preventDefault();

            try {
                if (password !== confirmPassword) {
                    setError("Hasła nie są takie same");
                    return;
                }
                if (password.length < 7) {
                    setError("Hasło musi mieć co najmniej 7 znaków");
                    return;
                }
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    setError("Nieprawidłowy format adresu e-mail");
                    return;
                }

                const response = await fetch(
                    "http://localhost:8080/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            email: email
                        }),
                    }
                );

                const data = await response.json();
                if (data.token === "UsernameTaken") {
                    setError("Nazwa użytkownika jest już zajęta");
                } else if (data.token === "EmailTaken") {
                    setError("Adres email jest już zajęty");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Username or email already taken")
            }
        }

        return (
            <div className="login">
                <h1>Rejestracja:</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <input type="text" name="username" placeholder="Nazwa użytkownika" required value={username.trim()}
                               onChange={(e) => setUsername(e.target.value)}/><br/>
                        <input type="email" name="email" placeholder="Adres email" required value={email.trim()}
                               onChange={(e) => setEmail(e.target.value)}/><br/>
                        <input type="password" name="password" placeholder="Hasło" required value={password.trim()}
                               onChange={(e) => setPassword(e.target.value)}/><br/>
                        <input type="password" name="confirmPassword" placeholder="Powtórz hasło" required
                               value={confirmPassword.trim()}
                               onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
                    </div>
                    <button type="submit">Zarejestruj się</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    }
;

export default Register;
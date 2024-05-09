import {useContext, useState} from "react";
import {UserContext} from "../providers/UserProvider";
import {useNavigate} from "react-router-dom";
import "../styles/User.css";

const User = () => {
    const {user} = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = sessionStorage.getItem('token');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDeleteUser = async () => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć konto?');

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/users/delete/${user.userID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.text();

            if (data === "userNotFound") {
                setError("Użytkownik nie istnieje");
            } else if (data === "deleted") {
                console.log("User deleted successfully");
                navigate('/');
            }
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="user">
            <h1>Użytkownik:</h1>
            <p>ID użytkownika: {user.userID}</p>
            <p>Nazwa użytkownika: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>
                Hasło:{' '}
                {showPassword ? (user.password) : (
                    <span className="hidden-password">{'*'.repeat(user.password.length)}</span>)}
                <span className="password-toggle"
                      onClick={togglePasswordVisibility}>{showPassword ? 'Ukryj' : 'Pokaż'}
                </span>
            </p>
            <p>Rola: {user.role}</p>
            <p>Data utworzenia konta: {user.createDate}</p>
            <button type="submit" onClick={handleLogout}>
                Wyloguj się
            </button>
            <br/>
            {user.role !== "guest" && (
                <button type="submit" onClick={handleDeleteUser}>
                    Usuń konto
                </button>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default User;
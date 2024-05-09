import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddUser = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const token = sessionStorage.getItem('token');

    const handleAdding = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                setError("Hasła nie są takie same");
                return;
            }

            const response = await fetch(
                "http://localhost:8080/users/admin/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        role: role
                    }),
                }
            );

            const data = await response.text();
            console.log(data);
            if (data === "usernameExists") {
                setError("Nazwa użytkownika jest już zajęta");
            } else if (data === "emailExists") {
                setError("Adres email jest już zajęty");
            } else if (data === "registered") {
                navigate("/users");
            }
        } catch (error) {
            console.error("Username or email already taken")
        }
    }

    const handleCancel = () => {
        navigate("/users");
    };

    return (
        <div className="add-user">
            <h1>Dodaj Użytkownika</h1>
            <form onSubmit={handleAdding}>
                <div>
                    <input type="text" name="username" placeholder="Nazwa użytkownika" required value={username}
                           onChange={(e) => setUsername(e.target.value)}/><br/>
                    <input type="email" name="email" placeholder="Adres email" required value={email}
                           onChange={(e) => setEmail(e.target.value)}/><br/>
                    <input type="password" name="password" placeholder="Hasło" required value={[password.trim()]}
                           onChange={(e) => setPassword(e.target.value)}/><br/>
                    <input type="password" name="confirmPassword" placeholder="Powtórz hasło" required
                           value={confirmPassword.trim()}
                           onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
                    <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Wybierz rolę</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                        <option value="guest">guest</option>
                    </select><br/>
                </div>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default AddUser;
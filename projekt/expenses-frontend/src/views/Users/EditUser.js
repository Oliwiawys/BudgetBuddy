import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import UserDetailsContext from "../../providers/UserDetailsProvider";
import {UserContext} from "../../providers/UserProvider";

const EditUser = () => {
    const {user} = useContext(UserContext);
    const {userDetails, setUserDetails} = useContext(UserDetailsContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = sessionStorage.getItem('token');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/users/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: userDetails.userID,
                        username: userDetails.username,
                        password: userDetails.password,
                        email: userDetails.email,
                        role: userDetails.role
                    })
                });

            const data = await response.text();
            if (data === "updated") {
                console.log("User updated successfully");
                navigate("/users")
            } else if (data === "userNotFound") {
                setError("Użytkownik nie istnieje")
            }
        } catch (error) {
            setError("Błąd podczas pobierania użytkownika.");
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserDetails((prevUserDetails) => ({...prevUserDetails, [name]: value}));
    };

    const handleCancel = () => {
        navigate("/users");
    };

    return (
        <div className="edit-user">
            <h1>Edytuj Użytkownika:</h1>
            <form onSubmit={handleEdit}>
                <p>Nazwa użytkownika:</p>
                <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleInputChange} required
                />
                <p>Email:</p>
                <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange} required
                />
                <p>Hasło:</p>
                <input
                    type="password"
                    name="password"
                    placeholder="Nowe hasło" required
                    value={userDetails.password}
                    onChange={handleInputChange}
                />
                {user.role === "admin" && (
                    <p>Rola:</p>)}
                {user.role === "admin" && (
                    <select
                        id="role"
                        name="role"
                        value={userDetails.role}
                        onChange={handleInputChange} required>
                        <option value="">Wybierz rolę</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                )}<br/>
                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default EditUser;
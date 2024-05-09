import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddTag = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [tagDescription, setTagDescription] = useState("");
    const [tagName, setTagName] = useState("");
    const token = sessionStorage.getItem('token');

    const handleAdding = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/tags/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        tagName,
                        tagDescription
                    }),
                });

            const data = await response.text();
            if (data === "added") {
                console.log("Tag added successfully");
                navigate("/tags");
            } else if (data === "tagExists") {
                setError("Tag o tej nazwie już istnieje");
            }
        } catch (error) {
            setError("Błąd podczas dodawania tagu. Spróbuj ponownie.");
            console.log(error);
        }
    }

    const handleCancel = () => {
        navigate("/tags");
    };

    return (
        <div className="add-tag">
            <h1>Dodaj Tag</h1>
            <form onSubmit={handleAdding}>
                <input type="text" name="tagName" placeholder="Nazwa tagu" required value={tagName}
                       onChange={(e) => setTagName(e.target.value)}/><br/>
                <input type="text" name="tagDescription" placeholder="Opis tagu" required value={tagDescription}
                       onChange={(e) => setTagDescription(e.target.value)}/><br/>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>);
};

export default AddTag;
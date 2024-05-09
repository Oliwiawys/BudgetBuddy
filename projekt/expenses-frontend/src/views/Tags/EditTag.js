import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {TagContext} from "../../providers/TagProvider";

const EditTag = () => {
    const {tag, setTag} = useContext(TagContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = sessionStorage.getItem('token');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/tags/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: tag.tagId,
                        tagName: tag.tagName,
                        tagDescription: tag.tagDescription
                    })
                });

            const data = await response.text();
            if (data === "updated") {
                console.log("Tag updated successfully");
                navigate("/tags")
            } else if (data === "tagNotFound") {
                setError("Tag nie istnieje")
            }
        } catch (error) {
            setError("Błąd podczas pobierania tagu.");
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTag((prevTag) => ({...prevTag, [name]: value}));
    };

    const handleCancel = () => {
        navigate("/tags");
    };

    return (
        <div className="edit-tag">
            <h1>Edytuj Tag:</h1>
            <form onSubmit={handleEdit}>
                <p> ID tagu: {tag.tagId}</p>
                <p>Nazwa tagu:</p>
                <input
                    type="text"
                    name="tagName"
                    value={tag.tagName}
                    onChange={handleInputChange} required
                />
                <p>Opis:</p>
                <input
                    type="text"
                    name="tagDescription"
                    value={tag.tagDescription}
                    onChange={handleInputChange} required
                /><br/>
                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default EditTag;
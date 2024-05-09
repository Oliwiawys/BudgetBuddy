import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ExpensesTagsContext} from "../../providers/ExpensesTagsProvider";

const EditExpensesTag = () => {
    const {expensesTag, setExpensesTag} = useContext(ExpensesTagsContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = sessionStorage.getItem('token');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/expenses-tags/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: expensesTag.expensesTagsId,
                        importanceLevel: expensesTag.importanceLevel,
                        expenseId: expensesTag.expense.expenseId,
                        tagId: expensesTag.tag.tagId
                    })
                });

            const data = await response.text();
            if (data === "updated") {
                console.log("Tag updated successfully");
                navigate("/expenses-tags")
            } else if (data === "expensesTagNotFound") {
                setError("Wydatek Tag nie istnieje")
            }
        } catch (error) {
            setError("Błąd podczas pobierania wydatku tagu.");
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setExpensesTag((prevExpensesTag) => {
            return {
                ...prevExpensesTag,
                [name]: value,
            };
        });
    };

    const handleCancel = () => {
        navigate("/expenses-tags");
    };

    return (
        <div className="edit-expenses-tag">
            <h1>Edytuj wydatek tag:</h1>
            <form onSubmit={handleEdit}>
                <p>ID wydatku tagu: {expensesTag.expensesTagsId}</p>
                <p>ID tagu: {expensesTag.tag.tagId} | Nazwa tagu: {expensesTag.tag.tagName}</p>
                <p>ID wydatku: {expensesTag.expense.expenseId} | Wydatek: {expensesTag.expense.description}</p>
                <p>Ważność:</p>
                <input
                    type="text"
                    name="importanceLevel"
                    value={expensesTag.importanceLevel}
                    required
                    onChange={handleInputChange}
                /><br/>
                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default EditExpensesTag;
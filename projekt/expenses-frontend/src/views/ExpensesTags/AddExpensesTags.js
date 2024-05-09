import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddExpensesTag = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [tagId, setTagId] = useState("");
    const [expenseId, setExpenseId] = useState("");
    const [importanceLevel, setImportanceLevel] = useState("");
    const token = sessionStorage.getItem('token');

    const handleAdding = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8080/expenses-tags/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        importanceLevel: importanceLevel,
                        tag: tagId,
                        expense: expenseId
                    }),
                });

            const data = await response.text();
            if (data === "added") {
                console.log("ExpensesTag added successfully");
                navigate("/expenses-tags");
            } else {
                console.log(data);
                setError("Podany wydatek lub tag nie istnieje.")
            }
        } catch (error) {
            setError("Błąd podczas dodawania tagu. Spróbuj ponownie.");
            console.log(error);
        }
    }

    const handleCancel = () => {
        navigate("/expenses-tags");
    };

    return (
        <div className="add-expense-tag">
            <h1>Dodaj Tag</h1>
            <form onSubmit={handleAdding}>
                <input type="text" name="importanceLevel" placeholder="Ważność" required value={importanceLevel}
                       onChange={(e) => setImportanceLevel(e.target.value)}/><br/>
                <input type="number" name="expense" placeholder="ID wydatku" required value={expenseId}
                       onChange={(e) => setExpenseId(e.target.value)}/><br/>
                <input type="number" name="tag" placeholder="ID tagu" required value={tagId}
                       onChange={(e) => setTagId(e.target.value)}/><br/>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>);
};

export default AddExpensesTag;
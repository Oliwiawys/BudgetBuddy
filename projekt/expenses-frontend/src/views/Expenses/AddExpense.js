import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/AddExpense.css"
import {UserContext} from "../../providers/UserProvider";

const AddExpense = () => {
    const {user} = useContext(UserContext);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [importanceLevel, setImportanceLevel] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTagsId, setSelectedTagsID] = useState([]);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/tags/view/all",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                if (data !== null) {
                    setTags(data);
                }
            } catch (error) {
                setError("Błąd podczas pobierania tagów.");
            }
        };

        fetchTags();
    }, []);

    const handleAdding = async (e) => {
        e.preventDefault();

        if (user.role === "guest") {
            setError("Nie masz uprawnień do dodawania wydatków.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/expenses/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount: Number(amount),
                        description,
                        date,
                        user: user.userID
                    }),
                });

            const data = await response.json();
            if (data !== null) {
                console.log("Expense added successfully");
                for (const tag of selectedTagsId) {
                    await handleAddingExpensesTags(tag, data.expenseId);
                }
                navigate("/expenses");
            }
        } catch (error) {
            setError("Błąd podczas dodawania wydatku. Spróbuj ponownie.");
        }
    }

    const handleAddingExpensesTags = async (tagId, expenseId) => {
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
                console.log("ExpenseTag added successfully");
            }
        } catch (error) {
            setError("Błąd podczas dodawania.");
        }
    }

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        const selectedIds = Array.from(e.target.selectedOptions, (option) => option.getAttribute('data-tag-id'));
        setSelectedTagsID(selectedIds);
        setSelectedTags(selectedOptions);
    };

    const handleCancel = () => {
        navigate("/expenses");
    };

    return (
        <div className="add-expense">
            <h1>Dodaj wydatek</h1>
            <form onSubmit={handleAdding}>
                <input type="text" name="description" placeholder="Opis" required value={description}
                       onChange={(e) => setDescription(e.target.value)}/><br/>
                <input type="number" name="amount" placeholder="Kwota" required value={amount}
                       onChange={(e) => setAmount(e.target.value)}/><br/>
                <input type="date" name="date" placeholder="Data" required value={date}
                       onChange={(e) => setDate(e.target.value)}/><br/>
                <select
                    id="tags"
                    name="tags"
                    multiple
                    value={selectedTags}
                    onChange={handleTagChange} required
                >
                    {tags.map((tag) => (
                        <option key={tag.tagId} value={tag.tagName} data-tag-id={tag.tagId}>
                            {tag.tagName}
                        </option>
                    ))}
                </select><br/>
                <input
                    type="text"
                    name="importanceLevel"
                    placeholder="Ważność"
                    value={importanceLevel}
                    onChange={(e) => setImportanceLevel(e.target.value)} required
                /><br/>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>);
};

export default AddExpense;
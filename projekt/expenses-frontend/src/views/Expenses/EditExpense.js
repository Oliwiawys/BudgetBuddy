import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ExpenseContext} from "../../providers/ExpenseProvider";
import {UserContext} from "../../providers/UserProvider";

const EditExpense = () => {
    const {user} = useContext(UserContext);
    const {expense, setExpense} = useContext(ExpenseContext);
    const [tags, setTags] = useState([]);
    const [importanceLevel, setImportanceLevel] = useState("");
    const [prevImportanceLevel, setPrevImportanceLevel] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTagsId, setSelectedTagsID] = useState([]);
    const [prevSelectedTagsId, setPrevSelectedTagsID] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setExpense((prevExpense) => ({...prevExpense, [name]: value}));
    };

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        const selectedIds = Array.from(e.target.selectedOptions, (option) => option.getAttribute('data-tag-id'));
        setSelectedTagsID(selectedIds);
        setSelectedTags(selectedOptions);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/expenses/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        expenseId: expense.expenseId,
                        amount: expense.amount,
                        date: expense.date,
                        description: expense.description
                    })
                });

            const data = await response.text();
            if (data === "updated") {
                console.log("Expense updated successfully");
                for (let i = 0; i < expense.tags.length; i++) {
                    const tagIdToDelete = expense.tags[i].tag.tagId;
                    if (!selectedTagsId.includes(tagIdToDelete) || importanceLevel !== prevImportanceLevel) {
                        await handleDeleteExpensesTags(expense.tags[i].expensesTagsId);
                    }
                }
                for (const tag of selectedTagsId) {
                    if (!prevSelectedTagsId.includes(tag) || importanceLevel !== prevImportanceLevel) {
                        await handleAddingExpensesTags(tag, expense.expenseId);
                    }
                }
                navigate("/expenses")
            } else if (data === "expenseNotFound") {
                setError("Wydatek nie istnieje")
            }
        } catch (error) {
            setError("Błąd podczas pobierania wydatku.");
            console.log(error);
        }
    }

    const handleDeleteExpensesTags = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/expenses-tags/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

            const data = await response.text();
            if (data === "deleted") {
                console.log("Expenses tags deleted successfully");
            }
        } catch (error) {
            setError("Błąd podczas edytowania wydatku tagu.");
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
    });

    useEffect(() => {
        const selectedTagIds = expense.tags.map(tag => tag.tag.tagId);
        setSelectedTagsID(selectedTagIds);
        const importanceLevelToSet = expense.tags[0]?.importanceLevel;
        if (importanceLevelToSet !== undefined) {
            setImportanceLevel(expense.tags[0].importanceLevel);
        } else {
            setImportanceLevel("");
        }
        setPrevImportanceLevel(importanceLevel);
        setSelectedTags(expense.tags.map(tag => tag.tag.tagName));
        setPrevSelectedTagsID(selectedTagIds);
    }, [expense]);

    const handleCancel = () => {
        navigate("/expenses");
    };

    return (
        <div className="edit-expense">
            <h1>Edytuj wydatek:</h1>
            <form onSubmit={handleEdit}>
                {user.role === "admin" && (
                    <div>
                        <p>Użytkownik ID: {expense.user ? expense.user.userID : "Brak użytkownika"}</p>
                        <p>Nazwa użytkownika: {expense.user ? expense.user.username : "Brak użytkownika"}</p>
                    </div>
                )}
                <p hidden>
                    Expense ID:
                    <input
                        type="text"
                        name="expenseId"
                        value={expense.expenseId}
                        readOnly
                    />
                </p>
                <p>Opis:</p>
                <input
                    type="text"
                    name="description"
                    value={expense.description}
                    onChange={handleInputChange} required
                />
                <p>Kwota:</p>
                <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={handleInputChange} required
                />
                <p>Data:</p>
                <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={handleInputChange} required
                />
                <p>Tagi:</p>
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
                </select>
                <p>Ważność:</p>
                <input
                    type="text"
                    name="importanceLevel"
                    value={importanceLevel} required
                    onChange={(e) => {
                        setImportanceLevel(e.target.value)
                    }}
                /><br/>
                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Anuluj</button>
            </form>
            {error && <p>{error}</p>}
        </div>);
};

export default EditExpense;
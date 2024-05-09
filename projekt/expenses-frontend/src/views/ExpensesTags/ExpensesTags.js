import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../providers/UserProvider";
import {useNavigate} from "react-router-dom";
import {ExpensesTagsContext} from "../../providers/ExpensesTagsProvider";
import Pagination from "../../providers/Pagination";

const ExpensesTags = () => {
    const {user} = useContext(UserContext);
    const {setExpensesTag} = useContext(ExpensesTagsContext);
    const [expensesTags, setExpensesTags] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [filterCriteria, setFilterCriteria] = useState({searchTerm: ""});
    const token = sessionStorage.getItem('token');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const handleUserExpensesTags = async (id) => {
            let apiUrl = "";

            if (user.role === "admin") {
                apiUrl = "http://localhost:8080/expenses-tags/view/all";
            } else {
                apiUrl = `http://localhost:8080/expenses-tags/view/users/${id}`;
            }
            try {
                const response = await fetch(
                    apiUrl,
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
                    console.log("ExpensesTags retrieved successfully");
                    setExpensesTags(data);
                }
            } catch (error) {
                console.log("Error while downloading expensesTags.");
            }
        }
        handleUserExpensesTags(user.userID);
    }, []);

    const handleDeleteExpensesTag = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/expenses-tags/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.text();

            if (data === "expensesTagNotFound") {
                setError("Wydatek Tag nie istnieje");
            } else if (data === "deleted") {
                console.log("Expenses Tag deleted successfully");
                setExpensesTags((prevExpensesTags) => prevExpensesTags.filter((expensesTag) => expensesTag.expensesTagsId !== id));
            }
        } catch (error) {
            console.error("Error deleting expensesTag:", error);
        }
    };

    const handleAddingExpensesTag = () => {
        navigate("/add-expenses-tags");
    }

    const handleRowClick = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/expenses-tags/view/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

            const data = await response.json();
            if (data !== null) {
                console.log("ExpenseTag retrieved successfully");
                setExpensesTag(data);
                navigate(`/edit-expenses-tags/${id}`);
            }
        } catch (error) {
            setError("Błąd podczas pobierania tagu. Spróbuj ponownie.");
        }
    }

    const handleFilterChange = (e) => {
        const {value} = e.target;

        setFilterCriteria({
            searchTerm: value
        });
    };

    const filter = (expensesTag) => {
        const filterText = filterCriteria.searchTerm.toLowerCase();

        const valuesToCheck = [
            expensesTag.expensesTagsId.toString(),
            expensesTag.importanceLevel,
            expensesTag.expense.expenseId.toString(),
            expensesTag.tag.tagId.toString()
        ];

        return valuesToCheck
            .join("")
            .toLowerCase()
            .includes(filterText);
    };

    const totalExpensesTags = expensesTags.filter(filter).length;
    const totalPages = Math.ceil(totalExpensesTags / perPage);
    const indexOfLastExpensesTag = currentPage * perPage;
    const indexOfFirstExpensesTag = indexOfLastExpensesTag - perPage;
    const currentExpensesTags = expensesTags
        .filter(filter)
        .slice(indexOfFirstExpensesTag, indexOfLastExpensesTag);

    return (
        <div className="tags">
            <h1>Wydatki-Tagi:</h1>
            <button onClick={handleAddingExpensesTag}>Dodaj wydatek-tag</button>

            <div className="filter">
                <label htmlFor="filterInput">Filtruj: </label>
                <input
                    type="text"
                    id="filterInput"
                    name="filter"
                    value={Object.values(filterCriteria).join("")}
                    onChange={handleFilterChange}
                />
            </div>

            {expensesTags.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>ID wydatku-tagu</th>
                        <th>Poziom ważności</th>
                        <th>ID tagu</th>
                        <th>Nazwa tagu</th>
                        <th>ID wydatku</th>
                        <th>Wydatek</th>
                        <th>Usuń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentExpensesTags.map((expensesTag) => (
                        <tr key={expensesTag.expensesTagsId}
                            onClick={() => handleRowClick(expensesTag.expensesTagsId)}>
                            <td>{expensesTag.expensesTagsId}</td>
                            <td>{expensesTag.importanceLevel}</td>
                            <td>{expensesTag.tag.tagId}</td>
                            <td>{expensesTag.tag.tagName}</td>
                            <td>{expensesTag.expense.expenseId}</td>
                            <td>{expensesTag.expense.description}</td>
                            <td>
                                <button
                                    className="table-button"
                                    onClick={(e) => handleDeleteExpensesTag(e, expensesTag.expensesTagsId)}>X
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default ExpensesTags;
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/Expenses.css"
import {UserContext} from "../../providers/UserProvider";
import {ExpenseContext} from "../../providers/ExpenseProvider";
import Pagination from "../../providers/Pagination";

const Expenses = () => {
    const {user} = useContext(UserContext);
    const {setExpense} = useContext(ExpenseContext);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        searchTerm: ""
    });
    const token = sessionStorage.getItem('token');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const handleExpenses = async () => {
            try {
                let apiUrl = "";

                if (user.role === "admin") {
                    apiUrl = "http://localhost:8080/expenses/view/all";
                } else {
                    apiUrl = `http://localhost:8080/expenses/view/users/${user.userID}`;
                }
                const response = await fetch(
                    apiUrl,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                const data = await response.json();
                if (data !== null) {
                    console.log("Expenses retrieved successfully");
                    const updatedExpenses = await Promise.all(data.map(async (expense) => {
                        const tagsData = await fetchExpensesTags(expense.expenseId);
                        return {...expense, tags: tagsData};
                    }));
                    setExpenses(updatedExpenses);
                }
            } catch (error) {
                setError("Błąd podczas pobierania wydatków. Spróbuj ponownie.");
            }
        }
        handleExpenses();
    }, []);


    const fetchExpensesTags = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/expenses-tags/view/expenses/${id}`,
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
                console.log("Tags retrieved successfully");
                return data;
            }
        } catch (error) {
            setError("Błąd podczas pobierania tagów.");
            return [];
        }
    }

    const handleRowClick = async (id) => {
        if (user.role === "guest") {
            setError("Brak uprawnień do edytowania wydatków.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/expenses/view/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

            const data = await response.json();
            if (data !== null) {
                console.log("Expense retrieved successfully");
                const tagsData = await fetchExpensesTags(id);
                const expenseWithTags = {...data, tags: tagsData};
                setExpense(expenseWithTags);
                navigate(`/edit-expense/${id}`);
            }
        } catch (error) {
            setError("Błąd podczas pobierania wydatku. Spróbuj ponownie.");
        }
    }

    const handleDeleteExpense = async (e, id) => {
        e.stopPropagation();

        if (user.role === "guest") {
            setError("Brak uprawnień do usuwania wydatków.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/expenses/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.text();

            if (data === "expenseNotFound") {
                setError("Wydatek nie istnieje");
            } else if (data === "deleted") {
                console.log("Expense deleted successfully");
                setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.expenseId !== id));
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const handleAddingExpense = () => {
        navigate("/add-expense");
    }

    const handleFilterChange = (e) => {
        const {value, name} = e.target;

        setFilterCriteria((prevFilterCriteria) => ({
            ...prevFilterCriteria,
            [name]: value,
        }));
    };

    const filterExpenses = (expense) => {
        const filterText = filterCriteria.searchTerm.toLowerCase();
        return (
            Object.values(expense)
                .join("")
                .toLowerCase()
                .includes(filterText) ||
            expense.tags
                .map(tag => tag.tag.tagName.toLowerCase())
                .join("")
                .includes(filterText) ||
            (user.role === "admin" &&
                (expense.user ? expense.user.username.toLowerCase().includes(filterText) : false)) ||
            (user.role === "admin" &&
                (expense.user ? expense.user.userID.toString().includes(filterText) : false))
        );
    };

    const exampleExpenses = [
        {
            expenseId: 1,
            date: "2024-02-15",
            description: "Przykładowy wydatek 1",
            amount: 25.0,
            user: {
                userID: 1,
                username: "guest_user",
            },
            tags: [
                {tag: {tagId: 1, tagName: "ExampleTag1"}},
                {tag: {tagId: 2, tagName: "ExampleTag2"}},
            ],
        },
        {
            expenseId: 2,
            date: "2024-02-16",
            description: "Przykładowy wydatek 2",
            amount: 35.0,
            user: {
                userID: 1,
                username: "guest_user",
            },
            tags: [
                {tag: {tagId: 3, tagName: "ExampleTag3"}},
                {tag: {tagId: 4, tagName: "ExampleTag4"}},
            ],
        },
        {
            expenseId: 3,
            date: "2024-02-17",
            description: "Przykładowy wydatek 3",
            amount: 45.0,
            user: {
                userID: 1,
                username: "guest_user",
            },
            tags: [
                {tag: {tagId: 5, tagName: "ExampleTag5"}},
                {tag: {tagId: 6, tagName: "ExampleTag6"}},
            ],
        },
    ];

    const displayedExpenses = user.role === "guest" ? exampleExpenses : expenses;

    const totalExpenses = displayedExpenses.filter(filterExpenses).length;
    const totalPages = Math.ceil(totalExpenses / perPage);
    const indexOfLastExpense = currentPage * perPage;
    const indexOfFirstExpense = indexOfLastExpense - perPage;
    const currentExpenses = displayedExpenses
        .filter(filterExpenses)
        .slice(indexOfFirstExpense, indexOfLastExpense);

    return (
        <div>
            <h1>Wydatki</h1>
            <button onClick={handleAddingExpense}>Dodaj wydatek</button>

            <div className="filter">
                <label htmlFor="filterInput">Filtruj: </label>
                <input
                    type="text"
                    id="filterInput"
                    name="searchTerm"
                    value={filterCriteria.searchTerm}
                    onChange={handleFilterChange}
                />
            </div>

            {displayedExpenses.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        {user.role === "admin" && <th>ID wydatku</th>}
                        <th>Data</th>
                        <th>Opis</th>
                        <th>Kwota</th>
                        {user.role === "admin" && <th>Użytkownik</th>}
                        {user.role === "admin" && <th>Nazwa użytkownika</th>}
                        <th>Tagi</th>
                        <th>Usuń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentExpenses.map((expense) => (
                        <tr key={expense.expenseId} onClick={() => handleRowClick(expense.expenseId)}>
                            {user.role === "admin" && (
                                <td>{expense.expenseId}</td>
                            )}
                            <td>{expense.date}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            {user.role === "admin" && (
                                <td>{expense.user ? expense.user.userID : "Brak użytkownika"}</td>
                            )}
                            {user.role === "admin" && (
                                <td>{expense.user ? expense.user.username : "Brak użytkownika"}</td>
                            )}
                            <td>{expense.tags.map(tag => tag.tag.tagName).join(', ')}</td>
                            <td>
                                <button className="table-button"
                                        onClick={(e) => handleDeleteExpense(e, expense.expenseId)}>X
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Expenses;
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserDetailsContext from "../../providers/UserDetailsProvider";
import Pagination from "../../providers/Pagination";
import {UserContext} from "../../providers/UserProvider";

const Users = () => {
    const {user} = useContext(UserContext);
    const token = sessionStorage.getItem('token');
    const {setUserDetails} = useContext(UserDetailsContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [filterCriteria, setFilterCriteria] = useState({
        searchTerm: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const handleUsers = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/users/view/all`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                const data = await response.json();
                if (data !== null) {
                    console.log("Users retrieved successfully");
                    const filteredUsers = data.filter(user => user.role);
                    setUsers(filteredUsers);
                }
            } catch (error) {
                console.log("Error while downloading users.");
            }
        }
        handleUsers();
    }, []);

    const handleRowClick = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/users/view/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

            const data = await response.json();
            if (data !== null) {
                console.log("User retrieved successfully");
                setUserDetails(data);
                navigate(`/edit-user/${id}`);
            }
        } catch (error) {
            setError("Błąd podczas pobierania użytkownika. Spróbuj ponownie.");
            console.log(error);
        }
    }

    const handleDeleteUser = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.text();

            if (data === "userNotFound") {
                setError("Użytkownik nie istnieje");
            } else if (data === "deleted") {
                console.log("User deleted successfully");
                setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== id));
                if(user.userID === id){
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };

    const handleAddingUser = () => {
        navigate("/add-user");
    }

    const handleFilterChange = (e) => {
        const {value} = e.target;

        setFilterCriteria({
            searchTerm: value
        });
    };

    const filter = (user) => {
        const filterText = filterCriteria.searchTerm.toLowerCase();
        return (
            Object.values(user)
                .join("")
                .toLowerCase()
                .includes(filterText)
        );
    };

    const totalUsers = users.filter(filter).length;
    const totalPages = Math.ceil(totalUsers / perPage);
    const indexOfLastUser = currentPage * perPage;
    const indexOfFirstUSer = indexOfLastUser - perPage;
    const currentUsers = users
        .filter(filter)
        .slice(indexOfFirstUSer, indexOfLastUser);


    return (
        <div className="tags">
            <h1>Użytkownicy:</h1>
            <button onClick={handleAddingUser}>Dodaj Użytkownika</button>

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

            {users.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>ID Użytkownika</th>
                        <th>Nazwa użytkownika</th>
                        <th>Email</th>
                        <th>Rola</th>
                        <th>Data utworzenia</th>
                        <th>Usuń</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.userID} onClick={() => handleRowClick(user.userID)}>
                            <td>{user.userID}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.createDate}</td>
                            <td>
                                <button
                                    className="table-button"
                                    onClick={(e) => handleDeleteUser(e, user.userID)}>X
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

export default Users;
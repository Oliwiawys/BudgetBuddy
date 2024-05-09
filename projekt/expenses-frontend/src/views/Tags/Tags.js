import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TagContext} from "../../providers/TagProvider";
import {UserContext} from "../../providers/UserProvider";
import Pagination from "../../providers/Pagination";

const Tags = () => {
    const token = sessionStorage.getItem('token');
    const {user} = useContext(UserContext);
    const {setTag} = useContext(TagContext);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        searchTerm: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const handleTags = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/tags/view/all`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                const data = await response.json();
                if (data !== null) {
                    console.log("Tags retrieved successfully");
                    setTags(data);
                }
            } catch (error) {
                console.log("Error while downloading tags.");
            }
        }
        handleTags();
    }, []);

    const handleAddingTag = () => {
        navigate("/add-tag");
    }

    const handleDeleteTag = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8080/tags/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.text();

            if (data === "tagNotFound") {
                setError("Tag nie istnieje");
            } else if (data === "deleted") {
                console.log("Tag deleted successfully");
                setTags((prevTags) => prevTags.filter((tag) => tag.tagId !== id));
            }
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    const handleRowClick = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/tags/view/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

            const data = await response.json();
            if (data !== null) {
                console.log("Tag retrieved successfully");
                setTag(data);
                navigate(`/edit-tag/${id}`);
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

    const filter = (tag) => {
        const filterText = filterCriteria.searchTerm.toLowerCase();
        return (
            Object.values(tag)
                .join("")
                .toLowerCase()
                .includes(filterText)
        );
    };

    const totalTags = tags.filter(filter).length;
    const totalPages = Math.ceil(totalTags / perPage);
    const indexOfLastTag = currentPage * perPage;
    const indexOfFirstTag = indexOfLastTag - perPage;
    const currentTags = tags
        .filter(filter)
        .slice(indexOfFirstTag, indexOfLastTag);

    return (
        <div className="tags">
            <h1>Tagi:</h1>
            {user.role === "admin" && (
                <button onClick={handleAddingTag}>Dodaj tag</button>
            )}

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

            {tags.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        {user.role === "admin" && <th>ID tagu</th>}
                        <th>Nazwa tagu</th>
                        <th>Opis tagu</th>
                        {user.role === "admin" && <th>Usuń</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {currentTags.map((tag) => (
                        <tr key={tag.tagId}
                            onClick={user.role === "admin" ? () => handleRowClick(tag.tagId) : undefined}>
                            {user.role === "admin" && (
                                <td>{tag.tagId}</td>
                            )}
                            <td>{tag.tagName}</td>
                            <td>{tag.tagDescription}</td>
                            {user.role === "admin" && (
                                <td>
                                    <button
                                        className="table-button"
                                        onClick={(e) => handleDeleteTag(e, tag.tagId)}
                                    >
                                        X
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            {error && <p className="error-message">{error}</p>}
        </div>);
};

export default Tags;
import {useContext} from "react";
import {UserContext} from "../providers/UserProvider";
import {Link} from "react-router-dom";

const NavBar = () => {
    const {user} = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="nav-buttons">
                {user && (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/users" className="nav-link">
                                Użytkownicy
                            </Link>
                        )}
                        {user.role === 'admin' && (
                            <Link to="/add-user" className="nav-link">
                                Dodaj użytkownika
                            </Link>
                        )}
                        <Link to="/expenses" className="nav-link">
                            Wydatki
                        </Link>
                        <Link to="/add-expense" className="nav-link">
                            Dodaj wydatek
                        </Link>
                        <Link to="/tags" className="nav-link">
                            Tagi
                        </Link>
                        {user.role === 'admin' && (
                            <Link to="/add-tag" className="nav-link">
                                Dodaj tag
                            </Link>)}
                        {user.role === 'admin' && (
                            <Link to="/expenses-tags" className="nav-link">
                                Wydatki-Tagi
                            </Link>
                        )}
                        {user.role === 'admin' && (
                            <Link to="/add-expenses-tags" className="nav-link">
                                Dodaj wydatek-tag
                            </Link>
                        )}
                        <Link to="/user" className="nav-link">
                            Użytkownik
                        </Link>
                        <Link to="/" className="nav-link">
                            Wyloguj się
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
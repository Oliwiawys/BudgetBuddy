import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Expenses from './views/Expenses/Expenses';
import Login from "./views/Login";
import Register from "./views/Register";
import EditExpense from "./views/Expenses/EditExpense";
import AddExpense from "./views/Expenses/AddExpense";
import ProtectedRoute from "./providers/ProtectedRoute";
import "./styles/Home.css"
import UserProvider from "./providers/UserProvider";
import ExpenseProvider from "./providers/ExpenseProvider";
import Tags from "./views/Tags/Tags";
import ExpensesTags from "./views/ExpensesTags/ExpensesTags";
import User from "./views/User";
import NavBar from "./views/NavBar";
import Users from "./views/Users/Users";
import EditUser from "./views/Users/EditUser";
import {UserDetailsProvider} from "./providers/UserDetailsProvider";
import AddTag from "./views/Tags/AddTag";
import TagProvider from "./providers/TagProvider";
import EditTag from "./views/Tags/EditTag";
import AddUser from "./views/Users/AddUser";
import AddExpensesTags from "./views/ExpensesTags/AddExpensesTags";
import ExpensesTagsProvider from "./providers/ExpensesTagsProvider";
import EditExpensesTag from "./views/ExpensesTags/EditExpensesTag";

function App() {
    return (
        <Router>
            <UserProvider>
                <TagProvider>
                    <ExpensesTagsProvider>
                        <ExpenseProvider>
                            <UserDetailsProvider>
                                <>
                                    <Routes>
                                        <Route path="/" element={
                                            <div className="home">
                                                <h1>BudgetBuddy</h1>
                                                <p className="start">Aplikacja upraszczająca zarządzanie twoimi finansami</p>
                                                <Link to="/login">
                                                    <button>Zaloguj się</button>
                                                    <br/>
                                                </Link>
                                                <Link to="/register">
                                                    <button>Zarejestruj się</button>
                                                </Link>
                                            </div>
                                        }/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route path="/*" element={
                                            <ProtectedRoute>
                                                <NavBar/>
                                                <Routes>
                                                    <Route path="/expenses" element={<Expenses/>}/>
                                                    <Route path="/add-expense" element={<AddExpense/>}/>
                                                    <Route path="/edit-expense/:id" element={<EditExpense/>}/>
                                                    <Route path="/tags" element={<Tags/>}/>
                                                    <Route path="/add-tag" element={<AddTag/>}/>
                                                    <Route path="/edit-tag/:id" element={<EditTag/>}/>
                                                    <Route path="/expenses-tags" element={<ExpensesTags/>}/>
                                                    <Route path="/add-expenses-tags" element={<AddExpensesTags/>}/>
                                                    <Route path="/edit-expenses-tags/:id" element={<EditExpensesTag/>}/>
                                                    <Route path="/users" element={<Users/>}/>
                                                    <Route path="/add-user" element={<AddUser/>}/>
                                                    <Route path="/edit-user/:id" element={<EditUser/>}/>
                                                    <Route path="/user" element={<User/>}/>
                                                </Routes>
                                            </ProtectedRoute>
                                        }
                                        />
                                    </Routes>
                                </>
                            </UserDetailsProvider>
                        </ExpenseProvider>
                    </ExpensesTagsProvider>
                </TagProvider>
            </UserProvider>
        </Router>
    );
}

export default App;

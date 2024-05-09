import React, {createContext, useState} from "react";

export const ExpenseContext = createContext(null);

export const ExpenseProvider = ({children}) => {
    const [expense, setExpense] = useState(null);

    return (
        <ExpenseContext.Provider value={{expense, setExpense}}>
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseProvider;
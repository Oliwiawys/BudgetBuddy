import React, {createContext, useState} from 'react';

export const ExpensesTagsContext = createContext(null);

export const ExpensesTagsProvider = ({children}) => {
    const [expensesTag, setExpensesTag] = useState(null);

    return (
        <ExpensesTagsContext.Provider value={{expensesTag, setExpensesTag}}>
            {children}
        </ExpensesTagsContext.Provider>
    );
};

export default ExpensesTagsProvider;
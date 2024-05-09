import React, {createContext, useState} from 'react';

export const TagContext = createContext(null);

export const TagProvider = ({children}) => {
    const [tag, setTag] = useState(null);

    return (
        <TagContext.Provider value={{tag, setTag}}>
            {children}
        </TagContext.Provider>
    );
};

export default TagProvider;
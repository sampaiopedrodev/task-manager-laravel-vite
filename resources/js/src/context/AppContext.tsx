import React, { useState } from 'react';

type AppContextType = {
    isDrawerOpened:boolean,
    toggleDrawer: () => void
}

export const AppContext = React.createContext({} as AppContextType);

export const AppProvider = ({children}) => {
    const [isDrawerOpened, _toggleDrawer] = useState(false);

    const toggleDrawer = () => {
        _toggleDrawer(!isDrawerOpened);
    };

    const appContext: AppContextType = {
        isDrawerOpened,
        toggleDrawer,
    }

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    );
}
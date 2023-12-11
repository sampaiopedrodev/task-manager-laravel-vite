import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import { useUserStore } from './store/userStore';

export default function App() {
    const getAuthUser = useUserStore((state) => state.getAuthUser);
    console.log("goal");
    useEffect(() => {
        getAuthUser();
    }, [getAuthUser]);
    
    return (
        <AppProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AppProvider>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
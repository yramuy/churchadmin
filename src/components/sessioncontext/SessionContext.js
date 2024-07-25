import { createContext, useContext, useState } from "react";

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </SessionContext.Provider>
    );
};
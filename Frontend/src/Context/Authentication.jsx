import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()
export const Authentication = ({ children }) => {
    const initialAuth = localStorage.getItem("Users");
    const [authUser, setAuthUser] = useState(
        initialAuth ? JSON.parse(initialAuth) : undefined
    );
    return (
        <AuthContext.Provider value={[authUser, setAuthUser ]}>
            {children}
        </AuthContext.Provider>

    )
}
export const useAuth =()=> useContext(AuthContext);

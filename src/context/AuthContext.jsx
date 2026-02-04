import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check local storage for persistent login (mock)
        const storedUser = localStorage.getItem('sb_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAdmin(parsedUser.email === 'jeancy.mifundu@gmail.com');
        }
    }, []);

    const login = (email) => {
        const userObj = { email, name: email.split('@')[0] };
        setUser(userObj);
        setIsAdmin(email === 'jeancy.mifundu@gmail.com');
        localStorage.setItem('sb_user', JSON.stringify(userObj));
    };

    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('sb_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

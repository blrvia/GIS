import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user object
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const tokenResult = await getIdTokenResult(currentUser, true);
        setToken(tokenResult.token);
        setRole(tokenResult.claims.role || 'department_user');
        setDepartment(tokenResult.claims.department || null);
      } else {
        setUser(null);
        setToken(null);
        setRole(null);
        setDepartment(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, role, department, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


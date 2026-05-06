import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    // Rehydrate from localStorage immediately (no flicker on app open)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      return {
        userId:     storedUserId,
        userRole:   localStorage.getItem('userRole')   || '',
        userName:   localStorage.getItem('userName')   || '',
        userEmail:  localStorage.getItem('userEmail')  || '',
        userMobile: localStorage.getItem('userMobile') || '',
      };
    }
    return null;
  });

  const [authReady, setAuthReady] = useState(false);

  // ── Firebase Auth state listener ──────────────────────────────────────────
  // Runs once on mount. Keeps Firebase token session in sync with our custom
  // user object stored in localStorage / AuthContext state.
  useEffect(() => {
    const firebaseAuth = getAuth();
    const database     = getDatabase();

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firebase session is alive — make sure our custom user object matches
        const storedId = localStorage.getItem('userId');

        if (storedId && storedId === firebaseUser.uid) {
          // Already in sync — nothing to do
          setAuthReady(true);
          return;
        }

        // localStorage was cleared or mismatched — re-fetch user data from DB
        const collections = ['users', 'doctor', 'Hospital'];
        let userData  = null;
        let userRole  = '';

        for (const col of collections) {
          const snap = await get(ref(database, `${col}/${firebaseUser.uid}`));
          if (snap.exists()) {
            userData = snap.val();
            userRole = col === 'users' ? 'patient' : col === 'doctor' ? 'doctor' : 'hospital';
            break;
          }
        }

        if (userData) {
          const userName =
            userRole === 'patient'  ? `${userData.First || ''} ${userData.Last || ''}`.trim()
            : userRole === 'doctor' ? `Dr. ${userData.First || ''} ${userData.Last || ''}`.trim()
            : userData.HospitalName || 'Hospital';

          const newUser = {
            userId:     firebaseUser.uid,
            userRole,
            userName,
            userEmail:  userData.Email  || firebaseUser.email || '',
            userMobile: userData.Mobile || '',
          };

          setUser(newUser);
          localStorage.setItem('userId',     newUser.userId);
          localStorage.setItem('userRole',   newUser.userRole);
          localStorage.setItem('userName',   newUser.userName);
          localStorage.setItem('userEmail',  newUser.userEmail);
          localStorage.setItem('userMobile', newUser.userMobile);
        }
      } else {
        // Firebase session ended (token expired / manual signOut)
        // Only clear state if we currently have a user stored
        if (localStorage.getItem('userId')) {
          _clearUser();
        }
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // ── Internal helpers ──────────────────────────────────────────────────────
  const _clearUser = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userMobile');
  };

  // ── Public API ────────────────────────────────────────────────────────────

  const login = (userId, userRole = '', userName = '', userEmail = '', userMobile = '') => {
    const userData = { userId, userRole, userName, userEmail, userMobile };
    setUser(userData);
    localStorage.setItem('userId',     userId);
    localStorage.setItem('userRole',   userRole);
    localStorage.setItem('userName',   userName);
    localStorage.setItem('userEmail',  userEmail);
    localStorage.setItem('userMobile', userMobile);
  };

  // logout: signs out of Firebase AND clears local state, then redirects
  const logout = async (redirectTo = '/login') => {
    try {
      const firebaseAuth = getAuth();
      await signOut(firebaseAuth);
    } catch (e) {
      console.error('Firebase signOut error:', e);
    }
    _clearUser();

    // Redirect — works with both HashRouter and BrowserRouter
    if (typeof window !== 'undefined') {
      // Use hash-based navigation (your app uses HashRouter)
      window.location.hash = redirectTo;
    }
  };

  const setUserId = (userId) => {
    if (user) {
      const updated = { ...user, userId };
      setUser(updated);
      localStorage.setItem('userId', userId);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      setUserId,
      authReady,
      isAuthenticated: !!user?.userId,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
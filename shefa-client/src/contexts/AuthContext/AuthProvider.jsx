import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Google Login
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔐 Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔐 Update Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // 🔥 SINGLE AUTH LISTENER (FIXED)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://shefa-server.vercel.app/users/${currentUser.email}`,
        );

        if (!res.ok) {
          throw new Error("User not found in DB");
        }

        const data = await res.json();

        setUser({
          ...currentUser,
          role: data?.role || "patient",
        });
      } catch (error) {
        console.log("Role fetch error:", error);

        // fallback user (IMPORTANT)
        setUser({
          ...currentUser,
          role: "patient",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userId: user?.uid,
    userName: user?.displayName || user?.email || "User",
    role: user?.role,
    userInfo: {
      id: user?.uid,
      name: user?.displayName || user?.email || "User",
      role: user?.role,
    },
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

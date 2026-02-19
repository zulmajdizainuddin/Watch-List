"use client";

import { useEffect, useState, useCallback } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from "firebase/auth";
import { auth } from "@lib/firebaseClient";

interface UseAuthState {
  user: User | null;
  loading: boolean;
}

export function useAuth() {
  const [{ user, loading }, setState] = useState<UseAuthState>({
    user: null,
    loading: true
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, nextUser => {
      setState({ user: nextUser, loading: false });
    });

    return () => unsub();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };
}


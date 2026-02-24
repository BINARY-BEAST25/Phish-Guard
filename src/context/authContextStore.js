import { createContext } from "react";

export const AuthContext = createContext(null);

export const DEV_AUTH_FALLBACK = {
    user: null,
    loading: true,
    signInWithGoogle: async () => null,
    signInEmail: async () => null,
    registerEmail: async () => null,
    signOutUser: async () => null,
    resetPassword: async () => null,
    signInGuest: async () => null,
    verifyEmail: async () => null,
    linkGoogle: async () => null,
    linkEmail: async () => null,
    deleteAccount: async () => null,
};

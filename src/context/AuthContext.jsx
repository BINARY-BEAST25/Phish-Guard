/**
 * AuthContext
 * Provides the currently signed-in Firebase user (or null) to the whole tree.
 * Also exposes sign-in / sign-out helpers directly from context.
 *
 * Usage:
 *   const { user, loading, signInWithGoogle, signOutUser } = useAuth();
 */
import { useEffect, useState } from "react";
import {
    onAuthChange,
    completeRedirectSignIn,
    signInWithGoogle,
    signInEmail,
    registerEmail,
    signOutUser,
    resetPassword,
    signInGuest,
    verifyEmail,
    linkGoogle,
    linkEmail,
    deleteAccount,
} from "../firebase/auth";
import { AuthContext } from "./authContextStore";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        completeRedirectSignIn().catch((error) => {
            if (import.meta.env.DEV) {
                console.warn("Redirect sign-in resolution failed:", error?.code || error?.message);
            }
        });

        const unsub = onAuthChange((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsub;
    }, []);

    const value = {
        user,
        loading,
        signInWithGoogle,
        signInEmail,
        registerEmail,
        signOutUser,
        resetPassword,
        signInGuest,
        verifyEmail,
        linkGoogle,
        linkEmail,
        deleteAccount,
    };

    // While Firebase resolves existing sessions don't flash the UI
    if (loading) return null;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

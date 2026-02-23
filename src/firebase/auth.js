/**
 * Firebase Auth helpers
 * Provides: signInWithGoogle, signInEmail, registerEmail,
 *           signOutUser, resetPassword, onAuthChange
 */
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendEmailVerification,
    signInAnonymously as firebaseSignInAnonymously,
    linkWithPopup,
    linkWithCredential,
    EmailAuthProvider,
    deleteUser,
    reauthenticateWithPopup,
    reauthenticateWithCredential,
} from "firebase/auth";

import { auth } from "./config";
import { createOrUpdateUser, deleteUserData } from "./db";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function shouldFallbackToRedirect(error) {
    const code = error?.code || "";
    const msg = String(error?.message || "");
    return (
        code === "auth/popup-blocked" ||
        code === "auth/cancelled-popup-request" ||
        code === "auth/network-request-failed" ||
        msg.includes("Pending promise was never set")
    );
}

export async function completeRedirectSignIn() {
    const result = await getRedirectResult(auth);
    if (result?.user) {
        await createOrUpdateUser(result.user);
        return result.user;
    }
    return null;
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        await createOrUpdateUser(result.user);
        return result.user;
    } catch (error) {
        if (!shouldFallbackToRedirect(error)) throw error;
        await signInWithRedirect(auth, googleProvider);
        return null;
    }
}

// ─── Email / Password ─────────────────────────────────────────────────────────
export async function registerEmail(email, password, displayName) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await createOrUpdateUser(user);
    return user;
}

export async function signInEmail(email, password) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await createOrUpdateUser(user);
    return user;
}

export async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
}

export async function verifyEmail() {
    if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
    }
}

export async function signInGuest() {
    const { user } = await firebaseSignInAnonymously(auth);
    await createOrUpdateUser(user);
    return user;
}

// ─── Guest Upgrade / Linking ────────────────────────────────────────────────
export async function linkGoogle() {
    if (!auth.currentUser) throw new Error("No user is currently signed in.");
    const result = await linkWithPopup(auth.currentUser, googleProvider);
    // After linking, ensure the user document reflects any changes (though UID remains the same)
    await createOrUpdateUser(result.user);
    return result.user;
}

export async function linkEmail(email, password) {
    if (!auth.currentUser) throw new Error("No user is currently signed in.");
    const credential = EmailAuthProvider.credential(email, password);
    const result = await linkWithCredential(auth.currentUser, credential);
    await createOrUpdateUser(result.user);
    return result.user;
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export async function signOutUser() {
    await signOut(auth);
}

// ─── Auth State Observer ──────────────────────────────────────────────────────
/** Calls `callback` whenever the signed-in user changes. Returns unsubscribe fn. */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/** Deletes the authenticated user and all associated Firestore data. */
export async function deleteAccount() {
    if (!auth.currentUser) return;

    const removeAccount = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid || !auth.currentUser) return;
        await deleteUserData(uid);
        await deleteUser(auth.currentUser);
    };

    const currentUser = auth.currentUser;
    const providerIds = (currentUser?.providerData || []).map((p) => p.providerId);

    try {
        await removeAccount();
    } catch (e) {
        if (e?.code !== "auth/requires-recent-login") {
            console.error("Deletion failed:", e);
            throw e;
        }

        try {
            if (providerIds.includes("google.com")) {
                await reauthenticateWithPopup(currentUser, googleProvider);
            } else if (providerIds.includes("password") && currentUser?.email) {
                const password = window.prompt("Enter your password to confirm account deletion:");
                if (!password) {
                    const cancelledError = new Error("Account deletion cancelled.");
                    cancelledError.code = "auth/requires-recent-login";
                    throw cancelledError;
                }
                const credential = EmailAuthProvider.credential(currentUser.email, password);
                await reauthenticateWithCredential(currentUser, credential);
            } else {
                throw e;
            }
        } catch (reauthError) {
            console.error("Re-authentication failed:", reauthError);
            throw reauthError;
        }

        await removeAccount();
    }
}

export { auth };

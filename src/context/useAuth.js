import { useContext } from "react";
import { AuthContext, DEV_AUTH_FALLBACK } from "./authContextStore";

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        if (import.meta.env.DEV) return DEV_AUTH_FALLBACK;
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}

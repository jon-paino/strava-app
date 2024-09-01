"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider basePath="/api/auth">
            {children}
        </SessionProvider>
    );
}

export default SessionWrapper;
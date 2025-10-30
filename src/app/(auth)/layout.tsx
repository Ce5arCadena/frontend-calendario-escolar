import { ReactNode } from "react";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    return(
        <div className="flex bg-light min-h-screen items-center justify-center">
            {children}
        </div>
    );
}
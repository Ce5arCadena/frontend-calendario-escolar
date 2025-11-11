'use client';
import '../globals.css';
import { ReactNode } from "react";
import SnowAnimation from "../_shared/_animations/snowAnimation";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    return(
        <html lang="en">
            <body
                className={`antialiased flex gap-6 w-screen`}
            >
                <div className="w-full rounded-md shadow-xl bg-white">
                    <div className="flex bg-light min-h-screen items-center justify-center">
                        <div className="w-full absolute z-50">
                            <SnowAnimation/>
                        </div>
                        <div className="w-full sm:w-[60%] md:w-[55%] lg:w-[45%] xl:w-[35%] rounded-4xl mx-4 sm:m-0 p-8 bg-accent-light/10 shadow-lg flex flex-col items-center justify-center z-50">
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
};
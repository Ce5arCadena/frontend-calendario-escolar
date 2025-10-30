'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import AvatarLogin from '@/app/_shared/svgs/avatar-login.svg';
import { AiOutlineEye, AiOutlineEyeInvisible  } from "react-icons/ai";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className="w-full md:w-[30%] m-4 rounded-4xl p-8 shadow-2xl flex flex-col items-center justify-center">
            <div className='flex flex-col items-center'>
                <Image 
                    src={AvatarLogin}
                    alt='Avatar de login'
                    className='h-26 w-26'
                />
                <h2 className='text-2xl text-dark font-semibold'>¡Bienvenido!</h2>
            </div>
            <form className='flex flex-col items-center w-full'>
                <div className="flex w-[80%]">
                    <div className="w-full px-3 mb-5">
                        <label htmlFor="" className="text-xs font-semibold px-1">Correo</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <MdOutlineEmail className="mdi mdi-email-outline text-gray-400 text-lg"/>
                            </div>
                            <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-accent transition ease-in duration-300" placeholder="carls@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="flex w-[80%]">
                    <div className="w-full px-3 mb-8">
                        <label htmlFor="" className="text-xs font-semibold px-1">Contraseña</label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <RiLockPasswordLine className="mdi mdi-lock-outline text-gray-400 text-lg"/>
                            </div>
                            <input type={!showPassword ? "text" : "password"} className="w-full -ml-10 -mr-10 pl-10 pr-10 py-2 rounded-lg border border-gray-200 outline-none focus:border-accent transition ease-in duration-300" placeholder="************" />
                            <div className="w-10 z-10 text-center cursor-pointer flex items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                                { 
                                    showPassword ? (
                                        <AiOutlineEye className="mdi mdi-lock-outline text-gray-400 text-lg"/>
                                    ) : (
                                        <AiOutlineEyeInvisible className="mdi mdi-lock-outline text-gray-400 text-lg"/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-[80%] px-3 mb-6">
                    <button className='border w-full border-accent rounded-lg px-3 py-2 text-accent-dark cursor-pointer hover:bg-accent hover:text-light transition ease-in duration-300'>Ingresar</button>
                </div>
                <div className="flex w-[80%] px-3">
                    <h3 className='underline cursor-pointer hover:text-accent transition ease-in-out duration-300'>¿Deseas registrarte?</h3>
                </div>
            </form>
        </div>
    );
}
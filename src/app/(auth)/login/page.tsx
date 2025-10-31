'use client';

import Image from 'next/image';
import { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import AvatarLogin from '@/app/_shared/svgs/avatar-login.svg';
import { AiOutlineEye, AiOutlineEyeInvisible  } from "react-icons/ai";
import SnowAnimation from '@/app/_shared/_animations/snowAnimation';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Email incorrecto.').required('El email es requerido'),
        password: Yup.string().required('La contraseña es requerida').min(6, 'Mínimo 6 carácteres').matches(/[A-Z]/, 'Mínimo 1 mayúscula').matches(/[a-z]/, 'Mínimo 1 minúscula').matches(/[0-9]/, 'Mínimo un número')
    });

    // Formulario
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
            console.log('*****', values);
        },
        validationSchema: loginSchema
    });

    return(
        <>
            <div className="w-full absolute z-50">
                <SnowAnimation/>
            </div>
            <div className="w-full md:w-[30%] m-4 rounded-4xl p-8 bg-accent-light/10 shadow-lg flex flex-col items-center justify-center z-50">
                <div className='flex flex-col items-center'>
                    <Image 
                        src={AvatarLogin}
                        loading='lazy'
                        alt='Avatar de login'
                        className='h-26 w-26'
                    />
                    <h2 className='text-2xl text-dark font-semibold'>¡Bienvenido!</h2>
                </div>
                <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
                    <div className="flex w-[80%]">
                        <div className="w-full px-3 mb-5">
                            <label htmlFor="" className="text-xs font-semibold px-1">Correo</label>
                            <div className="flex flex-col">
                                <div className='flex'>
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <MdOutlineEmail className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                    </div>
                                    <input 
                                        type="email" 
                                        name='email' 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" placeholder="carls@example.com"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                </div>
                                {
                                    formik.touched?.email && formik.errors?.email && (
                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                            {formik.errors.email}
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[80%]">
                        <div className="w-full px-3 mb-8">
                            <label htmlFor="" className="text-xs font-semibold px-1">Contraseña</label>
                            <div className="flex flex-col">
                                <div className='flex'>
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <RiLockPasswordLine className="mdi mdi-lock-outline text-gray-400 text-lg"/>
                                    </div>
                                    <input 
                                        type={!showPassword ? "text" : "password"} 
                                        name='password' 
                                        className="w-full -ml-10 -mr-10 pl-10 pr-10 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" placeholder="************" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
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
                                {
                                    formik.touched?.password && formik.errors?.password && (
                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                            {formik.errors.password}
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[80%] px-3 mb-6">
                        <button type='submit' className='border w-full border-accent rounded-lg px-3 py-2 text-accent-dark cursor-pointer hover:bg-accent hover:text-light transition ease-in duration-300'>Ingresar</button>
                    </div>
                    <div className="flex w-[80%] px-3">
                        <h3 className='underline cursor-pointer hover:text-accent transition ease-in-out duration-300'>¿Deseas registrarte?</h3>
                    </div>
                </form>
            </div>
        </>
    );
}
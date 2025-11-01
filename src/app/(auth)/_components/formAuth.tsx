'use client';

import * as Yup from 'yup';
import Image from 'next/image';
import { useState } from 'react';
import { useFormik } from 'formik';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { LoginForm } from '@/app/_shared/types/loginType';
import AvatarLogin from '@/app/_shared/svgs/avatar-login.svg';
import AvatarRegister from '@/app/_shared/svgs/avatar-register.svg';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email incorrecto.').required('El email es requerido'),
    password: Yup.string().required('La contraseña es requerida').min(6, 'Mínimo 6 carácteres').matches(/[A-Z]/, 'Mínimo 1 mayúscula').matches(/[a-z]/, 'Mínimo 1 minúscula').matches(/[0-9]/, 'Mínimo un número')
});

const registerSchema = loginSchema.concat(Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio.').min(3, 'Mínimo 3 carácteres')
}));

export default function FormAuth({ isRegisterForm = false }: { isRegisterForm: boolean}) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    // Formulario
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: (values: LoginForm) => {
            console.log('*****', values);
        },
        validationSchema: isRegisterForm ? registerSchema : loginSchema
    });

    return(
        <>
            <div className='flex flex-col items-center'>
                <Image 
                    src={isRegisterForm ? AvatarRegister : AvatarLogin}
                    alt='Avatar de login'
                    className='h-26 w-26'
                />
                <h2 className='text-2xl text-dark font-semibold'>¡Bienvenido!</h2>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-full'>
                {
                    isRegisterForm && (
                        <div className="flex w-[80%]">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">Nombre</label>
                                <div className="flex flex-col">
                                    <div className='flex'>
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <FaRegUser className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                        </div>
                                        <input 
                                            type="text" 
                                            name='name' 
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" placeholder="carls@example.com"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                    </div>
                                    {
                                        formik.touched?.name && formik.errors?.name && (
                                            <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                {formik.errors.name}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="flex w-full md:w-[80%]">
                    <div className="w-full md:px-3 mb-5">
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
                <div className="flex w-full md:w-[80%]">
                    <div className="w-full md:px-3 mb-5">
                        <label htmlFor="" className="text-xs font-semibold px-1">Contraseña</label>
                        <div className="flex flex-col">
                            <div className='flex'>
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                    <RiLockPasswordLine className="mdi mdi-lock-outline text-gray-400 text-lg"/>
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
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
                <div className="flex w-full md:w-[80%] md:px-3 justify-end mb-3">
                    <h3 className='underline text-sm cursor-pointer text-accent hover:text-primary transition ease-in-out duration-300'>¿Olvidaste tu contraseña?</h3>
                </div>
                <div className="flex w-full md:w-[80%] md:px-3 mb-6">
                    <button type='submit' className='border w-full border-accent rounded-lg px-3 py-2 text-accent-dark cursor-pointer hover:bg-accent hover:text-light transition ease-in duration-300'>Ingresar</button>
                </div>
                {
                    isRegisterForm && (
                        <div className="flex w-full md:w-[80%] md:px-3">
                            <button 
                                type='button'
                                className='underline cursor-pointer text-sm text-accent hover:text-primary transition ease-in-out duration-300'
                                onClick={() => router.push('/login')}
                            >
                                ¿Ya tienes una cuenta?
                            </button>
                        </div>
                    )
                }
                {
                    !isRegisterForm && (
                        <div className="flex w-full md:w-[80%] md:px-3">
                            <button 
                                type='button'
                                className='underline cursor-pointer text-sm text-accent hover:text-primary transition ease-in-out duration-300'
                                onClick={() => router.push('/register')}
                            >
                                ¿No tienes una cuenta?
                            </button>
                        </div>
                    )
                }
            </form>
        </>
    );

};
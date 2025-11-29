'use client';

import Image from "next/image";
import { useState } from "react";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { LuPanelLeftOpen } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";

import IconDashboard from '@/app/_shared/svgs/avatar-men.svg';
import { ItemsNavigation } from "../types/itemsNavigationTypes";
import { usePathname } from "next/navigation";

const optionsNavigations: ItemsNavigation[] = [
    {
        id: 'subjects',
        icon: <MdOutlineSubject size={23}/>,
        label: 'Materias',
        // subItems: [
        //     { id: 'subjectsList', label: 'Lista', icon: <CiCircleList size={23}/> },
        //     { id: 'subjectsCreate', label: 'Crear', icon: <IoAddCircleOutline size={23}/>}
        // ]
    },
    {
        id: 'calendar',
        icon: <FaRegCalendarCheck size={23}/>,
        label: 'Calendario'
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isExpand, setIsExpand] = useState(true);
    const [subItemIsExpand, setSubItemIsExpand] = useState<Record<string, boolean>>({});
    const userName = localStorage.getItem('username') || '';

    const toggleSubMenu = (id: string) => setSubItemIsExpand(prev => ({
        ...prev,
        [id]: !prev[id]
    }));

    const handleOpenSidebar = (id: string) => {
        if (isExpand) return;
        if (!isExpand) {
            toggleSubMenu(id);
            setIsExpand(true)
        };
    };

    return (
        <div className={`${isExpand ? 'w-56' : 'w-16'} relative left-0 top-0 min-h-screen bg-light shadow-2xl flex flex-col gap-4 items-center z-50`}>
            {/* Ícono de cerrar o abrir el sidebar */}
            {
                isExpand ? (
                    <LuPanelLeftClose size={25} className="w-16 absolute top-4 -right-8 cursor-pointer text-accent" onClick={() => setIsExpand(false)}/>
                ) : (
                    <LuPanelLeftOpen size={25} className="w-16 absolute top-4 -right-8 cursor-pointer text-accent" onClick={() => setIsExpand(true)}/>
                )
            }

            {/* Avatar y nombre de app */}
            <div className="w-full flex flex-col items-center border-b border-gray-300 pb-3">
                <Image 
                    src={IconDashboard}
                    alt="Icon dashboard"
                    className={`${isExpand ? 'w-24 h-24' : ''}`}
                />
                <h3 className={`${!isExpand ? 'hidden': ''} font-semibold text-xl text-accent-dark`}>Hola, {userName?.slice(0, 10)}</h3>
            </div>

            {/* Items del sidebar */}
            <div className="flex flex-col justify-between gap-1 w-full p-2 overflow-y-auto h-[78vh]">
                <div>
                    {
                        optionsNavigations.map(({id, icon, label, subItems}) => (
                            <div key={id} className={`flex ${isExpand ? 'flex-col' : 'justify-center'} cursor-pointer transtion ease-in-out duration-300 text-accent-dark`}>
                                <div 
                                    className={`flex justify-between hover:bg-accent/20 rounded-md mb-2 p-1.5 transition duration-300 ease-in ${pathname && pathname.slice(1) === id ? 'bg-accent/20' : ''}`}
                                    onClick={() => toggleSubMenu(id)}
                                >
                                    {/* <div className="flex gap-2">
                                        <span onClick={() => handleOpenSidebar(id)}>
                                            {icon}
                                        </span>
                                        <button className={`${isExpand ? 'flex' : 'hidden'} cursor-pointer`}>
                                            {label}
                                        </button>
                                    </div> */}
                                    <Link href={`/${id}`} className="flex gap-2">
                                        <span onClick={() => handleOpenSidebar(id)}>
                                            {icon}
                                        </span>
                                        <button className={`${isExpand ? 'flex' : 'hidden'} cursor-pointer`}>
                                            {label}
                                        </button>
                                    </Link>
                                    {
                                        isExpand && subItems && subItems.length > 0 && (
                                            <>
                                                {
                                                    !subItemIsExpand[id] ? (
                                                        <IoIosArrowDown size={23}/>
                                                    ) : (
                                                        <IoIosArrowUp size={23}/>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>

                                {
                                    isExpand && subItemIsExpand[id] && subItems?.map(({id, label, icon}) => (
                                        <div className="flex flex-col ml-8 p-1 hover:bg-accent/20 transition duration-300 ease-in rounded-md" key={id}>
                                            <div className="flex gap-2">
                                                { icon }
                                                <span className="text-accent-dark">{label}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="flex gap-2 cursor-pointer p-1.5 text-accent items-center hover:bg-accent/20 transition duration-300 ease-in rounded-md">
                    <CgProfile size={23}/>
                    <h4 className={`${!isExpand ? 'hidden': ''} font-semibold text-sm text-accent-dark`}>Perfil</h4>
                </div>
            </div>
        </div>
    );
}
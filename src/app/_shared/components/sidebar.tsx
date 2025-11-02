'use client';

import Image from "next/image";
import { useState } from "react";

import { CgProfile } from "react-icons/cg";
import { CiCircleList } from "react-icons/ci";
import { LuPanelLeftOpen } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";

import IconDashboard from '@/app/_shared/svgs/avatar-men.svg';
import { ItemsNavigation } from "../types/itemsNavigationTypes";

// Se deja este código por base de otro estilo de sidebar
// const Sidebar = () => {
//     const sidebarRef = useRef<HTMLDivElement>(null);
//     const [isMobile, setIsMobile] = useState(false);
//     const [isExpanded, setIsExpanded] = useState(true);

//     const [hoveredItem, setHoveredItem] = useState<string | null>('');

//     const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isMobile && isExpanded && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//                 setIsExpanded(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [isMobile, isExpanded]);

//     const navigationItems: ItemsNavigation[] = [
//         { 
//             icon: <FiHome size={24} />, 
//             label: "Materias", 
//             id: "subjects",
//             subModules: [
//                 { label: "Lista", id: "listSubjects" },
//                 { label: "Crear", id: "createSubjects" }
//             ]
//         },
//         { 
//             icon: <FiUser size={24} />, 
//             label: "About", 
//             id: "about",
//             subModules: [
//                 { label: "Team", id: "team" },
//                 { label: "Company", id: "company" }
//             ]
//         },
//         { 
//             icon: <FiSettings size={24} />, 
//             label: "Services", 
//             id: "services",
//             subModules: [
//                 { label: "Maintenance", id: "maintenance" },
//                 { label: "Consulting", id: "consulting" }
//             ]
//         },
//         { 
//             icon: <FiMail size={24} />, 
//             label: "Contact", 
//             id: "contact",
//             subModules: [
//                 { label: "Support", id: "support" },
//                 { label: "Sales", id: "sales" }
//             ]
//         },
//     ];

//     const toggleSubMenu = (itemId: string) => {
//         setOpenSubMenus(prev => ({
//             ...prev,
//             [itemId]: !prev[itemId]
//         }));
//     };

//     const toggleSidebar = () => {
//         setIsExpanded(!isExpanded);
//     };

//     return (
//         <div
//             ref={sidebarRef}
//             className={`fixed left-0 top-0 h-screen bg-light transition-all duration-300 ease-in-out
//                 ${isExpanded ? "w-64" : "w-16"}
//                 ${isMobile && !isExpanded ? "-translate-x-full" : "translate-x-0"}
//                 z-50 overflow-y-auto`
//             }
//         >
//         <div className="flex h-full flex-col">
//             <div className="flex items-center justify-between p-4">
//                 {isExpanded && (
//                     <h1 className="text-xl font-bold">Dashboard</h1>
//                 )}
//                 <button
//                     onClick={toggleSidebar}
//                     className="rounded-lg p-2 hover:bg-accent/50 hover:text-white focus:outline-none transition ease-in duration-300"
//                     aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
//                 >
//                     {isExpanded ? <FiChevronLeft size={24} /> : <FiMenu size={24} />}
//                 </button>
//             </div>

//             <nav className="flex-1">
//                 <ul className="space-y-2 p-4">
//                     {navigationItems.map((item) => (
//                         <li key={item.id} className="relative">
//                             <div className="flex flex-col">
//                                 <button
//                                     onClick={() => toggleSubMenu(item.id)}
//                                     onMouseEnter={() => !isExpanded && setHoveredItem(item.id)}
//                                     onMouseLeave={() => !isExpanded && setHoveredItem(null)}
//                                     className={`flex items-center rounded-lg p-2 transition-colors duration-200 w-full
//                                         ${isExpanded ? "justify-between" : "justify-center"}
//                                         hover:bg-accent/50 hover:text-white focus:outline-none transition ease-in duration-300`
//                                     }
//                                     aria-label={!isExpanded ? item.label : undefined}
//                                 >
//                                         <div className={`flex items-center ${isExpanded ? "space-x-4" : ""}`}>
//                                             <span className="shrink-0">{item.icon}</span>
//                                             {isExpanded && (
//                                                 <span className="truncate">{item.label}</span>
//                                             )}
//                                         </div>
//                                         {isExpanded && item.subModules && (
//                                             <FiChevronRight
//                                                 className={`transition-transform duration-200 ${openSubMenus[item.id] ? "rotate-90" : ""}`}
//                                             />
//                                         )}
//                                 </button>

//                             {((isExpanded && openSubMenus[item.id]) || (!isExpanded && hoveredItem === item.id)) && (
//                                 <ul 
//                                 className={`mt-2 space-y-2 rounded-lg
//                                     ${!isExpanded ? "absolute left-16 top-0 w-48 p-2 shadow-lg z-50" : "ml-8"}`}
//                                 >
//                                 {item.subModules.map((subModule) => (
//                                     <li key={subModule.id}>
//                                         <a
//                                             href={`#${subModule.id}`}
//                                             className="block rounded-lg p-2 text-sm hover:bg-accent/50 hover:text-white transition ease-in duration-300"
//                                         >
//                                             {subModule.label}
//                                     </a>
//                                     </li>
//                                 ))}
//                                 </ul>
//                             )}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             <div className="border-t border-gray-700 p-4">
//                 <div className={`flex items-center ${isExpanded ? "space-x-4" : "justify-center"}`}>
//                     <div className="h-8 w-8 rounded-full bg-gray-600"></div>
//                     {isExpanded && (
//                         <div>
//                             <p className="font-medium">John Doe</p>
//                             <p className="text-sm text-gray-400">Admin</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>

//         {/* {isMobile && isExpanded && (
//             <div
//                 className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
//                 style={{ zIndex: -1 }}
//             />
//         )} */}
//         </div>
//     );
// };

const optionsNavigations: ItemsNavigation[] = [
    {
        id: 'subjects',
        icon: <MdOutlineSubject size={23}/>,
        label: 'Materias',
        subItems: [
            { id: 'subjectsList', label: 'Lista', icon: <CiCircleList size={23}/> },
            { id: 'subjectsCreate', label: 'Crear', icon: <IoAddCircleOutline size={23}/>}
        ]
    },
    {
        id: 'calendar',
        icon: <FaRegCalendarCheck size={23}/>,
        label: 'Calendario'
    }
];

export default function Sidebar() {
    const [isExpand, setIsExpand] = useState(true);
    const [subItemIsExpand, setSubItemIsExpand] = useState<Record<string, boolean>>({});

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
        <div className={`${isExpand ? 'w-56' : 'w-16'} fixed left-0 top-0 min-h-screen bg-light shadow-2xl flex flex-col gap-4 items-center z-50`}>
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
                <h3 className={`${!isExpand ? 'hidden': ''} font-semibold text-xl text-accent-dark`}>Hola, Cesar</h3>
            </div>

            {/* Items del sidebar */}
            <div className="flex flex-col justify-between gap-1 w-full p-2 overflow-y-auto h-[78vh]">
                <div>
                    {
                        optionsNavigations.map(({id, icon, label, subItems}) => (
                            <div key={id} className={`flex ${isExpand ? 'flex-col' : 'justify-center'} cursor-pointer transtion ease-in-out duration-300 text-accent-dark`}>
                                <div 
                                    className={`flex justify-between hover:bg-accent/20 rounded-md mb-2 p-1.5 transition duration-300 ease-in ${isExpand && subItemIsExpand[id] ? 'bg-accent/20' : ''}`}
                                    onClick={() => toggleSubMenu(id)}
                                >
                                    <div className="flex gap-2">
                                        <span onClick={() => handleOpenSidebar(id)}>
                                            {icon}
                                        </span>
                                        <button className={`${isExpand ? 'flex' : 'hidden'} cursor-pointer`}>
                                            {label}
                                        </button>
                                    </div>
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
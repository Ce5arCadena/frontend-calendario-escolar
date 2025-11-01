'use client';

import Image from "next/image";
import { useState } from "react";

import { LuPanelLeftOpen } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";

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
        label: 'Materias'
    },
    {
        id: 'calendar',
        icon: <FaRegCalendarCheck size={23}/>,
        label: 'Calendario'
    },
];

export default function Sidebar() {
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div 
            className={`${isExpand ? 'w-56' : 'w-16'} fixed left-0 top-0 min-h-screen bg-light shadow-2xl flex flex-col gap-4 items-center`}>
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
                    <h3 className={`${!isExpand ? 'hidden': ''} font-semibold text-xl text-accent-dark`}>Mi Calendario</h3>
                </div>

                {/* Items del sidebar */}
                <div className="flex flex-col gap-3 w-full p-2">
                    <ul className="">
                        {
                            optionsNavigations.map(({id, icon, label}) => (
                                <li key={id} className={`flex ${isExpand ? 'gap-3' : 'justify-center'} mb-3 p-1.5 border border-accent-dark hover:border-primary-dark rounded-3xl transtion ease-in-out duration-300 text-accent-dark hover:text-white hover:bg-primary cursor-pointer`}>
                                    <span>
                                        {icon}
                                    </span>
                                    <button className={`${isExpand ? 'flex' : 'hidden'}`}>
                                        {label}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
        </div>
    );
}
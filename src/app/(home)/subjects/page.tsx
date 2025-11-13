'use client';

import { useState } from "react";

import { CgSearch } from "react-icons/cg";

import { CardSubject } from "./_components/cardSubject";
import { CreateSubject } from "./_components/createSubject";
import { CardViewSubject } from "./_components/cardViewSubject";
import { DaysOfWeeek } from "@/app/_shared/types/subjectsTypes";
import { Subject } from "@/app/_shared/interfaces/subjectInterfaces";

const daysOfWeek: DaysOfWeeek = [
    {
        id: 1,
        label: "Lunes"
    },
    {
        id: 2,
        label: "Martes"
    },
    {
        id: 3,
        label: "Miércoles"
    },
    {
        id: 4,
        label: "Jueves"
    },
    {
        id: 5,
        label: "Viernes"
    },
    {
        id: 6,
        label: "Sábado"
    },
    {
        id: 7,
        label: "Domingo"
    }
];

const subjectsData: Subject[] = [
    {
        id: "SUB-D101-2025",
        name: "Estructuras de Datos Avanzadas",
        // #007bff (Azul)
        color: "0,123,255", 
        weekDays: [
        {
            day: "Lunes",
            startTime: "08:30",
            endTime: "10:00",
            classroom: "Lab. 203"
        },
        {
            day: "Jueves",
            startTime: "10:30",
            endTime: "12:00",
            classroom: "Aula Magna B"
        }
        ],
        nameTeacher: "Dr. Elena Castillo",
        materials: [
        "Libro: Algoritmos en Java",
        "Acceso a plataforma IDE"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-08-25T15:10:00.000Z")
    },
    {
        id: "SUB-UX205-2025",
        name: "Diseño de Experiencia de Usuario (UX)",
        // #28a745 (Verde)
        color: "40,167,69", 
        weekDays: [
        {
            day: "Martes",
            startTime: "14:00",
            endTime: "16:30",
            classroom: "Taller Creativo C"
        }
        ],
        nameTeacher: "Lic. Martín Suárez",
        materials: [
        "Cuenta Figma",
        "Guía de Accesibilidad"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-08-01T08:00:00.000Z")
    },
    {
        id: "SUB-H401-2025",
        name: "Historia del Arte Moderno",
        // #dc3545 (Rojo)
        color: "220,53,69", 
        weekDays: [
        {
            day: "Miercoles",
            startTime: "18:00",
            endTime: "20:00",
            classroom: "Auditorio Principal"
        }
        ],
        nameTeacher: "Prof. Ana López",
        materials: [
        "Diapositivas de la clase"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z")
    },
    {
        id: "SUB-F105-2025",
        name: "Fundamentos de Finanzas",
        // #ffc107 (Amarillo/Dorado)
        color: "255,193,7", 
        weekDays: [
        {
            day: "Miercoles",
            startTime: "10:00",
            endTime: "11:30",
            classroom: "B-305"
        },
        {
            day: "Viernes",
            startTime: "10:00",
            endTime: "11:30",
            classroom: "B-305"
        }
        ],
        nameTeacher: "Msc. Ricardo Vélez",
        materials: [
        "Calculadora financiera"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-09-01T12:00:00.000Z")
    },
    {
        id: "SUB-S301-2025",
        name: "Seminario de Tesis",
        // #6f42c1 (Púrpura)
        color: "111,66,193", 
        weekDays: [
        {
            day: "Sabado",
            startTime: "09:00",
            endTime: "12:00"
        }
        ],
        nameTeacher: "Dra. Carolina Ríos",
        materials: [
        "Manual APA"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-08-15T09:00:00.000Z")
    },
    {
        id: "SUB-P202-2025",
        name: "Programación Orientada a Objetos",
        // #17a2b8 (Turquesa)
        color: "23,162,184", 
        weekDays: [
        {
            day: "Lunes",
            startTime: "10:30",
            endTime: "12:30",
            classroom: "Lab. 101"
        },
        {
            day: "Miercoles",
            startTime: "08:00",
            endTime: "10:00",
            classroom: "Lab. 101"
        }
        ],
        nameTeacher: "Ing. Julián Castro",
        materials: [
        "Libro de C++",
        "Software Visual Studio"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-09-05T18:30:00.000Z")
    },
    {
        id: "SUB-I303-2025",
        name: "Ingeniería de Requisitos",
        // #fd7e14 (Naranja)
        color: "253,126,20", 
        weekDays: [
        {
            day: "Martes",
            startTime: "08:00",
            endTime: "09:30",
            classroom: "Virtual Meeting"
        },
        {
            day: "Viernes",
            startTime: "08:00",
            endTime: "09:30",
            classroom: "Virtual Meeting"
        }
        ],
        nameTeacher: "Dra. Laura Múnera",
        materials: [
        "Plantillas UML",
        "Artículos de investigación"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z")
    },
    {
        id: "SUB-M101-2025",
        name: "Cálculo Diferencial",
        // #6c757d (Gris)
        color: "108,117,125", 
        weekDays: [
        {
            day: "Lunes",
            startTime: "14:00",
            endTime: "16:00",
            classroom: "Aula A-5"
        },
        {
            day: "Miercoles",
            startTime: "14:00",
            endTime: "16:00",
            classroom: "Aula A-5"
        }
        ],
        nameTeacher: "Prof. David Morales",
        materials: [
        "Libro de Cálculo de Stewart"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-08-01T08:00:00.000Z")
    },
    {
        id: "SUB-T404-2025",
        name: "Teoría de la Computación",
        // #e83e8c (Rosado)
        color: "232,62,140", 
        weekDays: [
        {
            day: "Jueves",
            startTime: "17:00",
            endTime: "19:00",
            classroom: "B-101"
        }
        ],
        nameTeacher: "Ph.D. Sofía Rincón",
        materials: [
        "Notas de clase"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z"),
        updatedAt: new Date("2025-08-20T11:00:00.000Z")
    },
    {
        id: "SUB-L100-2025",
        name: "Cátedra Universitaria",
        // #343a40 (Gris oscuro)
        color: "52,58,64", 
        weekDays: [
        {
            day: "Domingo",
            startTime: "10:00",
            endTime: "11:00",
            classroom: "Sala de Reuniones"
        }
        ],
        nameTeacher: "Msc. Juan Pérez",
        materials: [
        "Reglamento estudiantil"
        ],
        createdAt: new Date("2025-08-01T08:00:00.000Z")
    }
];

export default function Subjects() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalViewSubject, setShowModalViewSubject] = useState(false);

    return(
        <div className="max-h-full flex flex-col w-full">
            <div className="w-full flex gap-2 justify-between h-[7%]">
                {/* Búsqueda */}
                <div className="flex w-[80%] gap-2">
                    <div className="w-full md:w-[30%]">
                        <div className="w-full">
                            <div className="flex flex-col">
                                <div className='flex'>
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <CgSearch className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                    </div>
                                    <input 
                                        type="email" 
                                        name='email' 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" placeholder="Busca una materia"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        value={searchQuery}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filtrar por día de la semana (L,M,MM,J,V,S,D) o por hora en la que se da la clase (10,11,2,3,4) */}
                    <div className="w-full md:w-[35%]">
                        <div className="flex w-full gap-3">
                            <div className='flex flex-col w-[50%]'>
                                <select id="countries" className="border border-gray-400 text-gray-900 outline-0 text-sm rounded-lg block w-full p-2.5">
                                    <option>Selecciona un día</option>
                                    {
                                        daysOfWeek.map(({id, label}) => (
                                            <option key={id} value={id}>{label}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='flex w-[30%]'>
                                <input 
                                    type="time" 
                                    name='hourStart' 
                                    className="w-full pl-5 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" placeholder="Busca una materia"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acción de crear una materia */}
                <div className="w-[10%]">
                    <button 
                        type='button' 
                        className='border w-full border-accent rounded-lg px-3 py-2 hover:text-accent-dark cursor-pointer bg-accent hover:bg-light text-light transition ease-in duration-300'
                        onClick={() => setShowModalCreate(true)}
                    >
                        Cear materia
                    </button>
                </div>
            </div>

            {/* Lista de cards, que van a ser en grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[80vh] gap-4 mt-3 mb-4 overflow-y-auto pt-1">
                {
                    subjectsData.map(item => (
                        <CardSubject key={item.id} subject={item} setShowModalViewSubject={setShowModalViewSubject}/>
                    ))
                }
            </div>

            {
                showModalViewSubject && (
                    <CardViewSubject setShowModalViewSubject={setShowModalViewSubject}/>
                )
            }

            {
                showModalCreate && (
                    <CreateSubject setShowModalCreate={setShowModalCreate}/>
                )
            }

            {/* Paginación de cards */}
            <div className="h-[10%] flex justify-between">
                <div className="">
                    <p>Mostrando 4 de 20 materias</p>
                </div>

                <div className="">
                    1,2,3,4 paginas
                </div>
            </div>
        </div>
    );
}
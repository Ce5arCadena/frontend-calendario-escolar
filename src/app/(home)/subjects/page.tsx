'use client';

import { useEffect, useState } from "react";

import { CgSearch } from "react-icons/cg";

import { useAtomValue, useSetAtom } from "jotai";
import toast, { Toaster } from "react-hot-toast";
import { subjectsAtom } from "./_store/subjectStore";
import { CardSubject } from "./_components/cardSubject";
import { fetchApi } from "@/app/_shared/utils/fetchApi";
import { CreateSubject } from "./_components/createSubject";
import { CardViewSubject } from "./_components/cardViewSubject";
import { DaysOfWeeek } from "@/app/_shared/types/subjectsTypes";
import { Data, Subject } from "@/app/_shared/interfaces/subjectInterfaces";

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

export default function Subjects() {
    const setSubjectsAtom = useSetAtom(subjectsAtom);
    const [searchQuery, setSearchQuery] = useState("");
    const subjectsAtomValue = useAtomValue(subjectsAtom);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalViewSubject, setShowModalViewSubject] = useState(false);

    const getSubjects = async() => {
        try {
            const responseAuth = await fetchApi<Data>(`${process.env.NEXT_PUBLIC_API_URL}/subjects`);
            console.log('-----', responseAuth);
            if (responseAuth.ok && responseAuth.data) {
                setSubjectsAtom(responseAuth.data.subjects);
            }
        } catch (error) {
            console.log('***', error);
            toast('Ocurrió un error al ejecutar la petición',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#279AF1',
                        color: '#fff',
                    },
                    duration: 3000
                }
            );
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return(
        <div className="max-h-full flex flex-col w-full">
            <Toaster
                position='top-center'
                reverseOrder={false}
            />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-h-[80vh] gap-4 mt-3 mb-4 overflow-y-auto pt-1">
                {
                    subjectsAtomValue && subjectsAtomValue.length > 0 && (
                        subjectsAtomValue.map(item => (
                            <CardSubject key={item.id} subject={item} setShowModalViewSubject={setShowModalViewSubject}/>
                        ))
                    )
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
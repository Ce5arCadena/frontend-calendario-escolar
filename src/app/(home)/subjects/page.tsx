'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

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
import ReactPaginate from "react-paginate";

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

const ITEMSPERPAGE = 16;

export default function Subjects() {
    const timeRef = useRef<ReturnType<typeof setTimeout>>(null);
    const setSubjectsAtom = useSetAtom(subjectsAtom);
    const [currentPage, setCurrentPage] = useState(1);
    const subjectsAtomValue = useAtomValue(subjectsAtom);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalViewSubject, setShowModalViewSubject] = useState(false);

    const getSubjects = async(search = '') => {
        try {
            let URL = `${process.env.NEXT_PUBLIC_API_URL}/subjects`;
            if (search !== '') URL += `?search=${search}`;

            const responseAuth = await fetchApi<Data>(URL);
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

    const subjectsToShow = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMSPERPAGE;
        const endIndex = startIndex + ITEMSPERPAGE;
        
        return subjectsAtomValue?.slice(startIndex, endIndex); 
    }, [subjectsAtomValue, currentPage]);

    const handlePageClick = ({selected}: {selected: number}) => {
        setCurrentPage(selected + 1);
    };

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            getSubjects();
            return;
        };

        console.log('primer ite', timeRef.current)
        if (timeRef.current) {
            console.log(timeRef.current)
            clearTimeout(timeRef.current)
        };

        console.log('********', timeRef.current)
        timeRef.current = setTimeout(() => {
            getSubjects(e.target.value);
        }, 200);
    }

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
                                        type="text" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300" 
                                        placeholder="Buscar por nombre"
                                        onChange={handleChangeSearch}
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
                    subjectsToShow && subjectsToShow.length > 0 && (
                        subjectsToShow.map(item => (
                            <CardSubject key={item.id} subject={item} setShowModalViewSubject={setShowModalViewSubject}/>
                        ))
                    )
                }

                
            </div>
            <div className="flex">
                
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
            <div className="flex justify-between">
                <p>Mostrando {subjectsToShow?.length} de {subjectsAtomValue?.length} materias</p>
                <ReactPaginate 
                    breakLabel='...'
                    nextLabel='>'
                    previousLabel='<'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil((subjectsAtomValue?.length ?? 0) / ITEMSPERPAGE)}
                    renderOnZeroPageCount={null}
                    containerClassName={'inline-flex -space-x-px rounded-lg shadow-sm text-sm'} 
                    pageClassName={'page-item cursor-pointer'} 
                    pageLinkClassName={'block px-3 py-2 leading-tight text-gray-600 bg-white hover:bg-gray-100 border border-gray-300'}
                    activeClassName={'bg-blue-600 text-white border-blue-600'}
                    activeLinkClassName={'text-gray font-semibold !important'}
                    previousClassName={'page-item cursor-pointer'}
                    previousLinkClassName={'block px-3 py-2 leading-tight text-gray-600 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100'}
                    nextClassName={'page-item cursor-pointer'}
                    nextLinkClassName={'block px-3 py-2 leading-tight text-gray-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'block px-3 py-2 leading-tight text-gray-600 bg-white border border-gray-300'}
                />
            </div>
        </div>
    );
}
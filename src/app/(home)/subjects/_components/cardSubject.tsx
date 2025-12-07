import { useSetAtom } from "jotai";

import { PiEye } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineSubject, MdDelete } from "react-icons/md";
import { FaChalkboardTeacher, FaRegEdit } from "react-icons/fa";

import { subjectAtom } from "../_store/subjectStore";
import { Subject } from "@/app/_shared/interfaces/subjectInterfaces";

export const CardSubject = (
    { 
        subject, 
        deleteSubject, 
        setShowModalViewSubject,
        setShowModalEditSubject 
    }: 
    { 
        subject: Subject, 
        deleteSubject: (subject: Subject) => void,
        setShowModalViewSubject: (value: boolean) => void,
        setShowModalEditSubject: (value: boolean) => void 
    }
) => {
    const setSubjectAtom = useSetAtom(subjectAtom);

    return(
        <div 
            className='rounded-l-2xl relative text-dark rounded-r-sm p-2 shadow-lg min-h-28 transition-all ease-in-out duration-300 cursor-pointer flex flex-col gap-2 border-l-4 border-l-accent-dark bg-accent/30'
        >
            <div className="flex gap-2 w-full">
                <MdOutlineSubject size={23} className="text-accent-dark"/>
                <h3 className="w-full font-medium truncate text-gray-700">{subject.name}</h3>
            </div>

            <div className="flex gap-1">
                {
                    subject.weekDays.map(({day}, index) => (
                        <div className="flex gap-1 items-center" key={index}>
                            <div className="flex items-center gap-1">
                                <LuCalendarDays size={21} className="text-accent-dark"/>
                                <span className="text-sm text-gray-700">{day}</span>
                            </div>
                        </div>
                    ))
                }
                <h4></h4>
            </div>

            {
                subject?.nameTeacher && (
                    <div className="flex items-center gap-1">
                        <FaChalkboardTeacher size={21} className="text-accent-dark"/>
                        <h3 className="font-medium text-gray-700">{subject.nameTeacher}</h3>
                    </div>
                )
            }

            <div className="absolute bottom-5 flex flex-col gap-2 right-1">
                <PiEye 
                    size={21} 
                    className="text-accent-dark cursor-pointer" 
                    onClick={() => {
                        setSubjectAtom(subject);
                        setShowModalViewSubject(true);
                    }}
                />
                <FaRegEdit 
                    size={21} 
                    className="text-accent-dark cursor-pointer"
                    onClick={() => {
                        setSubjectAtom(subject);
                        setShowModalEditSubject(true);
                    }}
                />
                <MdDelete 
                    size={21} 
                    className="text-primary-dark cursor-pointer"
                    onClick={() => deleteSubject(subject)}
                />
            </div>
        </div>
    );
};
import { useAtomValue } from "jotai";

import { LuHouse } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";
import { LiaToolsSolid } from "react-icons/lia";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineSubject } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { subjectAtom } from "../_store/subjectStore";


export const CardViewSubject = ({ setShowModalViewSubject }: { setShowModalViewSubject: (params: boolean) => void} ) => {
    const subjectAtomValue = useAtomValue(subjectAtom);
    return(
        <div className="absolute top-0 left-0 bg-accent/40 rounded-md w-full z-50 h-full flex justify-center items-center">
            <div 
                className='rounded-l-2xl relative rounded-r-sm px-3 py-2 shadow-lg min-h-28 transition-all ease-in-out duration-300 flex flex-col gap-2 border-l-4 border-l-accent-dark bg-accent/80'
            >
                <IoMdCloseCircleOutline 
                    className="-top-2 -right-2 text-accent-dark cursor-pointer rounded-md bg-gray-100 absolute" 
                    size={21}
                    onClick={() => setShowModalViewSubject(false)}
                />
                <div className="flex gap-2 w-full">
                    <MdOutlineSubject size={23} className="text-light"/>
                    <h3 className="w-full font-medium truncate text-light">{subjectAtomValue?.name}</h3>
                </div>

                <div className="flex flex-col gap-3 justify-center border p-2 rounded-md border-light">
                    <h4 className="text-light">Horarios</h4>
                    {
                        subjectAtomValue?.weekDays?.map(({day, startTime, endTime, classroom}, index) => (
                            <div className="flex gap-2 items-center border p-1 rounded-l-lg cursor-pointer transition ease-in-out duration-300 hover:scale-105 rounded-r-sm border-l-4 border-light" key={index}>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <LuCalendarDays size={21} className="text-light"/>
                                        <span className="text-sm text-light font-medium">{day}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TbClockHour3 size={21} className="text-light"/>
                                        <span className="text-sm text-light font-medium">{startTime} - </span>
                                        <span className="text-sm text-light font-medium mr-2">{endTime}</span>
                                        {
                                            classroom && (
                                                <div className="flex gap-2">
                                                    <LuHouse size={21} className="text-light"/>
                                                    <span className="text-sm text-light font-medium">{classroom}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    subjectAtomValue?.nameTeacher && (
                        <div className="border p-2 gap-1 flex flex-col rounded-md border-light">
                            <h4 className="text-light">Profesor</h4>
                            <div className="flex items-center gap-2">
                                <FaChalkboardTeacher size={21} className="text-light"/>
                                <h3 className="font-medium text-light">{subjectAtomValue.nameTeacher}</h3>
                            </div>
                        </div>
                    )
                }

                {
                    subjectAtomValue?.materials && subjectAtomValue?.materials?.length > 0 && (
                        <div className="border p-2 rounded-md border-light flex flex-col gap-1">
                            <h4 className="text-light">Materiales</h4>
                            <div className="flex flex-col gap-3 justify-center">
                                {
                                    subjectAtomValue?.materials?.map((item, index) => (
                                        <div className="flex gap-2 items-center border p-1 rounded-l-lg cursor-pointer transition ease-in-out duration-300 hover:scale-105 rounded-r-sm border-l-4 border-light" key={index++}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <LiaToolsSolid size={21} className="text-light"/>
                                                    <span className="text-sm text-light font-medium">{item}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )   
                }
            </div>
        </div>
    );
};
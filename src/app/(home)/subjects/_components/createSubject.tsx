import * as Yup from 'yup';

import { VscTools } from 'react-icons/vsc';
import { FiMinusCircle } from 'react-icons/fi';
import { MdOutlineSubject } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';

import { Field, FieldArray, Form, Formik } from 'formik';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const createSchemaValidation = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    weekDays: Yup.array().of(
        Yup.object().shape({
            day: Yup.string().required('El día es requerido'),
            startTime: Yup.string().required('Hora requerida'),
            endTime: Yup.string().required('Hora fin requerida'),
            classroom: Yup.string()
        })
    ).min(1, 'Debe ingresar al menos 1 horario'),
    nameTeacher: Yup.string(),
    materials: Yup.array().of(Yup.string())
});

const dayOptions = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export const CreateSubject = ({ setShowModalCreate }: { setShowModalCreate: (value: boolean) => void }) => {
    const initialValues = {
        name: "",
        weekDays: [
            {
                day: "",
                startTime: "",
                endTime: "",
                classroom: ""
            }
        ],
        nameTeacher: "",
        materials: []
    };

    const handleSubmit = (values) => {
        console.log(values);
    };

    return(
        <div className="absolute top-0 left-0 bg-accent/40 rounded-md w-full z-50 h-full flex justify-center items-center">
            <div 
                className='rounded-2xl overflow-y-auto max-h-[70vh] relative p-3 shadow-lg min-h-28 transition-all w-[55%] ease-in-out duration-300 flex flex-col gap-2 bg-light text-gray-600'
            >
                <Formik 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={createSchemaValidation}
                >
                    {({values, resetForm}) => (
                        <Form>
                            <IoMdCloseCircleOutline 
                                className="top-1 right-1 z-50 text-accent-dark cursor-pointer rounded-md bg-gray-100 absolute" 
                                size={21}
                                onClick={() => {
                                    resetForm();
                                    setShowModalCreate(false);
                                }}
                            />
                            <div className='w-full flex'>
                                <div className="w-full md:px-3 mb-2">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Nombre de la materia</label>
                                    <div className="flex flex-col">
                                        <div className='flex'>
                                            <Field name="name">
                                                {
                                                    ({
                                                        field,
                                                        form: {touched, errors},
                                                        meta
                                                    }) => (
                                                        <div className='w-full'>
                                                            <div className='flex'>
                                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                    <MdOutlineSubject className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                                                </div>
                                                                <input 
                                                                    type="text"  
                                                                    placeholder="Matemáticas, Inglés..." 
                                                                    className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none ${meta.touched && meta.error ? 'border-primary-dark' : ''} focus:border-accent-dark transition ease-in duration-300`}
                                                                    {...field}
                                                                />
                                                            </div>
                                                            {meta.touched && meta.error && (
                                                                <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                    {meta.error}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex'>
                                <div className="w-full md:px-3 mb-2">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Nombre del profesor</label>
                                    <div className="flex flex-col">
                                        <div className='flex'>
                                            <Field name="nameTeacher">
                                                {
                                                    ({
                                                        field,
                                                        form: {touched, errors},
                                                        meta
                                                    }) => (
                                                        <div className='w-full'>
                                                            <div className='flex'>
                                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                    <LiaChalkboardTeacherSolid className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    name="nameTeacher" 
                                                                    placeholder="Carlos Trujillo" 
                                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300"
                                                                    {...field}
                                                                />
                                                            </div>
                                                            {meta.touched && meta.error && (
                                                                <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                    {meta.error}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FieldArray name='weekDays'>
                                {({insert, remove, push}) => (
                                    <div className='md:px-3'>
                                        {
                                            values.weekDays.length > 0 ? (
                                                values.weekDays.map((weekDay, index) => (
                                                    <div key={index} className='flex gap-1'>
                                                        <div className='w-full'>
                                                            <label htmlFor="" className="text-xs font-semibold px-1">Día</label>
                                                            <div className="flex flex-col">
                                                                <div className='flex'>
                                                                    <Field name={`weekDays.${index}.day`}>
                                                                        {
                                                                            ({
                                                                                field,
                                                                                form: {touched, errors},
                                                                                meta
                                                                            }) => (
                                                                                <div className='w-full flex flex-col'>
                                                                                    <select
                                                                                        className="border cursor-pointer border-gray-400 text-gray-900 outline-0 text-sm rounded-lg block w-full p-2.5"
                                                                                        {...field}
                                                                                    >   
                                                                                        <option value="">Selecciona</option>
                                                                                        {
                                                                                            dayOptions.map(day => (
                                                                                                <option key={day} value={day}>{day}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                    {meta.touched && meta.error && (
                                                                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                                            {meta.error}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full'>
                                                            <label htmlFor="" className="text-xs font-semibold px-1">Hora inicio</label>
                                                            <div className="flex flex-col">
                                                                <div className='flex'>
                                                                    <Field name={`weekDays.${index}.startTime`}>
                                                                        {
                                                                            ({
                                                                                field,
                                                                                form: {touched, errors},
                                                                                meta,
                                                                            }) => (
                                                                                <div className=''>
                                                                                    <input 
                                                                                        type="time"
                                                                                        className="w-full pl-5 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300"                  
                                                                                        {...field}
                                                                                    />
                                                                                    {meta.touched && meta.error && (
                                                                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                                            {meta.error}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full'>
                                                            <label htmlFor="" className="text-xs font-semibold px-1">Hora fin</label>
                                                            <div className="flex flex-col">
                                                                <div className='flex'>
                                                                    <Field name={`weekDays.${index}.endTime`}>
                                                                        {
                                                                            ({
                                                                                field,
                                                                                form: {touched, errors},
                                                                                meta,
                                                                            }) => (
                                                                                <div className=''>
                                                                                    <input 
                                                                                        type="time"
                                                                                        className="w-full pl-5 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300"                  
                                                                                        {...field}
                                                                                    />
                                                                                    {meta.touched && meta.error && (
                                                                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                                            {meta.error}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='w-full'>
                                                            <label htmlFor="" className="text-xs font-semibold px-1">Aula</label>
                                                            <div className="flex flex-col">
                                                                <div className='flex'>
                                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                        <SiGoogleclassroom className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                                                    </div>
                                                                    <Field 
                                                                        type="text" 
                                                                        name={`weekDays.${index}.classroom`}
                                                                        placeholder="A1, A2..." 
                                                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-end'>
                                                            <button 
                                                                className='text-accent-dark w-full h-[50%] cursor-pointer rounded-md flex justify-center items-center transition ease-in duration-300'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <FiMinusCircle className='text-primary-dark' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <h4 className='text-xs font-medium text-primary-dark'>Debes agregar mínimo 1 horario</h4>
                                            )
                                        }
                                        <div className='mt-2'>
                                            <button 
                                                type='button'
                                                className='border flex gap-1 items-center border-accent rounded-lg px-3 py-2 text-accent-dark cursor-pointer hover:bg-accent hover:text-light transition ease-in duration-300'
                                                onClick={() => push({ day: '', startTime: '', endTime: '', classroom: '' })}
                                            >
                                                <IoAddCircleSharp size={21} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <FieldArray name='materials'>
                                {({insert, remove, push}) => (
                                    <div className='md:px-3 mt-1'>
                                        {
                                            values.materials.length > 0 ? (
                                                values.materials.map((material, index) => (
                                                    <div key={index} className='flex w-full gap-1'>
                                                        <div className='w-full'>
                                                            <label htmlFor="" className="text-xs font-semibold px-1">Material</label>
                                                            <div className="flex flex-col">
                                                                <div className='flex'>
                                                                    <Field name={`materials.${index}`}>
                                                                        {
                                                                            ({
                                                                                field,
                                                                                form: {touched, errors},
                                                                                meta,
                                                                            }) => (
                                                                                <div className='w-full'>
                                                                                    <div className='flex'>
                                                                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                                                            <VscTools className="mdi mdi-email-outline text-gray-400 text-lg"/>
                                                                                        </div>
                                                                                        <input 
                                                                                            type="text" 
                                                                                            placeholder="Tijeras, Calculadora..." 
                                                                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border border-gray-400 outline-none focus:border-accent-dark transition ease-in duration-300"
                                                                                            {...field}
                                                                                        />
                                                                                    </div>
                                                                                    {meta.touched && meta.error && (
                                                                                        <span className="mt-2 text-xs font-semibold text-primary-dark">
                                                                                            {meta.error}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-end'>
                                                            <button 
                                                                className='text-accent-dark w-full h-10 cursor-pointer rounded-md flex justify-center items-center transition ease-in duration-300'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <FiMinusCircle className='text-primary-dark' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <h4 className='text-xs font-medium text-gray-600'>Puedes agregar materiales de clase</h4>
                                            )
                                        }
                                        <div className='mt-2'>
                                            <button
                                                type='button' 
                                                className='border flex gap-1 items-center border-accent rounded-lg px-3 py-2 text-accent-dark cursor-pointer hover:bg-accent hover:text-light transition ease-in duration-300'
                                                onClick={() => push('')}
                                            >
                                                <IoAddCircleSharp size={21} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>

                            <div className="flex mt-2 md:px-3 mb-6 gap-2">
                                <button 
                                    type='submit' 
                                    className='border border-accent rounded-lg px-3 py-2 text-light bg-accent cursor-pointer hover:bg-light hover:text-accent-dark transition ease-in duration-300'
                                >
                                    Registrar
                                </button>

                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowModalCreate(false);
                                    }} 
                                    type='submit' 
                                    className='border border-primary rounded-lg px-3 py-2 text-light bg-primary cursor-pointer hover:bg-light hover:text-accent-dark transition ease-in duration-300'
                                >
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
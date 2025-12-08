'use client';

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import toast, { Toaster } from "react-hot-toast";
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { fetchApi } from "@/app/_shared/utils/fetchApi";
import { Events } from "@/app/_shared/interfaces/scheduleInterfaces";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

export default function Schedules() {
    const [events, setEvents] = useState<Events[]>([]);
    const handleDateClick = (arg: DateClickArg) => {
        console.log(arg)
    };

    const getEvents = async () => {
        try {
            let URL = `${process.env.NEXT_PUBLIC_API_URL}/schedules`;

            const responseAuth = await fetchApi<Events[]>(URL);
            if (responseAuth.ok && responseAuth.data) {
                setEvents(responseAuth.data);
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
        getEvents();
    }, []);

    return(
        <section className="max-h-full flex flex-col w-full">
            <Toaster
                position='top-center'
                reverseOrder={false}
            />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                views={{
                    dayGridWeek: {
                        type: 'timeGrid',
                        duration: { weeks: 1 },
                        nowIndicator: true
                    }
                }}    
                dateClick={handleDateClick}
                headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                }}
                locale={esLocale}
                height='auto'
                nowIndicator={true}
                dayHeaderFormat={{
                    weekday: 'long'
                }}
                events={events}
                displayEventEnd={true}
                displayEventTime={true}
            />
        </section>
    );
}
type HourFormat = `${number}${number}:${number}${number}`;
type colorHex = `${number},${number},${number}`;
type Day = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo';
type WeekDay = {
    day: Day,
    startTime: HourFormat,
    endTime: HourFormat,
    classroom?: string
}

export interface Subject {
    id: string;
    name: string;
    color: colorHex;
    weekDays: WeekDay[];
    nameTeacher?: string;
    materials?: string[];
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date; 
}
// type HourFormat = `${number}${number}:${number}${number}`;
// type colorHex = `${number},${number},${number}`;
// type Day = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo';
// type WeekDay = {
//     day: Day,
//     startTime: HourFormat,
//     endTime: HourFormat,
//     classroom?: string
// }

// export interface Subject {
//     id?: string;
//     name: string;
//     color?: string;
//     weekDays: WeekDay[];
//     nameTeacher?: string;
//     materials?: string[];
//     isActive?: boolean;
//     createdAt?: Date;
//     updatedAt?: Date; 
// }

export interface Data {
    subjects: Subject[];
    total:    number;
}

export interface Subject {
    id:          number;
    name:        string;
    weekDays:    WeekDay[];
    nameTeacher: string;
    materials:   string[];
    user:        User;
}

export interface User {
    id:       number;
    username: string;
    email:    string;
    state:    boolean;
}

export interface WeekDay {
    day:       string;
    endTime:   string;
    startTime: string;
}
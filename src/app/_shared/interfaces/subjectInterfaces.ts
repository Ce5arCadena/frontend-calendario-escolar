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
    day:        string;
    endTime:    string;
    startTime:  string;
    classroom?: string;
}

// Formulario de crear 
export interface FormValues {
  name: string;
  weekDays: WeekDay[];
  nameTeacher?: string;
  materials?: string[];
}
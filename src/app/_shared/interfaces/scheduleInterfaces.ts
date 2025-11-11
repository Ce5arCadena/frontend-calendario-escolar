import { Subject } from "./subjectInterfaces";

export interface Schedule {
    id?: string;
    user: string;
    subjects: Subject
}
import { atom } from "jotai";
import { Subject } from "@/app/_shared/interfaces/subjectInterfaces";

export const subjectsAtom = atom<Subject[]>();
export const subjectAtom = atom<Subject>();
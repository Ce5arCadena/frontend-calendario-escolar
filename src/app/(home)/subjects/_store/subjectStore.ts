import { atom } from "jotai";
import { Subject } from "@/app/_shared/interfaces/subjectInterfaces";

export const subjectAtom = atom<Subject>();
export const subjectsAtom = atom<Subject[]>();
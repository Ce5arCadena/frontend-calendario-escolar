import { ReactElement } from "react";

type subItems = {
    id: string
    label: string,
    icon: ReactElement
}

export type ItemsNavigation = { 
    id: string
    icon: ReactElement 
    label: string 
    subItems?: subItems[] 
}
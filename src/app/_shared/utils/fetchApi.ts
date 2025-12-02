import { getToken, removeToken } from "@/app/(auth)/lib/auth";

type Headers = {
    "Content-Type": string;
    Authorization?: string;
}

interface Options {
    method: string;
    body?: string;
    headers: Headers
}

interface Response<T = any> {
    message: string;
    icon: string;
    data?: T;
    erors?: Record<string, any> | any[];
    ok: boolean;
    token?: string;
    status?: number;
}

export const fetchApi = async <T = any>(
    URL: string, 
    method: string = 'GET', 
    payload: Object = {}
): Promise<Response<T>> => {
    try {
        const token = getToken();
        const options: Options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if (Object.keys(payload).length > 0) {
            options.body = JSON.stringify(payload)
        }

        const response = await fetch(URL, options);
        const json = await response.json();

        return json;
    } catch (error) {
        console.log(error);
        removeToken();
        return {
            message: 'Ocurrió un error al realizar la petición',
            icon: 'error',
            erors: [],
            ok: false
        };
    };
};
import { getToken } from "@/app/(auth)/lib/auth";

type Headers = {
    "Content-Type": string;
    Authorization?: string;
}

interface Options {
    method: string;
    body?: string;
    headers: Headers
}

interface Response {
    message: string;
    icon: string;
    data: [] | Object;
    erors?: [] | Object;
    ok: boolean;
    token?: string;
    status?: number;
}

export const fetchApi = async (URL: string, method: string = 'GET', payload: Object = {}): Promise<Response> => {
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
        console.log(error)
        return {
            message: 'Ocurrió un error al realizar la petición',
            icon: 'error',
            data: {},
            ok: false
        };
    };
};
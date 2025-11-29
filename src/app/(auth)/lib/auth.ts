export const saveToken = (token: string): void => {
    document.cookie = `tokenAuthJwt=${token}; path=/; max-age=7200; SameSite=StrictSecure`;
};

export const getToken = (): string | null => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('tokenAuthJwt'));

    if (!tokenCookie) return null;

    return tokenCookie.split('=')[1];
}

export const removeToken = (): void => {
    document.cookie = `tokenAuthJwt=; path=/ expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}
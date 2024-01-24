export const usePersistirToken = () => {
    return (token: string) => {
        localStorage.setItem('token', token);
    }; //retorna uma função
};

export const useObterToken = () => {
    return localStorage.getItem('token');
};

export const useLimparToken = () => {
    localStorage.removeItem('token');
};
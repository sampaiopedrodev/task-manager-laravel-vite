import { useUserStore } from "../store/userStore";
import exios from "./config";

export type TypeUser = {
    id: number,
    name: string,
    email: string,
}

const authService={
    getUsers: async ()=>{
        const {data} = await exios.get("/auth/users");
        return data;
    },
    getAuthUser: async ()=>{
        const {data} = await exios.get("/auth/me");
        return data;
    },
    onLogin: ({ email, password }): any => {
        return new Promise((resolve, reject) => {
        exios
            .post('auth/login', {
                email: email,
                password: password,
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.access_token);
                exios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
                authService.getAuthUser();
                resolve(data);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
        });
    },
    onLogout: async ()=>{
        localStorage.removeItem('token');
        exios.defaults.headers.common['Authorization'] = '';
        const data = await exios.get("/auth/logout").then((data) => {});
        return data;
    },
};

export default authService;





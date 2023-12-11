import { TaskType } from "../pages/HomePage";
import exios from "./config";

export type TaskFieldsType = {
    id?: number,
    title: string,
    description: string,
    status_id: number,
    users: string,
};

const taskService = {
    getAll: async (status: number | undefined = undefined)=>{
        let u = "";
        
        if (status != undefined) {
            u += `?status=${status}`;
        }

        const {data} = await exios.get("/tasks"+u);
        return data;
    },
    get: async (id: number)=>{
        const {data} = await exios.get("/tasks/"+id);
        return data;
    },
    update: async (task: TaskFieldsType)=>{
        const {data} = await exios.put("/tasks/"+task.id, JSON.stringify(task));
        return data;
    },
    create: async (task: TaskFieldsType)=>{
        const {data} = await exios.post("/tasks", JSON.stringify(task));
        return data;
    },
    delete: async (id: number)=>{
        const {data} = await exios.delete("/tasks/"+id);
        return data;
    },
    getStatuses: async ()=>{
        const {data} = await exios.get("/statuses");
        return data;
    },
    // onLogin: ({ email, password }): any => {
    //     return new Promise((resolve, reject) => {
    //     exios
    //         .post('auth/login', {
    //         email: email,
    //         password: password,
    //         })
    //         .then(({ data }) => {
    //             localStorage.setItem('token', data.access_token);
    //             exios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
    //             authService.getAuthUser();
    //             resolve(data);
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //             reject(error);
    //         });
    //     });
    //   },
};

export default taskService;





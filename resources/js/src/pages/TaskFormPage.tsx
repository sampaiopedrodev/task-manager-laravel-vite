import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, TextField } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import taskService, { TaskFieldsType } from "../services/taskService";
import { StatusesType, TaskType } from "./HomePage";
import authService, { TypeUser } from "../services/authService";

const TaskFormPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState<TaskType>({
        title: "",
        description: "",
        date: "",
        status_id: 1,
        users: []
    } as unknown as TaskType);
    const [statuses, setStatuses] = useState<StatusesType[]>([]);
    const [users, seUsers] = useState<TypeUser[]>([]);
    const navigate = useNavigate();

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const getTask = async (id: number) => {
        try {
            console.log(id);
            if (Number.isNaN(id)) return 0;

            const { success, data }: { success: boolean, data: TaskType } = await taskService.get(id);
            console.log(success);
            if (success) {
                console.log(data);
                setTask(data);
                let dt: any[] = [];

                dt = data.users.map(user => {
                    return [...selectedUsers, user.id];
                }).flat()
                
                setSelectedUsers(dt);
            } else {
                console.log("Error fetching tasks");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getStatuses = async () => {
        try {
            const { success, data }: { success: boolean, data: StatusesType[] } = await taskService.getStatuses();
            console.log(success);
            if (success) {
                setStatuses(data);
            } else {
                console.log("Error fetching statuses");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getUsers = async () => {
        try {
            const { success, data }: { success: boolean, data: TypeUser[] } = await authService.getUsers();
            console.log(data);
            if (success) {
                seUsers(data);
                console.log(selectedUsers);
            } else {
                console.log("Error fetching users");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const { success }: { success: boolean } = await taskService.delete(Number(id));

            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getStatuses();
        getUsers();
        getTask(Number(id));
    }, []);
    
    const handleSubmit = async () => {
        try {
            if (selectedUsers.length < 1) {
                toast.remove();
                return toast.error('Tem que adicionar um usuário a está tarefa!');
            }

            console.log('test '+ id);
            
            if (id == undefined) {
                const _task: TaskFieldsType = {
                    title: task.title,
                    description: task.description,
                    status_id: task.status_id,
                    users: selectedUsers.toString(),
                };

                const { success }: { success: boolean } = await taskService.create(_task);
                if (success) {
                    toast.success('Tarefa criada com sucesso!')
                } else {
                    toast.error('Erro ao criar tarefa!')
                }
            } else {
                const _task: TaskFieldsType = {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status_id: task.status_id,
                    users: selectedUsers.toString(),
                };

                const { success }: { success: boolean } = await taskService.update(_task);
                if (success) {
                    toast.success('Tarefa actulaizada com sucesso!')
                } else {
                    toast.error('Erro ao actualizar tarefa!')
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Erro ao actualizar tarefa!')
        }
    };
    
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Box maxWidth={'800px'} m={'0 auto'}>
                <Button 
                    variant="contained"
                    onClick={()=>{navigate('/')}}>
                    Ver Tarefas
                </Button>
                <Grid container spacing={2} mt={5}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            margin="normal"
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            value={task?.title}
                            onChange={(e)=>{setTask({...task, title: e.target.value});}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            size="small"
                            margin="normal"
                            fullWidth
                            label="Status"
                            name="status"
                            value={task?.status_id}
                            onChange={(e)=>{setTask({...task, status_id: Number(e.target.value)});}}
                        >

                        {statuses.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.name}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descrição"
                            multiline
                            rows={4}
                            name="description"
                            value={task?.description}
                            onChange={(e)=>{setTask({...task, description: e.target.value});}}
                            />
                    </Grid>
                </Grid>

                <FormGroup sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {users.map((user) => {
                        return <FormControlLabel
                            key={user.id}
                            onChange={() => {
                                if (selectedUsers.includes(user.id)) {
                                    setSelectedUsers(selectedUsers.filter(id => id!== user.id));
                                } else {
                                    setSelectedUsers([...selectedUsers, user.id]);
                                }
                            }}
                            control={<Checkbox checked={selectedUsers.includes(user.id) ? true : false} />}  label={user.name} />;
                    })}
                </FormGroup>

                <Button 
                    variant="contained"
                    onClick={handleSubmit}>
                    Salvar
                </Button>

                {task.id != undefined && <Button
                    sx={{ml: 2}}
                    variant="contained"
                    color="error"
                    onClick={handleDelete}>
                    Eliminar
                </Button>}
            </Box>
        </>
    );
};

export default TaskFormPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material";
import taskService from "../services/taskService";
import { stringAvatar } from "../utils/helpers";
import { Add, CalendarToday, Edit, PlusOne } from "@mui/icons-material";

export type TaskType = {
    id: number,
    title: string,
    description: string,
    date: string,
    status_id: number,
    status_name: string,
    users: {
        id: number,
        name: string
    }[],
};

export type StatusesType = {
    id: number,
    name: string
}

const HomePage = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [statuses, setStatuses] = useState<StatusesType[]>([]);
    const [selectedBtn, setSelectedBtn] = useState<number | undefined>(undefined);
    const navigate = useNavigate();
    
    const getTasks = async (status: number | undefined = undefined) => {
        try {
            setSelectedBtn(status);

            const { success, data }: { success: boolean, data: TaskType[] } = await taskService.getAll(status);
            console.log(success);
            if (success) {
                console.log(data);
                setTasks(data);
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

    useEffect(() => {
        getTasks();
        getStatuses();
    }, []);
    
    return (
        <>
            <Box maxWidth={'900px'}  sx={{display: "flex", justifyContent: 'center', flexWrap: 'wrap', gap:2, mb: 4}}>
                <Button 
                    variant="contained"
                    onClick={()=>{navigate('/tasks/add')}} startIcon={<Add />}>
                    Nova Tarefa
                </Button>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button color={selectedBtn === undefined ? "primary" : "secondary"} onClick={() => getTasks()}>
                        Todos
                    </Button>
                    <Button color={selectedBtn === 1 ? "primary" : "secondary"} onClick={() => getTasks(1)}>
                        Não Concluídos
                    </Button>
                    <Button color={selectedBtn === 3 ? "primary" : "secondary"} onClick={() => getTasks(3)}>
                        Concluídos
                    </Button>
                </ButtonGroup>
            </Box>
            <Box maxWidth={'1200px'} m={'0 auto'} sx={{display: "flex", justifyContent: 'center', flexWrap: 'wrap'}}>
                {tasks.map((task, index) => {
                    return <Card key={index} variant="outlined" sx={{m: 1, background: '#1976d2', maxWidth: '300px', flexWrap: 'wrap'}}>
                        <CardHeader 
                            title={<Typography fontWeight={500} fontSize={'1.5rem'} color={"#fff"}>
                                {task.title}
                            </Typography>}
                            action={
                                <IconButton aria-label="delete" onClick={()=> { navigate('tasks/'+task.id) }}>
                                    <Edit sx={{cursor: 'pointer', color: "#fff"}}/>
                                </IconButton>
                            }
                        />
                        <CardContent sx={{p: 2}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                <Typography color={"#fff"} display={'flex'} alignItems={'center'}>
                                    <CalendarToday fontSize="small" />
                                    {task.date}
                                </Typography>

                                {task.status_id == 3 ?
                                    <Chip label={task.status_name} color="success" />
                                    : <Chip label={task.status_name} color="error" />}
                            </Box>
                            <Typography variant="body2" color="#f5cccc">
                                {task.description}
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                mt: 3,
                                mb: 1,
                                flexWrap: 'wrap',
                                gap: '4px'
                            }}>
                                {task.users.map((user) => {
                                    return <Chip 
                                        key={user.id} 
                                        avatar={<Avatar src={stringAvatar(user.name)} />} 
                                        label={<Typography color={'#fff'} fontSize={'.8rem'} fontWeight={'normal'}>{user.name}</Typography>}
                                        sx={{mr: 1}} />
                                })}
                            </Box>
                        </CardContent>
                    </Card>
                })}
            </Box>
        </>
    );
};

export default HomePage;

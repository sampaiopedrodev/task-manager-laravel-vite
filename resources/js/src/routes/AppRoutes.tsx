import React, { ReactNode } from 'react'
import  { useLocation, Navigate, useRoutes } from 'react-router-dom';
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useUserStore } from '../store/userStore'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage';
import SigninPage from '../pages/SigninPage';
import MainLayout from '../components/MainLayout';
import TaskFormPage from '../pages/TaskFormPage';

type Props = {
  component: ReactNode
}

const AutRoute = ({ component }: Props) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const currentPath = useLocation().pathname

  console.log('current path: '+currentPath);
  
  if (!isAuthenticated && currentPath !== '/signin') {
    return <Navigate to={'/signin'} replace />
  } 

  return <MainLayout>{component}</MainLayout>;
}

const GuestRoute = ({ component }: Props) => {
  const [isAuthenticated,isLoading] = useUserStore((state) => [state.isAuthenticated,state.isLoading])
  const currentPath = useLocation().pathname
  
  console.log("Current state:"+isAuthenticated);
  if (isLoading===true) {
    return (
        <Backdrop
            sx={{backgroundColor:'white', color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={true}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
  }

  console.log('current path: '+currentPath);
  console.log('Here 14')
  if (isAuthenticated && currentPath !== '/') {
    return <Navigate to={'/'} replace />
  }
  // return <AuthLayout>{component}</AuthLayout>
  return <>{component}</>;
}

function AppRoutes(): ReactNode {
    const element = useRoutes([
      {
        path: '/',
        element: <AutRoute component={<HomePage />} />,
      },
      {
        path: '/tasks/add',
        element: <AutRoute component={<TaskFormPage />} />,
      },
      {
        path: '/tasks/:id',
        element: <AutRoute component={<TaskFormPage />} />,
      },
      {
        path: '/signin',
        element: <GuestRoute component={<SigninPage />} />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]);
    return element
  }

export default AppRoutes

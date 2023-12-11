import { create } from "zustand";
import authService from "../services/authService";

type UserStore = {
  authUser:{
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    role: {
      id: number | undefined,
      name: string | undefined,
    } | {},
    permissions: string[] | undefined
  },
  isAuthenticated:boolean,
  isLoading:boolean,
  getAuthUser: () => void;
  setAuthUser: (item: boolean) => void;
  logout: () => void;
};

const initialData = {
  id: undefined,
  name: undefined,
  email: undefined,
  role: {},
  permissions: undefined
}

export const useUserStore = create<UserStore>((set) => {
  return {
    authUser: initialData,
    isAuthenticated: false,
    isLoading:true,
    getAuthUser: async ()=> {
        authService.getAuthUser()
        .then((payload)=>{
          set((state) => ({...state,isAuthenticated:true,isLoading:false,authUser:payload.data }))
        })
        .catch(()=>{
          set((state) => ({...state,isAuthenticated:false,isLoading:false,authUser:initialData }))
        })
    },
    setAuthUser: (payload) => set((state) => ({...state,authUser:payload,isAuthenticated:true })),
    logout: async ()=> {
      authService.onLogout().then((payload) => {
        set(state=>({...state,authUser:initialData,isAuthenticated:false,isLoading:false}))
      }).catch(() => {
        set(state=>({...state,authUser:initialData,isAuthenticated:false,isLoading:false}))
      })
    }
  };
});
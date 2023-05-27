import React , {useReducer,useContext} from "react";

import reducer from "./reducer";
import axios from 'axios';

import { DISPLAY_ALERT , CLEAR_ALERT , REGISTER_USER_BEGIN , REGISTER_USER_ERROR , REGISTER_USER_SUCCESS , LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR,UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOB_BEGIN, GET_JOB_SUCCESS, SET_EDIT_JOB, DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, EDIT_JOB_ERROR, EDIT_JOB_SUCCESS, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE} from "./actions";

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',

    user: user? JSON.parse(user):null,
    token: token,
    userLocation:userLocation || '',

    showSidebar: false,

    isEditing : false,
    editJobId : "",
    position : '',
    company : '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['Full-time','Part-time','Remote','Internship'],
    jobType : "Full-time",
    statusOptions : ['Test','Interview','Declined','Pending','Offer'],
    status : "Pending",

    userjobs : [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,

    stats: {},
    weeklyApplications : [],

    search: "",
    searchStatus: 'all',
    searchType: 'all',
    sort:'latest',
    sortOptions: ['latest','oldest','a-z','z-a'],
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    //axios
    const authFetch = axios.create({
        baseURL:'/api/v1',
    })

    //request interceptor
    authFetch.interceptors.request.use(
        (config)=> {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    //response interceptor
    authFetch.interceptors.response.use(
        (response)=> {
            return response;
        },
        (error) => {
            //console.log(error.response);

            if(error.response.status === 401)
            {
                logout();
            }
            return Promise.reject(error);
        }
    )

    const handleChange = ({name,value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload : {name,value},
        })
    }

    const clearValues = () =>
    {
        dispatch({
            type: CLEAR_VALUES,
        })
    }

    const logout = () => {
        dispatch({type:LOGOUT_USER});
        removeUserFromLocalStorage();
    }

    const toggleSidebar = () => {
        dispatch({type: TOGGLE_SIDEBAR});
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type:CLEAR_ALERT,
            })
        },3000)
    }

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
        clearAlert();
    }

    const addUserToLocalStorage = ({user , token , location}) => {
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
        localStorage.setItem('location',location);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    const registerUser = async (currentUser) => {
        dispatch({ type : REGISTER_USER_BEGIN});

        try{
            const response = await axios.post('/api/v1/auth/register',currentUser);
            //console.log(response);
            const location = response.data.user.location;
            const {user,token} = response.data;

            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {user , token , location},
            })
            addUserToLocalStorage({user,token,location});
        }
        catch (error) {
            //console.log(error.response);
            dispatch({
                type : REGISTER_USER_ERROR,
                payload: {
                    msg: error.response.data.msg,
                },
            })
        }
        clearAlert();
    }

    const loginUser = async (currentUser) => {
        dispatch({ type : LOGIN_USER_BEGIN});

        try{
            const response = await axios.post('/api/v1/auth/login',currentUser);
            //console.log(response);
            const location = response.data.user.location;
            const {user,token} = response.data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {user , token , location},
            })
            addUserToLocalStorage({user,token,location});
        }
        catch (error) {
                dispatch({
                    type : LOGIN_USER_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                })
        }
        clearAlert();
    }

    const updateUser = async (currentUser) => {
        dispatch({type : UPDATE_USER_BEGIN});
        
        try{
            const {data} = await authFetch.patch('/auth/updateUser',currentUser);
            
            const location = data.user.location;
            const {user,token} = data;

            dispatch({
                type:UPDATE_USER_SUCCESS,
                payload : {user,token},
            })
            addUserToLocalStorage({user,token,location});
        }
        catch(error)
        {
            if(error.response.status !== 401){
                dispatch({
                    type : UPDATE_USER_ERROR,
                    payload: {
                        msg: error.response.data.msg,
                    },
                })
            }
        }
        clearAlert();
    }

    const createJob = async () => {
        dispatch({type:CREATE_JOB_BEGIN})
        try{
            const {position,company,jobLocation,jobType,status} = state;

            await authFetch.post('/jobs',{position,company,jobLocation,jobType,status});

            dispatch({type:CREATE_JOB_SUCCESS})
            clearValues();
        }
        catch(error){
            if(error.response.status===401) return;

            dispatch({type: CREATE_JOB_ERROR,
            payload:{msg: error.response.data.msg},
        })
        }
        clearAlert();
    }

    const getAllJobs = async () => {
        const {page,search,searchStatus,searchType,sort} = state;
        
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

        if(search!=="")
        {
            url = url + `&search=${search}`;
        }

        dispatch({type: GET_JOB_BEGIN});

        try {
            const {data} = await authFetch.get(url);
            const {userjobs,totalJobs,numOfPages} = data;

            dispatch({type: GET_JOB_SUCCESS , payload:{userjobs,totalJobs,numOfPages}});
        } catch (error) {
            //console.log(error.response)
            logout();
        }
        clearAlert();
    } 

    const setEditJob = (id) => {
        dispatch({type: SET_EDIT_JOB , payload : {id}});
    }

    const editJob = async () => {
        dispatch({type:EDIT_JOB_BEGIN});

        try{
            const {position , company , jobLocation , jobType , status} = state;

            await authFetch.patch(`/jobs/${state.editJobId}`, {company,position , jobLocation , jobType , status});
            
            dispatch({type:EDIT_JOB_SUCCESS})
            dispatch({type : CLEAR_VALUES});
        }
        catch (error){
            if(error.response.status===401)
                return;
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: {msg: error.response.data.msg},
            })
        }
        clearAlert();
    }

    const deleteJob = async (id) => {
        dispatch({type: DELETE_JOB_BEGIN});

        try{
           await authFetch.delete(`/jobs/${id}`);
           getAllJobs(); 
        }
        catch(error){
            //console.log(error.response);
            logout();
        }
    }

    const showStats = async() => {
        dispatch({type : SHOW_STATS_BEGIN});

        try{
            const {data} = await authFetch.get('/jobs/stats');
            
            const {defaultStats , weeklyApplications} = data;
            dispatch({type: SHOW_STATS_SUCCESS , payload: {'stats' : defaultStats , 'weeklyApplications' : weeklyApplications}});
        }
        catch(error)
        {
            //console.log(error.response);
            logout();
        }

        clearAlert();
    }

    const clearFilters = () => {
        dispatch({
            type: CLEAR_FILTERS,
        })
    }

    const changePage = (page) => {
        dispatch({
            type: CHANGE_PAGE,
            payload : {page},
        })
    }

    return (<AppContext.Provider value={{...state, displayAlert , registerUser , loginUser , toggleSidebar , logout , updateUser , handleChange,clearValues,createJob,getAllJobs,setEditJob,deleteJob,editJob,showStats,clearFilters,changePage}}>
        {children}
    </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppProvider , initialState , useAppContext}

import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';
import { Slide, toast } from 'react-toastify';

const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({

    baseURL: api,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if(auth.token){
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
})


axiosIntance.interceptors.response.use((res) => {
  return res;
}, (error) => {
  try{
    const { status } = error.response;
    if(status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.USER_LOGOUT_SUCCESS});
      toast.success('Something Went Wrong!', {position: 'top-left', transition:Slide});
    }
  }catch(error){
    return Promise.reject(error);
  }
})

export default axiosIntance;
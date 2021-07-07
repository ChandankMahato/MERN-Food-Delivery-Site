
import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const adminToken = window.localStorage.getItem('adminToken');

const adminAxiosIntance = axios.create({
  baseURL: api,
  headers: {
    'Adminauthorization': adminToken ? `Bearer ${adminToken}` : ''
  }
});

adminAxiosIntance.interceptors.request.use((req) => {
  const {adminAuth} = store.getState();
  if(adminAuth.adminToken){
    req.headers.Adminauthorization = `Bearer ${adminAuth.adminToken}`;
  }
  return req;
})



adminAxiosIntance.interceptors.response.use((res) => {
  return res;
}, (error) => {
  try{
    const { status } = error.response ? error.response.status : 500;
    if(status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstants.ADMIN_LOGOUT_SUCCESS});
    }
  }catch(error){
    return Promise.reject(error);
  }
})

export default adminAxiosIntance;
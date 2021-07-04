//imports
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Componenet, ...rest}) => {
    return <Route {...rest} component={(props) => {

        //creating const "adminToken" that get items from localStorage
        const adminToken = window.localStorage.getItem('adminToken');
        if(adminToken){
            return <Componenet {...props} />
        }else{
            return <Redirect to={`/admin/signin`}/>
        }
    }} />
}

export default PrivateRoute;
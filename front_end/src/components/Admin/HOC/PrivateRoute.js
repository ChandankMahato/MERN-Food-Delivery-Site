//imports
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Componenet, ...rest}) => {
    return <Route {...rest} component={(props) => {

        //creating const "token" that get items from localStorage
        const token = window.localStorage.getItem('token');
        if(token){
            return <Componenet {...props} />
        }else{
            return <Redirect to={`/admin/signin`}/>
        }
    }} />
}

export default PrivateRoute;
//imports
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRouteUser = ({component: Componenet, ...rest}) => {
    return <Route {...rest} component={(props) => {

        //creating const "adminToken" that get items from localStorage
        const token = window.localStorage.getItem('token');
        if(token){
            return <Componenet {...props} />
        }else{
            return <Redirect to={`/`}/>
        }
    }} />
}

export default PrivateRouteUser;
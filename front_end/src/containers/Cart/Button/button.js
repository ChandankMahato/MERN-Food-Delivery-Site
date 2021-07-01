import React from 'react';
import { useHistory } from 'react-router-dom';
import { MaterialButton } from '../../../components/MaterialUI';

/**
* @author
* @function Bbuttons
**/

const Bbuttons = (props) => {

    let history = useHistory();

  return(
    <>
        <div style={{
          width: '100%',
          display: 'flex',
          background: '#4d4d4d',
          justifyContent: 'center',
          boxShadow: '0 0 10px 10px #eee',
          padding: '10px 0',
          boxSizing: 'border-box',
        }}>
          <div style={{width: '250px'}}>
            <MaterialButton 
              title="PLACE ORDER"
              onClick={() => history.push('/checkout')}
            />
          </div>
          
        </div>
        <div className="bottomBorder"></div>
    </>
   )

 }

export default Bbuttons
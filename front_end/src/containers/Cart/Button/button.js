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
          background: '#2b2621',
          justifyContent: 'center',
          padding: '10px 0',
          boxSizing: 'border-box',
        }}>
          <div style={{width: '15em'}}>
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
import React from 'react'
import './style.css';

/**
* @author
* @function PageNotFound
**/

const PageNotFound = (props) => {

  return(
        <section className="page_404">
                <div className="box">
                    
                    <div className="backgroundImg">
                        <h1>404</h1>
                        <h3 class="h2">Look like you're lost</h3>
                    </div>
                    <div className="ContentBox">
                        <p>Are you looking for Get Your Food?</p>
                        <a href="/">getyourfood</a>
                    </div>
                </div>
        </section>
   )

 }

export default PageNotFound
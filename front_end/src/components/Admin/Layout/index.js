import React from 'react';
import Header from '../../Header';
import { Container, Row, Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './style.css';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink to={`/admin/home`} exact >Home</NavLink></li>
                                    <li><NavLink to={`/admin/category`}>Category</NavLink></li>
                                    <li><NavLink to={`/admin/products`}>Products</NavLink></li>
                                    <li><NavLink to={`/admin/orders`}>Order</NavLink></li>
                                    <li><NavLink to={`/KOT`}>KOT</NavLink></li>
                                    <li><NavLink to={`/BILL`}>BILL</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                props.children
            }
        </>
    )

}

export default Layout;
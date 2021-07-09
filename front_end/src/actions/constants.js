//constants

export const authConstants = {

    USER_REGISTER_REQUEST : 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS : 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE : 'USER_REGISTER_FAILURE',

    ADMIN_REGISTER_REQUEST : 'ADMIN_REGISTER_REQUEST',
    ADMIN_REGISTER_SUCCESS : 'ADMIN_REGISTER_SUCCESS',
    ADMIN_REGISTER_FAILURE : 'ADMIN_REGISTER_FAILURE',

    USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    
    USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
    USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
    USER_LOGOUT_FAILURE: 'USER_LOGOUT_FAILURE',

    ADMIN_LOGIN_REQUEST: 'ADMIN_LOGIN_REQUEST',
    ADMIN_LOGIN_FAILURE: 'ADMIN_LOGIN_FAILURE',
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    
    ADMIN_LOGOUT_REQUEST: 'ADMIN_LOGOUT_REQUEST',
    ADMIN_LOGOUT_SUCCESS: 'ADMIN_LOGOUT_SUCCESS',
    ADMIN_LOGOUT_FAILURE: 'ADMIN_LOGOUT_FAILURE'

};

export const userConstants = {

    GET_USER_ADDRESS_REQUEST : 'GET_USER_ADDRESS_REQUEST',
    GET_USER_ADDRESS_SUCCESS : 'GET_USER_ADDRESS_SUCCESS',
    GET_USER_ADDRESS_FAILURE : 'GET_USER_ADDRESS_FAILUTE',

    ADD_USER_ADDRESS_REQUEST : 'ADD_USER_ADDRESS_REQUEST',
    ADD_USER_ADDRESS_SUCCESS : 'ADD_USER_ADDRESS_SUCCESS',
    ADD_USER_ADDRESS_FAILURE : 'ADD_USER_ADDRESS_FAILURE',

    ADD_USER_ORDER_REQUEST: "ADD_USER_ORDER_REQUEST",
    ADD_USER_ORDER_SUCCESS: "ADD_USER_ORDER_SUCCESS",
    ADD_USER_ORDER_FAILURE: "ADD_USER_ORDER_FAILURE",

    GET_USER_ORDER_REQUEST: "GET_USER_ORDER_REQUEST",
    GET_USER_ORDER_SUCCESS: "GET_USER_ORDER_SUCCESS",
    GET_USER_ORDER_FAILURE: "GET_USER_ORDER_FAILURE",

    GET_USER_ORDER_DETAILS_REQUEST: "GET_USER_ORDER_DETAILS_REQUEST",
    GET_USER_ORDER_DETAILS_SUCCESS: "GET_USER_ORDER_DETAILS_SUCCESS",
    GET_USER_ORDER_DETAILS_FAILURE: "GET_USER_ORDER_DETAILS_FAILURE",
};

export const categoryConstants = {
    GET_ALL_CATEGORIES_REQUEST : 'GET_ALL_CATEGORIES_REQUEST',
    GET_ALL_CATEGORIES_SUCCESS : 'GET_ALL_CATEGORIES_SUCCESS',
    GET_ALL_CATEGORIES_FAILURE : 'GET_ALL_CATEGORIES_FAILUR0E',

    ADD_NEW_CATEGORY_REQUEST : 'ADD_NEW_CATEGORY_REQUEST',
    ADD_NEW_CATEGORY_SUCCESS : 'ADD_NEW_CATEGORY_SUCCESS',
    ADD_NEW_CATEGORY_FAILURE : 'ADD_NEW_CATEGORY_FAILURE',

    UPDATE_CATEGORIES_REQUEST: "UPDATE_CATEGORIES_REQUEST",
    UPDATE_CATEGORIES_SUCCESS: "UPDATE_CATEGORIES_SUCCESS",
    UPDATE_CATEGORIES_FAILURE: "UPDATE_CATEGORIES_FAILURE",

    DELETE_CATEGORIES_REQUEST: "DELETE_CATEGORIES_REQUEST",
    DELETE_CATEGORIES_SUCCESS: "DELETE_CATEGORIES_SUCCESS",
    DELETE_CATEGORIES_FAILURE: "DELETE_CATEGORIES_FAILURE",
};

export const productConstants = {
    GET_ALL_PRODUCTS_REQUEST : 'GET_ALL_PRODUCTS_REQUEST',
    GET_ALL_PRODUCTS_SUCCESS : 'GET_ALL_PRODUCTS_SUCCESS',
    GET_ALL_PRODUCTS_FAILURE : 'GET_ALL_PRODUCTS_FAILURE',

    INITIAL_DATA_REQUEST : 'INITIAL_DATA_REQUEST',
    INITIAL_DATA_SUCCESS : 'INITIAL_DATA_SUCCESS',
    INITIAL_DATA_FAILURE : 'INITIAL_DATA_FAILURE',

    GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST : 'GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST',
    GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS : 'GET_ALL_PRODUCTS_BY_CATEOGRY_SUCCESS',
    GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE : 'GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE',

    ADD_PRODUCT_REQUEST : 'ADD_PRODUCT_REQUEST',
    ADD_PRODUCT_SUCCESS : 'ADD_PRODUCT_SUCCESS',
    ADD_PRODUCT_FAILURE : 'ADD_PRODUCT_FAILURE',

    
    DELETE_PRODUCT_BY_ID_REQUEST: "DELETE_PRODUCT_BY_ID_REQUEST",
    DELETE_PRODUCT_BY_ID_SUCCESS: "DELETE_PRODUCT_BY_ID_SUCCESS",
    DELETE_PRODUCT_BY_ID_FAILURE: "DELETE_PRODUCT_BY_ID_FAILURE",

    PRODUCT_EDIT_REQUEST: "PRODUCT_EDIT_REQUEST",
    PRODUCT_EDIT_SUCCESS: "PRODUCT_EDIT_SUCCESS",
    PRODUCT_EDIT_FAILURE: "PRODUCT_EDIT_FAILURE"

}

export const initialDataConstants = {
    GET_ALL_INITIAL_DATA_REQUEST : 'GET_ALL_INITIAL_DATA_REQUEST',
    GET_ALL_INITIAL_DATA_SUCCESS : 'GET_ALL_INITIAL_DATA_SUCCESS',
    GET_ALL_INITIAL_DATA_FAILURE : 'GET_ALL_INITIAL_DATA_FAILURE'
}

export const orderConstants = {
    GET_CUSTOMER_ORDER_REQUEST: "GET_CUSTOMER_ORDER_REQUEST",
    GET_CUSTOMER_ORDER_SUCCESS: "GET_CUSTOMER_ORDER_SUCCESS",
    GET_CUSTOMER_ORDER_FAILURE: "GET_CUSTOMER_ORDER_FAILURE",

    GET_USER_ORDER_REQUEST: "GET_USER_ORDER_REQUEST",
    GET_USER_ORDER_SUCCESS: "GET_USER_ORDER_SUCCESS",
    GET_USER_ORDER_FAILURE: "GET_USER_ORDER_FAILURE",
  
    UPDATE_CUSTOMER_ORDER_REQUEST: "UPDATE_CUSTOMER_ORDER_REQUEST",
    UPDATE_CUSTOMER_ORDER_SUCCESS: "UPDATE_CUSTOMER_ORDER_SUCCESS",
    UPDATE_CUSTOMER_ORDER_FAILURE: "UPDATE_CUSTOMER_ORDER_FAILURE",
  };

export const cartConstants = {
    ADD_TO_CART_REQUEST : 'ADD_TO_CART_REQUEST',
    ADD_TO_CART_SUCCESS : 'ADD_TO_CART_SUCCESS',
    ADD_TO_CART_FAILURE : 'ADD_TO_CART_FAILURE',
    
    REMOVE_CART_ITEM_REQUEST : 'REMOVE_CART_ITEM_REQUEST',
    REMOVE_CART_ITEM_SUCCESS : 'REMOVE_CART_ITEM_SUCCESSS',
    REMOVE_CART_ITEM_FAILURE : 'REMOVE_CART_ITEM_FAILURE',
    RESET_CART : 'RESET_CART',
};
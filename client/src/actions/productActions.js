import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstants";

import axios from 'axios';
import Axios from 'axios';

const listProducts = (category = '', searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/products?category=' +
        category +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

//import {http_handler} from "../http_handler"

//const listProducts= (category='', searchKeyword='', sortOrder='') => async (dispatch) => {
//    
//    try {
//        
//        dispatch({ type : PRODUCT_LIST_REQUEST });
//        const url="/api/products?category=" + category + "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder
//        const {data} = await http_handler(url)
//        console.log(data)
//        const {data} = await axios.get("/api/products?category=" + category + "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder);
//        //console.log(JSON.stringify(data));
//        dispatch({ type :  PRODUCT_LIST_SUCCESS, payload: data});
//    }
//    catch(error) {
//        dispatch({ type :  PRODUCT_LIST_FAIL, payload: error.message });
//    }  
//    
//} 

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product});
//       const {userSignin:{userInfo}} = getState();
        const token=window.localStorage.getItem("token")
        
        if(!product._id) {
            const {data} = await axios.post("/api/products", product, { headers: {
            'Authorization': 'Bearer ' + token
        }});
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
        }
        
        else {
            const {data} = await axios.put("/api/products/" + product._id, product, { headers: {
            'Authorization': 'Bearer ' + token
        }});
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data});
        }  
        
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST , payload: productId});
        const {data} = await axios.get("/api/products/" +productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data});
        
    } catch(error) {
        dispatch({ type :  PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    
    try {
//        const { userSignin: { userInfo }} = getState();
        const token=window.localStorage.getItem("token")
        
        dispatch({type: PRODUCT_DELETE_REQUEST , payload: productId});
        const {data} = await axios.delete("/api/products/" +productId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success:true });
        
    } catch(error) {
        dispatch({ type :  PRODUCT_DELETE_FAIL, payload: error.message });
    }
}


export { listProducts, saveProduct, detailsProduct, deleteProduct };
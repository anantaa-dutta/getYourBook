import React , {useState, useEffect} from 'react';
import data from '../data';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useParams, withRouter } from 'react-router-dom';
import {detailsProduct} from '../actions/productActions'
//import parse from 'html-react-parser';

function ProductScreen(props) {
    
    const[qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    var prodId = useParams().id;
    
    useEffect(() => {
       dispatch(detailsProduct(prodId));
       return() => {
        //
       };
    }, [] );
    
    const handleAddToCart = () => {
        props.history.push("/cart/" + prodId + "?qty=" + qty );
    }
    
    return ( <div>
    
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
            {loading? <div>Loading..</div>:
            error? <div>{error}</div>:
            (
               <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                    <div className="details-action">
                    <ul classname="cart1">
                         
                        <li>
                            
                            Status: {product.countInStock > 0? "In Stock" : "Unavailable"}
                        </li>
                        <li>
                            Qty:<select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x )=>
                                        <option key ={x+1} value = {x+1}> {x+1} </option>                                            
                                    )}
                                </select>
                        </li>
                        <li>
                            {product.countInStock>0 && (<button onClick={handleAddToCart} className="button-primary"> Add to Cart </button>)}
                            
    
                            
                        </li>
                        
                    </ul>
                </div>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ( {product.numReviews} Reviews)
                        </li>
                        <li>
                            Price:<b>Rs.{product.price}</b>
                        </li>
                        <li>
                        
                            <div>{product.description}</div>
                        </li>
                        
                    </ul>
                </div>
                
            </div>
         
            )
            
            }
            
            
    </div>
    )
    
        
}

export default withRouter(ProductScreen);
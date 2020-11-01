import React , {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import parse from 'html-react-parser';

import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReview] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    
    const productSave = useSelector(state=>state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    
    const productDelete = useSelector(state=>state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave) {
            setModalVisible(false);
        }
       dispatch(listProducts());
       return() => {
        //
       };
    }, [successSave, successDelete] );
    
    const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setAuthor(product.author);
    setCategory(product.category);
    setDescription(product.description);
    setRating(product.rating);
    setNumReview(product.numReviews);
    setCountInStock(product.countInStock);
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id: id,
                              name, 
                              price,
                              image, 
                              author, category, countInStock, description, rating, numReviews }));
    }
    
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }
    
    return <div className="content content-margined">
    
        <div className="product-header">
            <h3>Products</h3>
            <button onClick={()=> openModal({})}>Create Product</button>
        </div>
        {modalVisible && (
            
             <div className = "form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading..</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="price">
                        Price
                    </label>
                    <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="image">
                        Image
                    </label>
                    <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="author">
                        Author
                    </label>
                    <input type="text" name="author" value={author} id="author" onChange={(e) => setAuthor(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        CountInStock
                    </label>
                    <input type="Number" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}>
                    </input>
                </li>
                <li>
                    <li>
                <label htmlFor="description">
                    Description
                </label> 
                <div className="editor">
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                            
                            description
                            
                        }
                        onChange = { (event, editor) => {
                            const data = editor.getData()
                            setDescription(data)
                        }}
                     /> 
                    
                </div>
                
              </li>
                    <label htmlFor="category">
                        Category
                    </label>
                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="rating">
                        Rating
                    </label>
                    <input type="text" name="rating" value={rating} id="rating" onChange={(e) => setRating(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="numReviews">
                        Num Reviews
                    </label>
                    <input type="text" name="numReviews" value={numReviews} id="numReviews" onChange={(e) => setNumReview(e.target.value)}>
                    </input>
                </li>
                
                <li>
                    <button type="submit" className="button primary">{id?"Update":"Create"}</button>
                </li>
                <li>
                    <button type="button" onClick = {()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
                
            </ul>
        </form>
    
    </div>
            
        )}
       
        
        <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            { 
             products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.author}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
}

export default ProductsScreen;


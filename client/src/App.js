import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
//import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {
    
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    
    const openMenu = () => {
         document.querySelector(".sidebar").classList.add("open");
    }
    
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }
  return (
      <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                        <Link to = "/">getYourBook</Link>
                </div>
                <div className ="header-links">
                    <a href="cart.html">Cart </a>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                        <Link to="/signin"> Signin</Link>
                    }
                    {/*<Link to="/signin"></Link>
                    <a href="signin.html">SignIn</a>*/}
                    {userInfo && userInfo.isAdmin && (
                      <div className="dropdown">
                            {/*<a href="#">Admin</a>*/}
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/orders">Orders</Link>
                            <Link to="/products">Products</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
            </header>
            <aside className="sidebar">
                <h3> Shopping Categories </h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul className="categories">
                    <li>
                        <Link to="/category/Cloud Computing">Cloud Computing</Link>
                    </li>
                    <li>
                        <Link to="/category/Data Science">Data Science</Link>
                    </li>
                    <li>
                        <Link to="/category/Machine Learning">Machine Learning</Link>
                    </li>
                    <li>
                        <Link to="/category/Ethical Hacking">Ethical Hacking</Link>
                    </li>
                    <li>
                        <Link to="/category/Cyber Security">Cyber Security</Link>
                    </li>
                
                </ul>
            
            </aside>
            
            <main className="main">
                
                <div className="content">
                    <Switch>
                    <Route path="/" exact={true} component= {HomeScreen} />
                    <Route path="/profile" exact={true} component= {ProfileScreen} /> 
                    <Route path="/order/:id" exact={true} component= {OrderScreen} />
                    <Route path="/orders" exact={true} component= {OrdersScreen} />
                    <Route path="/products" exact={true} component= {ProductsScreen} /> 
                    <Route path="/shipping" exact={true} component= {ShippingScreen} /> 
                        {/*<Route path="/payment" exact={true} component= {PaymentScreen} /> */}
                    <Route path="/placeorder" exact={true} component= {PlaceOrderScreen} /> 
                    <Route path="/signin" exact={true} component= {SigninScreen} /> 
                    <Route path="/category/:id" exact={true} component= {HomeScreen} />
                    <Route path="/register" exact={true} component= {RegisterScreen} /> 
                    <Route path="/product/:id" exact={true} >
                         <ProductScreen/>
                    </Route>
                    <Route path="/cart/:id?" exact={true} component= {CartScreen} />
                    
                    
                    <Redirect to = "/" component= {HomeScreen} /> 
                     </Switch>
                 </div>
                  
            </main>
            <footer className="footer">
                All Rights Reserved.
            </footer>
        </div>
          </BrowserRouter>
  );
}

export default App;

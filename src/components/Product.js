import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from '../store/cartSlice';
import { STATUSES, fetchProducts } from '../store/productSlice';


const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: products, status} = useSelector((state)=> state.product)
    const items = useSelector((state) => state.cart);
    // const [products, setProducts] = useState([]);

    useEffect(()=>{
        dispatch(fetchProducts())
        // const fetchProducts = async ()=>{
        //     const res = await fetch('https://fakestoreapi.com/products');
        //     const data = await res.json();
        //     setProducts(data);
        // };
        // fetchProducts();
    },[])

    const handleAdd=(product)=>{
        dispatch(add(product))
    }

    const isAddedCart=(product)=>{
        const foundObject = items.find(item => item.id === product.id );
        const exists = foundObject !== undefined;
        return exists
    }

    if(status === STATUSES.LOADING){
        return <h2>Loading............</h2>
    }

    if(status === STATUSES.ERROR){
        return <h2>Please try again leter............</h2>
    }

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    {isAddedCart(product)? (<button onClick={()=>navigate('/cart')}  className="btn">
                        View cart
                    </button>):(<button onClick={()=>handleAdd(product)} className="btn">
                        Add to cart
                    </button>)}
                </div>
            ))}
        </div>
    );
};

export default Products;
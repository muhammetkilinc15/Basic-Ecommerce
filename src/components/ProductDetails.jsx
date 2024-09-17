import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addProBasket } from '../redux/slices/basketSlice';
function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, selectedProduct } = useSelector((store) => store.product)
    const { title, price, category, description, image } = selectedProduct;
    const getProductById = () =>
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    useEffect(() => {
        getProductById();
    }, [])


    const [productCount, setProductCount] = useState(1)

    const increase = () => {
        setProductCount((prev) => prev+1)
    }
    const decrrease = () => {
        if (productCount != 0) {
            setProductCount((prev) => prev-1)
        }

    }


    const addProduct = ()=>{
        const payload = {
            id ,
            price ,
            title,
            category,
            description,
            image,
            productCount // üründen kaç tane seçildi ise

        }

        dispatch(addProBasket(payload))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={image} alt={title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h1>{title}</h1>
                        </div>
                    </div>

                    <p className="price text-danger" style={{ fontSize: '35px' }}>${price ? price.toFixed(2) : 'N/A'}</p>
                    <p className="category">
                        <strong>Category:</strong> {category || 'N/A'}
                    </p>
                    <p className="description">
                        <strong>Description:</strong> {description || 'N/A'}
                    </p>
                    <div className="d-flex align-items-center mb-3">
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 offset-lg-1 d-flex justify-content-center align-items-center'>
                            <CiCirclePlus style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => increase()} />
                            <div className='mx-3' style={{fontSize:'25px'}}>{productCount}</div>
                            <CiCircleMinus style={{ fontSize: '35px', cursor: 'pointer' }} onClick={() => decrrease()} />

                        </div>

                    </div>
                    <div className='row mt-2'>
                        <div className='col-lg-6 offset-lg-1 d-flex justify-content-center align-items-center'>
                            <button className='btn btn-primary'
                            onClick={()=> addProduct()}
                            >Sepete Ekle</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails
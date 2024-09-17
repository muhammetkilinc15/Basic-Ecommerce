import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';
import Product from './Product';

function ProductList() {
    const dispatch = useDispatch();

    // State'den products'ı alıyoruz
    const products = useSelector((store) => store.product.products);

    console.log(products);

    // Sayfa yüklenince ürünleri getir
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Ürünler</h2>
            {products && products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p >No products available.</p>
            )}
        </div>
    );
}

export default ProductList;

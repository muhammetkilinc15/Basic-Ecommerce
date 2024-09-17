// src/components/SearchResults.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product'; // Product bileşenini içe aktar

const SearchResults = ({ query }) => {
    // Ürünleri store'dan alıyoruz
    const { products } = useSelector((store) => store.product);

    // Arama sorgusuna göre ürünleri filtrele
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (

        <div className="container">
            <h2 className="my-4">Ürünler</h2>
            {filteredProducts.length === 0 ? (
                <p>No products found for "{query}".</p>
            ) : (
                <div className="row">
                    {filteredProducts.map((product) => (
                        <Product key={product.id} product={product} /> // Product bileşenini kullan
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;

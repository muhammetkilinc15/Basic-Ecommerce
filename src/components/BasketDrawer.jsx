// components/BasketDrawer.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../redux/slices/basketSlice'; // Sepetten ürün kaldırma işlemi için action

const BasketDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.basket);
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light'; // Temayı kontrol et

    const totalPrice = products.reduce(
        (sum, product) => sum + product.price * (product.productCount || 0),
        0
    );

    const handleRemoveProduct = (productId) => {
        dispatch(removeProduct(productId));
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '350px',
                    backgroundColor: theme === 'dark' ? '#333' : '#fff', // Drawer arka plan rengi
                    color: theme === 'dark' ? '#fff' : '#000', // Drawer yazı rengi
                }
            }}
        >
            <div style={{
                padding: '20px',
                backgroundColor: 'inherit', // Arka plan rengini Drawer'ın arka planıyla uyumlu yap
                color: 'inherit' // Yazı rengini Drawer'ın yazı rengiyle uyumlu yap
            }}>
                <h3 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                    Sepetteki Ürünler
                </h3>
                <hr style={{ borderColor: theme === 'dark' ? '#555' : '#ccc' }} />
                {products.length === 0 ? (
                    <p>Your basket is empty.</p>
                ) : (
                    <div>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    style={{
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderBottom: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}` // Liste öğeleri arasında sınır
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            marginRight: '10px'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold' }}>{product.title}</div>
                                        <div>{product.productCount} x ${product.price.toFixed(2)}</div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        style={{
                                            color: theme === 'dark' ? '#f00' : '#f00', // Temaya göre yazı rengi
                                            borderColor: theme === 'dark' ? '#f00' : '#f00', // Temaya göre kenar rengi
                                            marginLeft: '10px'
                                        }}
                                        onClick={() => handleRemoveProduct(product.id)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <hr style={{ borderColor: theme === 'dark' ? '#555' : '#ccc' }} />
                        <p>
                            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                        </p>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: '20px',
                                width: '100%',
                                backgroundColor: theme === 'dark' ? '#007bff' : '#007bff', // Temaya göre arka plan rengi
                                color: '#fff'
                            }}
                            onClick={() => { /* Ödeme işlemini başlat */ }}
                        >
                            Ödeme Gerçekleştir
                        </Button>
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default BasketDrawer;

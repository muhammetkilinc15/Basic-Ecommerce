import React from 'react';
import '../assets/css/product.css';
import { useNavigate } from 'react-router-dom';

const renderStars = (rating) => {
    const totalStars = 5;
    let stars = '';
    const fullStar = '★'; // Dolmuş yıldız
    const halfStar = '☆'; // Boş yıldız
    const halfStarSymbol = '☆'; // Yarım yıldız için sembol

    // Yıldızları oluştur
    for (let i = 1; i <= totalStars; i++) {
        if (i <= Math.floor(rating)) {
            stars += fullStar; // Tam yıldız
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += halfStarSymbol; // Yarım yıldız
        } else {
            stars += halfStar; // Boş yıldız
        }
    }

    return stars;
};

function Product({ product }) {
    const { id, title, price, image, rating } = product;

    const navigate = useNavigate()
    // detaylara tıklanınca istediğimiz url e gidecek
    const handleClick = () => {
        navigate("/product-details/" + id);
    };

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
                <img src={image} alt={title} className="card-img-top img-fluid" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text price">
                        ${price.toFixed(2)}
                    </p>
                    <p className="card-text rating">
                        {renderStars(rating.rate)} ({rating.count} reviews)
                    </p>
                    <button 
                        className="btn btn-primary mt-auto" 
                        onClick={handleClick}>
                        Detaylar
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Product;

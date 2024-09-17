// src/components/Header.jsx
import React, { useState } from 'react';
import '../assets/css/header.css';
import eLogo from '../assets/images/logo.png';
import { CiShoppingCart } from 'react-icons/ci';
import { FaMoon } from 'react-icons/fa';
import { CiLight } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

function Header({ toggleDrawer }) {
  const [theme, setTheme] = useState(false); // false = light theme, true = dark theme
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimini saklamak için state
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);
  const basketProductCount = products.length;

  const changeTheme = () => {
    const root = document.getElementById('root');
    const body = document.body;

    if (theme) {
      // Switch to light theme
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    } else {
      // Switch to dark theme
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    }
    setTheme(!theme);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      navigate('/'); // Arama terimi boşsa ürünler sayfasına yönlendir
    } else {
      navigate(`/search/${value}`);
    }
  };

  return (
    <div className='header-main'>
      <div className='flex-row' onClick={() => navigate("/")}>
        <img className='logo' src={eLogo} alt="Logo" />
        <p className='logo-text'>E Commerce A.Ş</p>
      </div>
      <div className='flex-row'>
        <input
          className='search-input'
          type="text"
          placeholder='Bir şeyler ara'
          value={searchTerm}
          onChange={handleSearchChange} // Arama terimini güncelle
        />
        {
          theme ?
            <CiLight className='icon' onClick={changeTheme} /> :
            <FaMoon className='icon' onClick={changeTheme} />
        }
        <Badge badgeContent={basketProductCount} color="primary">
          <CiShoppingCart
            className='icon'
            style={{ fontSize: '30px', cursor: 'pointer' }}
            onClick={toggleDrawer}
          />
        </Badge>
      </div>
    </div>
  );
}

export default Header;

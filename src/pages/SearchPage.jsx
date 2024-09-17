// src/pages/SearchPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const { query } = useParams(); // URL parametresinden arama sorgusunu al

  return (
    <div>
      <h1>Arama Sonuçları</h1>
      <hr />
      <SearchResults query={query} /> {/* Arama sonuçlarını göster */}
    </div>
  );
};

export default SearchPage;

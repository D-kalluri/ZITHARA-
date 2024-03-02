import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date'); 
  const [loading, setLoading] = useState(true);

 
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/customers?page=${currentPage}&sortBy=${sortBy}`);
      setCustomers(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCustomers();
  }, [currentPage, sortBy]); 

  const handleSearch = async query => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/customers/search?query=${query}`);
      setCustomers(response.data);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error('Error searching customers:', error);
      setLoading(false);
    }
  };

  const handlePagination = direction => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSortBy = sortByOption => {
    setSortBy(sortByOption);
  };

  return (
    <div>
      <h1><u>CUSTOMERS LIST</u></h1>
      <SearchBar handleSearch={handleSearch} />
      <div>
        <span>Sort by: </span>
        <button onClick={() => handleSortBy('date')}>Date</button>
        <button onClick={() => handleSortBy('time')}>Time</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CustomerTable customers={customers} />
          <Pagination currentPage={currentPage} totalPages={totalPages} handlePagination={handlePagination} />
        </>
      )}
    </div>
  );
};

export default App;

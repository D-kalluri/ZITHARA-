import React from 'react';
import './CustomerTable.css'; 

const CustomerTable = ({ customers }) => {
  return (
    <table className="customer-table"> 
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.sno}>
            <td>{customer.customer_name}</td>
            <td>{customer.age}</td>
            <td>{customer.phone}</td>
            <td>{customer.location}</td>
            <td>{customer.date}</td>
            <td>{customer.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;

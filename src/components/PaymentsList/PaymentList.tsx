import React from 'react';
import './PaymentList.css';

const paymentsData = [
    { date: '19 Mar, 2024', name: 'S. Barneveld', transactionNr: '2102399123489', status: 'Paid', amount: '1250,-' },
    { date: '19 Mar, 2024', name: 'S. Barneveld', transactionNr: '2102399123489', status: 'Cancelled', amount: '1250,-' },
    // ... more data
  ];
  
  const PaymentRow = ({ payment }) => {
    return (
      <tr>
        <td>{payment.date}</td>
        <td>{payment.name}</td>
        <td>{payment.transactionNr}</td>
        <td>{payment.status}</td>
        <td>{payment.amount}</td>
      </tr>
    );
  };
  
  const PaymentsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Transaction Nr.</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentsData.map((payment, index) => (
            <PaymentRow key={index} payment={payment} />
          ))}
        </tbody>
      </table>
    );
  };
  
  const PaymentList = () => {
    return (
      <div>
        <p className='payment-stripe-text'>Stripe is a safe payment service. It looks like you haven't connected to Stripe yet. Click the button below to connect to Stripe and get paid for your services.</p>
        <button id='btn-stripe'>Connect to stripe</button>
        <PaymentsTable />
      </div>
    );
  };
  
  export default PaymentList;
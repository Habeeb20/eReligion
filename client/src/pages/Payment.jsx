import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handlePay = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/paystack/pay`, { email, amount });
    window.location.href = res.data.authorization_url; // Redirect to Paystack payment page
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-lg font-bold mb-4">Pay User B</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 border mb-4"
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full p-2 border mb-4"
      />
      <button onClick={handlePay} className="bg-green-500 text-white px-4 py-2">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;

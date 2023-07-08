import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [vatNumber, setVatNumber] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [vatData, setVatData] = useState({});

  const validateVat = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/validate_vat/`, {
        params: {
          vat_number: vatNumber,
          is_business: isBusiness,
        },
      });
      setIsValid(response.data.is_valid);
      setVatData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>VAT Check Application</h1>
      <div>
        <label htmlFor="vatNumber">VAT Number:</label>
        <input type="text" id="vatNumber" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
      </div>
      <div>
        <label htmlFor="isBusiness">Business VAT:</label>
        <input type="checkbox" id="isBusiness" checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)} />
      </div>
      <button onClick={validateVat}>Validate VAT</button>
      {isValid !== null && (
        <p>
          The VAT number is <strong>{isValid ? 'valid' : 'invalid'}</strong>.
        </p>
      )}
      {vatData.name && vatData.address && (
        <div>
          <p>Name: {vatData.name}</p>
          <p>Address:</p>
          <ul>
            {Object.values(vatData.address).map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
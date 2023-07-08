import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State variables for VAT number, business status, validation status, and VAT data from HMRC
  const [vatNumber, setVatNumber] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [vatData, setVatData] = useState({});

  // Function to validate VAT number
  const validateVat = async () => {
    try {
      // Making a GET request to the backend API
      const response = await axios.get(`http://localhost:8000/validate_vat/`, {
        params: {
          vat_number: vatNumber,
          is_business: isBusiness,
        },
      });
      // Updating the state variables with the response data
      setIsValid(response.data.is_valid);
      setVatData(response.data);
    } catch (error) {
      // Logging any errors
      console.error(error);
    }
  };

  // Rendering the component
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">🇬🇧UK VAT Validator</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">VAT Number:</label>
                  <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
                </div>
                <div className="flex items-center space-x-4">
                  <input type="checkbox" id="isBusiness" checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)} className="flex-shrink-0 h-6 w-6 text-gray-600 rounded-md" />
                  <label htmlFor="isBusiness" className="font-medium text-gray-700">Business VAT</label>
                </div>
                <button onClick={validateVat} className="px-4 py-2 text-white font-semibold text-center bg-blue-500 rounded-full hover:bg-blue-700">Validate VAT</button>
                {isValid !== null && (
                  <p className="text-gray-600">
                    The VAT number is <strong>{isValid ? 'valid' : 'invalid'}</strong>.
                  </p>
                )}
                {vatData.name && vatData.address && (
                  <div>
                    <br />
                    <p><strong>Information provided by UK HMRC:</strong></p> <hr />
                    <br />
                    <p><strong>Business Name:</strong> {vatData.name}</p>
                    <p><strong>Address:</strong></p>
                    <ul>
                      {Object.values(vatData.address).map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
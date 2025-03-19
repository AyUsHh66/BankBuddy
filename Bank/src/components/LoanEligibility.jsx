import React, { useState } from "react";
import axios from "axios";

const LoanEligibility = () => {
  const [eligibility, setEligibility] = useState(null);
  const [userData, setUserData] = useState({ income: "", employment: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const checkEligibility = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/eligibility", userData);
      setEligibility(response.data.result);
    } catch (error) {
      console.error("Eligibility check failed", error);
    }
  };

  return (
    <div>
      <input type="text" name="income" placeholder="Enter income" onChange={handleChange} />
      <input type="text" name="employment" placeholder="Employment type" onChange={handleChange} />
      <button onClick={checkEligibility}>Check Eligibility</button>
      {eligibility && <p>Result: {eligibility}</p>}

      
    </div>
  );
};

export default LoanEligibility;

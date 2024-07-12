import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState,useEffect } from 'react';
import InvestorFormPart from './InvestorFormPart';

const InvestorDash = () => {

  const [type,setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [range,setRange] = useState(0);
  const [industry, setIndustry] = useState([]);
  const [investment,setInvestment] = useState([]);
  const [production,setProduction] = useState([]);
  const [customer,setCustomer] = useState([]);
  const {user} = useAuthContext();
  const apiUrl = process.env.REACT_APP_API_URL;

  
  const types = ["Angel", "Venture Capitalist", "Private Equity", "Crowdfunding", "Corporate", "Family Office", "Accelerator/Incubator", "Government", "Individual", "Other"];
  const industries = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Retail", "Transportation", "Construction", "Energy", "Telecommunications", "Agriculture", "Entertainment", "Real Estate", "Hospitality", "Food & Beverage"];
  const investments = ["Seed", "Pre-Seed", "Series A", "Series B", "Series C", "IPO"];
  const productions = ["Concept", "Prototype", "In Production", "Ready for Market", "Scaling", "Mature"];
  const customers = ["B2B", "B2C", "C2C", "C2B", "Enterprise", "D2C"];

  useEffect(() => {
    const fetchInvestPref = async () => {
        const res = await fetch(`${apiUrl}/api/investor`,{
            headers: {
              'Authorization':`Bearer ${user.token}`
            }
        });
        const investPref = await res.json();
        
        if(investPref) {
          // console.log(investPref);
          setType(investPref.investorType);
          setRange(investPref.investmentRange);
          setIndustry(investPref.industry);
          setInvestment(investPref.investmentStage);
          setProduction(investPref.productionStage);
          setCustomer(investPref.customerGroup);
        }
        setLoading(false);
    }

    fetchInvestPref();
  }, [user,apiUrl]);

  const handleClick = (item, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  const handlePrefSubmit = async (e) => {

    e.preventDefault();

    if(!type || !industry.length || !investment.length || ! production.length || !customer.length) {
        return alert('Select at Least One Option in Each Field To Submit');
    }
    if(range===0) {
      return alert('Range Cannot be Zero');
    }

    const res = await fetch(`${apiUrl}/api/investor`,{
        method:'POST',
        body: JSON.stringify({investorType:type,investmentRange:range,industry,investmentStage:investment,productionStage:production,customerGroup:customer}),
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${user.token}`
        }
    })
    const data = await res.json();

    if(data) {
        alert('Investor Preferences added successfully');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('Error in adding Investor Preferences');
    }
  };

  if(loading) {
      return (
        <div className='loading'><h1>Loading...</h1></div>
      )
  }

  return (
    <div>
      <h1><p>WELCOME {user.name.toUpperCase()}</p><p>SHARE YOUR STARTUP PREFERENCES</p></h1>
      <form className="invest-form" onSubmit={handlePrefSubmit}>

        <div className='options-container'>
          <h3>Investor Type </h3>
            {types.map((typeOption, index) => (
              <div key={index} className={type === typeOption ? 'selected' : ''} onClick={(e) => setType(typeOption)}>
                {typeOption}
              </div>
            ))}
        </div>
        
        <InvestorFormPart title='Industries' options={industries} selectedOptions={industry} setSelectedOptions={setIndustry} handleClick={handleClick} /> 

        <InvestorFormPart title='Investment Stage' options={investments} selectedOptions={investment} setSelectedOptions={setInvestment} handleClick={handleClick} /> 

        <InvestorFormPart title='Production Stage' options={productions} selectedOptions={production} setSelectedOptions={setProduction} handleClick={handleClick} />

        <InvestorFormPart title='Customer Group' options={customers} selectedOptions={customer} setSelectedOptions={setCustomer} handleClick={handleClick} /> 

        <div className='options-container range-slider'>
          <h3>Investment Range</h3>
          <input type="range" min={0} max={10000000} value={range} onChange={(e)=>setRange(e.target.value)} />
          <div><input type="number" value={range} onChange={(e)=>setRange(e.target.value)}/></div>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default InvestorDash
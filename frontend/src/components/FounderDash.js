import React from 'react'
import { useState,useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const FounderDash = () => {

   const [startupName,setStartupName] = useState('')
   const [industry, setIndustry] = useState('STARTUP INDUSTRY');
   const [investment,setInvestment] = useState('INVESTMENT STAGE');
   const [production,setProduction] = useState('PRODUCTION STAGE');
   const [customer,setCustomer] = useState('CUSTOMER GROUP');
   const {user} = useAuthContext();
   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(() => {
      const fetchBusiness = async () => {
         const res = await fetch(`${apiUrl}/api/founder/business`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
         });
         const business = await res.json();

         if(business) {
            
            //console.log(business);
            setStartupName(business.startupName);
            setIndustry(business.industry);
            setInvestment(business.investmentStage);
            setProduction(business.productionStage);
            setCustomer(business.customerGroup);
         }

      }

      fetchBusiness();
    }, [user,apiUrl]);

   const industries = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Retail", "Transportation", "Construction", "Energy", "Telecommunications", "Agriculture", "Entertainment", "Real Estate", "Hospitality", "Food & Beverage"];
   const investments = ["Seed", "Pre-Seed", "Series A", "Series B", "Series C", "IPO"];
   const productions = ["Concept", "Prototype", "In Production", "Ready for Market", "Scaling", "Mature"];
   const customers = ["B2B", "B2C", "C2C", "C2B", "Enterprise", "D2C"];

   //console.log(investment,industry,production,customer);

   const handleBusiInfo = async (e) => {
      e.preventDefault();

      if(industry==='INDUSTRY') return alert('Please Select Startup Industry');
      if(investment==='INVESTMENT STAGE') return alert('Please Select Investment Stage');
      if(production==='PRODUCTION STAGE') return alert('Please Select Production Stage');
      if(customer==='CUSTOMER GROUP') return alert('Please Select Customer Group');

      const res = await fetch(`${apiUrl}/api/founder/business`,{
         method:'POST',
         body: JSON.stringify({industry,startupName,investmentStage:investment,productionStage:production,customerGroup:customer}),
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
         }
      })
      const data = await res.json();

      if(data) {
         alert(data.message);
      } else {
         alert('Error in adding Business Info');
      }
   }
   
   return (
      <div className="founder-dash">
         <h1><p>WELCOME {user.name.toUpperCase()}</p><p>SHARE YOUR STARTUP INFO</p></h1>
         <form className="busiInfoForm" onSubmit={handleBusiInfo}>

            <div className="startup-name"> 
               <input type="text" value={startupName} onChange={(e) => setStartupName(e.target.value)} placeholder='Enter Startup Name' required />
            </div>

            <div className="form-selects">
               <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value={industry} disabled hidden>{industry}</option>
                  {industries.map((industryOption, index) => (
                     <option key={index} value={industryOption}>
                        {industryOption}
                     </option>
                  ))}
               </select>

               <select value={investment} onChange={(e) => setInvestment(e.target.value)}>
                  <option value={investment} disabled hidden>{investment}</option>
                  {investments.map((investmentOption, index) => (
                     <option key={index} value={investmentOption}>
                        {investmentOption}
                     </option>
                  ))}
               </select>

               <select value={production} onChange={(e) => setProduction(e.target.value)}>
                  <option value={production} disabled hidden>{production}</option>
                  {productions.map((productionOption, index) => (
                     <option key={index} value={productionOption}>
                        {productionOption}
                     </option>
                  ))}
               </select>

               <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
                  <option value={customer} disabled hidden>{customer}</option>
                  {customers.map((customerOption, index) => (
                     <option key={index} value={customerOption}>
                        {customerOption}
                     </option>
                  ))}
               </select>
            </div>

            <button type='submit'>Submit</button>
         </form>
      </div>
   )
}

export default FounderDash
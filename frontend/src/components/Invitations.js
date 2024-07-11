import React, { useEffect, useState } from 'react'
import '../styles/Invitations.css'
import { useAuthContext } from '../hooks/useAuthContext'

const Invitations = () => {

  const [connections,setConnections] = useState('');
  const [investorsInfo,setInvestorsInfo] = useState([]);
  const [loading,setLoading] = useState(true);
  const {user} = useAuthContext();
  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchConnections = async () => {
      const res = await fetch(`${apiUrl}/api/connections`,{
          headers: {
              'Authorization':`Bearer ${user.token}`
          }
      });
      const connections = await res.json();

      if(connections) setConnections(connections);
      
    }

    const fetchInvestorInfo = async () => {
      const res = await fetch(`${apiUrl}/api/investor/all`,{
          headers: {
              'Authorization':`Bearer ${user.token}`
          }
      });
      const investorsInfo = await res.json();

      if(investorsInfo) setInvestorsInfo(investorsInfo);
      setLoading(false);
    }

    fetchConnections();
    fetchInvestorInfo();

  },[user,apiUrl]);

  // console.log(connections);

  if (loading) {
    return (
      <div className="loading"> <h1>Loading...</h1> </div>
    );
  }

  const filteredConnect = (connections || [])
  .filter(connect => connect.founderEmail===user.email)
  .filter(connect => connect.status==='Pending');
  // console.log(filteredConnect);

  if(filteredConnect.length===0) {
    return (
      <div className="loading"> <h1>No Connection Requests</h1> </div>
    )
  }

  const handleConnectUpdate = async (status,_id) => {
    
    const res = await fetch(`${apiUrl}/api/connections/update`,{
      method:'POST',
      body: JSON.stringify({status,_id}),
      headers: {
         'Content-Type':'application/json',
         'Authorization':`Bearer ${user.token}`
      }
    });

    const allConnections = await res.json();

    if(allConnections) {
      setConnections(allConnections);
    } else {
      alert('Error in Updating Connection Status');
    }

  }

  return (
    <div className="invites-container">
      {filteredConnect.map(connect =>{
        const investor = investorsInfo.find(invest => invest.investorEmail === connect.investorEmail);
        if(connect.status!=='Pending') return(null);
      return (
        <div key={connect._id} className="invite-card">
          <div className="details">
            <h2>{connect.investorName}</h2>
            <p>INVESTOR TYPE - {investor.investorType} </p>
            <p>INVESTMENT RANGE - <span>&#8377;</span> {investor.investmentRange} /- </p>
          </div>
          <div className="btns">
            <button onClick={() => handleConnectUpdate('Accepted',connect._id)}><i className='fa-solid fa-check'></i></button>
            <button onClick={() => handleConnectUpdate('Rejected',connect._id)}><i className='fa-solid fa-x'></i></button>
          </div>
        </div>
      )
      })}
    </div>
  )
}

export default Invitations
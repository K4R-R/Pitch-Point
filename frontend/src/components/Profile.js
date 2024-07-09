import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
   
   const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)} className='btn'>Back</button>
    </div>
  )
}

export default Profile
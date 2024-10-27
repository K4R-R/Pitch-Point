import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState,useEffect } from 'react'

const Navbar = () => {

   const {logout} = useLogout();
   const {user} = useAuthContext();
   const [dropdown, setDropdown] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 500);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   // console.log(isMobile);

   const handleLogout = () => {
      logout();
   }

   return (
      <div className='navbar'>
         <div className="sitename">PITCH POINT</div>
         {!isMobile && (
            <div className='navlinks'>
               <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Dashboard</NavLink>
               {user.role==='Founder' && <NavLink to="/invitations" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Invitations</NavLink>}
               {user.role==='Investor' && <NavLink to="/startups" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Startups</NavLink>}
               {user.role==='Guest' && <NavLink to="/startupinfo" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Startup Info</NavLink>}
               {user.role!=='Guest' && <NavLink to="/messages" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Messages</NavLink>}
               <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Blogs</NavLink>
               {user.role!=='Guest' && <NavLink to="/myblogs" className={({ isActive }) => (isActive ? 'cur-location' : '')}>My Blogs</NavLink>}
            </div>
         )}
         <div className='profile'>
            <button onClick={()=>{setDropdown(!dropdown)}}><i className="fa fa-user-circle"></i></button>
            {dropdown && (
               <div className='dropdown-menu'>
                  <button onClick={()=>{setDropdown(!dropdown)}}><i className="fa fa-user-circle"></i></button>
                  <NavLink to="/profile" onClick={() => setDropdown(false)}>Profile</NavLink>
                  {isMobile && (
                     <>
                     <NavLink to="/dashboard" onClick={() => setDropdown(false)}>Dashboard</NavLink>
                     {user.role==='Founder' && <NavLink to="/invitations" onClick={() => setDropdown(false)}>Invitations</NavLink>}
                     {user.role==='Investor' && <NavLink to="/startups" onClick={() => setDropdown(false)}>Startups</NavLink>}
                     {user.role==='Guest' && <NavLink to="/startupinfo" onClick={() => setDropdown(false)}>Startup Info</NavLink>}
                     {user.role!=='Guest' && <NavLink to="/messages" onClick={() => setDropdown(false)}>Messages</NavLink>}
                     <NavLink to="/blogs" onClick={() => setDropdown(false)}>Blogs</NavLink>
                     {user.role!=='Guest' && <NavLink to="/myblogs" onClick={() => setDropdown(false)}>My Blogs</NavLink>}
                     </>
                  )}
                  <div onClick={() => { handleLogout(); setDropdown(false); }}>Logout</div>
               </div>
            )}
         </div>         
      </div>
   )
}

export default Navbar
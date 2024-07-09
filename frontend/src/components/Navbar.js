import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

   const {logout} = useLogout();
   const {user} = useAuthContext();

   const handleLogout = () => {
      logout();
   }

   return (
      <div className='navbar'>
         <div className="sitename">PITCH POINT</div>
         <div className='navlinks'>
               <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Dashboard</NavLink>
               {user.role==='Founder' && <NavLink to="/invitations" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Invitations</NavLink>}
               {user.role==='Investor' && <NavLink to="/startups" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Startups</NavLink>}
               {user.role==='Guest' && <NavLink to="/startupinfo" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Startup Info</NavLink>}
               {user.role!=='Guest' && <NavLink to="/messages" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Messages</NavLink>}
               <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'cur-location' : '')}>Blogs</NavLink>
               {user.role!=='Guest' && <NavLink to="/myblogs" className={({ isActive }) => (isActive ? 'cur-location' : '')}>My Blogs</NavLink>}
         </div>
         <div className='profile'>
            <span>LOGOUT</span>
            <button onClick={handleLogout}><i className="fa fa-user-circle"></i></button>
         </div>
         
      </div>
   )
}

export default Navbar
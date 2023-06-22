import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? <div>
          <span>{user.username}</span>
          <button className="navButton" onClick={()=>{
            localStorage.removeItem("user");
            navigate('/')
            }}>Logout</button>
        </div> : (
          <div className="navItems">
            <button className="navButton" onClick={()=>{navigate('/')}}>Register</button>
            <button className="navButton" onClick={()=>{navigate('/')}}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import { RiPencilFill } from 'react-icons/ri';
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { BsBookmarks, BsBell } from 'react-icons/bs';
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';
import './Header.css';

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false;
    const [auth, setAuth] = useState(bool);
    const { activeUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(bool);
        setTimeout(() => {
            setLoading(false);
        }, 1600);
    }, [bool]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setShowDropdown(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const SearchForm = () => {
  return (
    <div className="input-group">
      <input 
        type="text" 
        className="form-control rounded-start-pill" 
        placeholder="Search blogs..."
      />
      <button 
        className="btn btn-primary rounded-end-pill px-3" 
        type="submit"
      >
        <i className="bi bi-search"></i> {/* or lucide-react Search icon */}
      </button>
    </div>
  );
};


    return (
        <header className="professional-header">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <div className="logo-content">
                        
                        <h5>KLE TECH BLOG</h5>
                    </div>
                </Link>

                {/* Search Form */}
                <div className="search-container flex-grow-1 d-flex justify-content-center">
  <form className="d-flex w-100" style={{ maxWidth: "500px" }}>
    <SearchForm />
  </form>
</div>


                {/* Navigation Options */}
                <div className='header-options'>
                    {auth ? (
                        <div className="auth-options">
                            {/* Create Blog Button */}
                            <Link className='create-blog-btn' to="/addstory">
                                <RiPencilFill className="btn-icon" />
                                <span>Write</span>
                            </Link>

                            {/* Bookmarks */}
                            <Link to="/readList" className='bookmarks-link'>
                                <BsBookmarks />
                                {activeUser.readListLength > 0 && (
                                    <span className="bookmark-count">
                                        {activeUser.readListLength}
                                    </span>
                                )}
                            </Link>

                            {/* Notifications */}
                            <button className="notifications-btn">
                                <BsBell />
                                <span className="notification-dot"></span>
                            </button>

                            {/* User Profile */}
                            <div className='user-profile' onClick={toggleDropdown}>
                                {loading ? (
                                    <SkeletonElement type="avatar" />
                                ) : (
                                    <div className="avatar-container">
                                        <img 
                                            src={`/userPhotos/${activeUser.photo}`} 
                                            alt={activeUser.username} 
                                            className="user-avatar"
                                        />
                                    </div>
                                )}
                                
                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-header">
                                            <div className="user-info">
                                                <div className="user-name">{activeUser.username}</div>
                                                <div className="user-email">{activeUser.email}</div>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link 
                                            className='dropdown-item' 
                                            to="/profile"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <FaUserEdit className="dropdown-icon" />
                                            <span>Profile</span>
                                        </Link>
                                        <button 
                                            className='dropdown-item logout-item' 
                                            onClick={handleLogout}
                                        >
                                            <BiLogOut className="dropdown-icon" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="no-auth-options">
                            <Link className='login-link' to="/login">Sign In</Link>
                            <Link className='register-link' to="/register">
                                <span>Get Started</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
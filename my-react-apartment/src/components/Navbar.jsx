import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Navbar.css"; // 引入樣式

function Navbar({ isLoggedIn, onLogout, currentUser }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">QuickLease</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">首頁</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              {currentUser.username}
            </li>
            <li>
              <Link to="/dashboard">會員中心</Link>
            </li>
            <li>
              {/* <button onClick={onLogout} className="navbar-button">
                登出
              </button> */}
            </li>
            <li>
              <Button
                onClick={onLogout}
                variant="outlined"
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'black',          // 設置文字顏色為黑色
                  borderColor: 'black',    // 設置邊框顏色為黑色
                  '&:hover': {
                    borderColor: 'black',  // 設置懸停時的邊框顏色為黑色
                    backgroundColor: 'rgba(0, 0, 0, 0.15)'  // 設置懸停時的背景顏色
                  }
                }}
              >
                登出
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-button">
                登入
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-button">
                註冊
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

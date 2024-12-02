import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 引入樣式

function Navbar({ cartCount, isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">QuickLease</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">首頁</Link>
        </li>
        <li>
          <Link to="/products">商品</Link>
        </li>
        <li>
          <Link to="/cart">購物車 ({cartCount})</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/checkout">查看結帳</Link>
            </li>
            <li>
              <button onClick={onLogout} className="navbar-button">
                登出
              </button>
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

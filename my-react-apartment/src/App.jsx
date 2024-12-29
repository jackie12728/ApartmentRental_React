import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { checkLoginStatus, login, logout, register, getCurrentUser } from "./services/authService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const initializeLoginStatus = async () => {
      try {
        const apiResponse = await checkLoginStatus(); // 使用判斷是否已登入服務方法
        setIsLoggedIn(apiResponse.data.isLoggedIn);
      } catch (error) {
        console.error("無法檢查登入狀態:", error);
        alert("無法連接到伺服器，請檢查網路連線或伺服器狀態。");
      }
    };

    initializeLoginStatus();
  }, []);

  useEffect(() => {
    const initializeCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data);
      } catch (error) {
        console.error("無法查詢當前使用者: ");
      }
    };

    initializeCurrentUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password); // 使用登入服務方法

      if (data.message === "登入成功") {
        setIsLoggedIn(true);
        alert("登入成功");
        window.location.href = "/";
      } else {
        alert("登入失敗");
      }
    } catch (error) {
      console.error("登入錯誤:", error);
    }
  };

  const handleRegister = async (userName, email, password, phoneNumber) => {
    try {
      const data = await register(userName, email, password, phoneNumber); // 使用註冊服務方法

      if (data.message === "註冊成功") {
        alert("註冊成功");
        window.location.href = "/login";
      } else {
        alert("註冊失敗");
      }
    } catch (error) {
      console.error("註冊錯誤", error);
    }
  };

  const handleLogout = async () => {
    try {
      const apiResponse = await logout(); // 使用登出服務方法
      setIsLoggedIn(false);
      alert(apiResponse.data);
      window.location.href = "/";
    } catch (error) {
      console.error("登出錯誤:", error);
    }
  };

  return (
    // v7_startTransition: true, 目的是
    // 提前啟用 React Router v7 的 startTransition 功能，
    // 它會將某些狀態更新包裝在 React.startTransition() 中，
    // 使應用的導航和狀態更新變得更平滑，優化用戶體驗，特別是對於性能要求較高的情況。

    // v7_relativeSplatPath: true, 目的是
    // 提前啟用 React Router v7 中相對於 Splat 路徑（'*' 通配符）的新解析行為，
    // 確保應用程序能夠正確處理相對路徑，減少升級至 v7 後可能產生的路由錯誤或不兼容問題。
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* 使用了新的 future flag，讓相對路徑解析行為提前符合 v7 的邏輯 */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} />} 
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegisterPage onRegister={handleRegister} />}
          />
          <Route
            path="/listing/:id"
            element={<ListingDetails isLoggedIn={isLoggedIn} currentUser={currentUser} />}
          />
          <Route 
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} />}
          />
          <Route
            path="/editListing"
            element={<EditListing />}
          />
          <Route
            path="/createListing"
            element={<CreateListing  currentUser={currentUser} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

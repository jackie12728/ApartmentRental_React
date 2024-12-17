// services/authService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 檢查登入狀態
 * @returns {Promise<Object>} 包含登入狀態的 API 回應
 */
export const checkLoginStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/isLoggedIn`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("無法取得登入狀態");
  }

  return response.json();
};

/**
 * 登入
 * @param {string} email 使用者 email 帳號
 * @param {string} password 密碼
 * @returns {Promise<Object>} 包含登入結果的 API 回應
 */
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("登入失敗");
  }

  return response.json();
};

/**
 * 註冊
 * @param {string} userName 使用者名稱
 * @param {string} email 使用者 email 帳號
 * @param {string} password 使用者密碼
 * @param {string} phoneNumber 使用者電話號碼
 * @returns {Promise<Object>} 包含註冊結果的 API 回應
 */
export const register = async (userName, email, password, phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userName, email, password, phoneNumber }),
  });

  if (!response.ok) {
    throw new Error("註冊失敗");
  }

  return response.json();
}

/**
 * 登出
 * @returns {Promise<Object>} 包含登出結果的 API 回應
 */
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("登出失敗");
  }

  return response.json();
};

/**
 * 取得當前使用者資料
 * @returns {Promise<Object} 包含使用者資料的 API 回應
 */
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/getCurrentUser`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("無法取得使用者 ID");
  }

  return response.json();
};

/**
 * @param {number} id 使用者 ID
 * @param {string} phoneNumber 使用者電話號碼
 * @returns {Promise<Object>} 包含儲存結果的 API 回應
 */
export const updateUserPhoneNumber = async (id, phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/auth/updateUserPhoneNumber`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, phoneNumber }),
  });

  if (!response.ok) {
    throw new Error("電話號碼更新失敗");
  }

  return response.json();
}
const API_BASE_URL = "http://localhost:8080";

/**
 * 獲取使用者的關注清單
 * @param {number} userId
 * @returns {Promise<Object>}
 */
export const fetchFavorites = async () => {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("無法獲取關注清單");
  return response.json();
};

/**
 * 獲取商品被關注清單
 * @param {number} listingId
 * @returns {Promise<Object>}
 */
export const getFavoriteUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/favorites/${listingId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("無法獲取關注者清單");
  return response.json();
};

/**
 * 新增關注
 * @param {number} userId
 * @param {number} listingId
 * @returns {Promise<Object>}
 */
export const addFavorite = async (listingId) => {
  const response = await fetch(`${API_BASE_URL}/favorites/${listingId}`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("無法新增關注");
  return response.json();
};

/**
 * 移除關注
 * @param {number} listingId
 * @returns {Promise<Object>}
 */
export const removeFavorite = async (listingId) => {
  const response = await fetch(`${API_BASE_URL}/favorites/${listingId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("無法移除關注");
  return response.json();
};

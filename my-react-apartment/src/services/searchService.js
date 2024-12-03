// services/searchService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 查詢全部縣市
 * @returns {Promise<Object>}
 */
export const getAllCities = async () => {
    const response = await fetch(`${API_BASE_URL}/search/city`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) throw new Error("無法取得城市列表");
    return response.json();
};

/**
 * 查詢縣市的所有區域
 * @param {number} cityId
 * @returns {Promise<Object>}
 */
export const getRegions = async (cityId) => {
    const response = await fetch(`${API_BASE_URL}/search/region/${cityId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) throw new Error("無法取得縣市的所有區域");
    return response.json();
}
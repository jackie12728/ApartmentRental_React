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

/**
 * 查詢房源列表
 * @param {Object} params 查詢參數
 * @param {number} [params.cityId] 城市ID
 * @param {Array<number>} [params.regionIds] 區域ID列表
 * @param {number} [params.minRent] 最小租金
 * @param {number} [params.maxRent] 最大租金
 * @param {string} [params.listingName] 房源名稱
 * @returns {Promise<Object>} 返回房源列表或錯誤信息
 */
export const searchListings = async ({ cityId, regionIds, minRent, maxRent, listingName }) => {
    try {
        const queryParams = new URLSearchParams();
        if (cityId) queryParams.append('cityId', cityId);
        if (regionIds && regionIds.length > 0) queryParams.append('regionIds', regionIds.join(','));
        if (minRent) queryParams.append('minRent', minRent);
        if (maxRent) queryParams.append('maxRent', maxRent);
        if (listingName) queryParams.append('listingName', listingName);

        const response = await fetch(`${API_BASE_URL}/searchBar?${queryParams.toString()}`, {
            method: "GET",
            credentials: "include",
        });

        // 如果返回的狀態不是 200，拋出錯誤
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "查詢失敗");
        }

        // 返回的數據符合 ApiResponse 格式
        const data = await response.json();

        // 檢查 ApiResponse 是否成功
        if (data.success) {
            return data.data; // 返回房源列表
        } else {
            throw new Error(data.message || "查詢錯誤");
        }

    } catch (error) {
        // 捕獲錯誤並返回錯誤消息
        console.error("Error fetching listings:", error);
        throw error;
    }
};
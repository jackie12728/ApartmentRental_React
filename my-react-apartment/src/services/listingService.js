// services/listingService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 新增房屋
 * @param {FormData} formData 包含房屋信息和圖片的 FormData 對象
 * @returns {Promise<Object>}
 */
export const saveListing = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/listingmanage/save`, {
            method: "POST",
            credentials: "include",
            body: formData  // 直接使用傳入的 FormData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "新增失敗");
        }

        return response.json();
    } catch (error) {
        throw new Error(error.message || "新增失敗");
    }
};

/**
 * 更新房屋
 * @param {number} id 房源 ID
 * @param {string} listingname 房源名稱
 * @param {string} description 房源描述
 * @param {number} cityId 縣市 ID
 * @param {number} regionId 區域 ID
 * @param {string} address 房源地址
 * @param {number} rent 房源租金
 * @param {number} rentalId 狀態編號（待出租 1、已出租 2、已下架 3）
 * @returns {Promise<Object>}
 */
export const modifyListing = async (id, listingname, description, cityId, regionId, address, rent, rentalId) => {
    const response = await fetch(`${API_BASE_URL}/listingmanage/modify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ id, listingname, description, cityId, regionId, address, rent, rentalId })
    });

    if (!response.ok) {
        throw new Error("更新失敗");
    }

    return response.json();
}

/**
 * 刪除房屋
 * @param {number} listingId 房源 ID
 * @returns {Promise<Object>}
 */
export const deleteListing = async (listingId) => {
    if (typeof listingId !== "number") {
        throw new Error("房源 ID 必須是數字");
    }

    const response = await fetch(`${API_BASE_URL}/listingmanage/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        credentials: "include",
        body: listingId.toString(), // 傳遞數字轉為字串
    });

    if (!response.ok) {
        throw new Error("刪除失敗");
    }

    return response.json();
};

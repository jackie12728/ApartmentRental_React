// services/appointmentService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 依據房屋ID查詢預約時間
 * @param {number} listingId
 * @returns {Promise<Object>}
 */
export const getAppointments = async (listingId) => {
    const response = await fetch(`${API_BASE_URL}/appoint/${listingId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) throw new Error("查詢預約時間失敗");
    return response.json();
}
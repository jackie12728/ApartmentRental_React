// services/appointmentService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 依據房屋ID查詢預約時間
 * @param {number} listingId 房源ID
 * @returns {Promise<Object>}
 */
export const getAppointments = async (listingId) => {
    const response = await fetch(`${API_BASE_URL}/appoint/${listingId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("查詢預約時間失敗");
    }

    return response.json();
}

/**
 * 儲存預約
 * @param {number} listingId 房源ID
 * @param {number} userId 租客ID
 * @param {string} appointmentDate 預約日期
 * @param {string} appointmentTime 預約時間
 * @returns {Promise<Object>}
 */
export const saveAppointment = async (listingId, userId, appointmentDate, appointmentTime) => {
    const response = await fetch(`${API_BASE_URL}/appoint/appointment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ listingId, userId, appointmentDate, appointmentTime }),
    });

    console.log("Request body:", JSON.stringify({ listingId, userId, appointmentDate, appointmentTime }));

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        throw new Error("預約失敗");
    }

    return response.json();
}
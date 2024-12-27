const API_BASE_URL = "http://localhost:8080";

/**
 * 取得驗證碼
 * @returns {Promise<Object>} 包含uuid和Base64格式驗證碼圖片的物件
 */
export const getVerificationCode = async () => {
    const response = await fetch(`${API_BASE_URL}/api/verification/code/base64`, {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("獲取驗證碼失敗", error);
    }

    return response.json();
};

/**
 * 驗證用戶輸入的驗證碼
 * @param {string} uuid Redis中儲存驗證碼的key
 * @param {string} code 用戶輸入的驗證碼
 * @returns {Promise<Object>} 驗證結果
 */
export const verifyCode = async (uuid, code) => {
    const response = await fetch(`${API_BASE_URL}/api/verification/verify`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            uuid,
            code,
        }),
    });

    if (!response.ok) {
        throw new Error("驗證碼驗證失敗");
    }

    return response.json();
};

/**
 * 重新產生驗證碼
 * 用於驗證碼過期或用戶點擊重新整理時
 * @returns {Promise<Object>} 包含新的uuid和Base64格式驗證碼圖片的物件
 */
export const refreshVerificationCode = async () => {
    return getVerificationCode();
};

export default {
    getVerificationCode,
    verifyCode,
    refreshVerificationCode,
};
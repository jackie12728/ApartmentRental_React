import React, { useEffect, useState } from "react";
import { getAllCities, getRegions } from "../services/searchService";
import "./EditListing.css";
import axios from "axios";

function EditListing() {
    const [formData, setFormData] = useState({
        listingname: "",
        description: "",
        cityId: "",
        regionId: "",
        address: "",
        rent: "",
        rentalId: "",
        imagePaths: [],
    });
    const [cities, setCities] = useState([]);       // 縣市列表
    const [districts, setDistricts] = useState([]); // 區域列表
    const [previewImages, setPreviewImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);

        try {
            const formDataToSend = new FormData();

            // 添加基本表單數據
            Object.keys(formData).forEach(key => {
                if (key !== 'imagePaths') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // 添加圖片文件
            Array.from(formData.imagePaths).forEach((file, index) => {
                formDataToSend.append(`images`, file);
            });

            // 發送到後端API
            const response = await axios.post('/api/listings', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('更新成功！');
                // 清理預覽圖片的URL
                previewImages.forEach(url => URL.revokeObjectURL(url));
            }
        } catch (error) {
            console.error('提交失敗:', error);
            alert('更新失敗，請稍後再試。');
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            imagePaths: files
        }));

        // 生成預覽圖片
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('editListingData'));
        if (storedData) {
            setFormData({
                ...storedData,
                imagePaths: storedData.imagePaths || [] // 如果 imagePaths 不存在，使用空陣列
            });
        }
    }, []);

    // 獲取縣市列表
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesData = await getAllCities();
                if (Array.isArray(citiesData.data)) {
                    setCities(citiesData.data); // 提取 data 屬性
                } else {
                    console.error("API 返回的縣市數據不是數組");
                }
            } catch (error) {
                console.error("獲取縣市失敗: ");
            }
        };

        fetchCities();
    }, []);

    // 根據選擇的縣市獲取區域列表
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                if (formData.cityId) {
                    const regionsData = await getRegions(formData.cityId);
                    setDistricts(regionsData.data || []); // 提取 data 或設置為空數組
                } else {
                    setDistricts([]);
                }
            } catch (error) {
                console.error("獲取區域失敗: ");
            }
        };

        fetchRegions();
    }, [formData.cityId]);

    return (
        <form className="edit-listing-form" onSubmit={handleSubmit}>
            <h2>編輯房屋資料</h2>

            <div className="form-field">
                <label htmlFor="listingname">房源名稱</label>
                <input
                    type="text"
                    id="listingname"
                    name="listingname"
                    value={formData.listingname}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-field">
                <label htmlFor="description">房源描述</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="form-field">
                <label htmlFor="cityId">縣市</label>
                <select
                    id="cityId"
                    name="cityId"
                    value={formData.cityId}
                    onChange={handleInputChange}
                >
                    <option value="">選擇縣市</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="regionId">區域</label>
                <select
                    id="regionId"
                    name="regionId"
                    value={formData.regionId}
                    onChange={handleInputChange}
                >
                    <option value="">選擇區域</option>
                    {districts.map((region) => (
                        <option key={region.id} value={region.id}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="address">房源地址</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-field">
                <label htmlFor="rent">房源租金</label>
                <input
                    type="number"
                    id="rent"
                    name="rent"
                    value={formData.rent.replace(/,/g, '')}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-field">
                <label htmlFor="rentalId">狀態</label>
                <select
                    id="rentalId"
                    name="rentalId"
                    value={formData.rentalId}
                    onChange={handleInputChange}
                >
                    <option value="">選擇狀態</option>
                    <option value="1">待出租</option>
                    <option value="2">已出租</option>
                    <option value="3">已下架</option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="imagePaths">上傳圖片</label>
                <input
                    type="file"
                    id="imagePaths"
                    name="imagePaths"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                />
            </div>

            {previewImages.length > 0 && (
                <div className="image-preview-container">
                    <h3>圖片預覽</h3>
                    <div className="image-preview-grid">
                        {previewImages.map((url, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={url} alt={`預覽 ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button type="submit">提交變更</button>
        </form>
    );
}

export default EditListing;

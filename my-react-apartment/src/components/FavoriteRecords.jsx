import React from "react";

function FavoriteRecords() {
    const favorites = [
        { id: 1, property: "高雄市美術館某套房" },
        { id: 2, property: "台中市西屯區某公寓" },
    ];

    return (
        <div className="favorite-records">
            <h3>收藏紀錄</h3>
            <ul>
                {favorites.map((item) => (
                    <li key={item.id}>{item.property}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteRecords;

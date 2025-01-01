import React, { useEffect, useState } from "react";
import { fetchFavorites, removeFavorite } from "../services/favoriteService";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';

function FavoriteRecords({ currentUser }) {
    const [favorites, setFavorites] = useState([]); // 收藏紀錄

    // 刪除收藏紀錄
const handleDelete = async (id) => {
    const confirmDelete = window.confirm("確定要刪除此收藏紀錄嗎？");
    if (!confirmDelete) {
        return; // 使用者取消操作
    }
    
    try {
        await removeFavorite(id); // 呼叫刪除 API
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== id)); // 從列表中移除
        alert("刪除成功！");
    } catch (error) {
        console.error("刪除失敗：", error.message);
        alert("刪除失敗，請稍後再試！");
    }
};


    const columns = [
        {
            field: 'listingname',
            headerName: '房屋名稱',
            width: 180,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        { 
            field: 'address', 
            headerName: '房屋地址', 
            width: 240,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        { 
            field: 'rent', 
            headerName: '房屋租金', 
            width: 130,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        {
            field: 'delete',
            headerName: '取消收藏',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon = {<DeleteForeverIcon />}
                >
                    刪除
                </Button>
            )
        }
    ];

    // 動態生成 rows 並加入自動遞增的 id
    const rows = favorites.map((favorites) => ({
        id: favorites.id,
        listingname: favorites.listingname,
        address: favorites.address,
        rent: Number(favorites.rent).toLocaleString('zh-TW'), // 格式化為千分位
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    // 獲取收藏列表
    useEffect(() => {
        const getFavorites = async () => {
            try {
                const favoritesData = await fetchFavorites(Number(currentUser.id));
                setFavorites(favoritesData.data);
            } catch (error) {
                console.error("獲取收藏紀錄失敗：", error.message);
            }
        };

        getFavorites();
    }, []);

    function DataTable() {
        return (
            <Paper sx={{ height: '100%', width: 870 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        );
    }

    return (
        <div className="favorite-records">
            <h2>收藏紀錄</h2>
            <br />
            {DataTable()}
        </div>
    );
}

export default FavoriteRecords;

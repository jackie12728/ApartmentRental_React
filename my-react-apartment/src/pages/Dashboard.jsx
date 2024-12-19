import { React,useState } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import ReservationRecords from "../components/ReservationRecords";
import FavoriteRecords from "../components/FavoriteRecords";

function Dashboard({currentUser}) {
    const [currentTab, setCurrentTab] = useState("profile");

    const renderContent = () => {
        switch (currentTab) {
            case "profile":
                return <ProfileInfo currentUser={currentUser} />;
            case "reservations":
                return <ReservationRecords currentUser={currentUser} />;
            case "favorites":
                return <FavoriteRecords />;
            default:
                return <ProfileInfo />;
        }
    };

    return (
        <div className="app-container">
            {/* 側邊欄 */}
            <Sidebar setCurrentTab={setCurrentTab} />

            {/* 主內容 */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard;
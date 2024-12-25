import { React,useState } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import ReservationRecords from "../components/ReservationRecords";
import FavoriteRecords from "../components/FavoriteRecords";
import Listings from "../components/ListingsManage";
import BecomeLandlord from "../components/BecomeLandlord";

function Dashboard({currentUser}) {
    const [currentTab, setCurrentTab] = useState("profile");

    const renderContent = () => {
        switch (currentTab) {
            case "profile":
                return <ProfileInfo currentUser={currentUser} />;
            case "reservations":
                return <ReservationRecords currentUser={currentUser} />;
            case "favorites":
                return <FavoriteRecords currentUser={currentUser} />;
            case "listings":
                return <Listings currentUser={currentUser} />;
            case "becomeLandlord":
                return <BecomeLandlord currentUser={currentUser} />;
            default:
                return <ProfileInfo currentUser={currentUser} />;
        }
    };

    return (
        <div className="app-container">
            {/* 側邊欄 */}
            <Sidebar setCurrentTab={setCurrentTab} currentUser={currentUser} />

            {/* 主內容 */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard;
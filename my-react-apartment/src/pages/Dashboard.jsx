import { React,useState } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import ReservationRecords from "../components/ReservationRecords";
import FavoriteRecords from "../components/FavoriteRecords";

function Dashboard() {
    const [currentTab, setCurrentTab] = useState("profile");

    const renderContent = () => {
        switch (currentTab) {
            case "profile":
                return <ProfileHeader />;
            case "reservations":
                return <ReservationRecords />;
            case "favorites":
                return <FavoriteRecords />;
            default:
                return <ProfileHeader />;
        }
    };

    return (
        <div className="app-container">
            <Sidebar setCurrentTab={setCurrentTab} />
            <div className="main-content">{renderContent()}</div>
        </div>
    );
}

export default Dashboard;
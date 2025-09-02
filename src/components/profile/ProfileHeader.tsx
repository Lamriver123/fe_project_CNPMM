import React from "react";
import type { User } from "../../types/User";

interface ProfileHeaderProps {
    user: User;
    stats: {
        orders: number;
        reviews: number;
        favorites: number;
    };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, stats }) => {
    return (
        <div className="profile-header">
            <div className="profile-avatar">
                <img
                    src={user.avt || "https://via.placeholder.com/120x120/6f42c1/ffffff?text=U"}
                    alt="Avatar"
                    className="avatar-img"
                />
                <button className="avatar-edit-btn">
                    <i className="bi bi-camera"></i>
                </button>
            </div>
            <div className="profile-info">
                <h1 className="profile-name">
                    {(user.fullName && user.fullName !== user.email)
                        ? user.fullName
                        : user.username || "Người dùng"}
                </h1>
                <p className="profile-email">{user.email}</p>
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-number">{stats.orders}</span>
                        <span className="stat-label">Đơn hàng</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.reviews}</span>
                        <span className="stat-label">Đánh giá</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{stats.favorites}</span>
                        <span className="stat-label">Yêu thích</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

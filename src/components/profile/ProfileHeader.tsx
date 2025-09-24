import React, { useEffect, useRef, useState } from "react";
import type { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
    user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        // Cleanup blob URL khi component unmount hoặc preview thay đổi
        return () => {
            if (previewAvatar) {
                URL.revokeObjectURL(previewAvatar);
            }
        };
    }, [previewAvatar]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("File đã chọn:", file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
        e.target.value = '';    // cho phép chọn lại ảnh vừa chọn trước đó
    };

    const handleTabClick = (tab: string) => {
        navigate(`/profile?tab=${tab}`);
    }

    return (
        <div className="profile-header">
            <div className="profile-avatar" onClick={handleAvatarClick}>
                <img
                    src={previewAvatar || user.avt || "https://via.placeholder.com/120x120/6f42c1/ffffff?text=U"}
                    alt="Avatar"
                    className="avatar-img"
                />
                <button className="avatar-edit-btn">
                    <i className="bi bi-camera"></i>
                </button>
                {/* input file ẩn */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="profile-info">
                <h1 className="profile-name">
                    {(user.fullName && user.fullName !== user.email)
                        ? user.fullName
                        : user.username || "Người dùng"}
                </h1>
                <p className="profile-email">{user.email}</p>
                <div className="profile-stats">
                    <div className="stat-item" onClick={() => handleTabClick('orders')}>
                        <span className="profile-stat-number">1</span>
                        <span className="profile-stat-label">Đơn hàng</span>
                    </div>
                    <div className="stat-item" onClick={() => handleTabClick('viewed')}>
                        <span className="profile-stat-number">4</span>
                        <span className="profile-stat-label">Đánh giá</span>
                    </div>
                    <div className="stat-item" onClick={() => handleTabClick('favorites')}>
                        <span className="profile-stat-number">{user.favProducts.length}</span>
                        <span className="profile-stat-label">Yêu thích</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

import ProfilePage from "@/components/client/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Profile Page',
    description: 'Manage your profile',
}

function Profile() {
    return (
        <>
            <ProfilePage />
        </>
    );
}

export default Profile;
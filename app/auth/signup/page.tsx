import SignupPage from "@/components/auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup Page',
    description: 'Create new account',
}

function Signup() {
    return (
        <>
            <SignupPage />
        </>
    );
}

export default Signup;
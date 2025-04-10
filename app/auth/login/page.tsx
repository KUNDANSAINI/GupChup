import LoginPage from "@/components/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Access your account',
}

function Login() {
    return (
        <>
            <LoginPage />
        </>
    );
}

export default Login;
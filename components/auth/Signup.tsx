'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import ValidPhone from "../include/ValidPhone";
import EmailInput from "../include/EmailInput";
import toast from "react-hot-toast";
import PasswordInput from "../include/PasswordInput";
import axios from "axios";
import { backend_url } from "@/utils/API";

export default function SignupPage() {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState<number>(0)
    const [phone, setPhone] = useState<string>("")
    const [isPhoneValid, setIsPhoneValid] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [password, setPassword] = useState<string>("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak')
    const [otp, setOtp] = useState<string>("")

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    const handleSignup = () => {
        if (activeStep === 0) {
            SendOTP()
        } else if (activeStep === 1) {
            VerifyOTP()
        }
    }

    const allFieldsValid = () => {
        return isPhoneValid && isEmailValid && isPasswordValid && passwordStrength !== 'weak'
    }

    const SendOTP = async () => {
        if (!allFieldsValid()) {
            return toast.error("Please fill all fields correctly")
        }

        try {
            const data = { email, password, phone }
            const response = await axios.post(`${backend_url}/api/signup`, data, {
                // withCredentials: true
            })
            if (response.status === 201) {
                toast.success(response.data.message)
                setActiveStep(1)
            }
        } catch (error: unknown) {
            console.error("OTP send error:", error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something Went Wrong, Please Try Again ❓");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }

    const VerifyOTP = async () => {
        if (otp.length !== 6) {
            return toast.error("Please enter a 6-digit OTP")
        }

        try {
            const data = { email, otp }
            const response = await axios.post(`${backend_url}/api/otp-verify`, data)
            if (response.status === 201) {
                toast.success(response.data.message)
                router.push('/')
            }
        } catch (error: unknown) {
            console.error("OTP verification error:", error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something Went Wrong, Please Try Again ❓");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="h-screen w-full py-6" style={{
            backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_3t/19801.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-full w-3/4 mx-auto rounded-3xl border-[6px] border-white dark:border-accent">
                    {/* Left Section */}
                    <div className="flex w-1/2 p-12 rounded-3xl bg-transparent">
                        <div className="flex flex-col justify-between space-y-6 text-white">
                            <div className="flex items-center gap-4">
                                <h2 className="font-bold text-sm">A WISE QUOTE</h2>
                                <div className="w-40 h-[1px] bg-white"></div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-4xl font-semibold">Get<br />Everything<br />You Want</p>
                                <p>
                                    You can get everything you want if you work hard,<br />
                                    trust the process, and stick to the plan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex w-1/2 items-center justify-center bg-white dark:bg-accent p-12 rounded-r-md">
                        <div className="w-full max-w-md space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-center">Welcome</h2>
                                <p className="text-center text-sm">Enter your email and password to create new account</p>
                            </div>

                            <div className="space-y-6">
                                {activeStep === 0 && (
                                    <>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">Mobile Number</label>
                                            <ValidPhone
                                                defaultCountry="IN"
                                                onValidPhone={(phone) => {
                                                    setPhone(phone)
                                                    setIsPhoneValid(!!phone)
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium">Email</label>
                                            <EmailInput
                                                onValidEmail={(email) => {
                                                    setEmail(email)
                                                    setIsEmailValid(!!email)
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium">Password</label>
                                            <PasswordInput
                                                onValidPassword={(valid) => {
                                                    setIsPasswordValid(valid)
                                                }}
                                                onStrengthChange={setPasswordStrength}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                    </>
                                )}

                                {activeStep === 1 && (
                                    <div className="my-10 space-y-4">
                                        <p className="text-center text-sm">
                                            Enter 6-digit code sent to {email}
                                        </p>
                                        <div className="grid justify-center">
                                            <InputOTP
                                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                                autoFocus
                                                maxLength={6}
                                                value={otp}
                                                onChange={(value) => setOtp(value)}
                                            >
                                                <InputOTPGroup>
                                                    {[...Array(6)].map((_, i) => (
                                                        <InputOTPSlot key={i} index={i} />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    onClick={handleSignup}
                                    className="w-full cursor-pointer"
                                    disabled={activeStep === 0 ? !allFieldsValid() : otp.length !== 6}
                                >
                                    {activeStep === 0 ? "Send OTP" : "Verify"}
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-accent px-2">Or continue with</span>
                                </div>
                            </div>

                            <Button variant={"ghost"} className="flex w-full items-center justify-center space-x-2 cursor-pointer">
                                <svg className="h-5 w-5" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.308 10.23c0-.68-.055-1.363-.173-2.032H10.7v3.851h5.402a4.628 4.628 0 01-2 3.039v2.499h3.223c1.893-1.742 2.983-4.315 2.983-7.357z" fill="#4285F4" />
                                    <path d="M10.7 20c2.7 0 4.963-.894 6.618-2.423l-3.223-2.5c-.896.61-2.054.955-3.395.955-2.605 0-4.81-1.76-5.595-4.123H1.765v2.576A10.001 10.001 0 0010.7 20z" fill="#34A853" />
                                    <path d="M5.105 11.917a5.989 5.989 0 010-3.829V5.512H1.766a10.009 10.009 0 000 8.98l3.339-2.575z" fill="#FBBC04" />
                                    <path d="M10.7 3.958a5.434 5.434 0 013.836 1.5l2.855-2.856A9.611 9.611 0 0010.7 0 10.001 10.001 0 001.766 5.512l3.339 2.576c.785-2.364 2.99-4.13 5.595-4.13z" fill="#EA4335" />
                                </svg>
                                <span>Sign Up with Google</span>
                            </Button>

                            <p className="text-center text-sm">
                                I have an account?{' '}
                                <Button variant={"link"} className="font-medium px-0 text-blue-600 hover:text-blue-500 cursor-pointer" onClick={() => router.push('/auth/login')}>
                                    Sign in
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
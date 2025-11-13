/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import NavBg from '../../assets/Navbar/Login.png'
import GroupImg from '../../assets/Navbar/Group.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/auth/AuthContext'
import { Signin } from "../../features/SignIn/service";
import toast from 'react-hot-toast'
import { GetLocalStorage, RemoveLocalStorage, StoreLocalStorage } from '../../utils/localstorage'
import { COLORS, FONTS } from '../../constants/uiconstants'
import { verifyOtp } from '../../features/Auth/service'
import { MobileResponsive } from '../../hooks/MobileResponsive'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [handleOTP, setHandleOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth()
    const { verifyOTP } = useAuth();
    const { MobileView } = MobileResponsive()
    const [showPassword, setShowPassword] = useState(false);


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter valid email and password");
            return;
        }
        setLoading(true);

        const params = { email, password };

        try {
            const response = await Signin(params);
            const token = response?.data?.token;

            if (token) {
                StoreLocalStorage("token", token);
                login(token);
                setHandleOTP(true);

            } else {
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (error: any) {
            toast.error("Login failed");
            console.error("Sign-in error:", error);
        } finally {
            setLoading(false);
        }
    };


    const inputLength = 6;
    const [otpInput, setOtpInput] = useState<string[]>(Array(inputLength).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    // const otpValue = JSON.stringify(GetLocalStorage('otp'));


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length > 1) return;

        const updatedOtp = [...otpInput];
        updatedOtp[index] = value;
        setOtpInput(updatedOtp);

        // auto focus next input
        if (index < inputLength - 1 && value !== '') {
            inputsRef.current[index + 1]?.focus();
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otpInput[index]) {
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };



    // submit otp
    const handlesubmit = async () => {
        const enteredOtp = otpInput.join("");
        const token = GetLocalStorage('token');

        if (enteredOtp.length !== inputLength) {
            toast.error("Please enter the full 6-digit OTP");
            return;
        }

        const data = {
            token,
            otp: enteredOtp,
        };

        try {
            const response = await verifyOtp(data);
            if (response?.status) {
                RemoveLocalStorage('token');
                RemoveLocalStorage('otp');
                verifyOTP(response?.data)
                navigate("/")
                toast.success("OTP Verified Successfully!");
            } else {
                toast.error(response?.message || "Invalid OTP");
            }
        } catch (err: any) {
            toast.error("Something went wrong. Try again.", err);
        }
    };
    return (
        <div
            className="min-h-screen px-10 pb-6"
            style={{
                backgroundImage: `url(${NavBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className={MobileView ? 'w-full' : 'w-1/2'} >
                <h1 style={{ ...FONTS.nico_moji, color: COLORS.primary }} className={MobileView ? `!text-6xl pt-10` : ``}>
                    SlipHub
                </h1>
                <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={MobileView ? `!w-full text-sm` : ``}>
                    Your one-stop solution for all your HRMS needs. Streamline your processes and enhance productivity with Slip Hub.
                </p>
            </div>


            <div className={MobileView ? 'flex flex-col' : 'grid grid-cols-2 gap-10 mt-6'}>
                {!MobileView &&
                    <section className='flex justify-center items-center h-[60vh]'>
                        <img src={GroupImg} alt="" className='w-fit h-full' />
                    </section>
                }

                {!handleOTP && <section className='grid items-center px-4 h-[60vh]'>
                    <div>
                        <h1 style={{ ...FONTS.login_head, color: COLORS.primary }} className={MobileView ? '!text-3xl -mt-20' : ''}>Welcome!</h1>

                        <div>
                            <form onSubmit={handleSignIn} className="flex flex-col w-full mt-4 gap-4">
                                <div className='w-full'>
                                    <p style={{ ...FONTS.payroll_mainhead, color: COLORS.primary, padding: "0 0 10px 0" }} className={MobileView ? '!text-lg' : ''}>Email</p>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ ...FONTS.login_input, color: COLORS.primary }}
                                        className={`flex-1 ${MobileView && '!text-md'} p-2 w-full rounded-lg outline-none bg-[#4A70790D] text-black placeholder-gray-500 border border-[#4A7079]`}
                                    />
                                </div>
                                <div>
                                    <p style={{ ...FONTS.payroll_mainhead, color: COLORS.primary, padding: "0 0 10px 0" }} className={MobileView ? '!text-lg' : ''}>Password</p>
                                    <div className="relative w-full">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ ...FONTS.login_input, color: COLORS.primary }}
                                            className={`flex-1 p-2 ${MobileView && "!text-md"
                                                } w-full rounded-lg outline-none bg-[#4A70790D] text-black placeholder-gray-500 border border-[#4A7079] pr-10`} // add pr-10 for icon space
                                        />

                                        {/* Eye Icon */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A7079] text-2xl cursor-pointer"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        ...FONTS.card_name,
                                        backgroundColor: loading ? "#ccc" : COLORS.primary,
                                        cursor: loading ? "not-allowed" : "pointer"
                                    }}
                                    className="text-[#FFFFFF] p-2 mt-4 w-full rounded-lg font-medium shadow-md transition"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>
                        </div>
                    </div>
                </section>
                }


                {handleOTP && <section className={MobileView ? 'w-full' : 'w-[80%] m-auto'}>

                    <div>
                        <h1 style={{ ...FONTS.login_head, color: COLORS.primary }} className={MobileView ? '!text-3xl mt-10' : 'mb-2'}>Otp Verification</h1>
                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={MobileView ? '!text-sm' : ''}>Enter the 6 Digit OTP sent to your Registered Mail</p>
                        {/* <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={MobileView ? '!text-sm' : 'text-center'}>
                            OTP (for demo): {otpValue ?? ""}
                        </p> */}

                    </div>

                    <div style={{ ...FONTS.otp, color: COLORS.primary }} className="flex w-full justify-center gap-3 sm:gap-7 my-5">
                        {otpInput.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => {
                                    if (el) inputsRef.current[index] = el;
                                }}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="bg-[#4A70790D] border-1 border-[#4A7079] w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 sm:text-lg lg:text-xl text-center rounded-md focus:outline-none"
                                required
                            />
                        ))}
                    </div>

                    <div className={MobileView ? "w-full flex flex-col items-center gap-5 mb-5" : "w-full flex flex-col items-center gap-5"}>
                        <button
                            onClick={handlesubmit}
                            style={{ ...FONTS.card_name, backgroundColor: COLORS.primary }}
                            className="text-[#FFFFFF] p-2 mt-2 cursor-pointer w-full rounded-lg font-medium shadow-md transition text-center"
                        >
                            Verify
                        </button>
                        {/* <p style={{ ...FONTS.table_data, color: COLORS.primary }} className="text-white text-sm sm:text-base md:text-lg font-medium cursor-pointer">
                            Resend OTP
                        </p> */}
                    </div>
                </section>}

                {MobileView &&
                    <section className={handleOTP ? '' : '-mt-24'}>
                        <img src={GroupImg} alt="" className='w-fit h-full' />
                    </section>
                }
            </div>

        </div>
    )
}

export default Login

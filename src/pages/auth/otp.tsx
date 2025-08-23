import React, { useRef, useState } from 'react';
import Logo from '../../assets/Navbar/yohologo.png'
import NavBg from '../../assets/Navbar/nav-bg.jpg'
import { GetLocalStorage, RemoveLocalStorage} from '../../utils/localstorage';
import toast from 'react-hot-toast';
import { useAuth } from '../../Components/auth/AuthContext';
import { verifyOtp } from '../../features/Auth/service';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const { verifyOTP } = useAuth();

    const navigate = useNavigate()

    const inputLength = 6;
    const [otpInput, setOtpInput] = useState<string[]>(Array(inputLength).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const otpValue = JSON.stringify(GetLocalStorage('otp'));

    
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
            if (response?.data?.status) {
                RemoveLocalStorage('token');
                RemoveLocalStorage('otp');
                verifyOTP(response?.data?.data?.token) 
                navigate("/")
                toast.success("OTP Verified Successfully!");
            } else {
                toast.error(response?.data?.message || "Invalid OTP");
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.");
        }
    };

    return (
        <div
            className="relative h-screen w-screen"
            style={{
                backgroundImage: `url(${NavBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Center Container */}
            <div className="w-full h-full flex justify-center items-center px-4 sm:px-6">
                <div className="relative z-10 flex flex-col justify-center gap-5 items-center text-white bg-white/10 backdrop-blur-sm rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl px-6 py-5 sm:px-10 sm:py-12">
                    
                    {/* Logo Section */}
                    <div className='text-center'>
                        <h1 className=" text-4xl font-bold">
                            SlipHub
                        </h1>
                        <p className='italic'>Powered By </p>
                        <img src={Logo} alt="Logo" className="w-[180px] sm:w-[220px] md:w-[260px]" />
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col justify-center items-center gap-1 text-center">
                        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                            OTP Verification
                        </p>
                        <p className="text-xs sm:text-base md:text-lg text-gray-300">
                            Enter the 6 Digit OTP sent to your mobile number
                        </p>
                        <span className="text-xs sm:text-sm md:text-base font-medium text-white">
                            OTP (for demo): {otpValue ?? ""}
                        </span>
                    </div>

                    {/* OTP Inputs */}
                    <div className="flex w-full justify-between gap-3 sm:gap-4">
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
                                className="border-2 border-blue-500 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-lg sm:text-xl text-center rounded-md focus:outline-none"
                                required
                            />
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="w-full flex flex-col items-center gap-5">
                        <div
                            onClick={handlesubmit}
                            className="text-white w-full text-lg sm:text-xl cursor-pointer font-bold bg-green-500 text-center py-3 sm:py-4 rounded-md"
                        >
                            Verify
                        </div>
                        <p className="text-white text-sm sm:text-base md:text-lg font-medium cursor-pointer">
                            Resend OTP
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;

import React, { useState } from 'react'
import NavBg from '../../assets/Navbar/nav-bg.jpg'
import Logo from '../../assets/Navbar/yohologo.png'
import { Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/auth/AuthContext'
import { Signin } from "../../features/SignIn/service";
import toast from 'react-hot-toast'
import { StoreLocalStorage } from '../../utils/localstorage'

const Login = () => {

    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin@2025");
    const navigate = useNavigate();
    const { login } = useAuth()


   const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
        toast.error("Please enter valid email and password");
        return;
    }

    const params = { email, password };

    try {
        const response = await Signin(params);
        const token = response?.data?.data?.token;
        const otp = response?.data?.data?.otp;

        if (token) {
            StoreLocalStorage("token", token);
            StoreLocalStorage("otp", otp);

            // ✅ Update AuthContext state
            login(token);

            // ✅ Redirect to verification
            navigate("/verification");
        } else {
            toast.error("Invalid credentials. Please try again.");
        }
    } catch (error: any) {
        console.error("Sign-in error:", error);
        toast.error("Login failed");
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
            <div className="absolute inset-0 bg-black/10"></div>

            {/* <div className="bg-gradient-to-r from-gray-800/70 via-white/30 to-gray-white h-full flex justify-center gap-20 items-center px-[120px] py-[100px] text-white"> */}
            <div className="relative z-10 h-full flex justify-center gap-20 items-center px-[120px] py-[100px] text-white bg-[FFFFFF]/10 backdrop-blur-xs rounded-2xl p-10">

                <section className="w-1/2 flex flex-col items-center gap-4 justify-center h-full">
                    <h1 className="text-center text-5xl font-bold">
                        SlipHub
                    </h1>
                    <p className='italic'>Powered By </p>
                    <img src={Logo} alt="Logo" className="w-[500px]" />
                    <p className="text-white mt-2 text-center">
                        Your one-stop solution for all your HRMS needs. Streamline your processes and enhance productivity with Slip Hub.
                    </p>
                </section>
                <section className="w-1/2 h-full rounded-2xl">
                    <div className="flex flex-col justify-center items-center h-full">
                        <h1 className="text-center text-5xl font-bold">Welcome!</h1>
                        <form onSubmit={handleSignIn} className="flex flex-col items-center mt-10 w-90  gap-10">
                            {/* Username */}
                            <div className="flex w-full rounded-lg shadow-sm  overflow-hidden">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 p-3 outline-none bg-white text-black placeholder-gray-500"
                                />
                                <div className="bg-blue-500 flex items-center justify-center px-4 rounded-r-lg">
                                    <User className="text-white w-5 h-5" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex w-full rounded-lg shadow-sm  overflow-hidden">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 p-3 outline-none bg-white text-black placeholder-gray-500"
                                />
                                <div className="bg-blue-500 flex items-center justify-center px-4 rounded-r-lg">
                                    <Lock className="text-white w-5 h-5" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white p-3 w-full rounded-lg font-medium shadow-md transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default Login

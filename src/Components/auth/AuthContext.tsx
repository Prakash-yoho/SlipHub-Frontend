/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import {
	ClearLocalStorage,
	GetLocalStorage,
	StoreLocalStorage,
} from '../../utils/localstorage';
type AuthContextType = {
	isAuthenticated: boolean;
	isOtpAuthenticated: boolean;
	isLoading: boolean;
	login: (data: string) => void;
	verifyOTP: (data: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isOtpAuthenticated, setOtpIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = GetLocalStorage('sh_tkn_a');
		setIsAuthenticated(!!token);
		setOtpIsAuthenticated(token ? false : true);
		setIsLoading(false);
	}, []);

	const login = (data: any) => {
		StoreLocalStorage('otpToken', data?.token);
		setOtpIsAuthenticated(true);
	};

	const verifyOTP = (data: any) => {
		StoreLocalStorage('sh_tkn_a', data?.token);
		StoreLocalStorage('role', data?.role);
		StoreLocalStorage('uuid',data?.uuid)
		// localStorage.setItem("role", data);
		// setOtpIsAuthenticated(true);
		setIsAuthenticated(true);
	}

	const logout = () => {
		ClearLocalStorage();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, isOtpAuthenticated, login, logout, verifyOTP }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

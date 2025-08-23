import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashBoard from '../pages/dashboard/DashBoard';
import Profile from '../pages/profile/Profile';
import Login from '../pages/auth/Login';
import HrProfiles from '../pages/hrProfiles/HrProfiles';
// import Verify from '../pages/auth/otp'
import { useAuth } from '../Components/auth/AuthContext';
import Employee from '../pages/employee/Employee';
import Department from '../pages/department/Department';
import Payroll from '../pages/payroll/Payroll';
import EmployerProfile from '../pages/Employer/EmployerProfile';

function Approutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  const AuthRoutes = () => (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );

  const PropertyRoutes = () => (
    <Routes>

      <Route path='/' element={<MainLayout />}>
        <Route index element={<DashBoard />} />
        <Route path='/hrProfiles' element={<HrProfiles />} />
        <Route path='/department' element={<Department />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/employer' element={<EmployerProfile />} />
        <Route path='/payroll' element={<Payroll />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
  return isAuthenticated ? <PropertyRoutes /> : <AuthRoutes />
}

export default Approutes;

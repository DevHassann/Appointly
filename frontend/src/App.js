import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Styles/App.css';

import {
  HomePage,
  LoginPage,
  SignupPage,
  ForgetPasswordPage,
  ResetPasswordPage,
} from "./Routes/Routes"
import {
  MainPage,
  OnboardingPage,
  BookNowPage,
  UserWalletAndPaymentPage,
  UserAccountSettingsPage,
  UserAccountOwnershipPage,
  UserMeetingsAndAppointmentsPage,
  UserPasswordAndSecurityPage
} from "./Routes/UserRoutes"
import {
  SellerDashboardPage,
  SellerPersonalInformationPage,
  SellerProfessionalInformationPage,
  SellerProfessionalExperiencesPage,
  SellerEducationAndQualificationPage,
  SellerSlotsAndSchedulesPage,
  SellerWalletAndPaymentsPage,
  SellerMeetingsAndAppointmentsPage,
  SellerPriceManagementPage,
  SellerDetailPage
} from "./Routes/SellerRoutes"
import store from './Store/store';
import { loadUser } from './Store/Actions/user';
import { getAllSellers, loadSeller } from './Store/Actions/seller';
import { ZoomMeetingPage } from './Routes/ZoomMeetingRoutes';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await store.dispatch(loadUser());

      if (isAuthenticated && user?._id) {
        const userId = user._id;

        await store.dispatch(loadSeller(userId));

        store.dispatch(getAllSellers());
      }
    };

    fetchData();
  }, [isAuthenticated, user?._id]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgetpassword' element={<ForgetPasswordPage />} />
        <Route path='/reset-password/:reset_token' element={<ResetPasswordPage />} />


        {/* Protected Routes */}

        {/* User Routes */}
        <Route path='/main' element={<MainPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/user/settings/accountsettings' element={<UserAccountSettingsPage />} />
        <Route path='/user/settings/walletandpayments' element={<UserWalletAndPaymentPage />} />
        <Route path='/user/settings/accountownership' element={<UserAccountOwnershipPage />} />
        <Route path='/user/settings/meetingsandappointments' element={<UserMeetingsAndAppointmentsPage />} />
        <Route path='/user/settings/passwordandsecurity' element={<UserPasswordAndSecurityPage />} />
        <Route path='/booknow' element={<BookNowPage />} />

        {/* Seller Routes */}
        <Route path='/seller/settings/dashboard' element={<SellerDashboardPage />} />
        <Route path='/seller/settings/personal-information' element={<SellerPersonalInformationPage />} />
        <Route path='/seller/settings/professional-information' element={<SellerProfessionalInformationPage />} />
        <Route path='/seller/settings/educationandqualification' element={<SellerEducationAndQualificationPage />} />
        <Route path='/seller/settings/price-management' element={<SellerPriceManagementPage />} />
        <Route path='/seller/settings/professional-experiences' element={<SellerProfessionalExperiencesPage />} />
        <Route path='/seller/settings/slotsandscheduels' element={<SellerSlotsAndSchedulesPage />} />
        <Route path='/seller/settings/walletandpayments' element={<SellerWalletAndPaymentsPage />} />
        <Route path='/seller/settings/meetingsandappointments' element={<SellerMeetingsAndAppointmentsPage />} />
        <Route path='/seller/:id' element={<SellerDetailPage />} />

        {/* Zoom Page */}
        <Route path='/zoomus/meeting/:id' element={<ZoomMeetingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

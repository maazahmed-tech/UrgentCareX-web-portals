import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { PortalSelection } from '@/app/components/PortalSelection';

// Admin Components
import { AdminLogin } from '@/app/components/admin/AdminLogin';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { PatientsList } from '@/app/components/admin/PatientsList';
import { PatientDetails } from '@/app/components/admin/PatientDetails';
import { FacilitiesList } from '@/app/components/admin/FacilitiesList';
import { FacilityDetails } from '@/app/components/admin/FacilityDetails';
import { DoctorsList } from '@/app/components/admin/DoctorsList';
import { DoctorDetails } from '@/app/components/admin/DoctorDetails';
import { AdminSubscriptionOverview } from '@/app/components/admin/SubscriptionOverview';
import { PushNotifications } from '@/app/components/admin/PushNotifications';

// Facility Components
import { FacilityLogin } from '@/app/components/facility/FacilityLogin';
import { FacilityRegistration } from '@/app/components/facility/FacilityRegistration';
import { ForgotPassword } from '@/app/components/facility/ForgotPassword';
import { PasswordReset } from '@/app/components/facility/PasswordReset';
import { TermsOfService } from '@/app/components/facility/TermsOfService';
import { PrivacyPolicy } from '@/app/components/facility/PrivacyPolicy';
import { FacilityDashboard } from '@/app/components/facility/FacilityDashboard';
import { FacilityProfile } from '@/app/components/facility/FacilityProfile';
import { InsurancePayersManagement } from '@/app/components/facility/InsurancePayersManagement';
import { SubscriptionOverview } from '@/app/components/facility/SubscriptionOverview';
import { ChangePlan } from '@/app/components/facility/ChangePlan';
import { PaymentMethod } from '@/app/components/facility/PaymentMethod';
import { FacilitySettings } from '@/app/components/facility/FacilitySettings';
import { FacilityChangePassword } from '@/app/components/facility/FacilityChangePassword';
import { NotificationsPanel } from '@/app/components/facility/NotificationsPanel';
import { HelpSupport } from '@/app/components/facility/HelpSupport';
import { FacilityAnalytics } from '@/app/components/facility/FacilityAnalytics';

// Doctor Components
import { DoctorLogin } from '@/app/components/doctor/DoctorLogin';
import { DoctorRegistration } from '@/app/components/doctor/DoctorRegistration';
import { DoctorForgotPassword } from '@/app/components/doctor/DoctorForgotPassword';
import { DoctorDashboard } from '@/app/components/doctor/DoctorDashboard';
import { DoctorProfile } from '@/app/components/doctor/DoctorProfile';
import { AddCredential } from '@/app/components/doctor/AddCredential';
import { EditCredential } from '@/app/components/doctor/EditCredential';
import { AvailabilityCalendar } from '@/app/components/doctor/AvailabilityCalendar';
import { AddTimeSlot } from '@/app/components/doctor/AddTimeSlot';
import { EditTimeSlot } from '@/app/components/doctor/EditTimeSlot';
import { AddTimeOff } from '@/app/components/doctor/AddTimeOff';
import { AppointmentsCalendarWeek } from '@/app/components/doctor/AppointmentsCalendarWeek';
import { DoctorAppointmentDetails } from '@/app/components/doctor/DoctorAppointmentDetails';
import { PatientPreview } from '@/app/components/doctor/PatientPreview';
import { ReviewsList } from '@/app/components/doctor/ReviewsList';
import { DoctorSubscriptionOverview } from '@/app/components/doctor/DoctorSubscriptionOverview';
import { DoctorChangePlan } from '@/app/components/doctor/DoctorChangePlan';
import { DoctorPaymentMethod } from '@/app/components/doctor/DoctorPaymentMethod';
import { DoctorSettings } from '@/app/components/doctor/DoctorSettings';
import { DoctorChangePassword } from '@/app/components/doctor/DoctorChangePassword';
import { DoctorNotifications } from '@/app/components/doctor/DoctorNotifications';
import { DoctorPrivacyPolicy } from '@/app/components/doctor/DoctorPrivacyPolicy';
import { DoctorTermsOfService } from '@/app/components/doctor/DoctorTermsOfService';
import { DoctorHelpSupport } from '@/app/components/doctor/DoctorHelpSupport';
import { DoctorContact } from '@/app/components/doctor/DoctorContact';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('🔗 Current Path:', location.pathname);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing/Root - Portal Selection */}
        <Route path="/" element={<PortalSelection />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/patients" element={<PatientsList />} />
        <Route path="/admin/patients/:id" element={<PatientDetails />} />
        <Route path="/admin/facilities" element={<FacilitiesList />} />
        <Route path="/admin/facilities/:id" element={<FacilityDetails />} />
        <Route path="/admin/doctors" element={<DoctorsList />} />
        <Route path="/admin/doctors/:id" element={<DoctorDetails />} />
        <Route path="/admin/subscriptions" element={<AdminSubscriptionOverview />} />
        <Route path="/admin/notifications" element={<PushNotifications />} />
        
        {/* Facility Routes - Simplified: Profile & Subscription Only */}
        <Route path="/facility" element={<FacilityLogin />} />
        <Route path="/facility/register" element={<FacilityRegistration />} />
        <Route path="/facility/forgot-password" element={<ForgotPassword />} />
        <Route path="/facility/reset-password" element={<PasswordReset />} />
        <Route path="/facility/terms" element={<TermsOfService />} />
        <Route path="/facility/privacy" element={<PrivacyPolicy />} />
        <Route path="/facility/dashboard" element={<FacilityDashboard />} />
        <Route path="/facility/profile" element={<FacilityProfile />} />
        <Route path="/facility/insurance-payers" element={<InsurancePayersManagement />} />
        <Route path="/facility/subscription" element={<SubscriptionOverview />} />
        <Route path="/facility/change-plan" element={<ChangePlan />} />
        <Route path="/facility/payment-method" element={<PaymentMethod />} />
        <Route path="/facility/settings" element={<FacilitySettings />} />
        <Route path="/facility/change-password" element={<FacilityChangePassword />} />
        <Route path="/facility/notifications" element={<NotificationsPanel />} />
        <Route path="/facility/help-support" element={<HelpSupport />} />
        <Route path="/facility/analytics" element={<FacilityAnalytics />} />
        
        {/* Doctor Routes - Independent Registration & Management */}
        <Route path="/doctor" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegistration />} />
        <Route path="/doctor/forgot-password" element={<DoctorForgotPassword />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/add-credential" element={<AddCredential />} />
        <Route path="/doctor/edit-credential/:id" element={<EditCredential />} />
        <Route path="/doctor/availability-calendar" element={<AvailabilityCalendar />} />
        <Route path="/doctor/add-time-slot" element={<AddTimeSlot />} />
        <Route path="/doctor/edit-time-slot/:id" element={<EditTimeSlot />} />
        <Route path="/doctor/add-time-off" element={<AddTimeOff />} />
        <Route path="/doctor/appointments-calendar-week" element={<AppointmentsCalendarWeek />} />
        <Route path="/doctor/appointments/:id" element={<DoctorAppointmentDetails />} />
        <Route path="/doctor/patient-preview/:id" element={<PatientPreview />} />
        <Route path="/doctor/reviews" element={<ReviewsList />} />
        <Route path="/doctor/subscription" element={<DoctorSubscriptionOverview />} />
        <Route path="/doctor/change-plan" element={<DoctorChangePlan />} />
        <Route path="/doctor/payment-method" element={<DoctorPaymentMethod />} />
        <Route path="/doctor/settings" element={<DoctorSettings />} />
        <Route path="/doctor/change-password" element={<DoctorChangePassword />} />
        <Route path="/doctor/notifications" element={<DoctorNotifications />} />
        <Route path="/doctor/privacy-policy" element={<DoctorPrivacyPolicy />} />
        <Route path="/doctor/terms-of-service" element={<DoctorTermsOfService />} />
        <Route path="/doctor/help-support" element={<DoctorHelpSupport />} />
        <Route path="/doctor/contact" element={<DoctorContact />} />
        
        {/* Catch-all redirect for old credential edit paths */}
        <Route path="/doctor/credentials/edit/:id" element={<EditCredential />} />
      </Routes>
    </BrowserRouter>
  );
}